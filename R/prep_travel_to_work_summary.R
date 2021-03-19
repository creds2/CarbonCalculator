# Travel to work data
library(sf)
library(stplanr)
library(dplyr)

dir.create("tmp")
unzip("D:/OneDrive - University of Leeds/Data/LSOA Flow Data/Public/WM12EW[CT0489]_lsoa.zip",
      exdir = "tmp")
od <- readr::read_csv("tmp/WM12EW[CT0489]_lsoa.csv")
unlink("tmp", recursive = TRUE)

od <- od[,c("Area of usual residence","Area of Workplace",names(od)[grepl("AllSexes_Age16Plus",names(od))])]
names(od) <- gsub("_AllSexes_Age16Plus","",names(od))
names(od)[1:2] <- c("LSOA_from","LSOA_to")

od$LSOA_to <- NULL

t2w <- od %>%
  group_by(LSOA_from) %>%
  summarise_all(sum)

t2w[2:13] <- lapply(t2w[2:13], function(x){
  x[x < 3] <- 0
  x
})

names(t2w)[2:13] <- paste0("T2W_", names(t2w)[2:13])
names(t2w)[1] <- "LSOA11"
saveRDS(t2w,"data/travel2workcenus.Rds")
