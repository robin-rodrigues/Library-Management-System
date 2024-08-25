CREATE DATABASE  IF NOT EXISTS `library_management_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `library_management_system`;
-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: library_management_system
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_books_request`
--

DROP TABLE IF EXISTS `admin_books_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_books_request` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `genre` varchar(300) NOT NULL,
  `title` varchar(300) NOT NULL,
  `author` varchar(300) NOT NULL,
  `edition` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_books_request`
--

LOCK TABLES `admin_books_request` WRITE;
/*!40000 ALTER TABLE `admin_books_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_books_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `genre` varchar(300) NOT NULL,
  `title` varchar(300) NOT NULL,
  `author` varchar(300) NOT NULL,
  `publisher` varchar(300) NOT NULL,
  `edition` int NOT NULL,
  `isbn` varchar(100) NOT NULL,
  `pages` int NOT NULL,
  `date_issued` date DEFAULT NULL,
  `supplier_id` int NOT NULL,
  PRIMARY KEY (`book_id`),
  KEY `idx_bks_bkid_uid` (`book_id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,5,'Horror','Zombie Day','Kazi Nazrul Islam','Nazrul Publications',3,'jfklsgsdlg5qw7q87w',800,'2018-07-10',0),(3,4,'Adventure','A Song of Ice & Fire','George R. R. Martin','Game of Thrones',8,'has23dadh123427',1200,'2018-07-11',0),(4,5,'Adventure','Harry Potter & The Half Blood Prince','J.K Rowling','Rowling\'s Publications',1,'31ghf1jk24kjb3l4l1gjh',667,'2018-07-10',0),(5,2,'Adventure','Harry Potter & The Deadly Hallows','J.K Rowling','Rowling\'s Publications',2,'agsh32gqkj12bkl134',798,'2018-07-10',0),(7,0,'Mystery','The Mysterious Affair at Styles','Agatha Christie','Agatha Publications',2,'4zgdhdv2dfh81v31sdgj',669,'2018-07-11',0),(10,0,'Modern Literature','In Search of Lost Time','Marcel Proust','NY Publishers',8,'2j3nsd235habh3dfkj',4215,'2018-07-11',0);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books_request`
--

DROP TABLE IF EXISTS `books_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books_request` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `genre` varchar(300) NOT NULL,
  `title` varchar(300) NOT NULL,
  `author` varchar(300) NOT NULL,
  `edition` int NOT NULL,
  `isbn` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `publisher` varchar(300) NOT NULL,
  `pages` int NOT NULL,
  `book_id` int NOT NULL,
  PRIMARY KEY (`request_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books_request`
--

LOCK TABLES `books_request` WRITE;
/*!40000 ALTER TABLE `books_request` DISABLE KEYS */;
INSERT INTO `books_request` VALUES (1,2,'Mystery','Murder on the Orient Express','Agatha Christie',3,'12gf3gj1jhr3jklj1ugjkb','2018-07-10','',0,0),(2,5,'Mystery','The Mysterious Affair at Styles','Agatha Christie',3,'4zgdhdv2dfh81v31sdgj','2018-07-10','',0,0),(3,4,'Mystery','The Mysterious Affair at Styles','Agatha Christie',3,'4zgdhdv2dfh81v31sdgj','2018-07-10','',0,0);
/*!40000 ALTER TABLE `books_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issue_date`
--

DROP TABLE IF EXISTS `issue_date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issue_date` (
  `issue_id` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `user_id` int NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`issue_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue_date`
--

LOCK TABLES `issue_date` WRITE;
/*!40000 ALTER TABLE `issue_date` DISABLE KEYS */;
INSERT INTO `issue_date` VALUES (1,1,2,'2018-07-10'),(2,5,2,'2018-07-10'),(3,3,2,'2018-07-10'),(4,4,5,'2018-07-10'),(5,1,2,'2018-07-10'),(6,5,5,'2018-07-10'),(7,1,5,'2018-07-10'),(8,4,5,'2018-07-10'),(9,3,5,'2018-07-10'),(10,5,5,'2018-07-10'),(11,3,5,'2018-07-10'),(12,3,5,'2018-07-10'),(13,3,5,'2018-07-10'),(14,3,5,'2018-07-10'),(15,3,4,'2018-07-10'),(16,1,5,'2018-07-10'),(17,3,5,'2018-07-10'),(18,5,2,'2018-07-10'),(19,3,4,'2018-07-11'),(20,7,4,'2018-07-11'),(21,7,5,'2018-07-11'),(22,3,4,'2018-07-11');
/*!40000 ALTER TABLE `issue_date` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier_books`
--

DROP TABLE IF EXISTS `supplier_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier_books` (
  `sup_book_id` int NOT NULL AUTO_INCREMENT,
  `genre` varchar(300) NOT NULL,
  `title` varchar(300) NOT NULL,
  `author` varchar(300) NOT NULL,
  `publisher` varchar(300) NOT NULL,
  `edition` int NOT NULL,
  `isbn` varchar(100) NOT NULL,
  `pages` int NOT NULL,
  `supplier_id` int NOT NULL,
  PRIMARY KEY (`sup_book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier_books`
--

LOCK TABLES `supplier_books` WRITE;
/*!40000 ALTER TABLE `supplier_books` DISABLE KEYS */;
/*!40000 ALTER TABLE `supplier_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `supplier_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `email` varchar(300) NOT NULL,
  `password` varchar(300) NOT NULL,
  `address` varchar(300) NOT NULL,
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `email` varchar(300) NOT NULL,
  `is_admin` tinyint NOT NULL,
  `password` varchar(300) NOT NULL,
  `address` varchar(300) NOT NULL,
  `gender` varchar(300) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `idx_users_uid_email` (`user_id`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Robin','01711568524','robin.r@gmail.com',1,'1234','Mira Road, Mumbai','Male'),(2,'Parth','01764431859','parth.s@gmail.com',0,'yellow','Ghatkopar, Mumbai','Male'),(4,'Michelle','01924184941','michelle.d@outlook.com',0,'horse','Bhayandar, Mumbai','Female'),(5,'Anasuya','01723645289','anasuya.s@gmail.com',0,'abcd','Mira Road, Mumbai','Female'),(6,'Suyog','01782963175','suyog.m@gmail.com',0,'qwerty','Alibag, Raigad','Male'),(7,'Siddhanath','01932478293','siddhanath.b@gmail.com',0,'punes','Pune, Pune','Male'),(8,'Lizter','01726972364','lizter.d@gmail.com',0,'lizdisney','Chikkamagaluru, Karnataka','Male');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'library_management_system'
--

--
-- Dumping routines for database 'library_management_system'
--

--
-- Change global variable 'sql_mode' to support grouping without all columns in group by 
--
SET GLOBAL sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-24 22:07:11
