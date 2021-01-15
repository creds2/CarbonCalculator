library(sf)
library(tmap)
library(dplyr)
library(tidyr)
tmap_mode("view")

dir.create("tmp")
unzip("../../saferactive/saferactive/data/bdline_gpkg_gb.zip",
      exdir = "tmp")

la_lower <- st_read("tmp/data/bdline_gb.gpkg", layer = "district_borough_unitary")
unlink("tmp", recursive = TRUE)


la_lower <- la_lower[,c("Name","Census_Code")]
la_lower <- la_lower[substr(la_lower$Census_Code,1,1) == "E",]
la_lower <- st_transform(la_lower, 4326)
st_write(la_lower, "data/bounds/la_bounds.geojson", delete_dsn = TRUE)

