# population

# 2019
dir.create("tmp")
unzip("data/population/sape22dt2mid2019lsoasyoaestimatesunformatted.zip",
      exdir = "tmp")
pop19 <- readxl::read_excel("tmp/SAPE22DT2-mid-2019-lsoa-syoa-estimates-unformatted.xlsx",
                          sheet = "Mid-2019 Persons")
unlink("tmp", recursive = TRUE)
pop19 <- as.data.frame(pop19)
names(pop19) <- pop19[4,]
pop19 <- pop19[5:nrow(pop19),]
pop19 <- pop19[,c(1,7)]

# 2018
dir.create("tmp")
unzip("data/population/pop2018.zip",
      exdir = "tmp")
pop18 <- readxl::read_excel("tmp/SAPE21DT1a-mid-2018-on-2019-LA-lsoa-syoa-estimates-formatted.xlsx",
                            sheet = "Mid-2018 Persons")
unlink("tmp", recursive = TRUE)
pop18 <- as.data.frame(pop18)
names(pop18) <- pop18[4,]
pop18 <- pop18[5:nrow(pop18),]
pop18 <- pop18[,c(1,4)]


# 2017
dir.create("tmp")
unzip("data/population/pop2017.zip",
      exdir = "tmp")
pop17 <- readxl::read_excel("tmp/SAPE20DT1-mid-2017-lsoa-syoa-estimates-formatted.XLS",
                            sheet = "Mid-2017 Persons")
unlink("tmp", recursive = TRUE)
pop17 <- as.data.frame(pop17)
names(pop17) <- pop17[4,]
pop17 <- pop17[5:nrow(pop17),]
pop17 <- pop17[,c(1,4)]


# 2016
dir.create("tmp")
unzip("data/population/pop2016.zip",
      exdir = "tmp")
pop16 <- readxl::read_excel("tmp/SAPE20DT1-mid-2016-lsoa-syoa-estimates-formatted.XLS",
                            sheet = "Mid-2016 Persons")
unlink("tmp", recursive = TRUE)
pop16 <- as.data.frame(pop16)
names(pop16) <- pop16[4,]
pop16 <- pop16[5:nrow(pop16),]
pop16 <- pop16[,c(1,4)]

# 2015
dir.create("tmp")
unzip("data/population/pop2015.zip",
      exdir = "tmp")
pop15 <- readxl::read_excel("tmp/SAPE20DT1-mid-2015-lsoa-syoa-estimates-formatted.XLS",
                            sheet = "Mid-2015 Persons")
unlink("tmp", recursive = TRUE)
pop15 <- as.data.frame(pop15)
names(pop15) <- pop15[4,]
pop15 <- pop15[5:nrow(pop15),]
pop15 <- pop15[,c(1,4)]

# 2014
dir.create("tmp")
unzip("data/population/pop2014.zip",
      exdir = "tmp")
pop14 <- readxl::read_excel("tmp/SAPE20DT1-mid-2014-lsoa-syoa-estimates-formatted.XLS",
                            sheet = "Mid-2014 Persons")
unlink("tmp", recursive = TRUE)
pop14 <- as.data.frame(pop14)
names(pop14) <- pop14[4,]
pop14 <- pop14[5:nrow(pop14),]
pop14 <- pop14[,c(1,4)]

# 2013
dir.create("tmp")
unzip("data/population/pop2013.zip",
      exdir = "tmp")
pop13 <- readxl::read_excel("tmp/SAPE20DT1-mid-2013-lsoa-syoa-estimates-formatted.XLS",
                            sheet = "Mid-2013 Persons")
unlink("tmp", recursive = TRUE)
pop13 <- as.data.frame(pop13)
names(pop13) <- pop13[4,]
pop13 <- pop13[5:nrow(pop13),]
pop13 <- pop13[,c(1,4)]

# 2012
dir.create("tmp")
unzip("data/population/pop2012.zip",
      exdir = "tmp")
pop12 <- readxl::read_excel("tmp/SAPE20DT1-mid-2012-lsoa-syoa-estimates-formatted.XLS",
                            sheet = "Mid-2012 Persons")
unlink("tmp", recursive = TRUE)
pop12 <- as.data.frame(pop12)
names(pop12) <- pop12[4,]
pop12 <- pop12[5:nrow(pop12),]
pop12 <- pop12[,c(1,4)]

# 2011
dir.create("tmp")
unzip("data/population/pop2011.zip",
      exdir = "tmp")
pop11 <- readxl::read_excel("tmp/mid-2011-lsoa-quinary-estimates.xls",
                            sheet = "Mid-2011 Persons")
unlink("tmp", recursive = TRUE)
pop11 <- as.data.frame(pop11)
names(pop11) <- pop11[3,]
pop11 <- pop11[4:nrow(pop11),]
pop11 <- pop11[,c(1,4)]


names(pop11) <- c("code","pop_2011")
names(pop12) <- c("code","pop_2012")
names(pop13) <- c("code","pop_2013")
names(pop14) <- c("code","pop_2014")
names(pop15) <- c("code","pop_2015")
names(pop16) <- c("code","pop_2016")
names(pop17) <- c("code","pop_2017")
names(pop18) <- c("code","pop_2018")
names(pop19) <- c("code","pop_2019")


pop11 <- pop11[substr(pop11$code,1,1) == "E",]
pop12 <- pop12[substr(pop12$code,1,1) == "E",]
pop13 <- pop13[substr(pop13$code,1,1) == "E",]
pop14 <- pop14[substr(pop14$code,1,1) == "E",]
pop15 <- pop15[substr(pop15$code,1,1) == "E",]
pop16 <- pop16[substr(pop16$code,1,1) == "E",]
pop17 <- pop17[substr(pop17$code,1,1) == "E",]
pop18 <- pop18[substr(pop18$code,1,1) == "E",]
pop19 <- pop19[substr(pop19$code,1,1) == "E",]

pop_all <- pop19
pop_all <- left_join(pop_all, pop11, by = "code")
pop_all <- left_join(pop_all, pop12, by = "code")
pop_all <- left_join(pop_all, pop13, by = "code")
pop_all <- left_join(pop_all, pop14, by = "code")
pop_all <- left_join(pop_all, pop15, by = "code")
pop_all <- left_join(pop_all, pop16, by = "code")
pop_all <- left_join(pop_all, pop17, by = "code")
pop_all <- left_join(pop_all, pop18, by = "code")


pop_all[2:10] <- lapply(pop_all[2:10], as.numeric)
summary(pop_all)

# lsoa_ew <- read.csv("data/bounds/lsoa_2001_2011_lookup.csv")
# names(lsoa_ew)[1] <- "LSOA01CD"
# summary(lsoa_ew$LSOA01CD %in% pop13$code)
# summary(lsoa_ew$LSOA11CD %in% pop13$code)
# summary(pop13$code  %in% lsoa_ew$LSOA11CD)
# 
# pop_all <- pop_all[substr(pop_all$code,1,1) == "E",]
# 
# pop_all <- pop_all[pop_all$code %in% lsoa_ew$LSOA11CD,]



saveRDS(pop_all, "data-prepared/LSOA_population_2011_2019.Rds")
