folder <- "data/carbon_full"
files <- list.files(folder, full.names = TRUE, recursive = TRUE, pattern = ".pbf")
sizes <- file.size(files)
summary(sizes / 1024)
