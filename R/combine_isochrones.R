library(sf)
library(tmap)
library(dplyr)
tmap_mode("view")

iso_bike <- readRDS("data-prepared/isochones_bike.Rds")
iso_walk <- readRDS("data-prepared/isochones_walk.Rds")
iso_transit <- readRDS("data-prepared/isochones_transit.Rds")
iso_biketransit <- readRDS("data-prepared/isochones_biketransit.Rds")

iso_bike$mode <- "BIKE"
iso_walk$mode <- "WALK"
iso_transit$mode <- "TRANSIT"
iso_biketransit$mode <- "BIKETRANSIT"

iso_bike <- iso_bike[,c("fromPlace","mode")]
iso_walk <- iso_walk[,c("fromPlace","mode")]
iso_transit <- iso_transit[,c("fromPlace","mode")]
iso_biketransit <- iso_biketransit[,c("fromPlace","mode")]

iso_all <- bind_rows(list(iso_biketransit, iso_bike, iso_transit, iso_walk))

iso_all <- iso_all %>%
  group_by(fromPlace) %>%
  group_split()

for(i in 1:length(iso_all)){
  sub <- iso_all[[i]]
  sub <- nngeo::st_remove_holes(sub)
  st_write(sub, 
           paste0("www/data/isochrones/",sub$fromPlace[1],".geojson"),
           quiet = TRUE,
           delete_dsn = TRUE)
  if(i %% 100 == 0){
    message(Sys.time()," ",i)
  }
}

miss_bike <- lsoa$code[!lsoa$code %in% iso_bike$fromPlace] 
miss_bike <- lsoa[lsoa$code %in% miss_bike,]

foo <- st_drop_geometry(iso_biketransit)
foo <- foo[order(foo$area, decreasing = TRUE),]

tm_shape(nngeo::st_remove_holes(sub)) +
  tm_borders()
