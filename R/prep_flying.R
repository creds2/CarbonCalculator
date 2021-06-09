# Estimate Flying Emissions
library(tmap)
library(dplyr)
tmap_mode("view")

secure_path <- "D:/OneDrive - University of Leeds/Data/CREDS Data/"

pass_od <- sf::read_sf("../LDT/data/clean/od_flights_pass_v2.gpkg")
pass_od <- sf::st_drop_geometry(pass_od[,c("airport1","airport1_country","airport2","airport2_country","pass_km_2018")])
pass_od <- pass_od[!is.na(pass_od$pass_km_2018),]

airports <- sf::read_sf("../LDT/data/clean/airports_clean_second_pass_v2.gpkg")
#Drop flights not from England
# Half flights between England and rest of UK
airports_wsni <- c("Aberdeen","Alderney","Anglesey (Valley)","Barra",
                   "Belfast",
                   "Belfast City (George Best)", "Benbecula",
                   "Campbeltown","Cardiff",
                   "Coll","Colonsay","Cumbernauld",
                   "Dornoch","Dundee",
                   "Eday","Edinburgh",
                   "Enniskillen","Fair Isle",
                   "Fetlar",
                   "Foula","Glasgow",
                   "Glasgow Prestwick","Guernsey",
                   "Hawarden",
                   "Inverness","Islay","Isle of Man",
                   "Jersey","Kinloss","Kirkwall",
                   "Lerwick (Tingwall)","Leuchars",
                   "Llanbedr","Londonderry",
                   "North Ronaldsay","Oban (North Connel)","Out Skerries","Pembrey",
                   "Scatsta",      
                   "Stornoway","Stronsay",
                   "Sumburgh","Tiree","Unst","Wick")

airports_eng <- pass_od$airport1[!pass_od$airport1 %in% airports_wsni]

qtm(airports[airports$airport %in% airports_wsni,]) +
qtm(airports[airports$airport %in% airports_eng,], dots.col = "red")

class_airport <- function(x){
  if(x %in% airports_eng){
    return("England")
  }
  if(x %in% airports_wsni){
    return("UK - Not England")
  }
  return("Other COuntry")
}


pass_od$fromclass <- sapply(pass_od$airport1, class_airport)
pass_od$toclass <- sapply(pass_od$airport2, class_airport)

keeptable <- data.frame(fromclass = c("UK - Not England","UK - Not England","UK - Not England","England","England","England"),
                        toclass = c("Other COuntry","UK - Not England","England","England","UK - Not England","Other COuntry"),
                        keep = c("no","no","half","yes","half","yes"))

pass_od <- left_join(pass_od, keeptable, by = c("fromclass","toclass"))

pass_od <- pass_od[pass_od$keep != "no",]
pass_od$pass_km_2018_mod <- ifelse(pass_od$keep == "yes", pass_od$pass_km_2018, pass_od$pass_km_2018 / 2)

# Add Emissions
# From Defra emissions factors 2020
# Well to Tank emissions with radiative forcing
# domestic     0.2443  kg CO2e per pass KM
# short hall   0.15553 
# long hall    0.19085 

# CO2 (not e) without RF
# domestic   0.24298 
# short haul   0.15475 
# long haul   0.18989  



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
pass_od$emissions <- pass_od$emissions_factor * pass_od$pass_km_2018_mod

emissions_total <- sum(pass_od$emissions, na.rm = TRUE)

emissions_total <- emissions_total * 0.66 #34% of passengers are foreign residents (2016)

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

# dir.create("tmp2")
# unzip(file.path(secure_path,"/Tim Share/From Malcolm/Experian.zip"),
#       exdir = "tmp2")
# income <- read.csv("tmp2/UKDA-5738-csv/csv/2011-experian-data.csv")
# names(income) <- income[4,]
# income <- income[5:nrow(income),]
# income <- income[,c("GeographyValue","Median_(H) Household Income Value")]
# names(income) <- c("LSOA01","median_household_income")
# 
# income <- income[substr(income$LSOA,1,1) == "E",]
# income$median_household_income <- as.numeric(income$median_household_income)
# income$centile <- percentile(income$median_household_income) / 100
# 
# lsoa_lookup <- read.csv("data/bounds/lsoa_2001_2011_lookup.csv")
# lsoa_lookup <- lsoa_lookup[,c(1,3,5)]
# names(lsoa_lookup) <- c("LSOA01","LSOA11","Change")
# 
# lsoa_lookup <- lsoa_lookup[lsoa_lookup$LSOA01 %in% income$LSOA01,]
# lsoa_lookup <- lsoa_lookup[!duplicated(lsoa_lookup$LSOA11),]
# income <- left_join(income, lsoa_lookup, by = c("LSOA01"))
# 
# summary(duplicated(income$LSOA11))
# income <- income[!duplicated(income$LSOA11),]

income <- readRDS("data/income/lsoa_income_estimates.Rds")
income$centile <- percentile(income$income_lsoa) / 100
names(income)[1] <- "LSOA11"

match_table <- data.frame(x, y, z)
match_table$x <- round(match_table$x, 2)

income$emissions_share <- match_table$z[match(income$centile, match_table$x)] /324
income$flight_emissions <- income$emissions_share * emissions_total

sum(income$flight_emissions)/emissions_total # Should equal 1

income <- income[,c("LSOA11","flight_emissions","centile")]
income <- income[!is.na(income$LSOA11),]


population <- readRDS("data-prepared/LSOA_population_2011_2019.Rds")
population <- population[substr(population$code,1,1) == "E",]

population <- population[population$code %in% income$LSOA11,]
population$pop_2018 <- as.numeric(population$pop_2018)
population <- population[,c("code","pop_2018")]


income <- left_join(income, population, by = c("LSOA11" = "code"))
#income$pop_2018[is.na(income$pop_2018)] <- 0

income$flight_emissions_percap <- income$flight_emissions / income$pop_2018
summary(income$flight_emissions_percap)

saveRDS(income,"data-prepared/flight_emissions.Rds")

# Quick plot

bounds <- st_read("../Excess-Data-Exploration/data-prepared/LSOA_forplots.gpkg")
bounds <- left_join(bounds,income, by = c("LSOA11" = "LSOA11"))
bounds <- bounds[!is.na(bounds$flight_emissions_percap),]


tm_shape(bounds) +
  tm_fill("centile",
          n = 20)

