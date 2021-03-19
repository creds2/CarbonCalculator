library(pct)
library(sf)

t2w <- readRDS("data/pct/z_all_commute.Rds")
t2w <- t2w@data

t2w <- t2w[,c("geo_code","all","dutch_slc")]
t2w$T2W_pct <- round(t2w$dutch_slc / t2w$all * 100)

t2w <- t2w[,c("geo_code","T2W_pct")]

saveRDS(t2w,"data/travel2workPCT.Rds")
