# Task Add on Geomeotrys at different levels of detail
# For each zoom level

# ZOOM Level notes
# Zoom 12 is about 1:150000 and difference between full and generalised lsoa boundaires is very subtle
# Zoom 14 is 1:35000 all LSOA visible, difference between full and generalised boundaries is clear
# Zoom 16 is 1:8000 is about the maximum needed to let a single LSOA full most of the screen

library(sf)
library(dplyr)

all <- readRDS("data/data_with_grades_v4.Rds")

# Split data from geom
nms <- c("LSOA11","SOAC11NM","LAD17NM","cars_percap_grade","km_percap_grade","T2W_Car_grade",
         "T2W_Cycle_grade","T2W_Bus_grade","T2W_Train_grade",
         "T2W_Foot_grade","T2W_Underground_grade","elec_emissions_grade",
          "gas_emissions_grade","car_emissions_grade","total_emissions_grade",
         "flights_grade","other_heating_grade","van_grade",
         "consumption_grade","epc_score_avg","floor_area_avg","low_energy_light")


all_map <- all[,nms]
all_json <- all
all_json <- split(all_json, all$LSOA11)

for(i in seq(1,length(all_json))){
  if(i %% 1000 == 0){
    message(i)
  }
  sub <- all_json[[i]]
  jsonlite::write_json(sub, paste0("data/LSOA_JSON/",sub$LSOA11,".json"))
}



dir.create("tmp")
unzip("data/bounds/England_lsoa_2011_clipped.zip", exdir = "tmp")
bounds_full  <- st_read("tmp/england_lsoa_2011_clipped.shp")
unlink("tmp", recursive = TRUE)

dir.create("tmp")
unzip("data/bounds/England_lsoa_2011_gen_clipped.zip", exdir = "tmp")
bounds_general  <- st_read("tmp/england_lsoa_2011_gen_clipped.shp")
unlink("tmp", recursive = TRUE)

dir.create("tmp")
unzip("data/bounds/England_lsoa_2011_sgen_clipped.zip", exdir = "tmp")
bounds_super_gen  <- st_read("tmp/england_lsoa_2011_sgen_clipped.shp")
unlink("tmp", recursive = TRUE)

bounds_full <- bounds_full[substr(bounds_full$code,1,1) == "E",]
bounds_general <- bounds_general[substr(bounds_general$code,1,1) == "E",]
bounds_super_gen <- bounds_super_gen[substr(bounds_super_gen$code,1,1) == "E",]

bounds_full <- bounds_full[,c("code","geometry")]
bounds_general <- bounds_general[,c("code","geometry")]
bounds_super_gen <- bounds_super_gen[,c("code","geometry")]

names(bounds_full) <- c("LSOA11","geometry")
names(bounds_general) <- c("LSOA11","geometry")
names(bounds_super_gen) <- c("LSOA11","geometry")

bounds_full <- st_buffer(bounds_full, 0)
bounds_general <- st_buffer(bounds_general, 0)
bounds_super_gen <- st_buffer(bounds_super_gen, 0)

bounds_full <- st_transform(bounds_full, 4326)
bounds_general <- st_transform(bounds_general, 4326)
bounds_super_gen <- st_transform(bounds_super_gen, 4326)

bounds_full <- left_join(bounds_full, all_map, by = "LSOA11")
bounds_general <- left_join(bounds_general, all_map, by = "LSOA11")
bounds_super_gen <- left_join(bounds_super_gen, all_map, by = "LSOA11")

write_sf(bounds_full, "data/carbon_full.geojson", delete_dsn = TRUE)
write_sf(bounds_general, "data/carbon_general.geojson", delete_dsn = TRUE)
write_sf(bounds_super_gen, "data/carbon_super_general.geojson", delete_dsn = TRUE)
