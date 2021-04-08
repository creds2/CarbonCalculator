library(opentripplanner)
library(tmap)
library(sf)
tmap_mode("view")

#java -Xmx110000M -d64 -jar "D:/OneDrive - University of Leeds/Data/opentripplanner/otp-1.5.0-shaded.jar" --router great-britain2 --graphs "D:/OneDrive - University of Leeds/Data/opentripplanner/graphs" --server --port 8091 --securePort 8092 --analyst --pointSets "D:/OneDrive - University of Leeds/Data/opentripplanner/pointsets"

otpcon <- otp_connect(router = "great-britain2", port = 8091)

lsoa <- read_sf("data-prepared/lsoa_centroids.geojson")


iso_walk <- otp_isochrone(otpcon, 
                          lsoa, 
                          fromID = lsoa$code, 
                          mode = "WALK",
                          cutoffSec = 15*60,
                          ncores = 30)

saveRDS(iso_walk, "data-prepared/isochones_walk_v2.Rds")


iso_bike <- otp_isochrone(otpcon, 
                          lsoa, 
                          fromID = lsoa$code, 
                          mode = "BICYCLE",
                          cutoffSec = 15*60,
                          ncores = 30)

saveRDS(iso_bike, "data-prepared/isochones_bike_v2.Rds")


iso_transit <- otp_isochrone(otpcon, 
                          lsoa, 
                          fromID = lsoa$code, 
                          mode = c("WALK","TRANSIT"),
                          cutoffSec = 15*60,
                          ncores = 30,
                          date_time = lubridate::ymd_hms("2020-03-01 08:30:00"))

saveRDS(iso_transit, "data-prepared/isochones_transit_v3.Rds")


iso_biketransit <- otp_isochrone(otpcon, 
                             lsoa, 
                             fromID = lsoa$code, 
                             mode = c("BICYCLE","TRANSIT"),
                             cutoffSec = 15*60,
                             ncores = 30,
                             date_time = lubridate::ymd_hms("2020-03-01 08:30:00"),
                             maxWalkDistance = 3000)

saveRDS(iso_biketransit, "data-prepared/isochones_biketransit_v3.Rds")
