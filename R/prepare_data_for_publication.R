library(sf)
library(dplyr)

all <- readRDS("data/base_data_v5.Rds")

#TODO: get population for 2010
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
all$gas_percap_2018 <- all$TotDomGas_18_kWh * 0.20437 / all$pop_2018

# elec
all$elec_percap_2010 <- all$TotDomElec_10_kWh * 0.48531  / all$pop_2011 
all$elec_percap_2011 <- all$TotDomElec_11_kWh * 0.45205  / all$pop_2011
all$elec_percap_2012 <- all$TotDomElec_12_kWh * 0.46002  / all$pop_2012 
all$elec_percap_2013 <- all$TotDomElec_13_kWh * 0.44548  / all$pop_2013 
all$elec_percap_2014 <- all$TotDomElec_14_kWh * 0.49426  / all$pop_2014 
all$elec_percap_2015 <- all$TotDomElec_15_kWh * 0.46219  / all$pop_2015 
all$elec_percap_2016 <- all$TotDomElec_16_kWh * 0.41205  / all$pop_2016 
all$elec_percap_2017 <- all$TotDomElec_17_kWh * 0.35156  / all$pop_2017
all$elec_percap_2018 <- all$TotDomElec_18_kWh * 0.28307  / all$pop_2018

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

all$commute_noncar_percap <- all$kgco2e_commute_noncar_percap
# Subset and order variables

all <- all[,c("LSOA11","LSOA11NM","SOAC11NM","LAD17CD","LAD17NM","WD18NM",
paste0("gas_percap_",  2010:2018),
paste0("elec_percap_", 2010:2018),
"other_heat_percap_2011",
"flights_percap_2018",
"nutrition_kgco2e_percap",
"other_shelter_kgco2e_percap",
"consumables_kgco2e_percap",
"recreation_kgco2e_percap",
"services_kgco2e_percap",
"commute_noncar_percap",
paste0("car_percap_",  2010:2018),
paste0("van_percap_",  2010:2018),
paste0("cars_percap_", 2010:2018),
paste0("AvgCO2_cars_", 2010:2018),
paste0("pop_",  2011:2018),
"pP1900","p1900_18","p1919_29","p1930_39","p1945_54","p1955_64","p1965_72",
"p1973_82","p1983_92","p1993_99","p2000_09","p2010_15","pUNKNOWN",
"Whole_House_Detached","Whole_House_Semi","Whole_House_Terraced",
"Flat_PurposeBuilt","Flat_Converted","Flat_Commercial","Caravan",
"epc_total","epc_newbuild","epc_A",
"epc_B","epc_C","epc_D",
"epc_E","epc_F","epc_G",
"epc_score_avg","type_house_semi","type_house_midterrace",
"type_house_endterrace","type_house_detached","type_flat",
"type_maisonette","type_parkhome","type_other",  "type_bungalow",
"floor_area_avg","low_energy_light",
paste0("floor_",  c("verygood","good","average","poor","verypoor","other")),
"floor_below",
paste0("window_",  c("verygood","good","average","poor","verypoor","other")),
paste0("wall_",  c("verygood","good","average","poor","verypoor","other")),
paste0("roof_",  c("verygood","good","average","poor","verypoor","other")),
"roof_above",
paste0("mainheat_",  c("verygood","good","average","poor","verypoor","other")),
paste0("mainheatcontrol_",  c("verygood","good","average","poor","verypoor","other")),
"mainheatdesc_gasboiler",
"mainheatdesc_oilboiler","mainheatdesc_storageheater","mainheatdesc_portableheater",
"mainheatdesc_roomheater","mainheatdesc_heatpump","mainheatdesc_community",
"mainheatdesc_other","mainfuel_mainsgas","mainfuel_electric",
"mainfuel_oil","mainfuel_coal","mainfuel_lpg",
"mainfuel_biomass",
"has_solarpv","has_solarthermal",
"T2W_WorkAtHome","T2W_Underground","T2W_Train","T2W_Bus",
"T2W_Taxi","T2W_Motorcycle","T2W_CarOrVan","T2W_Passenger",
"T2W_Bicycle","T2W_OnFoot","T2W_OtherMethod","T2W_pct",
"km_Underground","km_Train",
"km_Bus","km_Taxi","km_Motorcycle",
"km_CarOrVan","km_Passenger","km_Bicycle",
"km_OnFoot","km_OtherMethod",
"pHeating_None","pHeating_Gas","pHeating_Electric","pHeating_Oil","pHeating_Solid","pHeating_Other",
"T2S_bike", "T2S_foot","T2S_car","T2S_other","T2S_pct",
#"no_heating","gas","electric","oil","solid_fuel","other_heating","two_types"
"car_km_18"
)]



all$total_kgco2e_percap <- rowSums(all[,c("gas_percap_2018", "elec_percap_2018",
                                  "car_percap_2018", "van_percap_2018",
                                  "flights_percap_2018", "other_heat_percap_2011",
                                  "nutrition_kgco2e_percap",
                                  "other_shelter_kgco2e_percap",
                                  "consumables_kgco2e_percap",
                                  "recreation_kgco2e_percap",
                                  "services_kgco2e_percap",
                                  "commute_noncar_percap")],
                           na.rm = TRUE) 
# foo = all[all$total_kgco2e_percap > 8000, ]
# foo = foo[,c("total_kgco2e_percap","van_km_11","gas_percap_2017", "elec_percap_2017",
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

all$cars_percap_grade <- value2grade(all$cars_percap_2018)
all$km_percap_grade <- value2grade(all$car_km_18)
all$T2W_Car_grade <- value2grade(all$T2W_CarOrVan)
all$T2W_Cycle_grade <- value2grade(all$T2W_Bicycle, high_good = TRUE)
all$T2W_Bus_grade <- value2grade(all$T2W_Bus, high_good = TRUE)
all$T2W_Train_grade <- value2grade(all$T2W_Train, high_good = TRUE)
all$T2W_Foot_grade <- value2grade(all$T2W_OnFoot, high_good = TRUE)
all$T2W_Underground_grade <- value2grade(all$T2W_Underground, high_good = TRUE)
all$elec_emissions_grade <- value2grade(all$elec_percap_2017)
all$gas_emissions_grade <- value2grade(all$gas_percap_2017)
all$car_emissions_grade <- value2grade(all$car_percap_2018)
all$total_emissions_grade <- value2grade(all$total_kgco2e_percap)
all$flights_grade <- value2grade(all$flights_percap_2018)

all$other_heating_grade <- value2grade(all$other_heat_percap_2011)
all$van_grade <- value2grade(all$van_percap_2018)
all$consumption_all_kgco2e_percap <- rowSums(all[,c("nutrition_kgco2e_percap",
                                            "other_shelter_kgco2e_percap",
                                            "consumables_kgco2e_percap",
                                            "recreation_kgco2e_percap",
                                            "services_kgco2e_percap")])
all$consumption_grade <- value2grade(all$consumption_all_kgco2e_percap)

# SUppress Grades on error LSOA
#foo <- all[all$total_kgco2e_percap > 25000 | all$total_kgco2e_percap < 2000, ]
supp_tot <- c("E01028521","E01025690","E01026860","E01013378","E01006747","E01033221",
"E01011678","E01005210","E01033233","E01009635","E01033634","E01009642","E01017986",
"E01008407","E01013816","E01017958","E01006513","E01009641","E01033197","E01006512",
"E01017034","E01017032","E01005062","E01033583","E01013973","E01033553","E01008406",
"E01033006","E01011229","E01005209","E01016899","E01033005","E01032797","E01008397",
"E01008068","E01005284","E01005231","E01033554","E01025105","E01033762","E01033561",
"E01011670","E01017140","E01033724","E01026133","E01009284","E01013648","E01033556")
supp_van <- c("E01016281","E01016767","E01015503","E01019556","E01010151","E01033484",
"E01009320")

all$total_emissions_grade[all$LSOA11 %in% c(supp_tot,supp_van)] <- NA
all$van_grade[all$LSOA11 %in% c(supp_van)] <- NA

# summary(all$cars_percap_2018)
# foo <- all[all$cars_percap_2018 > 2,]

supp_car <- c("E01033484","E01013536","E01032868","E01014484","E01014868","E01015551",
"E01015503","E01015686","E01016190","E01016281","E01016474","E01016508","E01016793",
"E01016767","E01016763","E01016823","E01017053","E01017054","E01031931","E01017478",
"E01017466","E01018138","E01019574","E01019579","E01019677","E01019970","E01021473",
"E01032933","E01023142","E01023866","E01027131","E01027719","E01028506","E01028456",
"E01028473","E01031207","E01033248","E01032403","E01004948","E01004951","E01007640",
"E01009320","E01010109","E01010108","E01010151","E01011457","E01011325","E01011363",
"E01011734","E01002520")


all$car_emissions_grade[all$LSOA11 %in% c(supp_car)] <- NA
all$cars_percap_grade[all$LSOA11 %in% c(supp_car)] <- NA

supp_elec <- c('E01013973','E01016370','E01033500','E01031998','E01017958','E01021736',
               'E01026860','E01029576','E01033749','E01007862','E01033561','E01010257','E01003016')

all$elec_emissions_grade[all$LSOA11 %in% c(supp_elec)] <- NA


all$car_km_18  <- NULL # Only Grade needed

all_old = all

# Round data
all[] <- lapply(all[], function(x){
  if(is.numeric(x)){
    x <- signif(x, digits  = 3)
  }
  x
})

head(all$total_kgco2e_percap)
head(all_old$total_kgco2e_percap)


all_old_unique <- unique(unlist(lapply(all_old, as.character)))
all_unique <- unique(unlist(lapply(all, as.character)))
message("Compression to ",round(length(all_unique) / length(all_old_unique) * 100, 3)," % of original values")

for(i in 1:ncol(all)){
  sub <- all[,i]
  if(sum(is.na(sub)) > 0){
    message(names(all)[i]," has ",sum(is.na(sub))," na values")
  }
  
}

all <- as.data.frame(all)

for(i in 1:ncol(all)){
  sub <- all[,i]
  if(class(sub) != "character"){
    mx <- max(sub, na.rm = TRUE)
    mn <- min(sub, na.rm = TRUE)
    
    if(mx > 10 * mn){
      message(names(all)[i]," has a range of ",mn," to ",mx)
    }
  }
}


saveRDS(all, "data/data_with_grades_v5.Rds")
