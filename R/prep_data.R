# Prep Data
library(sf)
library(dplyr)

source("R/secure_path.R")



elec <- read.csv("../Excess-Data-Exploration/data-prepared/Electricty_2010-17.csv", stringsAsFactors = FALSE)
elec <- elec[!duplicated(elec$LSOA11),] 
gas <- read.csv("../Excess-Data-Exploration/data-prepared/Gas_2010-17.csv", stringsAsFactors = FALSE)
cars_km <- readRDS("data-prepared/car_van_km_09_18.Rds")
cars_emissions <- readRDS("data-prepared/car_historical_emissions.Rds")
population <- readRDS("data-prepared/LSOA_population_2011_2019.Rds")
flights <- readRDS("data-prepared/flight_emissions.Rds")
lsoa_classif <- read.csv(paste0(substr(secure_path,1,39),"OA Bounadries/GB_OA_LSOA_MSOA_LAD_Classifications_2017.csv"))

# mot <- read.csv(paste0(secure_path,"/Tim Share/From Tim/MOT Data RACv9.3/MOT Data RACv9.3 LSOAoutputs_2011.csv"), stringsAsFactors = FALSE)
age <- readRDS("../Excess-Data-Exploration/data-prepared/age.Rds") # Not full UK
census <- readRDS("../Excess-Data-Exploration/data-prepared/census_lsoa.Rds") # Not full UK
names(census) <- gsub("[.]","",names(census))
school <- readRDS("../Excess-Data-Exploration/data-prepared/Trave2School.Rds")

elec <- elec[, c("LSOA11",
                                               "TotDomElec_10_kWh",
                                               "TotDomElec_11_kWh",
                                               "TotDomElec_12_kWh",
                                               "TotDomElec_13_kWh",
                                               "TotDomElec_14_kWh",
                                               "TotDomElec_15_kWh",
                                               "TotDomElec_16_kWh",
                                               "TotDomElec_17_kWh")]

gas <- gas[, c("LSOA11",
                                            "TotDomGas_10_kWh",
                                            "TotDomGas_11_kWh",
                                            "TotDomGas_12_kWh",
                                            "TotDomGas_13_kWh",
                                            "TotDomGas_14_kWh",
                                            "TotDomGas_15_kWh",
                                            "TotDomGas_16_kWh",
                                            "TotDomGas_17_kWh")]

lsoa_classif <- lsoa_classif[,c("LSOA11CD","LSOA11NM","SOAC11NM","LAD17CD","LAD17NM")]
lsoa_classif <- lsoa_classif[!duplicated(lsoa_classif$LSOA11CD),]

age <- age[, c("lsoa","BP_PRE_1900","BP_1900_1918","BP_1919_1929",
                                          "BP_1930_1939","BP_1945_1954","BP_1955_1964",
                                          "BP_1965_1972","BP_1973_1982","BP_1983_1992",
                                          "BP_1993_1999","BP_2000_2009","BP_2010_2015",
                                          "BP_UNKNOWN")]
names(age) <- c("lsoa","pP1900","p1900_18","p1919_29",
                "p1930_39","p1945_54","p1955_64","p1965_72","p1973_82",
                "p1983_92","p1993_99","p2000_09","p2010_15","pUNKNOWN")

non_gas <- readRDS("data-prepared/non_gaselec_emissions.Rds")


heating <- readRDS("../Excess-Data-Exploration/data-prepared/central_heating.Rds") # Not full UK

heating$pHeating_None <- heating$`No CH`
heating$pHeating_Gas <- heating$Gas
heating$pHeating_Electric <- heating$Electric
heating$pHeating_Oil <- heating$Oil
heating$pHeating_Solid <- heating$`Solid fuel`
heating$pHeating_Other <- (heating$`Two or more` + heating$Other)

heating <- heating[,c("LSOA11","pHeating_None","pHeating_Gas","pHeating_Electric","pHeating_Oil","pHeating_Solid","pHeating_Other")]


census <- census[,c("CODE","Whole_House_Detached","Whole_House_Semi","Whole_House_Terraced","Flat_PurposeBuilt",
                    "Flat_Converted","Flat_Commercial","Caravan","All_T2W","T2W_Home",
                    "T2W_Metro","T2W_Train","T2W_Bus","T2W_Taxi","T2W_Mbike","T2W_Car","T2W_Passenger",
                    "T2W_Cycle","T2W_Foot","T2W_Other","T2W_NoEmp")]

# Join Togther
all <- left_join(elec, gas, by = "LSOA11")
all <- left_join(all, age, by = c("LSOA11" = "lsoa"))
all <- left_join(all, census, by = c("LSOA11" = "CODE"))
all <- left_join(all, heating, by = c("LSOA11" = "LSOA11"))
all <- left_join(all, population, by = c("LSOA11" = "code"))
all <- left_join(all, school, by = c("LSOA11" = "LSOA11"))
all <- left_join(all, cars_emissions, by = c("LSOA11" = "LSOA"))
all <- left_join(all, cars_km, by = c("LSOA11" = "LSOA11"))
all <- left_join(all, non_gas, by = c("LSOA11" = "LSOA11"))
all <- left_join(all, flights, by = c("LSOA11" = "LSOA11"))
all <- left_join(all, lsoa_classif, by = c("LSOA11" = "LSOA11CD"))

rm(elec, gas, age, census, heating, population, school, cars_emissions, cars_km, non_gas, flights, lsoa_classif)

all <- all[substr(all$LSOA11,1,1) == "E",]

#all <- left_join(all, bounds, by = "LSOA11")
#all <- st_as_sf(all)

#library(tmap)
#tmap_mode("view")
#qtm(all[1:10,])

#all <- st_transform(all, 4326)
saveRDS(all,"data/base_data_v2.Rds")

