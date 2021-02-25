# Centroids
library(sf)
library(tmap)
tmap_mode("view")

lsoa <- read_sf("D:/OneDrive - University of Leeds/Data/Cycling Big Data/LSOA/england_lsoa_2011_centroids_mod.shp")
qtm(lsoa)
lsoa <- st_transform(lsoa, 4326)
lsoa <- lsoa[,c("code")]

write_sf(lsoa, "data-prepared/lsoa_centroids.geojson")
