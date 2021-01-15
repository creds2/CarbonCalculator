source("R/secure_path.R")

library(sf)
library(dplyr)
library(tmap)
tmap_mode("view")

files <- list.files("D:/OneDrive/Data/Code Point Polygons/codepoint-poly_183052", recursive = TRUE, pattern = ".shp", full.names = TRUE)
postcode_areas <- list()

for(i in 1:length(files)){
  file <- files[i]
  message(i," of ",length(files))
  poly <- read_sf(file)
  poly <- poly %>%
    group_by(PC_AREA) %>%
    summarise()
  postcode_areas[[i]] <- poly
}

postcode_areas <- bind_rows(postcode_areas)
saveRDS(postcode_areas,"data/bounds/postcode_areas.Rds")
# postcodes <- readRDS(paste0(substr(secure_path,1,39),"Postcodes/code_point_open.Rds"))
# 
# postcodes$postcode_start <- substr(postcodes$postcode,1,2)
# postcodes$postcode_start <- gsub("[0-9]","",postcodes$postcode_start)
# 
# postcodes <- cbind(postcodes, as.data.frame(st_coordinates(postcodes)))
# postcodes <- postcodes[postcodes$X != 0,]
# 
# postcodes_dud <- c("WV992ND","WV991TW","WV981ZT","WV981ZZ","WV981TE","NW9 9LY","NW100HQ","NW100RP","UB6 0HU",
#                    "NW8 9ZQ","WC2B4RD","SW1A1AG")
# 
# postcodes_areas <- postcodes %>%
#   group_by(postcode_start) %>%
#   summarise()
#   
# 
# 
# postcodes_areas_poly <- lapply(postcodes_areas$geometry, function(x){
#   y <- st_sf(data.frame(id = 1, 
#                         geometry = st_as_sfc(list(x))),
#              crs = 27700)
#   concaveman::concaveman(y)
#   })
# 
# postcodes_areas_poly <- bind_rows(postcodes_areas_poly)
# 
# postcodes_areas$geometry <- postcodes_areas_poly$polygons

dir.create("tmp")
unzip("data/bounds/England_lsoa_2011_centroids.zip", exdir = "tmp")
cents <- read_sf("tmp/england_lsoa_2011_centroids.shp")
unlink("tmp", recursive = TRUE)

foo <- st_join(postcodes, postcodes_areas)
bar <- foo[duplicated(foo$postcode),]
fizz <- bar[postcodes_areas, op = st_touches]


qtm(postcodes_areas, fill = NULL) + qtm(fizz)

# mot2012 <- readRDS(paste0(secure_path,"/MOT anoymised/clean/test_result_2012.Rds"))
# mot2012