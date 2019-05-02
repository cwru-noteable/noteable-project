-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: eecslab-9.case.edu    Database: team_7
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `CP_PC`
--

DROP TABLE IF EXISTS `CP_PC`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CP_PC` (
  `CP_ID` int(11) NOT NULL,
  `PC_ID` int(11) NOT NULL,
  PRIMARY KEY (`CP_ID`,`PC_ID`),
  KEY `pcid` (`PC_ID`),
  CONSTRAINT `CP_PC_ibfk_1` FOREIGN KEY (`CP_ID`) REFERENCES `CartridgeP` (`CP_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `CP_PC_ibfk_2` FOREIGN KEY (`PC_ID`) REFERENCES `Pen_Cartridge` (`PC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CP_PC`
--

LOCK TABLES `CP_PC` WRITE;
/*!40000 ALTER TABLE `CP_PC` DISABLE KEYS */;
INSERT INTO `CP_PC` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `CP_PC` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CP_R`
--

DROP TABLE IF EXISTS `CP_R`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CP_R` (
  `CP_ID` int(11) NOT NULL,
  `R_ID` int(11) NOT NULL,
  PRIMARY KEY (`CP_ID`,`R_ID`),
  KEY `rid` (`R_ID`),
  CONSTRAINT `CP_R_ibfk_1` FOREIGN KEY (`CP_ID`) REFERENCES `CartridgeP` (`CP_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `CP_R_ibfk_2` FOREIGN KEY (`R_ID`) REFERENCES `Replacements` (`R_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CP_R`
--

LOCK TABLES `CP_R` WRITE;
/*!40000 ALTER TABLE `CP_R` DISABLE KEYS */;
/*!40000 ALTER TABLE `CP_R` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CartridgeP`
--

DROP TABLE IF EXISTS `CartridgeP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CartridgeP` (
  `CP_ID` int(11) NOT NULL,
  `CP_Name` char(30) DEFAULT NULL,
  `CP_Material` char(30) DEFAULT NULL,
  `CP_Manufacturer` char(30) DEFAULT NULL,
  PRIMARY KEY (`CP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CartridgeP`
--

LOCK TABLES `CartridgeP` WRITE;
/*!40000 ALTER TABLE `CartridgeP` DISABLE KEYS */;
INSERT INTO `CartridgeP` VALUES (1,'G-2','Plastic','Pilot'),(2,'Jetstream','Plastic','Uni Mitsubishi'),(3,'Jetstream','Plastic','Uni Mitsubishi'),(4,'Preppy','Plastic','Platinum');
/*!40000 ALTER TABLE `CartridgeP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FP_I`
--

DROP TABLE IF EXISTS `FP_I`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FP_I` (
  `FP_ID` int(11) NOT NULL,
  `I_ID` int(11) NOT NULL,
  PRIMARY KEY (`FP_ID`,`I_ID`),
  KEY `fpi` (`I_ID`),
  CONSTRAINT `FP_I_ibfk_1` FOREIGN KEY (`FP_ID`) REFERENCES `FountainP` (`FP_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FP_I_ibfk_2` FOREIGN KEY (`I_ID`) REFERENCES `Ink` (`I_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FP_I`
--

LOCK TABLES `FP_I` WRITE;
/*!40000 ALTER TABLE `FP_I` DISABLE KEYS */;
INSERT INTO `FP_I` VALUES (1,1),(2,1),(1,2),(2,2),(1,3),(2,3);
/*!40000 ALTER TABLE `FP_I` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FP_R`
--

DROP TABLE IF EXISTS `FP_R`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FP_R` (
  `FP_ID` int(11) NOT NULL,
  `R_ID` int(11) NOT NULL,
  PRIMARY KEY (`FP_ID`,`R_ID`),
  KEY `rid` (`R_ID`),
  CONSTRAINT `FP_R_ibfk_1` FOREIGN KEY (`FP_ID`) REFERENCES `FountainP` (`FP_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FP_R_ibfk_2` FOREIGN KEY (`R_ID`) REFERENCES `Replacements` (`R_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FP_R`
--

LOCK TABLES `FP_R` WRITE;
/*!40000 ALTER TABLE `FP_R` DISABLE KEYS */;
/*!40000 ALTER TABLE `FP_R` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FountainP`
--

DROP TABLE IF EXISTS `FountainP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FountainP` (
  `FP_ID` int(11) NOT NULL,
  `FP_Name` char(30) DEFAULT NULL,
  `FP_Material` char(30) DEFAULT NULL,
  `FP_Manufacturer` char(30) DEFAULT NULL,
  `FP_Ink_Type` char(30) DEFAULT NULL,
  PRIMARY KEY (`FP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FountainP`
--

LOCK TABLES `FountainP` WRITE;
/*!40000 ALTER TABLE `FountainP` DISABLE KEYS */;
INSERT INTO `FountainP` VALUES (1,'TWSBI ECO','Metal/Plastic','TWSBI','Normal'),(2,'LAMY 2000','Metal','Lamy','Normal');
/*!40000 ALTER TABLE `FountainP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IC_CP`
--

DROP TABLE IF EXISTS `IC_CP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `IC_CP` (
  `IC_ID` int(11) NOT NULL,
  `CP_ID` int(11) NOT NULL,
  PRIMARY KEY (`IC_ID`,`CP_ID`),
  KEY `cpid` (`CP_ID`),
  CONSTRAINT `IC_CP_ibfk_1` FOREIGN KEY (`IC_ID`) REFERENCES `Implement_Collection` (`IC_ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `IC_CP_ibfk_2` FOREIGN KEY (`CP_ID`) REFERENCES `CartridgeP` (`CP_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IC_CP`
--

LOCK TABLES `IC_CP` WRITE;
/*!40000 ALTER TABLE `IC_CP` DISABLE KEYS */;
INSERT INTO `IC_CP` VALUES (1,1),(2,1),(2,2),(1,3),(1,4);
/*!40000 ALTER TABLE `IC_CP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IC_FP`
--

DROP TABLE IF EXISTS `IC_FP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `IC_FP` (
  `IC_ID` int(11) NOT NULL,
  `FP_ID` int(11) NOT NULL,
  PRIMARY KEY (`IC_ID`,`FP_ID`),
  KEY `fpid` (`FP_ID`),
  CONSTRAINT `IC_FP_ibfk_1` FOREIGN KEY (`IC_ID`) REFERENCES `Implement_Collection` (`IC_ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `IC_FP_ibfk_2` FOREIGN KEY (`FP_ID`) REFERENCES `FountainP` (`FP_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IC_FP`
--

LOCK TABLES `IC_FP` WRITE;
/*!40000 ALTER TABLE `IC_FP` DISABLE KEYS */;
INSERT INTO `IC_FP` VALUES (1,1),(2,1),(2,2);
/*!40000 ALTER TABLE `IC_FP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IC_MP`
--

DROP TABLE IF EXISTS `IC_MP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `IC_MP` (
  `IC_ID` int(11) NOT NULL,
  `MP_ID` int(11) NOT NULL,
  PRIMARY KEY (`IC_ID`,`MP_ID`),
  KEY `mpid` (`MP_ID`),
  CONSTRAINT `IC_MP_ibfk_1` FOREIGN KEY (`IC_ID`) REFERENCES `Implement_Collection` (`IC_ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `IC_MP_ibfk_2` FOREIGN KEY (`MP_ID`) REFERENCES `MechanicalP` (`MP_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IC_MP`
--

LOCK TABLES `IC_MP` WRITE;
/*!40000 ALTER TABLE `IC_MP` DISABLE KEYS */;
INSERT INTO `IC_MP` VALUES (1,1),(1,2),(2,2),(1,3),(2,3),(2,4);
/*!40000 ALTER TABLE `IC_MP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IC_WP`
--

DROP TABLE IF EXISTS `IC_WP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `IC_WP` (
  `IC_ID` int(11) NOT NULL,
  `WP_ID` int(11) NOT NULL,
  PRIMARY KEY (`IC_ID`,`WP_ID`),
  KEY `wpid` (`WP_ID`),
  CONSTRAINT `IC_WP_ibfk_1` FOREIGN KEY (`IC_ID`) REFERENCES `Implement_Collection` (`IC_ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `IC_WP_ibfk_2` FOREIGN KEY (`WP_ID`) REFERENCES `WoodP` (`WP_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IC_WP`
--

LOCK TABLES `IC_WP` WRITE;
/*!40000 ALTER TABLE `IC_WP` DISABLE KEYS */;
INSERT INTO `IC_WP` VALUES (1,1),(1,2);
/*!40000 ALTER TABLE `IC_WP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Implement_Collection`
--

DROP TABLE IF EXISTS `Implement_Collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Implement_Collection` (
  `IC_ID` int(11) NOT NULL,
  `U_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`IC_ID`),
  KEY `U_ID` (`U_ID`),
  CONSTRAINT `Implement_Collection_ibfk_1` FOREIGN KEY (`U_ID`) REFERENCES `user` (`U_ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Implement_Collection`
--

LOCK TABLES `Implement_Collection` WRITE;
/*!40000 ALTER TABLE `Implement_Collection` DISABLE KEYS */;
INSERT INTO `Implement_Collection` VALUES (1,1),(2,2),(3,3),(4,4);
/*!40000 ALTER TABLE `Implement_Collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ink`
--

DROP TABLE IF EXISTS `Ink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Ink` (
  `I_ID` int(11) NOT NULL,
  `I_Name` char(30) DEFAULT NULL,
  `I_Color` char(30) DEFAULT NULL,
  `I_Manufacturer` char(30) DEFAULT NULL,
  PRIMARY KEY (`I_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ink`
--

LOCK TABLES `Ink` WRITE;
/*!40000 ALTER TABLE `Ink` DISABLE KEYS */;
INSERT INTO `Ink` VALUES (1,'Super Black India Ink','Black','Speedball'),(2,'Eel Black Ink','Black','Noodlers'),(3,'Blue Ink','Blue','Noodlers');
/*!40000 ALTER TABLE `Ink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Lead`
--

DROP TABLE IF EXISTS `Lead`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Lead` (
  `L_ID` int(11) NOT NULL,
  `L_Size` double DEFAULT NULL,
  `L_Name` char(30) DEFAULT NULL,
  `L_Manufacturer` char(30) DEFAULT NULL,
  PRIMARY KEY (`L_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Lead`
--

LOCK TABLES `Lead` WRITE;
/*!40000 ALTER TABLE `Lead` DISABLE KEYS */;
INSERT INTO `Lead` VALUES (1,0.5,'Ain Stein','Pentel'),(2,0.7,'Ain Stein','Pentel'),(3,0.3,'Ain Stein','Pentel'),(4,0.5,'NanoDia','Uni Mitsubishi');
/*!40000 ALTER TABLE `Lead` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MP_L`
--

DROP TABLE IF EXISTS `MP_L`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MP_L` (
  `MP_ID` int(11) NOT NULL,
  `L_ID` int(11) NOT NULL,
  PRIMARY KEY (`MP_ID`,`L_ID`),
  KEY `lid` (`L_ID`),
  CONSTRAINT `MP_L_ibfk_1` FOREIGN KEY (`MP_ID`) REFERENCES `MechanicalP` (`MP_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `MP_L_ibfk_2` FOREIGN KEY (`L_ID`) REFERENCES `Lead` (`L_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MP_L`
--

LOCK TABLES `MP_L` WRITE;
/*!40000 ALTER TABLE `MP_L` DISABLE KEYS */;
INSERT INTO `MP_L` VALUES (1,1),(2,1),(3,1),(4,2),(1,4),(2,4),(3,4);
/*!40000 ALTER TABLE `MP_L` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MP_R`
--

DROP TABLE IF EXISTS `MP_R`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MP_R` (
  `MP_ID` int(11) NOT NULL,
  `R_ID` int(11) NOT NULL,
  PRIMARY KEY (`MP_ID`,`R_ID`),
  KEY `rid` (`R_ID`),
  CONSTRAINT `MP_R_ibfk_1` FOREIGN KEY (`MP_ID`) REFERENCES `MechanicalP` (`MP_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `MP_R_ibfk_2` FOREIGN KEY (`R_ID`) REFERENCES `Replacements` (`R_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MP_R`
--

LOCK TABLES `MP_R` WRITE;
/*!40000 ALTER TABLE `MP_R` DISABLE KEYS */;
INSERT INTO `MP_R` VALUES (2,1);
/*!40000 ALTER TABLE `MP_R` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MechanicalP`
--

DROP TABLE IF EXISTS `MechanicalP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MechanicalP` (
  `MP_ID` int(11) NOT NULL,
  `MP_Name` char(30) DEFAULT NULL,
  `MP_Material` char(30) DEFAULT NULL,
  `MP_Manufacturer` char(30) DEFAULT NULL,
  `MP_Lead_Size` double DEFAULT NULL,
  PRIMARY KEY (`MP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MechanicalP`
--

LOCK TABLES `MechanicalP` WRITE;
/*!40000 ALTER TABLE `MechanicalP` DISABLE KEYS */;
INSERT INTO `MechanicalP` VALUES (1,'Graphgear 500','Metal/Plastic','Pentel',0.5),(2,'Rotring 600','Metal/Plastic','Rotring',0.5),(3,'Uni Shift','Metal/Plastic','Uni Mitsubishi',0.5),(4,'Graphgear 1000','Metal/Plastic','Pentel',0.7);
/*!40000 ALTER TABLE `MechanicalP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OC_I`
--

DROP TABLE IF EXISTS `OC_I`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OC_I` (
  `OC_ID` int(11) NOT NULL,
  `I_ID` int(11) NOT NULL,
  PRIMARY KEY (`OC_ID`,`I_ID`),
  KEY `iid` (`I_ID`),
  CONSTRAINT `OC_I_ibfk_1` FOREIGN KEY (`OC_ID`) REFERENCES `Other_Collection` (`OC_ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `OC_I_ibfk_2` FOREIGN KEY (`I_ID`) REFERENCES `Ink` (`I_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OC_I`
--

LOCK TABLES `OC_I` WRITE;
/*!40000 ALTER TABLE `OC_I` DISABLE KEYS */;
INSERT INTO `OC_I` VALUES (1,2),(2,2);
/*!40000 ALTER TABLE `OC_I` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OC_L`
--

DROP TABLE IF EXISTS `OC_L`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OC_L` (
  `OC_ID` int(11) NOT NULL,
  `L_ID` int(11) NOT NULL,
  PRIMARY KEY (`OC_ID`,`L_ID`),
  KEY `lid` (`L_ID`),
  CONSTRAINT `OC_L_ibfk_1` FOREIGN KEY (`OC_ID`) REFERENCES `Other_Collection` (`OC_ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `OC_L_ibfk_2` FOREIGN KEY (`L_ID`) REFERENCES `Lead` (`L_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OC_L`
--

LOCK TABLES `OC_L` WRITE;
/*!40000 ALTER TABLE `OC_L` DISABLE KEYS */;
INSERT INTO `OC_L` VALUES (1,1),(2,2),(1,4);
/*!40000 ALTER TABLE `OC_L` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OC_PC`
--

DROP TABLE IF EXISTS `OC_PC`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OC_PC` (
  `OC_ID` int(11) NOT NULL,
  `PC_ID` int(11) NOT NULL,
  PRIMARY KEY (`OC_ID`,`PC_ID`),
  KEY `pcid` (`PC_ID`),
  CONSTRAINT `OC_PC_ibfk_1` FOREIGN KEY (`OC_ID`) REFERENCES `Other_Collection` (`OC_ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `OC_PC_ibfk_2` FOREIGN KEY (`PC_ID`) REFERENCES `Pen_Cartridge` (`PC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OC_PC`
--

LOCK TABLES `OC_PC` WRITE;
/*!40000 ALTER TABLE `OC_PC` DISABLE KEYS */;
INSERT INTO `OC_PC` VALUES (2,2),(2,3);
/*!40000 ALTER TABLE `OC_PC` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OC_R`
--

DROP TABLE IF EXISTS `OC_R`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OC_R` (
  `OC_ID` int(11) NOT NULL,
  `R_ID` int(11) NOT NULL,
  PRIMARY KEY (`OC_ID`,`R_ID`),
  KEY `rid` (`R_ID`),
  CONSTRAINT `OC_R_ibfk_1` FOREIGN KEY (`OC_ID`) REFERENCES `Other_Collection` (`OC_ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `OC_R_ibfk_2` FOREIGN KEY (`R_ID`) REFERENCES `Replacements` (`R_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OC_R`
--

LOCK TABLES `OC_R` WRITE;
/*!40000 ALTER TABLE `OC_R` DISABLE KEYS */;
/*!40000 ALTER TABLE `OC_R` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OC_U`
--

DROP TABLE IF EXISTS `OC_U`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OC_U` (
  `OC_ID` int(11) NOT NULL,
  `U_ID` int(11) NOT NULL,
  PRIMARY KEY (`OC_ID`,`U_ID`),
  KEY `uid` (`U_ID`),
  CONSTRAINT `OC_U_ibfk_1` FOREIGN KEY (`OC_ID`) REFERENCES `Other_Collection` (`OC_ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `OC_U_ibfk_2` FOREIGN KEY (`U_ID`) REFERENCES `Utility` (`U_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OC_U`
--

LOCK TABLES `OC_U` WRITE;
/*!40000 ALTER TABLE `OC_U` DISABLE KEYS */;
INSERT INTO `OC_U` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `OC_U` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Other_Collection`
--

DROP TABLE IF EXISTS `Other_Collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Other_Collection` (
  `OC_ID` int(11) NOT NULL,
  `U_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`OC_ID`),
  KEY `U_ID` (`U_ID`),
  CONSTRAINT `Other_Collection_ibfk_1` FOREIGN KEY (`U_ID`) REFERENCES `user` (`U_ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Other_Collection`
--

LOCK TABLES `Other_Collection` WRITE;
/*!40000 ALTER TABLE `Other_Collection` DISABLE KEYS */;
INSERT INTO `Other_Collection` VALUES (1,1),(2,2),(3,3),(4,4);
/*!40000 ALTER TABLE `Other_Collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pen_Cartridge`
--

DROP TABLE IF EXISTS `Pen_Cartridge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Pen_Cartridge` (
  `PC_ID` int(11) NOT NULL,
  `PC_Name` char(30) DEFAULT NULL,
  `PC_Type` char(30) DEFAULT NULL,
  `PC_Manufacturer` char(30) DEFAULT NULL,
  PRIMARY KEY (`PC_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pen_Cartridge`
--

LOCK TABLES `Pen_Cartridge` WRITE;
/*!40000 ALTER TABLE `Pen_Cartridge` DISABLE KEYS */;
INSERT INTO `Pen_Cartridge` VALUES (1,'G-2 .5','G-2 Style','Pilot'),(2,'Jetstream .5','Jetstream Style','Uni Mitsubishi'),(3,'Parker .5','Parker Style','Parker');
/*!40000 ALTER TABLE `Pen_Cartridge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Replacements`
--

DROP TABLE IF EXISTS `Replacements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Replacements` (
  `R_ID` int(11) NOT NULL,
  `R_Name` char(30) DEFAULT NULL,
  `R_Type` char(30) DEFAULT NULL,
  `R_Manufacturer` char(30) DEFAULT NULL,
  PRIMARY KEY (`R_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Replacements`
--

LOCK TABLES `Replacements` WRITE;
/*!40000 ALTER TABLE `Replacements` DISABLE KEYS */;
INSERT INTO `Replacements` VALUES (1,'Rotring 600 .5mm Tip','Mechanical Pencil Part','Rotring');
/*!40000 ALTER TABLE `Replacements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Utility`
--

DROP TABLE IF EXISTS `Utility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Utility` (
  `U_ID` int(11) NOT NULL,
  `U_Name` char(30) DEFAULT NULL,
  `U_Type` char(30) DEFAULT NULL,
  `U_Manufacturer` char(30) DEFAULT NULL,
  PRIMARY KEY (`U_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Utility`
--

LOCK TABLES `Utility` WRITE;
/*!40000 ALTER TABLE `Utility` DISABLE KEYS */;
INSERT INTO `Utility` VALUES (1,'Shredder Scissors','Scissors','Sun-Star'),(2,'Harinacs Stapleless Stapler','Stapler','Kokuyo'),(3,'Boxy Eraser','Eraser','Uni Mitsubishi');
/*!40000 ALTER TABLE `Utility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WoodP`
--

DROP TABLE IF EXISTS `WoodP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `WoodP` (
  `WP_ID` int(11) NOT NULL,
  `WP_Name` char(30) DEFAULT NULL,
  `WP_Material` char(30) DEFAULT NULL,
  `WP_Manufacturer` char(30) DEFAULT NULL,
  PRIMARY KEY (`WP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WoodP`
--

LOCK TABLES `WoodP` WRITE;
/*!40000 ALTER TABLE `WoodP` DISABLE KEYS */;
INSERT INTO `WoodP` VALUES (1,'Wopex','Plastic','Staedtler'),(2,'Blackwing','Wood','Palomino'),(3,'Hi-Uni','Wood','Uni Mitsubishi');
/*!40000 ALTER TABLE `WoodP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `U_ID` int(11) NOT NULL,
  `U_Name` char(30) DEFAULT NULL,
  `IC_ID` int(11) NOT NULL,
  `OC_ID` int(11) NOT NULL,
  PRIMARY KEY (`U_ID`),
  KEY `user_ibfk_1` (`IC_ID`),
  KEY `user_ibfk_2` (`OC_ID`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`IC_ID`) REFERENCES `Implement_Collection` (`IC_ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`OC_ID`) REFERENCES `Other_Collection` (`OC_ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Brendan',1,1),(2,'Zubair',2,2),(3,'Test Human',3,3),(4,'Test Human 2',4,4);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-01 21:06:20
