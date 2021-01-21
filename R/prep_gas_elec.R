# population

dir.create("tmp")
unzip("data/population/sape22dt2mid2019lsoasyoaestimatesunformatted.zip",
      exdir = "tmp")
pop <- readxl::read_excel("tmp/SAPE22DT2-mid-2019-lsoa-syoa-estimates-unformatted.xlsx",
                          sheet = "Mid-2019 Persons")


# gas

gas <- read.csv("../../creds2/Excess-Data-Exploration/data-prepared/Gas_2010-17.csv")
gas <- gas[,c(1,23:30)]

