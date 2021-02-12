library(dplyr)

# Consumption

ukcarbon <- read.csv("data/consumption/uk_consumption_based_footprint.csv")
ukcarbon <- ukcarbon[ukcarbon$year == 2017,] # most recent year

income <- read.csv("data/consumption/income_energy_fooprint.csv")

lsoa <- readRDS("data-prepared/flight_emissions.Rds")
lsoa <- lsoa[,c("LSOA11","centile","pop_2018")]

# match ukcarbon cols to income cols
# "gas_electric"  
# "other_shelter"
# "nutrition"
# "flights"      
# "mobility"
# "consumables"
# "recreation"   
# "services"

ukcarbon$gas_electric  <- ukcarbon$Electricity..gas.and.other.fuels

ukcarbon$nutrition <- ukcarbon$Food + 
  ukcarbon$Alcoholic.beverages +
  ukcarbon$Non.alcoholic.beverages

ukcarbon$consumables <- ukcarbon$Tobacco + 
  ukcarbon$Clothing + 
  ukcarbon$Footwear +
  ukcarbon$Furniture..furnishings..carpets.etc + 
  ukcarbon$Household.textiles +
  ukcarbon$Household.appliances +
  ukcarbon$Glassware..tableware.and.household.utensils +
  ukcarbon$Tools.and.equipment.for.house.and.garden +
  ukcarbon$Medical.products..appliances.and.equipment

ukcarbon$other_shelter <- ukcarbon$Actual.rentals.for.households + 
  ukcarbon$Imputed.rentals.for.households +
  ukcarbon$Maintenance.and.repair.of.the.dwelling + 
  ukcarbon$Water.supply.and.miscellaneous.dwelling.services +
  ukcarbon$Goods.and.services.for.household.maintenance

ukcarbon$recreation <- ukcarbon$Recreational.and.cultural.services + 
  ukcarbon$Newspapers..books.and.stationery +
  ukcarbon$Restaurants.and.hotels +
  ukcarbon$Other.recreational.equipment.etc +
  ukcarbon$Other.major.durables.for.recreation.and.culture

ukcarbon$services <- ukcarbon$Miscellaneous.goods.and.services +
  ukcarbon$Education +
  ukcarbon$Telephone.and.telefax.services +
  ukcarbon$Hospital.services +
  ukcarbon$Postal.services +
  ukcarbon$Telephone.and.telefax.equipment +
  ukcarbon$Telephone.and.telefax.services +
  ukcarbon$Audio.visual..photo.and.info.processing.equipment
  
ukcarbon$mobility <- ukcarbon$Transport.services +
  ukcarbon$Purchase.of.vehicles +
  ukcarbon$Operation.of.personal.transport.equipment
  

ukcarbon <- ukcarbon[,c("gas_electric",
                        "nutrition",                                       
                        "consumables",                                     
                        "other_shelter",                                  
                        "recreation",                                    
                        "services",
                        "mobility")]

income$other_shelter_shareHH <- income$other_shelter_toes_household / sum(income$other_shelter_toes_household)
income$nutrition_shareHH <- income$nutrition_toe_household / sum(income$nutrition_toe_household)
income$consumables_shareHH <- income$consumables_toe_household / sum(income$consumables_toe_household)
income$recreation_shareHH <- income$recreation_toes_household / sum(income$recreation_toes_household)
income$services_shareHH <- income$services_toes_household / sum(income$services_toes_household)

income <- income[,c("income_group",
                    "other_shelter_shareHH",
                    "nutrition_shareHH",
                    "consumables_shareHH",
                    "recreation_shareHH",
                    "services_shareHH")]

income$other_shelter_shareHH <- income$other_shelter_shareHH / mean(income$other_shelter_shareHH)
income$nutrition_shareHH <- income$nutrition_shareHH / mean(income$nutrition_shareHH)
income$consumables_shareHH <- income$consumables_shareHH / mean(income$consumables_shareHH)
income$recreation_shareHH <- income$recreation_shareHH / mean(income$recreation_shareHH)
income$services_shareHH <- income$services_shareHH / mean(income$services_shareHH)


bands <- function(dat){
  
  lookup <- data.frame(cent = round(seq(0,1,0.01),2),
                       vent = c(rep(seq(0,19,1), each = 5),19))
  
  datband <- lookup$vent[match(dat, lookup$cent)]
  return(datband)
  foo <- data.frame(dat, datband)
  
}

lsoa$income_band <- bands(lsoa$centile)

lsoa <- left_join(lsoa, income, by = c("income_band" = "income_group"))


lsoa$nutrition_kgco2e_percap <- lsoa$nutrition_shareHH * ukcarbon$nutrition * 1e6 / nrow(lsoa) / lsoa$pop_2018
lsoa$other_shelter_kgco2e_percap <- lsoa$other_shelter_shareHH * ukcarbon$other_shelter * 1e6 / nrow(lsoa) / lsoa$pop_2018
lsoa$consumables_kgco2e_percap <- lsoa$consumables_shareHH * ukcarbon$consumables * 1e6 / nrow(lsoa) / lsoa$pop_2018
lsoa$recreation_kgco2e_percap <- lsoa$recreation_shareHH * ukcarbon$recreation * 1e6 / nrow(lsoa) / lsoa$pop_2018
lsoa$services_kgco2e_percap <- lsoa$services_shareHH * ukcarbon$services * 1e6 / nrow(lsoa) / lsoa$pop_2018

foo <- rowSums(lsoa[,grepl("_kgco2e_percap",names(lsoa))])
summary(foo)

lsoa <- lsoa[,c("LSOA11",
                "nutrition_kgco2e_percap","other_shelter_kgco2e_percap",
                "consumables_kgco2e_percap","recreation_kgco2e_percap",
                "services_kgco2e_percap")]
saveRDS(lsoa,"data-prepared/consumption_footprint.Rds")
