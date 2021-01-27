library(dplyr)
all <- readRDS("data/data_with_grades.Rds")

all <- all[!names(all) %in% c("LSOA11","LSOA11NM","SOAC11NM","LAD17CD","LSOA11_name",
                              "cars_percap_grade",
                              "km_percap_grade","T2W_Car_grade","T2W_Cycle_grade",
                              "T2W_Bus_grade","T2W_Train_grade","T2W_Foot_grade",
                              "elec_emissions_grade","gas_emissions_grade","car_emissions_grade", 
                              "total_emissions_grade","flights_grade")]

all_la <- all %>%
  group_by(LAD17NM) %>%
  summarise_all(mean, na.rm = TRUE)


england <- all
england$LAD17NM <- "England"
england <- england %>%
  group_by(LAD17NM) %>%
  summarise_all(mean, na.rm = TRUE)

all_la <- rbind(england, all_la)
all_la[2:ncol(all_la)] <- lapply(all_la[2:ncol(all_la)], signif, digits = 3)

library(jsonlite)
write_json(all_la, "data/la_averages.json")
