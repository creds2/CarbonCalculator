# Main LSOA data
library(zip)
library(sf)

all <- readRDS("data/data_with_grades_v5.Rds")
dir.create("tmp")

write.csv(all, "tmp/PBCC_LSOA_data.csv", row.names = FALSE)

zip("data/bulk_export/PBCC_LSOA_data.zip", 
    files = "tmp/PBCC_LSOA_data.csv", 
    include_directories = FALSE, 
    compression_level = 9.9,
    mode = "cherry-pick"
    )
unlink("tmp", recursive = TRUE)

# Isochrones

iso_bike <- readRDS("data-prepared/isochones_bike_v2.Rds")
iso_walk <- readRDS("data-prepared/isochones_walk_v2.Rds")
iso_transit <- readRDS("data-prepared/isochones_transit_v3.Rds")
iso_biketransit <- readRDS("data-prepared/isochones_biketransit_v3.Rds")

iso_bike$mode <- "BIKE"
iso_walk$mode <- "WALK"
iso_transit$mode <- "TRANSIT"
iso_biketransit$mode <- "BIKETRANSIT"

iso_bike <- iso_bike[,c("fromPlace","mode")]
iso_walk <- iso_walk[,c("fromPlace","mode")]
iso_transit <- iso_transit[,c("fromPlace","mode")]
iso_biketransit <- iso_biketransit[,c("fromPlace","mode")]

iso_bike <- nngeo::st_remove_holes(iso_bike)
iso_walk <- nngeo::st_remove_holes(iso_walk)
iso_transit <- nngeo::st_remove_holes(iso_transit)
iso_biketransit <- nngeo::st_remove_holes(iso_biketransit)

dir.create("tmp")
st_write(iso_bike, "tmp/lsoa_isochrones_15min_bike.geojson")
st_write(iso_walk, "tmp/lsoa_isochrones_15min_walk.geojson")
st_write(iso_transit, "tmp/lsoa_isochrones_15min_walktransit.geojson")
st_write(iso_biketransit, "tmp/lsoa_isochrones_15min_biketransit.geojson")

zip("data/bulk_export/PBCC_15min_isochrones.zip", 
    files = c("tmp/lsoa_isochrones_15min_bike.geojson",
              "tmp/lsoa_isochrones_15min_walk.geojson",
              "tmp/lsoa_isochrones_15min_walktransit.geojson",
              "tmp/lsoa_isochrones_15min_biketransit.geojson"), 
    include_directories = FALSE, 
    compression_level = 9.9,
    mode = "cherry-pick"
)
unlink("tmp", recursive = TRUE)

