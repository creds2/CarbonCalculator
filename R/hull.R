# Extract data for HULL
library(sf)
library(tmap)
tmap_mode("view")

bounds <- read_sf("data/bounds/la_bounds.geojson")
epc <- read_sf("C:/tiles/epc/epc_wiggle2.geojson")
pc <- read_sf("../EnergyCrisis/data/tiles/gas_electric_postcodes.geojson")

bounds <- bounds[bounds$Name == "City of Kingston upon Hull (B)",]

sf_use_s2(FALSE)
epc <- epc[bounds,]
pc2 <- st_make_valid(pc)
pc2 <- pc2[bounds,]

st_write(epc,"data/hull_epc_certificates.geojson")

pc2$cost_gas_2023 = round(103.99 + pc2$gas_kwh_median * 0.103)
pc2$cost_gas_2022 = round(99.35 + pc2$gas_kwh_median * 0.0737)
pc2$cost_elec_2023 = round(169.21 + pc2$elec_kwh_median * 0.34)
pc2$cost_elec_2022 = round(165.49 + pc2$elec_kwh_median * 0.2834)

st_write(pc2,"data/hull_postcode_gas_electric.geojson")
