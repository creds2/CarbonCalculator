source("../../creds2/CarbonCalculator/R/secure_path.R")
library(dplyr)

msoa <- read.csv("data/income/totalannualincome2018.csv")
names(msoa) <- msoa[4,]
msoa <- msoa[5:nrow(msoa),]
msoa <- msoa[,c("MSOA code","Total annual income (£)")]
names(msoa) <- c("MSOA11CD","annual_income")
msoa$annual_income <- as.numeric(gsub(",","",msoa$annual_income))

dir.create("tmp2")
unzip(file.path(secure_path,"/Tim Share/From Malcolm/Experian.zip"),
      exdir = "tmp2")
income <- read.csv("tmp2/UKDA-5738-csv/csv/2011-experian-data.csv")
names(income) <- income[4,]
income <- income[5:nrow(income),]
income <- income[,c("GeographyValue","Median_(H) Household Income Value")]
names(income) <- c("LSOA01","median_household_income")

income <- income[substr(income$LSOA,1,1) == "E",]
income$median_household_income <- as.numeric(income$median_household_income)
#income$centile <- percentile(income$median_household_income) / 100

lsoa_lookup <- read.csv("data/bounds/lsoa_2001_2011_lookup.csv")
lsoa_lookup <- lsoa_lookup[,c(1,3,5)]
names(lsoa_lookup) <- c("LSOA01","LSOA11","Change")

msoa2lsoa <-  read.csv(paste0(substr(secure_path,1,39),"OA Bounadries/GB_OA_LSOA_MSOA_LAD_Classifications_2017.csv"))
msoa2lsoa <- msoa2lsoa[,c("LSOA11CD","MSOA11CD")]
msoa2lsoa <- unique(msoa2lsoa)
msoa2lsoa <- msoa2lsoa[substr(msoa2lsoa$LSOA11CD,1,1) == "E",]

lsoa_income <- left_join(msoa2lsoa, msoa, by = "MSOA11CD")

lsoa_lookup <- lsoa_lookup[lsoa_lookup$LSOA01 %in% income$LSOA01,]
lsoa_lookup <- lsoa_lookup[!duplicated(lsoa_lookup$LSOA11),]

lsoa_income <- left_join(lsoa_income, lsoa_lookup, by = c("LSOA11CD" = "LSOA11"))

lsoa_income <- left_join(lsoa_income, income, by = c("LSOA01" = "LSOA01"))

weightings <- lsoa_income %>%
  group_by(MSOA11CD) %>%
  group_split()

income_final <- lapply(weightings, function(x){
  x$weight <- x$median_household_income / mean(x$median_household_income, na.rm = T)
  x$income_lsoa <- x$annual_income * x$weight
  x$income_lsoa[is.na(x$income_lsoa)] <- x$annual_income[1]
  x <- x[,c("LSOA11CD","income_lsoa")]
  return(x)
})
income_final <- bind_rows(income_final)

saveRDS(income_final, "data/income/lsoa_income_estimates.Rds")
