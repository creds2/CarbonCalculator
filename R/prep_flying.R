# Estimate Flying Emissions

pass_od <- sf::read_sf("../LDT/data/clean/od_flights_pass.gpkg")
pass_od <- sf::st_drop_geometry(pass_od[,c("airport1","airport1_country","airport2","airport2_country","pass_km_2018")])

# Add Emissions
# From Defra emissions factors 2020
# domestic     0.2443  kg CO2e per pass KM
# short hall   0.15553 
# long hall    0.19085 

emissions_factor <- data.frame(distance_band = c("domestic", "short haul","long haul"),
                               emissions_factor = c(0.2443, 0.15553, 0.19085),
                               stringsAsFactors = FALSE)

distance_band <- pbapply::pbsapply(pass_od$airport2_country,
                                   function(x){
                                     if(x %in% c("Irish Republic","Kosovo")){
                                       return("short haul")
                                     }
                                     
                                     if(x %in% c("Guernsey","Isle of Man","Jersey","United Kingdom","Oil Rigs")){
                                       return("domestic")
                                     }
                                     
                                     if(x %in% c("Ascension Island","Virgin Islands (U.s.a)")){
                                       return("long haul")
                                     }
                                     
                                     cont <- countrycode::countrycode(sourcevar = x,
                                                         origin = "country.name",
                                                         destination = "continent")
                                     
                                     if(cont == "Europe"){
                                       return("short haul")
                                     } else {
                                       return("long haul")
                                     }
                                   })

pass_od$distance_band <- distance_band
pass_od$emissions_factor <- emissions_factor$emissions_factor[match(pass_od$distance_band, emissions_factor$distance_band)] 
pass_od$emissions <- pass_od$emissions_factor * pass_od$pass_km_2018

emissions_total <- sum(pass_od$emissions, na.rm = TRUE)

# put into context
message("is ", (emissions_total / 1000) / 35e9 * 100," of global emissions")
message("is ", (emissions_total / 1000) / (35e9 * 0.02) * 100," of global aviation emissions")

x = seq(0,1,0.01)
y = 1.02 * x **2 - 0.02 *x
y[y<0] <- 0
z = c(y[1],diff(y))



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

dir.create("tmp2")
unzip(file.path(secure_path,"/Tim Share/From Malcolm/Experian.zip"),
      exdir = "tmp2")
income <- read.csv("tmp2/UKDA-5738-csv/csv/2011-experian-data.csv")
names(income) <- income[4,]
income <- income[5:nrow(income),]
income <- income[,c("GeographyValue","Median_(H) Household Income Value")]
names(income) <- c("LSOA","median_household_income")

income <- income[substr(income$LSOA,1,1) == "E",]
income$median_household_income <- as.numeric(income$median_household_income)
income$centile <- percentile(income$median_household_income) / 100

match_table <- data.frame(x, y, z)
match_table$x <- round(match_table$x, 2)

income$emissions_share <- match_table$z[match(income$centile, match_table$x)] /324
income$flight_emissions <- income$emissions_share * emissions_total

sum(income$flight_emissions)/emissions_total # Shoudl equal 1

income <- income[,c("LSOA","flight_emissions")]

population <- readRDS("../Excess-Data-Exploration/data-prepared/population.Rds")

population <- population[population$LSOA11 %in% income$LSOA,]
population$pop2016 <- as.numeric(population$pop2016)
population <- population[,c("LSOA11","pop2016")]


income <- left_join(income, population, by = c("LSOA" = "LSOA11"))
#income$pop2016[is.na(income$pop2016)] <- 0

income$flight_emissions_percap <- income$flight_emissions / income$pop2016
summary(income$flight_emissions_percap)

saveRDS(income,"data-prepared/flight_emissions.Rds")

# Quick plot

bounds <- st_read("../Excess-Data-Exploration/data-prepared/LSOA_forplots.gpkg")
bounds <- left_join(bounds,income, by = c("LSOA11" = "LSOA"))
bounds <- bounds[!is.na(bounds$flight_emissions_percap),]

library(tmap)
tmap_mode("view")
tm_shape(bounds) +
  tm_fill("flight_emissions_percap",
          n = 8)

