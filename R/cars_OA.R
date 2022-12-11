
# prep OAs
library(sf)
library(dplyr)

dir.create("tmp")

unzip("D:/OneDrive - University of Leeds/Data/OA Bounadries/GB_OA_2011_clipped.zip",
      exdir = "tmp")

oa <- read_sf("tmp/infuse_oa_lyr_2011_clipped.shp")
unlink("tmp", recursive = T)

dir.create("tmp")

unzip("D:/OneDrive - University of Leeds/Data/CARS/F0020605 data and docs [20221204].zip",
      exdir = "tmp")

cars <- readxl::read_excel("tmp/Data/221201 - FOI OA breakdown UNSUPPRESSED F0020605.xlsx")
names(cars) <- c("geo_code","cars","motorcycles","other")

oa2 <- left_join(oa, cars, by = "geo_code")

oa2 <- st_make_valid(oa2)
oa2 <- st_transform(oa2, 4326)
summary(st_is_valid(oa2))

st_precision(oa2) <- 1000000
oa2$cars <- as.numeric(oa2$cars)
oa2$motorcycles <- as.numeric(oa2$motorcycles)
oa2$other <- as.numeric(oa2$other)

st_write(oa2, "data/tiles/cars_oa.geojson", delete_dsn = TRUE)

summary(st_geometry_type(oa2))
