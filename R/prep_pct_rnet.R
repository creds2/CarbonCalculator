library(sf)

net_school <- readRDS("data/pct/rnet_all_school.Rds")
net_comm <- readRDS("data/pct/rnet_all_commute.Rds")

net_school <- st_as_sf(net_school)
net_comm <- st_as_sf(net_comm)

net_school <- net_school[,c("bicycle","govtarget_slc","dutch_slc")]
net_comm <- net_comm[,c("bicycle","govtarget_slc","dutch_slc")]

rnet <- rbind(net_comm, net_school)
rm(net_comm, net_school)
rnet$bicycle[is.na(rnet$bicycle)] <- 0
rnet$govtarget_slc[is.na(rnet$govtarget_slc)] <- 0
rnet$dutch_slc[is.na(rnet$dutch_slc)] <- 0

rnet2 <- stplanr::overline2(rnet, attrib = c("bicycle","govtarget_slc","dutch_slc"),
                           ncores = 1)

saveRDS(rnet2, "data/pct/rnet_both.Rds")

rnet2 <- rnet2[!is.na(rnet2$dutch_slc),]
rnet2 <- rnet2[rnet2$dutch_slc > 0,]

rnet2$bicycle[is.na(rnet2$bicycle)] <- 0
rnet2$govtarget_slc[is.na(rnet2$govtarget_slc)] <- 0
rnet2$dutch_slc[is.na(rnet2$dutch_slc)] <- 0

rnet_low <- rnet2[rnet2$dutch_slc >= 500,]
rnet_med <- rnet2[rnet2$dutch_slc >= 50,]

st_write(rnet2, "data/pct/rnet_high.geojson", delete_dsn = TRUE)
st_write(rnet_med, "data/pct/rnet_med.geojson", delete_dsn = TRUE)
st_write(rnet_low, "data/pct/rnet_low.geojson", delete_dsn = TRUE)
