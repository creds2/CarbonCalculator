# Task Add on Geomeotrys at different levels of detail
# For each zoom level

# ZOOM Level notes
# Zoom 12 is about 1:150000 and difference between full and generalised lsoa boundaires is very subtle
# Zoom 14 is 1:35000 all LSOA visible, difference between full and generalised boundaries is clear
# Zoom 16 is 1:8000 is about the maximum needed to let a single LSOA full most of the screen

library(sf)
library(dplyr)

all <- readRDS("data/data_with_grades.Rds")

bounds_full  <- st_read("../Excess-Data-Exploration/data-prepared/LSOA_full.gpkg")
bounds_general  <- st_read("../Excess-Data-Exploration/data-prepared/LSOA_generalised.gpkg")

bounds_full <- bounds_full[bounds_full$LSOA11 %in% all$LSOA11,]
bounds_general <- bounds_general[bounds_general$LSOA11 %in% all$LSOA11,]

bounds_full <- st_buffer(bounds_full, 0)
bounds_general <- st_buffer(bounds_general, 0)

bounds_full <- st_transform(bounds_full, 4326)
bounds_general <- st_transform(bounds_general, 4326)

bounds_full <-left_join(bounds_full, all, by = "LSOA11")
bounds_general <-left_join(bounds_general, all, by = "LSOA11")

write_sf(bounds_full, "data/carbon_full.geojson", delete_dsn = TRUE)
write_sf(bounds_general, "data/carbon_general.geojson", delete_dsn = TRUE)
