source("R/secure_path.R")

bounds <- st_read("../Excess-Data-Exploration/data-prepared/LSOA_full.gpkg")


mot11 <- read.csv(paste0(secure_path,"/Tim Share/From Tim/MOT Data RACv9.3/MOT Data RACv9.3 LSOAoutputs_2011.csv"), stringsAsFactors = FALSE)
mot10 <- read.csv(paste0(secure_path,"/Tim Share/From Tim/MOT Data RACv9.3/MOT Data RACv9.3 LSOAoutputs_2010.csv"), stringsAsFactors = FALSE)
mot09 <- read.csv(paste0(secure_path,"/Tim Share/From Tim/MOT Data RACv9.3/MOT Data RACv9.3 LSOAoutputs_2009.csv"), stringsAsFactors = FALSE)

mot11 <- mot11[substr(mot11$LSOA,1,1) == "E",]
mot10 <- mot10[substr(mot10$LSOA,1,1) == "E",]
mot09 <- mot09[substr(mot09$LSOA,1,1) == "E",]

names(mot11) <- c("LSOA11", "cars_total","cars_miles","pu5k","p5_12k","po12k","age_av","miles_av_u3",
                "miles_av_o13","pcars_diesel","pmiles_diesel","vans_total","vans_miles",
                "pmiles_car","pmiles_vans","cars_percap","miles_percap")
names(mot10) <- c("LSOA11", "cars_total","cars_miles","pu5k","p5_12k","po12k","age_av","miles_av_u3",
                  "miles_av_o13","pcars_diesel","pmiles_diesel","vans_total","vans_miles",
                  "pmiles_car","pmiles_vans","cars_percap","miles_percap")
names(mot09) <- c("LSOA11", "cars_total","cars_miles","pu5k","p5_12k","po12k","age_av","miles_av_u3",
                  "miles_av_o13","pcars_diesel","pmiles_diesel","vans_total","vans_miles",
                  "pmiles_car","pmiles_vans","cars_percap","miles_percap")
mot11 <- mot11[,c("LSOA11","cars_miles","vans_total","vans_miles")]
mot10 <- mot10[,c("LSOA11","cars_miles","vans_total","vans_miles")]
mot09 <- mot09[,c("LSOA11","cars_miles","vans_total","vans_miles")]

names(mot11) <- c("LSOA11","car_miles_11","vans_total_11","vans_miles_11")
names(mot10) <- c("LSOA11","car_miles_10","vans_total_10","vans_miles_10")
names(mot09) <- c("LSOA11","car_miles_09","vans_total_09","vans_miles_09")

mot_all <- left_join(mot09, mot10, by = "LSOA11")
mot_all <- left_join(mot_all, mot11, by = "LSOA11")

mot_all$car_km_09 <- round(mot_all$car_miles_09  * 1.60934,1)
mot_all$car_km_10 <- round(mot_all$car_miles_10  * 1.60934,1)
mot_all$car_km_11 <- round(mot_all$car_miles_11  * 1.60934,1)

mot_all$van_km_09 <- round(mot_all$vans_miles_09  * 1.60934,1)
mot_all$van_km_10 <- round(mot_all$vans_miles_10  * 1.60934,1)
mot_all$van_km_11 <- round(mot_all$vans_miles_11  * 1.60934,1)

mot_all <- mot_all[,c("LSOA11","vans_total_09","vans_total_10","vans_total_11",
                      "car_km_09","car_km_10","car_km_11",
                      "van_km_09","van_km_10","van_km_11")]

saveRDS(mot_all,"data-prepared/car_van_km_09_11.Rds")
