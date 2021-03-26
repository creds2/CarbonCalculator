# customise zoomstack
library(sf)
library(tmap)
tmap_mode("view")

# read in files

land <- read_sf("data/zoomstackgeojson/land.geojson")
names <- read_sf("data/zoomstackgeojson/names.geojson")
greenspace <- read_sf("data/zoomstackgeojson/greenspace.geojson")
airports <- read_sf("data/zoomstackgeojson/airports.geojson")
boundaries <- read_sf("data/zoomstackgeojson/boundaries.geojson")
foreshore <- read_sf("data/zoomstackgeojson/foreshore.geojson")
national_parks <- read_sf("data/zoomstackgeojson/national_parks.geojson")
rail <- read_sf("data/zoomstackgeojson/rail.geojson")
railway_stations <- read_sf("data/zoomstackgeojson/railway_stations.geojson")
roads_local <- read_sf("data/zoomstackgeojson/roads_local.geojson")
roads_national <- read_sf("data/zoomstackgeojson/roads_national.geojson")
roads_regional <- read_sf("data/zoomstackgeojson/roads_regional.geojson")
surfacewater <- read_sf("data/zoomstackgeojson/surfacewater.geojson")
woodland <- read_sf("data/zoomstackgeojson/woodland.geojson")
urban_areas <- read_sf("data/zoomstackgeojson/urban_areas.geojson")

# Europe Boarders
dir.create("tmp")
unzip("data/europe bounds/countries_shp.zip", exdir = "tmp")
bounds <- read_sf("tmp/countries.shp")
unlink("tmp", recursive = TRUE)

box = c(xmin = -13, ymin = 47, xmax = 10, ymax = 63)
bounds <- st_crop(bounds, box)
bounds <- bounds[,c("OBJECTID")]
bounds <- st_cast(bounds$geometry, "POLYGON")
st_write(bounds, "data/zoomstackgeojson/europe.geojson")



greenspace$area <- as.numeric(st_area(greenspace))
foreshore$area <- as.numeric(st_area(foreshore))
surfacewater$area <- as.numeric(st_area(surfacewater))
woodland$area <- as.numeric(st_area(woodland))
urban_areas$area <- as.numeric(st_area(urban_areas))


# Low Zoom
names_low <- names[names$type %in% c("Capital","City","Country","National Park"),]
greenspace_low <- greenspace[greenspace$area > 100000,]
foreshore_low <- foreshore[foreshore$area > 100000,]
surfacewater_low <- surfacewater[surfacewater$area > 1000000,]
woodland_low <- woodland[woodland$area > 1000000,]
urban_areas_low <- urban_areas[urban_areas$area > 100000,]

greenspace_low$area <- NULL
foreshore_low$area <- NULL
surfacewater_low$area <- NULL
woodland_low$area <- NULL
urban_areas_low$area <- NULL

# Med zoom
names_med <- names[names$type %in% c("Capital","City","Country","National Park","Town","Suburban Area"),]
greenspace_med <- greenspace[greenspace$area > 10000,]
foreshore_med <- foreshore[foreshore$area > 10000,]
surfacewater_med <- surfacewater[surfacewater$area > 10000,]
woodland_med <- woodland[woodland$area > 10000,]
urban_areas_med <- urban_areas[urban_areas$area > 10000,]

greenspace_med$area <- NULL
foreshore_med$area <- NULL
surfacewater_med$area <- NULL
woodland_med$area <- NULL
urban_areas_med$area <- NULL

greenspace$area <- NULL
foreshore$area <- NULL
surfacewater$area <- NULL
woodland$area <- NULL
urban_areas$area <- NULL

# Bind Roads
roads_regional <- rbind(roads_national, roads_regional)
roads_local <- rbind(roads_regional, roads_local)

# Low Zoom
write_sf(land, "data/zoomstackgeojson/low/land.geojson", delete_dsn = TRUE)
write_sf(names_low, "data/zoomstackgeojson/low/names.geojson", delete_dsn = TRUE)
write_sf(greenspace_low, "data/zoomstackgeojson/low/greenspace.geojson", delete_dsn = TRUE)
write_sf(boundaries, "data/zoomstackgeojson/low/boundaries.geojson", delete_dsn = TRUE)
write_sf(foreshore_low, "data/zoomstackgeojson/low/foreshore.geojson", delete_dsn = TRUE)
write_sf(national_parks, "data/zoomstackgeojson/low/national_parks.geojson", delete_dsn = TRUE)
write_sf(rail[1,], "data/zoomstackgeojson/low/rail.geojson", delete_dsn = TRUE)
write_sf(railway_stations[1,], "data/zoomstackgeojson/low/railway_stations.geojson", delete_dsn = TRUE)
write_sf(roads_national, "data/zoomstackgeojson/low/roads.geojson", delete_dsn = TRUE)
write_sf(surfacewater_low, "data/zoomstackgeojson/low/surfacewater.geojson", delete_dsn = TRUE)
write_sf(woodland_low, "data/zoomstackgeojson/low/woodland.geojson", delete_dsn = TRUE)
write_sf(urban_areas_low, "data/zoomstackgeojson/low/urban_areas.geojson", delete_dsn = TRUE)

#Med Zoom
write_sf(land, "data/zoomstackgeojson/med/land.geojson", delete_dsn = TRUE)
write_sf(names_med, "data/zoomstackgeojson/med/names.geojson", delete_dsn = TRUE)
write_sf(greenspace_med, "data/zoomstackgeojson/med/greenspace.geojson", delete_dsn = TRUE)
write_sf(boundaries, "data/zoomstackgeojson/med/boundaries.geojson", delete_dsn = TRUE)
write_sf(foreshore_med, "data/zoomstackgeojson/med/foreshore.geojson", delete_dsn = TRUE)
write_sf(national_parks, "data/zoomstackgeojson/med/national_parks.geojson", delete_dsn = TRUE)
write_sf(rail, "data/zoomstackgeojson/med/rail.geojson", delete_dsn = TRUE)
write_sf(railway_stations[1,], "data/zoomstackgeojson/med/railway_stations.geojson", delete_dsn = TRUE)
write_sf(roads_regional, "data/zoomstackgeojson/med/roads.geojson", delete_dsn = TRUE)
write_sf(surfacewater_med, "data/zoomstackgeojson/med/surfacewater.geojson", delete_dsn = TRUE)
write_sf(woodland_med, "data/zoomstackgeojson/med/woodland.geojson", delete_dsn = TRUE)
write_sf(urban_areas_med, "data/zoomstackgeojson/med/urban_areas.geojson", delete_dsn = TRUE)

#high Zoom
write_sf(land, "data/zoomstackgeojson/high/land.geojson", delete_dsn = TRUE)
write_sf(names, "data/zoomstackgeojson/high/names.geojson", delete_dsn = TRUE)
write_sf(greenspace, "data/zoomstackgeojson/high/greenspace.geojson", delete_dsn = TRUE)
write_sf(boundaries, "data/zoomstackgeojson/high/boundaries.geojson", delete_dsn = TRUE)
write_sf(foreshore, "data/zoomstackgeojson/high/foreshore.geojson", delete_dsn = TRUE)
write_sf(national_parks, "data/zoomstackgeojson/high/national_parks.geojson", delete_dsn = TRUE)
write_sf(rail, "data/zoomstackgeojson/high/rail.geojson", delete_dsn = TRUE)
write_sf(railway_stations, "data/zoomstackgeojson/high/railway_stations.geojson", delete_dsn = TRUE)
write_sf(roads_local, "data/zoomstackgeojson/high/roads.geojson", delete_dsn = TRUE)
write_sf(surfacewater, "data/zoomstackgeojson/high/surfacewater.geojson", delete_dsn = TRUE)
write_sf(woodland, "data/zoomstackgeojson/high/woodland.geojson", delete_dsn = TRUE)
write_sf(urban_areas, "data/zoomstackgeojson/high/urban_areas.geojson", delete_dsn = TRUE)
