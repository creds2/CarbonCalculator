library(UK2GTFS)
library(dplyr)
library(sf)
library(tmap)
tmap_mode("plot")


gtfs_bus <- gtfs_read("D:/OneDrive - University of Leeds/Data/opentripplanner/graphs/great-britain2/busGB-2020-03-26-interpolated2.zip")
gtfs_rail <- gtfs_read("D:/OneDrive - University of Leeds/Data/opentripplanner/graphs/great-britain2/railGB-2020-05-02-notransfers.zip")

gtfs_rail$routes$route_short_name <- as.character(gtfs_rail$routes$route_short_name)
gtfs_bus$trips$service_id <- as.character(gtfs_bus$trips$service_id)
gtfs_bus$calendar$service_id <- as.character(gtfs_bus$calendar$service_id)
gtfs_bus$calendar_dates$service_id <- as.character(gtfs_bus$calendar_dates$service_id)

gtfs_all <- gtfs_merge(list(gtfs_bus, gtfs_rail), force = TRUE)


make_trip_geoms <- function(gtfs){
  stops <- gtfs$stops
  stop_times <- gtfs$stop_times
  #routes <- gtfs$routes
  trips <- gtfs$trips
  #calendar <- gtfs$calendar
  
  stops <- stops[,c("stop_id","stop_lon","stop_lat")]
  stop_times <- dplyr::left_join(stop_times, stops, by = "stop_id")
  
  
  stop_times <- split(stop_times, stop_times$trip_id)
  
  make_geom <- function(x){
    geom <- x[,c("stop_lon", "stop_lat")]
    geom <- as.matrix(geom)
    geom <- sf::st_linestring(geom, dim = "XY")
    return(geom)
  }
  
  geom <- pbapply::pblapply(stop_times, make_geom)
  
  trips_geom <- sf::st_as_sf(data.frame(trip_id = names(stop_times),
                                        geometry = sf::st_sfc(geom, crs = 4326),
                                        stringsAsFactors = FALSE))
  
  return(trips_geom)
  
}




countwd2 <- function(startdate, enddate, weekday){
  if(is.na(startdate)){
    return(0)
  }
  if(is.na(enddate)){
    return(0)
  }
  d <- as.integer(enddate - startdate) + 1
  d %/% 7 +
    (weekday %in% weekdays(seq(startdate, length.out=d %% 7, by=1)))
}


count_stops <- function(gtfs, 
                        startdate = lubridate::ymd("2020-03-01"), 
                        enddate = lubridate::ymd("2020-04-30")){
  message("Only using stops between ",startdate," and ",enddate)
  stop_times <- gtfs$stop_times
  trips <- gtfs$trips
  calendar <- gtfs$calendar
  calendar_days <- gtfs$calendar_dates
  
  calendar <- calendar[calendar$start_date <= enddate,]
  calendar <- calendar[calendar$end_date >= startdate,]
  
  calendar$start_date <- dplyr::if_else(calendar$start_date < startdate,
                                startdate,
                                calendar$start_date)
  calendar$end_date <- dplyr::if_else(calendar$end_date > enddate,
                              enddate,
                              calendar$end_date)
  
  calendar_days <- calendar_days[calendar_days$service_id %in% calendar$service_id,]
  calendar_days <- calendar_days[calendar_days$date >= startdate,]
  calendar_days <- calendar_days[calendar_days$date <= enddate,]
  
  calendar_days <- calendar_days %>%
    dplyr::group_by(service_id) %>%
    dplyr::summarise(runs_extra = sum(exception_type == 1),
                     runs_canceled = sum(exception_type == 2))
  
  trips <- trips[trips$service_id %in% calendar$service_id, ]
  stop_times <- stop_times[stop_times$trip_id %in% trips$trip_id,]
  
  # work out how many times the trip in run
  trips <- dplyr::left_join(trips, calendar, by = "service_id")
  trips <- dplyr::left_join(trips, calendar_days, by = "service_id")
  
  trips$runs_canceled[is.na(trips$runs_canceled)] <- 0
  trips$runs_extra[is.na(trips$runs_extra)] <- 0
  
  message("Counting trips on each day")
  future::plan("future::multisession")
  
  trips$n_monday <- future.apply::future_mapply(countwd2, startdate = trips$start_date, enddate = trips$end_date, weekday = "Monday")
  trips$n_tuesday <- future.apply::future_mapply(countwd2, startdate = trips$start_date, enddate = trips$end_date, weekday = "Tuesday")
  trips$n_wednesday <- future.apply::future_mapply(countwd2, startdate = trips$start_date, enddate = trips$end_date, weekday = "Wednesday")
  trips$n_thursday <- future.apply::future_mapply(countwd2, startdate = trips$start_date, enddate = trips$end_date, weekday = "Thursday")
  trips$n_friday <- future.apply::future_mapply(countwd2, startdate = trips$start_date, enddate = trips$end_date, weekday = "Friday")
  trips$n_saturday <- future.apply::future_mapply(countwd2, startdate = trips$start_date, enddate = trips$end_date, weekday = "Saturday")
  trips$n_sunday <- future.apply::future_mapply(countwd2, startdate = trips$start_date, enddate = trips$end_date, weekday = "Sunday")
  
  future::plan("future::sequential")
  
  trips$runs_monday <- trips$monday * trips$n_monday
  trips$runs_tuesday <- trips$tuesday * trips$n_tuesday
  trips$runs_wednesday <- trips$wednesday * trips$n_wednesday
  trips$runs_thursday <- trips$thursday * trips$n_thursday
  trips$runs_friday <- trips$friday * trips$n_friday
  trips$runs_saturday <- trips$saturday * trips$n_saturday
  trips$runs_sunday <- trips$sunday * trips$n_sunday
  
  message("Summariseing results")
  trips$runs_total <- trips$runs_monday + trips$runs_tuesday +
    trips$runs_wednesday + trips$runs_thursday + trips$runs_friday +
    trips$runs_saturday + trips$runs_sunday + trips$runs_extra - trips$runs_canceled
  
  trips$runs_per_week <- trips$runs_total / ((as.numeric(trips$end_date - trips$start_date) + 1)/7)
  
  # Catch Single Day services
  trips$runs_per_week <- ifelse(trips$start_date == trips$end_date, 1, trips$runs_per_week)
  
  trips <- trips[,c("trip_id","start_date","end_date","runs_total","runs_per_week")]
  stop_times <- dplyr::left_join(stop_times, trips, by = "trip_id")
  stop_times_summary <- stop_times %>%
    dplyr::group_by(stop_id) %>%
    dplyr::summarise(stops_total = sum(runs_total),
                     stops_per_week = sum(runs_per_week))
  
  stops <- dplyr::left_join(gtfs$stops, stop_times_summary, by = "stop_id")
  return(stops)
}


stops_with_count = count_stops(gtfs_all)
summary(stops_with_count$stops_per_week)


# Make Grades
percentile <- function(dat){
  pt1 <- quantile(dat, probs = seq(0, 1, by = 0.01), type = 7, na.rm = TRUE)
  pt2 <- unique(as.data.frame(pt1), fromLast = TRUE)
  pt3 <- rownames(pt2)
  pt4 <- as.integer(strsplit(pt3, "%"))
  if(0 %in% pt2$pt1){
    cts <- c(-0.000001, pt2$pt1)
  } else {
    cts <- c(0, pt2$pt1)
  }
  datp <- pt4[as.integer(cut(dat, cts, labels = 1:length(pt3)))]
  return(datp)
  foo = data.frame(data = dat,
                   datp = datp)
}

value2grade <- function(x, high_good = FALSE){
  
  x_cent <- percentile(x)
  grades <- c(rep("A+",1),
              rep("A",4),
              rep("A-",5),
              rep("B+",6),
              rep("B",6),
              rep("B-",7),
              rep("C+",7),
              rep("C",7),
              rep("C-",7),
              rep("D+",7),
              rep("D",7),
              rep("D-",7),
              rep("E+",7),
              rep("E",6),
              rep("E-",6),
              rep("F+",5),
              rep("F",4),
              rep("F-",1))
  
  if(high_good){
    grades <- c(grades, "F-")
    x_grade <- grades[match(x_cent,100:0)]
  } else {
    grades <- c("A+",grades)
    x_grade <- grades[match(x_cent,0:100)]
  }
  
  return(x_grade)
}




stops_with_count$grade <- value2grade(stops_with_count$stops_per_week, high_good = TRUE)
head(stops_with_count)

stops_with_count <- st_as_sf(stops_with_count, coords = c("stop_lon","stop_lat"), crs = 4326)
stops_with_count <- stops_with_count[,c("stop_id","stop_name","stops_total","stops_per_week","grade")]
stops_with_count$stops_per_week <- round(stops_with_count$stops_per_week)
stops_with_count$stops_total <- round(stops_with_count$stops_total)


Encoding(stops_with_count$stop_name) <- "latin1"
stops_with_count$stop_name <- enc2utf8(stops_with_count$stop_name)
all(validUTF8(stops_with_count$stop_name))

st_write(stops_with_count,"data/transit_stop_frequency_v3.geojson", delete_dsn = TRUE)

if(FALSE){
  miss <- stops_with_count$stop_id[is.na(stops_with_count$grade)]
  foo <- unique(gtfs_bus$stop_times$trip_id[gtfs_bus$stop_times$stop_id %in% miss])
  foo <- unique(gtfs_bus$trips$service_id[gtfs_bus$trips$trip_id %in% foo])
  foo <- gtfs_bus$calendar[gtfs_bus$calendar$service_id %in% foo,]
  foo$dur <- foo$end_date - foo$start_date
}
