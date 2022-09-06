# customise zoomstack
library(sf)
library(tmap)
tmap_mode("view")
sf_use_s2(FALSE)

# read in files

land <- geojsonsf::geojson_sf("data/zoomstackgeojson/land.geojson")

# Europe Boarders
if(FALSE){
  dir.create("tmp")
  unzip("data/europe bounds/countries_shp.zip", exdir = "tmp")
  bounds <- read_sf("tmp/countries.shp")
  unlink("tmp", recursive = TRUE)
  
  box = c(xmin = -13, ymin = 47, xmax = 10, ymax = 63)
  bounds <- st_crop(bounds, box)
  bounds_uk <- bounds[bounds$NAME == "United Kingdom",]
  bounds_eu <- bounds[bounds$NAME != "United Kingdom",]
  bounds_uk <- st_cast(bounds_uk, to = "POLYGON", do_split = TRUE, group_or_split = TRUE)
  bounds_uk$id <- 1:nrow(bounds_uk)
  bounds_uk <- bounds_uk[bounds_uk$id %in% c(246,251, 207:212),]
  bounds_uk$id <- NULL
  
  bounds_eu <- st_cast(bounds_eu$geometry, to = "MULTIPOLYGON", do_split = TRUE, group_or_split = TRUE)
  bounds_eu <- st_cast(bounds_eu, to = "POLYGON", do_split = TRUE, group_or_split = TRUE)
  
  bounds_eu <- c(bounds_eu, bounds_uk$geometry)
  bounds_eu <- st_union(bounds_eu)
  
  land <- st_transform(land, 27700)
  land <- st_buffer(st_combine(land), 0)
  land <- st_transform(land, 4326)
  land <- st_cast(land, to = "POLYGON", do_split = TRUE, group_or_split = TRUE)
  
  land_all <- c(land, bounds_eu)
  land_all <- st_combine(land_all)
  land_all <- st_make_valid(land_all)
  
  sea <- st_bbox(box)
  sea <- st_as_sfc(sea)
  st_crs(sea) <- 4326
  
  sea <- st_difference(sea, land_all)
  sea <- st_collection_extract(sea, "POLYGON")
  sea <- st_cast(sea, "POLYGON")
  sea <- st_sf(data.frame(geom = sea))
  sea$id <- 1:nrow(sea)
  sea$area <- as.numeric(st_area(sea))
  hist(sea$area)
  sea <- sea$geometry[sea$area == max(sea$area)]
  
  st_write(sea, "data/zoomstackgeojson/sea.geojson", delete_dsn = TRUE)
  st_write(land_all, "data/zoomstackgeojson/land_uk_eu.geojson", delete_dsn = TRUE)
} else{
  sea <- geojsonsf::geojson_sf("data/zoomstackgeojson/sea.geojson")
  land_all <- geojsonsf::geojson_sf("data/zoomstackgeojson/land_uk_eu.geojson")
}


# Make a close sea
land_simple <- st_transform(land, 27700)
land_simple <- st_simplify(land_simple, 1000, preserveTopology = TRUE)
land_buff <- st_buffer(land_simple, 30000, nQuadSegs = 1, endCapStyle = "SQUARE")
land_buff <- st_union(land_buff)
land_buff <- st_transform(land_buff, 4326)
sea_near <- st_difference(land_buff, land_all)
sea_near <- st_cast(sea_near, "POLYGON")

land_buff <- st_buffer(land_simple, 100000, nQuadSegs = 1, endCapStyle = "SQUARE")
land_buff <- st_union(land_buff)
land_buff <- st_transform(land_buff, 4326)
sea_medium <- st_difference(land_buff, land_all)
sea_medium <- st_cast(sea_medium, "POLYGON")

land_buff <- st_buffer(land_simple, 10000, nQuadSegs = 1, endCapStyle = "SQUARE")
land_buff <- st_union(land_buff)
land_buff <- st_transform(land_buff, 4326)
sea_verynear <- st_difference(land_buff, land_all)
sea_verynear <- st_cast(sea_verynear, "POLYGON")

#land_buff <- st_buffer(land_simple, 2000, nQuadSegs = 1, endCapStyle = "SQUARE")
#land_buff <- st_union(land_buff)
#land_buff <- st_transform(land_buff, 4326)
#sea_ultranear <- st_difference(land_buff, land_all)
#sea_ultranear <- st_cast(sea_verynear, "POLYGON")

sea_near <- sea_near[lengths(sea_near) != 1]
sea_medium <- sea_medium[lengths(sea_medium) != 1]
sea_verynear <- sea_verynear[lengths(sea_verynear) != 1]
#sea_ultranear <- sea_ultranear[lengths(sea_ultranear) != 1]

# plot(sea)
# plot(sea_medium, add = TRUE, border = 'red')
# plot(sea_near, add = TRUE, border = 'green')
# plot(sea_verynear, add = TRUE, border = 'blue')
# plot(sea_ultranear, add = TRUE, border = 'black')

# Other layers
name <- geojsonsf::geojson_sf("data/zoomstackgeojson/names.geojson")
greenspace <- geojsonsf::geojson_sf("data/zoomstackgeojson/greenspace.geojson")
airports <- read_sf("data/zoomstackgeojson/airports.geojson")
sites <- geojsonsf::geojson_sf("data/zoomstackgeojson/sites.geojson")
boundaries <- geojsonsf::geojson_sf("data/zoomstackgeojson/boundaries.geojson")
foreshore <- geojsonsf::geojson_sf("data/zoomstackgeojson/foreshore.geojson")
national_parks <- geojsonsf::geojson_sf("data/zoomstackgeojson/national_parks.geojson")
rail <- geojsonsf::geojson_sf("data/zoomstackgeojson/rail.geojson")
railway_stations <- geojsonsf::geojson_sf("data/zoomstackgeojson/railway_stations.geojson")
roads_local <- geojsonsf::geojson_sf("data/zoomstackgeojson/roads_local.geojson")
roads_national <- geojsonsf::geojson_sf("data/zoomstackgeojson/roads_national.geojson")
roads_regional <- geojsonsf::geojson_sf("data/zoomstackgeojson/roads_regional.geojson")
surfacewater <- geojsonsf::geojson_sf("data/zoomstackgeojson/surfacewater.geojson")
woodland <- geojsonsf::geojson_sf("data/zoomstackgeojson/woodland.geojson")
urban_areas <- geojsonsf::geojson_sf("data/zoomstackgeojson/urban_areas.geojson")
district_buildings <- geojsonsf::geojson_sf("data/zoomstackgeojson/district_buildings.geojson")
local_buildings <- geojsonsf::geojson_sf("data/zoomstackgeojson/local_buildings.geojson")

name <- name[,c("type","name1")]
names(name) <- c("type","name","geometry")
greenspace$area <- as.numeric(st_area(greenspace))
foreshore$area <- as.numeric(st_area(foreshore))
surfacewater$area <- as.numeric(st_area(surfacewater))
woodland$area <- as.numeric(st_area(woodland))

# Low Zoom
names_low <- name[name$type %in% c("Capital","City","Country","Town"),]
greenspace_low <- greenspace[greenspace$area > 100000,]
foreshore_low <- foreshore[foreshore$area > 100000,]
surfacewater_low <- surfacewater[surfacewater$area > 1000000,]
woodland_low <- woodland[woodland$area > 1000000,]

greenspace_low$area <- NULL
foreshore_low$area <- NULL
surfacewater_low$area <- NULL
woodland_low$area <- NULL

# Med zoom
names_med <- name[name$type %in% c("Capital","City","Country","National Park","Town","Suburban Area"),]
greenspace_med <- greenspace[greenspace$area > 10000,]
foreshore_med <- foreshore[foreshore$area > 10000,]
surfacewater_med <- surfacewater[surfacewater$area > 10000,]
woodland_med <- woodland[woodland$area > 10000,]

greenspace_med$area <- NULL
foreshore_med$area <- NULL
surfacewater_med$area <- NULL
woodland_med$area <- NULL

greenspace$area <- NULL
foreshore$area <- NULL
surfacewater$area <- NULL
woodland$area <- NULL
urban_areas$area <- NULL

# Bind Roads
roads_regional <- rbind(roads_national, roads_regional)
roads_local <- rbind(roads_regional, roads_local)

# Low Zoom 0 - 8
write_sf(names_low, "C:/tiles/oszoom/low/names.geojson", delete_dsn = TRUE)
write_sf(greenspace_low, "C:/tiles/oszoom/low/greenspace.geojson", delete_dsn = TRUE)
write_sf(boundaries, "C:/tiles/oszoom/low/boundaries.geojson", delete_dsn = TRUE)
write_sf(foreshore_low, "C:/tiles/oszoom/low/foreshore.geojson", delete_dsn = TRUE)
write_sf(national_parks, "C:/tiles/oszoom/low/national_parks.geojson", delete_dsn = TRUE)
write_sf(roads_national, "C:/tiles/oszoom/low/roads.geojson", delete_dsn = TRUE)
write_sf(surfacewater_low, "C:/tiles/oszoom/low/surfacewater.geojson", delete_dsn = TRUE)
write_sf(woodland_low, "C:/tiles/oszoom/low/woodland.geojson", delete_dsn = TRUE)
write_sf(urban_areas, "C:/tiles/oszoom/low/urban_areas.geojson", delete_dsn = TRUE)
write_sf(sea, "C:/tiles/oszoom/low/sea.geojson", delete_dsn = TRUE)

#Med Zoom 9 - 11
write_sf(names_med, "C:/tiles/oszoom/med/names.geojson", delete_dsn = TRUE)
write_sf(greenspace_med, "C:/tiles/oszoom/med/greenspace.geojson", delete_dsn = TRUE)
write_sf(boundaries, "C:/tiles/oszoom/med/boundaries.geojson", delete_dsn = TRUE)
write_sf(foreshore_med, "C:/tiles/oszoom/med/foreshore.geojson", delete_dsn = TRUE)
write_sf(national_parks, "C:/tiles/oszoom/med/national_parks.geojson", delete_dsn = TRUE)
write_sf(rail, "C:/tiles/oszoom/high/rail.geojson", delete_dsn = TRUE)
write_sf(roads_regional, "C:/tiles/oszoom/med/roads.geojson", delete_dsn = TRUE)
write_sf(surfacewater_med, "C:/tiles/oszoom/med/surfacewater.geojson", delete_dsn = TRUE)
write_sf(woodland_med, "C:/tiles/oszoom/med/woodland.geojson", delete_dsn = TRUE)
write_sf(urban_areas, "C:/tiles/oszoom/med/urban_areas.geojson", delete_dsn = TRUE)
write_sf(airports, "C:/tiles/oszoom/med/airports.geojson", delete_dsn = TRUE)
write_sf(sea_medium, "C:/tiles/oszoom/med/sea.geojson", delete_dsn = TRUE)

#high Zoom 12
write_sf(name, "C:/tiles/oszoom/high/names.geojson", delete_dsn = TRUE)
write_sf(greenspace, "C:/tiles/oszoom/high/greenspace.geojson", delete_dsn = TRUE)
write_sf(boundaries, "C:/tiles/oszoom/high/boundaries.geojson", delete_dsn = TRUE)
write_sf(foreshore, "C:/tiles/oszoom/high/foreshore.geojson", delete_dsn = TRUE)
write_sf(rail, "C:/tiles/oszoom/high/rail.geojson", delete_dsn = TRUE)
write_sf(railway_stations, "C:/tiles/oszoom/high/railway_stations.geojson", delete_dsn = TRUE)
write_sf(roads_local, "C:/tiles/oszoom/high/roads.geojson", delete_dsn = TRUE)
write_sf(surfacewater, "C:/tiles/oszoom/high/surfacewater.geojson", delete_dsn = TRUE)
write_sf(woodland, "C:/tiles/oszoom/high/woodland.geojson", delete_dsn = TRUE)
write_sf(urban_areas, "C:/tiles/oszoom/high/urban_areas.geojson", delete_dsn = TRUE)
write_sf(sites, "C:/tiles/oszoom/high/sites.geojson", delete_dsn = TRUE)
write_sf(airports, "C:/tiles/oszoom/high/airports.geojson", delete_dsn = TRUE)
write_sf(sea_near, "C:/tiles/oszoom/high/sea.geojson", delete_dsn = TRUE)

#veryhigh Zoom 13
write_sf(name, "C:/tiles/oszoom/veryhigh/names.geojson", delete_dsn = TRUE)
write_sf(greenspace, "C:/tiles/oszoom/veryhigh/greenspace.geojson", delete_dsn = TRUE)
write_sf(boundaries, "C:/tiles/oszoom/veryhigh/boundaries.geojson", delete_dsn = TRUE)
write_sf(foreshore, "C:/tiles/oszoom/veryhigh/foreshore.geojson", delete_dsn = TRUE)
write_sf(rail, "C:/tiles/oszoom/veryhigh/rail.geojson", delete_dsn = TRUE)
write_sf(railway_stations, "C:/tiles/oszoom/veryhigh/railway_stations.geojson", delete_dsn = TRUE)
write_sf(roads_local, "C:/tiles/oszoom/veryhigh/roads.geojson", delete_dsn = TRUE)
write_sf(surfacewater, "C:/tiles/oszoom/veryhigh/surfacewater.geojson", delete_dsn = TRUE)
write_sf(woodland, "C:/tiles/oszoom/veryhigh/woodland.geojson", delete_dsn = TRUE)
write_sf(sites, "C:/tiles/oszoom/veryhigh/sites.geojson", delete_dsn = TRUE)
write_sf(airports, "C:/tiles/oszoom/veryhigh/airports.geojson", delete_dsn = TRUE)
write_sf(sea_verynear, "C:/tiles/oszoom/veryhigh/sea.geojson", delete_dsn = TRUE)
write_sf(district_buildings, "C:/tiles/oszoom/veryhigh/buildings.geojson", delete_dsn = TRUE)

#ultrahigh Zoom 14
write_sf(name, "C:/tiles/oszoom/ultrahigh/names.geojson", delete_dsn = TRUE)
write_sf(greenspace, "C:/tiles/oszoom/ultrahigh/greenspace.geojson", delete_dsn = TRUE)
write_sf(boundaries, "C:/tiles/oszoom/ultrahigh/boundaries.geojson", delete_dsn = TRUE)
write_sf(foreshore, "C:/tiles/oszoom/ultrahigh/foreshore.geojson", delete_dsn = TRUE)
write_sf(rail, "C:/tiles/oszoom/ultrahigh/rail.geojson", delete_dsn = TRUE)
write_sf(railway_stations, "C:/tiles/oszoom/ultrahigh/railway_stations.geojson", delete_dsn = TRUE)
write_sf(roads_local, "C:/tiles/oszoom/ultrahigh/roads.geojson", delete_dsn = TRUE)
write_sf(surfacewater, "C:/tiles/oszoom/ultrahigh/surfacewater.geojson", delete_dsn = TRUE)
write_sf(woodland, "C:/tiles/oszoom/ultrahigh/woodland.geojson", delete_dsn = TRUE)
write_sf(sites, "C:/tiles/oszoom/ultrahigh/sites.geojson", delete_dsn = TRUE)
write_sf(airports, "C:/tiles/oszoom/ultrahigh/airports.geojson", delete_dsn = TRUE)
write_sf(sea_verynear, "C:/tiles/oszoom/ultrahigh/sea.geojson", delete_dsn = TRUE)
write_sf(local_buildings, "C:/tiles/oszoom/ultrahigh/buildings.geojson", delete_dsn = TRUE)

