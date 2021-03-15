# read in layers
library(sf)

land <- read_sf("D:/OneDrive - University of Leeds/Data/OS/ZoomStack/OSOpen_ZoomStack_GPKG/OSOpen_ZoomStack_v0_3.gpkg",
                layer = "land")
land <- st_transform(land, 4326)
write_sf(land, "data/zoomstackgeojson/land.geojson", delete_dsn = TRUE)

name <- read_sf("D:/OneDrive - University of Leeds/Data/OS/ZoomStack/OSOpen_ZoomStack_GPKG/OSOpen_ZoomStack_v0_3.gpkg",
                layer = "names")
name <- name[!name$type %in% c("Sites","Greenspace","Motorway Junction",
                               "Woodland", "Small Settlements","Water"),]
name <- st_transform(name, 4326)
write_sf(name, "data/zoomstackgeojson/names.geojson", delete_dsn = TRUE)

greenspace <- read_sf("D:/OneDrive - University of Leeds/Data/OS/ZoomStack/OSOpen_ZoomStack_GPKG/OSOpen_ZoomStack_v0_3.gpkg",
                layer = "greenspace")
greenspace <- st_transform(greenspace, 4326)
write_sf(greenspace, "data/zoomstackgeojson/greenspace.geojson", delete_dsn = TRUE)

airports <- read_sf("D:/OneDrive - University of Leeds/Data/OS/ZoomStack/OSOpen_ZoomStack_GPKG/OSOpen_ZoomStack_v0_3.gpkg",
                      layer = "airports")
airports <- st_transform(airports, 4326)
write_sf(airports, "data/zoomstackgeojson/airports.geojson", delete_dsn = TRUE)

boundaries <- read_sf("D:/OneDrive - University of Leeds/Data/OS/ZoomStack/OSOpen_ZoomStack_GPKG/OSOpen_ZoomStack_v0_3.gpkg",
                    layer = "boundaries")
boundaries <- st_transform(boundaries, 4326)
write_sf(boundaries, "data/zoomstackgeojson/boundaries.geojson", delete_dsn = TRUE)

contours <- read_sf("D:/OneDrive - University of Leeds/Data/OS/ZoomStack/OSOpen_ZoomStack_GPKG/OSOpen_ZoomStack_v0_3.gpkg",
                      layer = "contours")
contours <- st_transform(contours, 4326)
write_sf(contours, "data/zoomstackgeojson/contours.geojson", delete_dsn = TRUE)

district_buildings <- read_sf("D:/OneDrive - University of Leeds/Data/OS/ZoomStack/OSOpen_ZoomStack_GPKG/OSOpen_ZoomStack_v0_3.gpkg",
                    layer = "district_buildings")
district_buildings <- st_transform(district_buildings, 4326)
write_sf(district_buildings, "data/zoomstackgeojson/district_buildings.geojson", delete_dsn = TRUE)

# etl <- read_sf("D:/OneDrive - University of Leeds/Data/OS/ZoomStack/OSOpen_ZoomStack_GPKG/OSOpen_ZoomStack_v0_3.gpkg",
#                               layer = "etl")
# etl <- st_transform(etl, 4326)
# write_sf(etl, "data/zoomstackgeojson/etl.geojson", delete_dsn = TRUE)


foreshore <- read_sf("D:/OneDrive - University of Leeds/Data/OS/ZoomStack/OSOpen_ZoomStack_GPKG/OSOpen_ZoomStack_v0_3.gpkg",
               layer = "foreshore")
foreshore <- st_transform(foreshore, 4326)
write_sf(foreshore, "data/zoomstackgeojson/foreshore.geojson", delete_dsn = TRUE)

national_parks <- read_sf("D:/OneDrive - University of Leeds/Data/OS/ZoomStack/OSOpen_ZoomStack_GPKG/OSOpen_ZoomStack_v0_3.gpkg",
                     layer = "national_parks")
national_parks <- st_transform(national_parks, 4326)
write_sf(national_parks, "data/zoomstackgeojson/national_parks.geojson", delete_dsn = TRUE)

rail <- read_sf("D:/OneDrive - University of Leeds/Data/OS/ZoomStack/OSOpen_ZoomStack_GPKG/OSOpen_ZoomStack_v0_3.gpkg",
                          layer = "rail")
rail <- st_transform(rail, 4326)
write_sf(rail, "data/zoomstackgeojson/rail.geojson", delete_dsn = TRUE)

railway_stations <- read_sf("D:/OneDrive - University of Leeds/Data/OS/ZoomStack/OSOpen_ZoomStack_GPKG/OSOpen_ZoomStack_v0_3.gpkg",
                layer = "railway_stations")
railway_stations <- st_transform(railway_stations, 4326)
write_sf(railway_stations, "data/zoomstackgeojson/railway_stations.geojson", delete_dsn = TRUE)

roads_local <- read_sf("D:/OneDrive - University of Leeds/Data/OS/ZoomStack/OSOpen_ZoomStack_GPKG/OSOpen_ZoomStack_v0_3.gpkg",
                            layer = "roads_local")
roads_local <- st_transform(roads_local, 4326)
write_sf(roads_local, "data/zoomstackgeojson/roads_local.geojson", delete_dsn = TRUE)


roads_national <- read_sf("D:/OneDrive - University of Leeds/Data/OS/ZoomStack/OSOpen_ZoomStack_GPKG/OSOpen_ZoomStack_v0_3.gpkg",
                       layer = "roads_national")
roads_national <- st_transform(roads_national, 4326)
write_sf(roads_national, "data/zoomstackgeojson/roads_national.geojson", delete_dsn = TRUE)

roads_regional <- read_sf("D:/OneDrive - University of Leeds/Data/OS/ZoomStack/OSOpen_ZoomStack_GPKG/OSOpen_ZoomStack_v0_3.gpkg",
                          layer = "roads_regional")
roads_regional <- st_transform(roads_regional, 4326)
write_sf(roads_regional, "data/zoomstackgeojson/roads_regional.geojson", delete_dsn = TRUE)

sites <- read_sf("D:/OneDrive - University of Leeds/Data/OS/ZoomStack/OSOpen_ZoomStack_GPKG/OSOpen_ZoomStack_v0_3.gpkg",
                          layer = "sites")
sites <- st_transform(sites, 4326)
write_sf(sites, "data/zoomstackgeojson/sites.geojson", delete_dsn = TRUE)

surfacewater <- read_sf("D:/OneDrive - University of Leeds/Data/OS/ZoomStack/OSOpen_ZoomStack_GPKG/OSOpen_ZoomStack_v0_3.gpkg",
                 layer = "surfacewater")
surfacewater <- st_transform(surfacewater, 4326)
write_sf(surfacewater, "data/zoomstackgeojson/surfacewater.geojson", delete_dsn = TRUE)

urban_areas <- read_sf("D:/OneDrive - University of Leeds/Data/OS/ZoomStack/OSOpen_ZoomStack_GPKG/OSOpen_ZoomStack_v0_3.gpkg",
                        layer = "urban_areas")
urban_areas <- st_transform(urban_areas, 4326)
write_sf(urban_areas, "data/zoomstackgeojson/urban_areas.geojson", delete_dsn = TRUE)

woodland <- read_sf("D:/OneDrive - University of Leeds/Data/OS/ZoomStack/OSOpen_ZoomStack_GPKG/OSOpen_ZoomStack_v0_3.gpkg",
                       layer = "woodland")
woodland <- st_transform(woodland, 4326)
write_sf(woodland, "data/zoomstackgeojson/woodland.geojson", delete_dsn = TRUE)
