
btype <- readr::read_csv("data/building type/building_type.csv",col_names = paste0("col",1:10))
names(btype) <- c("lsoanm","LSOA11","All_Dwelllings_2011","Whole_House_Detached","Whole_House_Semi","Whole_House_Terraced","Flat_PurposeBuilt",
                  "Flat_Converted","Flat_Commercial","Caravan")
btype <- btype[8:34760,]
btype$lsoanm <- NULL

btype[2:9] <- lapply(btype[2:9], as.numeric)

saveRDS(btype,"data/building type/building_type.Rds")
