# library(sf)
# library(dplyr)
# 
# all <- readRDS("data/base_data.Rds")
# #TODO: calculate gas electric per cap, and fix total calc
# all$elec_emissions_household <- all$MeanDomElec_17_kWh * 0.2556
# all$gas_emissions_household <- all$MeanDomGas_17_kWh * 0.20428
# all$car_emissions_percap <- all$miles_percap * 0.24603
# all$total_emissions_percap <- rowSums(all[,c("gas_emissions_household",
#                                              "elec_emissions_household",
#                                              "car_emissions_percap")],na.rm = TRUE)
# 
# # Make Grades
# percentile <- function(dat){
#   pt1 <- quantile(dat, probs = seq(0, 1, by = 0.01), type = 7, na.rm = TRUE)
#   pt2 <- unique(as.data.frame(pt1), fromLast = TRUE)
#   pt3 <- rownames(pt2)
#   pt4 <- as.integer(strsplit(pt3, "%"))
#   if(0 %in% pt2$pt1){
#     cts <- c(-0.000001, pt2$pt1)
#   } else {
#     cts <- c(0, pt2$pt1)
#   }
#   datp <- pt4[as.integer(cut(dat, cts, labels = 1:length(pt3)))]
#   return(datp)
#   foo = data.frame(data = dat,
#                    datp = datp)
# }
# 
# value2grade <- function(x, high_good = FALSE){
#   
#   x_cent <- percentile(x)
#   grades <- c(rep("A+",1),
#               rep("A",4),
#               rep("A-",5),
#               rep("B+",6),
#               rep("B",6),
#               rep("B-",7),
#               rep("C+",7),
#               rep("C",7),
#               rep("C-",7),
#               rep("D+",7),
#               rep("D",7),
#               rep("D-",7),
#               rep("E+",7),
#               rep("E",6),
#               rep("E-",6),
#               rep("F+",5),
#               rep("F",4),
#               rep("F-",1))
#   
#  if(high_good){
#    grades <- c(grades, "F-")
#    x_grade <- grades[match(x_cent,100:0)]
#  } else {
#    grades <- c("A+",grades)
#    x_grade <- grades[match(x_cent,0:100)]
#  }
#  
#  return(x_grade)
# }
# 
# all$cars_percap_grade <- value2grade(all$cars_percap)
# all$miles_percap_grade <- value2grade(all$miles_percap)
# all$T2W_Car_grade <- value2grade(all$T2W_Car)
# all$T2W_Cycle_grade <- value2grade(all$T2W_Cycle, high_good = TRUE)
# all$T2W_Bus_grade <- value2grade(all$T2W_Bus, high_good = TRUE)
# all$T2W_Train_grade <- value2grade(all$T2W_Train, high_good = TRUE)
# all$T2W_Foot_grade <- value2grade(all$T2W_Foot, high_good = TRUE)
# all$elec_emissions_grade <- value2grade(all$elec_emissions_household)
# all$gas_emissions_grade <- value2grade(all$gas_emissions_household)
# all$car_emissions_grade <- value2grade(all$car_emissions_percap)
# all$total_emissions_grade <- value2grade(all$total_emissions_percap)
# 
# 
# saveRDS(all, "data/data_with_grades.Rds")
