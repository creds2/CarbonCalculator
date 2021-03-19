library(pct)
library(sf)

schools <- readRDS("data/pct/z_all_school.Rds")
schools <- schools@data

schools <- schools[,c("geo_code","all","bicycle","foot","car","dutch_slc","dutch_sic")]
schools$dutch_slc[is.na(schools$dutch_slc)] <- round(schools$dutch_sic[is.na(schools$dutch_slc)])

schools$bicycle[is.na(schools$bicycle)] <- 1

schools$all[is.na(schools$all)] <- 0
schools$foot[is.na(schools$foot)] <- 1
schools$car[is.na(schools$car)] <- 1

schools$other <- schools$all - schools$bicycle - schools$foot - schools$car

schools$t2s_bike <- round(schools$bicycle / schools$all * 100)
schools$t2s_foot <- round(schools$foot / schools$all * 100)
schools$t2s_car <- round(schools$car / schools$all * 100)
schools$t2s_other <- round(schools$other / schools$all * 100)

summary(rowSums(schools[,c("t2s_bike", "t2s_foot","t2s_car","t2s_other")]))

schools$t2s_bike[is.na(schools$t2s_bike)] <- 0
schools$t2s_foot[is.na(schools$t2s_foot)] <- 0
schools$t2s_car[is.na(schools$t2s_car)] <- 0
schools$t2s_other[is.na(schools$t2s_other)] <- 0

schools$dutch_slc <- round(schools$dutch_slc / schools$all * 100)
schools$dutch_slc[is.na(schools$dutch_slc)] <- 0
schools$dutch_slc[is.infinite(schools$dutch_slc)] <- 0

schools$t2s_foot[is.na(schools$t2s_foot)] <- 0
schools$t2s_foot[is.infinite(schools$t2s_foot)] <- 0
schools$t2s_other[is.infinite(schools$t2s_other)] <- 0

schools <- schools[,c("geo_code","t2s_bike","t2s_foot","t2s_car","t2s_other",
                      "dutch_slc")]

summary(schools)
summary(rowSums(schools[,c("t2s_bike", "t2s_foot","t2s_car","t2s_other")]))

names(schools) <- c("geo_code","T2S_bike","T2S_foot","T2S_car","T2S_other",
                    "T2S_pct")

saveRDS(schools,"data/travel2school.Rds")
