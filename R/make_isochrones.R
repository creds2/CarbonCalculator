library(opentripplanner)
library(tmap)
tmap_mode("view")
otpcon <- otp_connect(router = "great-britain")

lsoa <- read_sf("data-prepared/lsoa_centroids.geojson")


iso_walk <- otp_isochrone(otpcon, 
                          lsoa, 
                          fromID = lsoa$code, 
                          mode = "WALK",
                          cutoffSec = 15*60,
                          ncores = 20)

saveRDS(iso_walk, "data-prepared/isochones_walk.Rds")


iso_bike <- otp_isochrone(otpcon, 
                          lsoa, 
                          fromID = lsoa$code, 
                          mode = "BICYCLE",
                          cutoffSec = 15*60,
                          ncores = 20)

saveRDS(iso_bike, "data-prepared/isochones_bike.Rds")


iso_transit <- otp_isochrone(otpcon, 
                          lsoa, 
                          fromID = lsoa$code, 
                          mode = c("WALK","TRANSIT"),
                          cutoffSec = 15*60,
                          ncores = 20,
                          date_time = lubridate::ymd_hms("2020-06-18 08:30:00"))

saveRDS(iso_transit, "data-prepared/isochones_transit.Rds")


iso_biketransit <- otp_isochrone(otpcon, 
                             lsoa, 
                             fromID = lsoa$code, 
                             mode = c("BICYCLE","TRANSIT"),
                             cutoffSec = 15*60,
                             ncores = 30,
                             date_time = lubridate::ymd_hms("2020-06-18 08:30:00"),
                             maxWalkDistance = 3000)

saveRDS(iso_biketransit, "data-prepared/isochones_biketransit.Rds")
