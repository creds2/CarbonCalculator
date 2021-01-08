# Prep Data
library(sf)
library(dplyr)
library(tidyr)

if(dir.exists("E:/Users/earmmor/OneDrive - University of Leeds/CREDS Data")){
  secure_path <- "E:/Users/earmmor/OneDrive - University of Leeds/CREDS Data"
} else if(dir.exists("E:/Users/earmmor/OneDrive - University of Leeds/CREDS Data")){
  secure_path <- "E:/OneDrive - University of Leeds/Data/CREDS Data"
} else {
  secure_path <- "D:/OneDrive - University of Leeds/Data/CREDS Data"
}

dir.create("tmp")
unzip(paste0(secure_path,"/github-secure-data/Historical_Car_Emissions_LSOA.zip"),
      exdir = "tmp")
emissions <- read.csv("tmp/Historical_Car_Emissions_LSOA.csv")
unlink("tmp")

emissions <- emissions[,c("year","LSOA","fuel","AllCars","AvgCO2","AvgAge")]
emissions_gp <- emissions %>%
  group_by(year, LSOA) %>%
  summarise(total_cars = sum(AllCars, na.rm = TRUE),
            AvgCO2_cars = weighted.mean(AvgCO2, AllCars, na.rm = TRUE),
            AvgAge_cars = weighted.mean(AvgAge, AllCars, na.rm = TRUE))

emissions_gp$AvgCO2_cars <- round(emissions_gp$AvgCO2_cars, 1)
emissions_gp$AvgAge_cars <- round(emissions_gp$AvgAge_cars, 1)

emissons_wide <- tidyr::pivot_wider(emissions_gp, id_cols = "LSOA", 
                                    names_from = c("year"),
                                    values_from = c("total_cars","AvgCO2_cars","AvgAge_cars"))

saveRDS(emissons_wide,"data-prepared/car_historical_emissions.Rds")
