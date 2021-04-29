library(sf)

# Wards 

dir.create("tmp")
unzip("D:/OneDrive - University of Leeds/Data/Admin Boundaries/Wards_(December_2020)_UK_BFC_V2.zip",
      exdir = "tmp")
wards <- read_sf("tmp/Wards_(December_2020)_UK_BFC_V2.shp")
unlink("tmp", recursive = TRUE)

dir.create("tmp")
unzip("D:/OneDrive - University of Leeds/Data/Admin Boundaries/Parishes_(December_2019)_EW_BFC.zip",
      exdir = "tmp")
parish <- read_sf("tmp/Parishes_(December_2019)_EW_BFC.shp")
unlink("tmp", recursive = TRUE)

dir.create("tmp")
unzip("D:/OneDrive - University of Leeds/Data/Admin Boundaries/Westminster_Parliamentary_Constituencies_(December_2019)_Boundaries_UK_BFC.zip",
      exdir = "tmp")
constituencies <- read_sf("tmp/Westminster_Parliamentary_Constituencies_(December_2019)_Boundaries_UK_BFC.shp")
unlink("tmp", recursive = TRUE)


wards <- wards$geometry
parish <- parish$geometry
constituencies <- constituencies$geometry

wards <- st_transform(wards, 4326)
parish <- st_transform(parish, 4326)
constituencies <- st_transform(constituencies, 4326)

st_write(wards, "data/bounds/wards.geojson")
st_write(parish, "data/bounds/parish.geojson")
st_write(constituencies, "data/bounds/constituencies.geojson")
