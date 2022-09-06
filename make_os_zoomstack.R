# read in layers

library(sf)

path = "D:/OneDrive - University of Leeds/Data/OS/ZoomStack/2022/OS_Open_Zoomstack/OS_Open_Zoomstack.gpkg"

name <- read_sf(path,layer = "names")
name <- name[!name$type %in% c("Sites","Greenspace","Motorway Junction",
                               "Woodland", "Small Settlements","Water"),]
name <- st_transform(name, 4326)
st_precision(name) <- 1000000 
write_sf(name, "data/zoomstackgeojson/names.geojson", delete_dsn = TRUE)

land <- read_sf(path,layer = "land")
land <- st_transform(land, 4326)
st_precision(land) <- 1000000 # About 3 cm precision
write_sf(land, "data/zoomstackgeojson/land.geojson", delete_dsn = TRUE)

greenspace <- read_sf(path,layer = "greenspace")
greenspace <- st_transform(greenspace, 4326)
st_precision(greenspace) <- 1000000
write_sf(greenspace, "data/zoomstackgeojson/greenspace.geojson", delete_dsn = TRUE)

airports <- read_sf(path,layer = "airports")
airports <- st_transform(airports, 4326)
st_precision(airports) <- 1000000
write_sf(airports, "data/zoomstackgeojson/airports.geojson", delete_dsn = TRUE)

boundaries <- read_sf(path,layer = "boundaries")
boundaries <- st_transform(boundaries, 4326)
st_precision(boundaries) <- 1000000
write_sf(boundaries, "data/zoomstackgeojson/boundaries.geojson", delete_dsn = TRUE)

# contours <- read_sf(path,
#                       layer = "contours")
# contours <- st_transform(contours, 4326)
# st_precision(contours) <- 1000000
# write_sf(contours, "data/zoomstackgeojson/contours.geojson", delete_dsn = TRUE)

district_buildings <- read_sf(path,layer = "district_buildings")
district_buildings <- st_transform(district_buildings, 4326)
st_precision(district_buildings) <- 1000000
write_sf(district_buildings, "data/zoomstackgeojson/district_buildings.geojson", delete_dsn = TRUE)

local_buildings <- read_sf(path,layer = "local_buildings")
local_buildings <- st_transform(local_buildings, 4326)
local_buildings$uuid <- NULL
st_precision(local_buildings) <- 1000000
write_sf(local_buildings, "data/zoomstackgeojson/local_buildings.geojson", delete_dsn = TRUE)

etl <- read_sf(path,layer = "etl")
etl <- st_transform(etl, 4326)
st_precision(etl) <- 1000000
write_sf(etl, "data/zoomstackgeojson/etl.geojson", delete_dsn = TRUE)

foreshore <- read_sf(path,layer = "foreshore")
foreshore <- st_transform(foreshore, 4326)
st_precision(foreshore) <- 1000000
write_sf(foreshore, "data/zoomstackgeojson/foreshore.geojson", delete_dsn = TRUE)

national_parks <- read_sf(path,layer = "national_parks")
national_parks <- st_transform(national_parks, 4326)
st_precision(national_parks) <- 1000000
write_sf(national_parks, "data/zoomstackgeojson/national_parks.geojson", delete_dsn = TRUE)

rail <- read_sf(path,layer = "rail")
rail <- st_transform(rail, 4326)
st_precision(rail) <- 1000000
write_sf(rail, "data/zoomstackgeojson/rail.geojson", delete_dsn = TRUE)

railway_stations <- read_sf(path,layer = "railway_stations")
railway_stations <- st_transform(railway_stations, 4326)
st_precision(railway_stations) <- 1000000
write_sf(railway_stations, "data/zoomstackgeojson/railway_stations.geojson", delete_dsn = TRUE)

roads_local <- read_sf(path,layer = "roads_local")
roads_local <- st_transform(roads_local, 4326)
st_precision(roads_local) <- 1000000
write_sf(roads_local, "data/zoomstackgeojson/roads_local.geojson", delete_dsn = TRUE)

roads_national <- read_sf(path,layer = "roads_national")
roads_national <- st_transform(roads_national, 4326)
st_precision(roads_national) <- 1000000
write_sf(roads_national, "data/zoomstackgeojson/roads_national.geojson", delete_dsn = TRUE)

roads_regional <- read_sf(path,layer = "roads_regional")
roads_regional <- st_transform(roads_regional, 4326)
st_precision(roads_regional) <- 1000000
write_sf(roads_regional, "data/zoomstackgeojson/roads_regional.geojson", delete_dsn = TRUE)

sites <- read_sf(path,layer = "sites")
sites <- st_transform(sites, 4326)
st_precision(sites) <- 1000000
write_sf(sites, "data/zoomstackgeojson/sites.geojson", delete_dsn = TRUE)

surfacewater <- read_sf(path,layer = "surfacewater")
surfacewater <- st_transform(surfacewater, 4326)
st_precision(surfacewater) <- 1000000
write_sf(surfacewater, "data/zoomstackgeojson/surfacewater.geojson", delete_dsn = TRUE)

urban_areas <- read_sf(path,layer = "urban_areas")
urban_areas <- st_transform(urban_areas, 4326)
st_precision(urban_areas) <- 1000000
write_sf(urban_areas, "data/zoomstackgeojson/urban_areas.geojson", delete_dsn = TRUE)

woodland <- read_sf(path,layer = "woodland")
woodland <- st_transform(woodland, 4326)
st_precision(woodland) <- 1000000
write_sf(woodland, "data/zoomstackgeojson/woodland.geojson", delete_dsn = TRUE)
