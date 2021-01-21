ch <- read.csv("data/central_heating/EW_lsoa_central_heating.csv",
               stringsAsFactors = FALSE, row.names = NULL)
names(ch) <- c("LSOA11_name","LSOA11",
               "all_households","no_heating",
               "gas","electric",
               "oil","solid_fuel",
               "other_heating","two_types")

# Emission Factors
# Defra emission factors 2020
# https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2020

emissions_oil <- c(0.25964) # buring oil
emissions_solid <- c(0.36276) # coal
emissions_other <- c(0.25964) # Also oil, not sure what else to use

gas <- read.csv("../../creds2/Excess-Data-Exploration/data-prepared/Gas_2010-17.csv")
gas <- gas[,c("MeanDomGas_10_kWh","MeanDomGas_11_kWh","MeanDomGas_12_kWh",
              "MeanDomGas_13_kWh","MeanDomGas_14_kWh","MeanDomGas_15_kWh",
              "MeanDomGas_16_kWh","MeanDomGas_17_kWh")]

gas_average <- lapply(gas, mean, na.rm = TRUE)

ch$oil_emissions_total <- ch$oil * emissions_oil * gas_average$MeanDomGas_11_kWh
ch$solid_fuel_emissions_total <- ch$solid_fuel * emissions_solid * gas_average$MeanDomGas_11_kWh
ch$other_heating_emissions_total <- ch$other_heating * emissions_other * gas_average$MeanDomGas_11_kWh

ch$non_gaselec_emission_total <- ch$oil_emissions_total + ch$solid_fuel_emissions_total + ch$other_heating_emissions_total
summary(ch$non_gaselec_emission_total)

saveRDS(ch, "data-prepared/non_gaselec_emissions.Rds")
