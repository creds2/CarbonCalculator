# Prep Data
library(sf)
library(dplyr)

source("R/secure_path.R")


bounds <- st_read("../Excess-Data-Exploration/data-prepared/LSOA_full.gpkg")
elec <- read.csv("../Excess-Data-Exploration/data-prepared/Electricty_2010-17.csv", stringsAsFactors = FALSE)
elec <- elec[!duplicated(elec$LSOA11),] 
gas <- read.csv("../Excess-Data-Exploration/data-prepared/Gas_2010-17.csv", stringsAsFactors = FALSE)
mot <- read.csv(paste0(secure_path,"/Tim Share/From Tim/MOT Data RACv9.3/MOT Data RACv9.3 LSOAoutputs_2011.csv"), stringsAsFactors = FALSE)
age <- readRDS("../Excess-Data-Exploration/data-prepared/age.Rds") # Not full UK
census <- readRDS("../Excess-Data-Exploration/data-prepared/census_lsoa.Rds") # Not full UK
names(census) <- gsub("[.]","",names(census))
school <- readRDS("../Excess-Data-Exploration/data-prepared/Trave2School.Rds")

emissions_wide <- readRDS("data-prepared/car_historical_emissions.Rds")


bounds <- bounds[bounds$LSOA11 %in% census$CODE,]
elec <- elec[elec$LSOA11 %in% bounds$LSOA11, c("LSOA11",
                                               "MeanDomElec_10_kWh",
                                               "MeanDomElec_11_kWh",
                                               "MeanDomElec_12_kWh",
                                               "MeanDomElec_13_kWh",
                                               "MeanDomElec_14_kWh",
                                               "MeanDomElec_15_kWh",
                                               "MeanDomElec_16_kWh",
                                               "MeanDomElec_17_kWh")]

gas <- gas[gas$LSOA11 %in% bounds$LSOA11, c("LSOA11",
                                            "MeanDomGas_10_kWh",
                                            "MeanDomGas_11_kWh",
                                            "MeanDomGas_12_kWh",
                                            "MeanDomGas_13_kWh",
                                            "MeanDomGas_14_kWh",
                                            "MeanDomGas_15_kWh",
                                            "MeanDomGas_16_kWh",
                                            "MeanDomGas_17_kWh")]
mot <- mot[mot$LSOA %in% bounds$LSOA11,]
names(mot) <- c("LSOA", "cars_total","cars_miles","pu5k","p5_12k","po12k","age_av","miles_av_u3",
                "miles_av_o13","pcars_diesel","pmiles_diesel","vans_total","vans_miles",
                "pmiles_car","pmiles_vans","cars_percap","miles_percap")
mot <- mot[,c("LSOA", "cars_total","cars_miles","vans_total","vans_miles","cars_percap","miles_percap")]


age <- age[age$lsoa %in% bounds$LSOA11, c("lsoa","BP_PRE_1900","BP_1900_1918","BP_1919_1929",
                                          "BP_1930_1939","BP_1945_1954","BP_1955_1964",
                                          "BP_1965_1972","BP_1973_1982","BP_1983_1992",
                                          "BP_1993_1999","BP_2000_2009","BP_2010_2015",
                                          "BP_UNKNOWN","ALL_PROPERTIES")]
census <- census[census$CODE %in% bounds$LSOA11,]

population <- readRDS("../Excess-Data-Exploration/data-prepared/population.Rds")

population <- population[population$LSOA11 %in% bounds$LSOA11,]
population$pop2011 <- as.numeric(population$pop2011)
population$pop2016 <- as.numeric(population$pop2016)

age$pP1900  <- round(age$BP_PRE_1900 / age$ALL_PROPERTIES * 100,2)
age$p1900_18 <- round(age$BP_1900_1918 / age$ALL_PROPERTIES * 100,2)
age$p1919_29 <- round(age$BP_1919_1929 / age$ALL_PROPERTIES * 100,2)
age$p1930_39 <- round(age$BP_1930_1939 / age$ALL_PROPERTIES * 100,2)
age$p1945_54 <- round(age$BP_1945_1954 / age$ALL_PROPERTIES * 100,2)
age$p1955_64 <- round(age$BP_1955_1964 / age$ALL_PROPERTIES * 100,2)
age$p1965_72 <- round(age$BP_1965_1972 / age$ALL_PROPERTIES * 100,2)
age$p1973_82 <- round(age$BP_1973_1982 / age$ALL_PROPERTIES * 100,2)
age$p1983_92 <- round(age$BP_1983_1992 / age$ALL_PROPERTIES * 100,2)
age$p1993_99 <- round(age$BP_1993_1999 / age$ALL_PROPERTIES * 100,2)
age$p2000_09 <- round(age$BP_2000_2009 / age$ALL_PROPERTIES * 100,2)
age$p2010_15 <- round(age$BP_2010_2015 / age$ALL_PROPERTIES * 100,2)
age$pUNKNOWN   <- round(age$BP_UNKNOWN / age$ALL_PROPERTIES * 100,2)

age <- age[,c("lsoa","pP1900","p1900_18","p1919_29",
              "p1930_39","p1945_54","p1955_64","p1965_72","p1973_82",
              "p1983_92","p1993_99","p2000_09","p2010_15","pUNKNOWN")]

heating <- readRDS("../Excess-Data-Exploration/data-prepared/central_heating.Rds") # Not full UK

heating$pHeating_None <- round(heating$`No CH` / heating$All * 100,2)
heating$pHeating_Gas <- round(heating$Gas / heating$All * 100,2)
heating$pHeating_Electric <- round(heating$Electric / heating$All * 100,2)
heating$pHeating_Oil <- round(heating$Oil / heating$All * 100,2)
heating$pHeating_Solid <- round(heating$`Solid fuel` / heating$All * 100,2)
heating$pHeating_Other <- round((heating$`Two or more` + heating$Other)/ heating$All * 100,2)

heating <- heating[,c("LSOA11","pHeating_None","pHeating_Gas","pHeating_Electric","pHeating_Oil","pHeating_Solid","pHeating_Other")]

# Clean and round
elec[2:9] <- lapply(elec[2:9], as.integer)
gas[2:9] <- lapply(gas[2:9], as.integer)
mot[c(2:5,7)] <- lapply(mot[c(2:5,7)], as.integer)
mot$cars_percap <- round(mot$cars_percap, 2)

census <- census[,c("CODE","Whole_House_Detached","Whole_House_Semi","Whole_House_Terraced","Flat_PurposeBuilt",
                    "Flat_Converted","Flat_Commercial","Caravan","All_T2W","T2W_Home",
                    "T2W_Metro","T2W_Train","T2W_Bus","T2W_Taxi","T2W_Mbike","T2W_Car","T2W_Passenger",
                    "T2W_Cycle","T2W_Foot","T2W_Other","T2W_NoEmp")]
census[c(2:8,10:21)] <- lapply(census[c(2:8,10:21)], round, 2)
population[2:3] <- lapply(population[2:3], as.integer)
school[3:5] <- lapply(school[3:5], round, 2)


# Join Togther
all <- left_join(elec, gas, by = "LSOA11")
all <- left_join(all, mot, by = c("LSOA11" = "LSOA"))
all <- left_join(all, age, by = c("LSOA11" = "lsoa"))
all <- left_join(all, census, by = c("LSOA11" = "CODE"))
all <- left_join(all, heating, by = c("LSOA11" = "LSOA11"))
all <- left_join(all, population, by = c("LSOA11" = "LSOA11"))
all <- left_join(all, emissons_wide, by = c("LSOA11" = "LSOA"))
all <- left_join(all, school, by = c("LSOA11" = "LSOA11"))
rm(age, census, elec, gas, heating, mot, population, emissions, school, emissons_wide)

#all <- left_join(all, bounds, by = "LSOA11")
#all <- st_as_sf(all)

#library(tmap)
#tmap_mode("view")
#qtm(all[1:10,])

#all <- st_transform(all, 4326)
saveRDS(all,"data/base_data.Rds")

