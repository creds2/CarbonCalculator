# # Make gzipped json file of data
# 
# library(jsonlite)
# library(R.utils)
# 
# all <- readRDS("data/data_with_grades.Rds")
# #all <- all[,c(1,77:93)]
# write_json(all, "data/attributes.json")
# gzip("data/attributes.json","data/attributes_gzip.json", remove = FALSE)
# 
