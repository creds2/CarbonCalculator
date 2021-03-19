
wards <- read.csv("D:/OneDrive - University of Leeds/Data/OA Bounadries/LSOA_2011_to_Ward_2018_EW_v3.csv")
wards <- wards[,c(1,4)]
names(wards)[1] <- "LSOA11"

saveRDS(wards, "data/wards.Rds")
