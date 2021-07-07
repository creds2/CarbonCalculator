mot_2011 <- readRDS("data-prepared/car_van_km_09_11.Rds")
mot_postcode <- read.csv("../CarbonCalculator/data/postocde_driving_summary.csv")
mot_postcode$X <- NULL
mot_postcode <- mot_postcode[!is.na(mot_postcode$postcodearea),]

# Total scaling fo account for difference between datasets
sum(mot_postcode$X2011) / sum(mot_2011$car_km_11) # 1.556568

mot_postcode$baseline <- mot_postcode$X2011
mot_postcode[2:14] <- lapply(mot_postcode[2:14], function(x){
  x <- x/mot_postcode$baseline * 1.556568
  x
})
#mot_postcode_baseline <- as.data.frame(mot_postcode_baseline)
#names(mot_postcode_baseline) <- paste0("base_",names(mot_postcode_baseline))
#mot_postcode <- cbind(mot_postcode, mot_postcode_baseline)

# LSOA data is fluctuating from 2009 to 2011
# 1.0448, 1.02517, 1 (mean)
# Postcode data is increasing
# 1.0757, 1.120, 1.155 (mean)
summary(mot_2011$vans_total_09 / mot_2011$vans_total_11)
summary(mot_postcode$X2009)
summary(mot_2011$vans_total_10 / mot_2011$vans_total_11)
summary(mot_postcode$X2010)

# Make Postcode Area Boundaries
# dir.create("tmp")
# unzip("D:/OneDrive/Data/Code Point Polygons/Download_CodePointPolygons_1665983.zip",
#       exdir = "tmp")
library(sf)
library(dplyr)

# files <- list.files("tmp", recursive = TRUE, pattern = ".zip", full.names = TRUE)
# postcode_areas <- list()
# 
# for(i in 1:length(files)){
#   file <- files[i]
#   message(i," of ",length(files))
#   dir.create("tmp2")
#   unzip(file, exdir = "tmp2")
#   file <- list.files("tmp2", pattern = ".shp", full.names = TRUE)
#   poly <- read_sf(file)
#   unlink("tmp2", recursive = TRUE)
#   poly <- poly %>%
#     group_by(PC_AREA) %>%
#     summarise()
#   postcode_areas[[i]] <- poly
# }
# unlink("tmp", recursive = TRUE)
# postcode_shapes <- bind_rows(postcode_areas)

library(tmap)
tmap_mode("view")

# qtm(st_simplify(postcode_shapes, 100, preserveTopology = TRUE))
# saveRDS(postcode_shapes,"data/bounds/postcode_areas.Rds")

postcode_shapes <- readRDS("data/bounds/postcode_areas.Rds")

dir.create("tmp")
unzip("D:/OneDrive - University of Leeds/Data/OA Bounadries/EW_LSOA_2011_Centroids.zip",
      exdir = "tmp")
cents <- read_sf("tmp/Lower_Layer_Super_Output_Areas__December_2011__Population_Weighted_Centroids.shp")
unlink("tmp", recursive = TRUE)

nrow(cents)
cents <- st_join(cents, postcode_shapes)
nrow(cents)

cents <- st_drop_geometry(cents)
cents <- cents[,c("lsoa11cd","PC_AREA")]

mot_2011 <- left_join(mot_2011, cents, by = c("LSOA11" = "lsoa11cd"))
summary(is.na(mot_2011$PC_AREA))

mot_postcode <- mot_postcode[,c("postcodearea","X2009","X2010","X2011","X2012","X2013","X2014","X2015","X2016","X2017","X2018")]

mot_2011 <- left_join(mot_2011, mot_postcode, by = c("PC_AREA" = "postcodearea"))

mot_2011$X2009[is.na(mot_2011$X2009)] <- 1
mot_2011$X2010[is.na(mot_2011$X2010)] <- 1
mot_2011$X2011[is.na(mot_2011$X2011)] <- 1
mot_2011$X2012[is.na(mot_2011$X2012)] <- 1
mot_2011$X2013[is.na(mot_2011$X2013)] <- 1
mot_2011$X2014[is.na(mot_2011$X2014)] <- 1
mot_2011$X2015[is.na(mot_2011$X2015)] <- 1
mot_2011$X2016[is.na(mot_2011$X2016)] <- 1
mot_2011$X2017[is.na(mot_2011$X2017)] <- 1
mot_2011$X2018[is.na(mot_2011$X2018)] <- 1

mot_2011$car_km_11_orig <- mot_2011$car_km_11
mot_2011$van_km_11_orig <- mot_2011$van_km_11

mot_2011$car_km_09 <- mot_2011$car_km_11_orig * mot_2011$X2009
mot_2011$car_km_10 <- mot_2011$car_km_11_orig * mot_2011$X2010
mot_2011$car_km_11 <- mot_2011$car_km_11_orig * mot_2011$X2011
mot_2011$car_km_12 <- mot_2011$car_km_11_orig * mot_2011$X2012
mot_2011$car_km_13 <- mot_2011$car_km_11_orig * mot_2011$X2013
mot_2011$car_km_14 <- mot_2011$car_km_11_orig * mot_2011$X2014
mot_2011$car_km_15 <- mot_2011$car_km_11_orig * mot_2011$X2015
mot_2011$car_km_16 <- mot_2011$car_km_11_orig * mot_2011$X2016
mot_2011$car_km_17 <- mot_2011$car_km_11_orig * mot_2011$X2017
mot_2011$car_km_18 <- mot_2011$car_km_11_orig * mot_2011$X2018

mot_2011$van_km_09 <- mot_2011$van_km_11_orig * mot_2011$X2009
mot_2011$van_km_10 <- mot_2011$van_km_11_orig * mot_2011$X2010
mot_2011$van_km_11 <- mot_2011$van_km_11_orig * mot_2011$X2011
mot_2011$van_km_12 <- mot_2011$van_km_11_orig * mot_2011$X2012
mot_2011$van_km_13 <- mot_2011$van_km_11_orig * mot_2011$X2013
mot_2011$van_km_14 <- mot_2011$van_km_11_orig * mot_2011$X2014
mot_2011$van_km_15 <- mot_2011$van_km_11_orig * mot_2011$X2015
mot_2011$van_km_16 <- mot_2011$van_km_11_orig * mot_2011$X2016
mot_2011$van_km_17 <- mot_2011$van_km_11_orig * mot_2011$X2017
mot_2011$van_km_18 <- mot_2011$van_km_11_orig * mot_2011$X2018

names(mot_2011)

mot_2011 <- mot_2011[,!grepl("X",names(mot_2011))]
mot_2011 <- mot_2011[,c("LSOA11","vans_total_09","vans_total_10","vans_total_11",
                        "van_km_09","van_km_10","van_km_11","van_km_12","van_km_13","van_km_14","van_km_15","van_km_16","van_km_17","van_km_18",
                        "car_km_09","car_km_10","car_km_11","car_km_12","car_km_13","car_km_14","car_km_15","car_km_16","car_km_17","car_km_18")]

saveRDS(mot_2011,"data-prepared/car_van_km_09_18.Rds")
