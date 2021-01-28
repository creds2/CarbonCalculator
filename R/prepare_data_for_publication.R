library(sf)
library(dplyr)

all <- readRDS("data/base_data_v2.Rds")

#TODO: get population for 2010
#TODO: gas emsison factors seem suspect
#TODO: gas and electric for 2018

# gas
# all$gas_percap_2010 <- all$TotDomGas_10_kWh * 0 / all$pop_2011 
# all$gas_percap_2011 <- all$TotDomGas_11_kWh * 0.07518 / all$pop_2011
# all$gas_percap_2012 <- all$TotDomGas_12_kWh * 0.18521 / all$pop_2012 
# all$gas_percap_2013 <- all$TotDomGas_13_kWh * 0.18404 / all$pop_2013 
# all$gas_percap_2014 <- all$TotDomGas_14_kWh * 0.18497 / all$pop_2014 
# all$gas_percap_2015 <- all$TotDomGas_15_kWh * 0.18445 / all$pop_2015 

all$gas_percap_2010 <- all$TotDomGas_10_kWh * 0.20444 / all$pop_2011
all$gas_percap_2011 <- all$TotDomGas_11_kWh * 0.20444 / all$pop_2011
all$gas_percap_2012 <- all$TotDomGas_12_kWh * 0.20444 / all$pop_2012
all$gas_percap_2013 <- all$TotDomGas_13_kWh * 0.20444 / all$pop_2013
all$gas_percap_2014 <- all$TotDomGas_14_kWh * 0.20444 / all$pop_2014
all$gas_percap_2015 <- all$TotDomGas_15_kWh * 0.20444 / all$pop_2015
all$gas_percap_2016 <- all$TotDomGas_16_kWh * 0.20444 / all$pop_2016
all$gas_percap_2017 <- all$TotDomGas_17_kWh * 0.20463 / all$pop_2017
all$gas_percap_2018 <- NA
#all$gas_percap_2018 <- all$TotDomGas_18_kWh * 0.20437 / all$pop_2018

# elec
all$elec_percap_2010 <- all$TotDomElec_10_kWh * 0.48531  / all$pop_2011 
all$elec_percap_2011 <- all$TotDomElec_11_kWh * 0.45205  / all$pop_2011
all$elec_percap_2012 <- all$TotDomElec_12_kWh * 0.46002  / all$pop_2012 
all$elec_percap_2013 <- all$TotDomElec_13_kWh * 0.44548  / all$pop_2013 
all$elec_percap_2014 <- all$TotDomElec_14_kWh * 0.49426  / all$pop_2014 
all$elec_percap_2015 <- all$TotDomElec_15_kWh * 0.46219  / all$pop_2015 
all$elec_percap_2016 <- all$TotDomElec_16_kWh * 0.41205  / all$pop_2016 
all$elec_percap_2017 <- all$TotDomElec_17_kWh * 0.35156  / all$pop_2017
all$elec_percap_2018 <- NA
#all$elec_percap_2018 <- all$TotDomElec_18_kWh * 0.28307  / all$pop_2018

# Other heating

all$other_heat_percap_2011 <- all$non_gaselec_emission_total / all$pop_2011

# cars
all$car_percap_2010 <- all$car_km_10 * all$AvgCO2_cars_2010 / 1000 / all$pop_2011
all$car_percap_2011 <- all$car_km_11 * all$AvgCO2_cars_2011 / 1000 / all$pop_2011
all$car_percap_2012 <- all$car_km_12 * all$AvgCO2_cars_2012 / 1000 / all$pop_2012
all$car_percap_2013 <- all$car_km_13 * all$AvgCO2_cars_2013 / 1000 / all$pop_2013
all$car_percap_2014 <- all$car_km_14 * all$AvgCO2_cars_2014 / 1000 / all$pop_2014
all$car_percap_2015 <- all$car_km_15 * all$AvgCO2_cars_2015 / 1000 / all$pop_2015
all$car_percap_2016 <- all$car_km_16 * all$AvgCO2_cars_2016 / 1000 / all$pop_2016
all$car_percap_2017 <- all$car_km_17 * all$AvgCO2_cars_2017 / 1000 / all$pop_2017
all$car_percap_2018 <- all$car_km_18 * all$AvgCO2_cars_2018 / 1000 / all$pop_2018

# vans
all$van_percap_2010 <- all$van_km_10 * all$AvgCO2_cars_2010 / 1000 / all$pop_2011
all$van_percap_2011 <- all$van_km_11 * all$AvgCO2_cars_2011 / 1000 / all$pop_2011
all$van_percap_2012 <- all$van_km_12 * all$AvgCO2_cars_2012 / 1000 / all$pop_2012
all$van_percap_2013 <- all$van_km_13 * all$AvgCO2_cars_2013 / 1000 / all$pop_2013
all$van_percap_2014 <- all$van_km_14 * all$AvgCO2_cars_2014 / 1000 / all$pop_2014
all$van_percap_2015 <- all$van_km_15 * all$AvgCO2_cars_2015 / 1000 / all$pop_2015
all$van_percap_2016 <- all$van_km_16 * all$AvgCO2_cars_2016 / 1000 / all$pop_2016
all$van_percap_2017 <- all$van_km_17 * all$AvgCO2_cars_2017 / 1000 / all$pop_2017
all$van_percap_2018 <- all$van_km_18 * all$AvgCO2_cars_2018 / 1000 / all$pop_2018

# cars per person
all$cars_percap_2010 <- all$total_cars_2010 / all$pop_2011
all$cars_percap_2011 <- all$total_cars_2011 / all$pop_2011
all$cars_percap_2012 <- all$total_cars_2012 / all$pop_2012
all$cars_percap_2013 <- all$total_cars_2013 / all$pop_2013
all$cars_percap_2014 <- all$total_cars_2014 / all$pop_2014
all$cars_percap_2015 <- all$total_cars_2015 / all$pop_2015
all$cars_percap_2016 <- all$total_cars_2016 / all$pop_2016
all$cars_percap_2017 <- all$total_cars_2017 / all$pop_2017
all$cars_percap_2018 <- all$total_cars_2018 / all$pop_2018

# vans per person
all$vans_percap_2011 <- all$vans_total_11 / all$pop_2011

# flights 
all$flights_percap_2018 <- all$flight_emissions / all$pop_2018


# Subset and order variables

all <- all[,c("LSOA11","LSOA11NM","SOAC11NM","LAD17CD","LAD17NM",
paste0("gas_percap_",  2010:2018),
paste0("elec_percap_", 2010:2018),
"other_heat_percap_2011",
"flights_percap_2018",
paste0("car_percap_",  2010:2018),
paste0("van_percap_",  2010:2018),
paste0("cars_percap_", 2010:2018),
paste0("AvgCO2_cars_", 2010:2018),
"pP1900","p1900_18","p1919_29","p1930_39","p1945_54","p1955_64","p1965_72",
"p1973_82","p1983_92","p1993_99","p2000_09","p2010_15","pUNKNOWN",
"Whole_House_Detached","Whole_House_Semi","Whole_House_Terraced",
"Flat_PurposeBuilt","Flat_Converted","Flat_Commercial","Caravan",
"T2W_Home","T2W_Metro","T2W_Train","T2W_Bus","T2W_Taxi","T2W_Mbike",
"T2W_Car","T2W_Passenger","T2W_Cycle","T2W_Foot",
"T2W_Other","T2W_NoEmp",
"pHeating_None","pHeating_Gas","pHeating_Electric","pHeating_Oil","pHeating_Solid","pHeating_Other",
"T2S_bicycle","T2S_foot","T2S_car",
"no_heating","gas","electric","oil","solid_fuel","other_heating","two_types"
)]



all$total_percap <- rowSums(all[,c("gas_percap_2017", "elec_percap_2017",
                                  "car_percap_2018", "van_percap_2018",
                                  "flights_percap_2018", "other_heat_percap_2011")],
                           na.rm = TRUE) 
# foo = all[all$total_percap > 8000, ]
# foo = foo[,c("total_percap","van_km_11","gas_percap_2017", "elec_percap_2017",
#              "car_percap_2018", "van_percap_2018",
#              "flights_percap_2018", "other_heat_percap_2011")]


# Make Grades
percentile <- function(dat){
  pt1 <- quantile(dat, probs = seq(0, 1, by = 0.01), type = 7, na.rm = TRUE)
  pt2 <- unique(as.data.frame(pt1), fromLast = TRUE)
  pt3 <- rownames(pt2)
  pt4 <- as.integer(strsplit(pt3, "%"))
  if(0 %in% pt2$pt1){
    cts <- c(-0.000001, pt2$pt1)
  } else {
    cts <- c(0, pt2$pt1)
  }
  datp <- pt4[as.integer(cut(dat, cts, labels = 1:length(pt3)))]
  return(datp)
  foo = data.frame(data = dat,
                   datp = datp)
}

value2grade <- function(x, high_good = FALSE){
  
  x_cent <- percentile(x)
  grades <- c(rep("A+",1),
              rep("A",4),
              rep("A-",5),
              rep("B+",6),
              rep("B",6),
              rep("B-",7),
              rep("C+",7),
              rep("C",7),
              rep("C-",7),
              rep("D+",7),
              rep("D",7),
              rep("D-",7),
              rep("E+",7),
              rep("E",6),
              rep("E-",6),
              rep("F+",5),
              rep("F",4),
              rep("F-",1))
  
 if(high_good){
   grades <- c(grades, "F-")
   x_grade <- grades[match(x_cent,100:0)]
 } else {
   grades <- c("A+",grades)
   x_grade <- grades[match(x_cent,0:100)]
 }
 
 return(x_grade)
}

all$cars_percap_grade <- value2grade(all$car_percap_2018)
all$km_percap_grade <- value2grade(all$car_km_18)
all$T2W_Car_grade <- value2grade(all$T2W_Car)
all$T2W_Cycle_grade <- value2grade(all$T2W_Cycle, high_good = TRUE)
all$T2W_Bus_grade <- value2grade(all$T2W_Bus, high_good = TRUE)
all$T2W_Train_grade <- value2grade(all$T2W_Train, high_good = TRUE)
all$T2W_Foot_grade <- value2grade(all$T2W_Foot, high_good = TRUE)
all$elec_emissions_grade <- value2grade(all$elec_percap_2017)
all$gas_emissions_grade <- value2grade(all$gas_percap_2017)
all$car_emissions_grade <- value2grade(all$car_percap_2018)
all$total_emissions_grade <- value2grade(all$total_percap)
all$flights_grade <- value2grade(all$flights_percap_2018)

all_old = all

# Round data
all[] <- lapply(all[], function(x){
  if(is.numeric(x)){
    x <- signif(x, digits = 3)
  }
  x
})

head(all$total_percap)
head(all_old$total_percap)


all_old_unique <- unique(unlist(lapply(all_old, as.character)))
all_unique <- unique(unlist(lapply(all, as.character)))
message("Compression to ",round(length(all_unique) / length(all_old_unique) * 100, 3)," % of original values")


saveRDS(all, "data/data_with_grades.Rds")
