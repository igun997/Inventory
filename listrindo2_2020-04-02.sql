# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.29)
# Database: listrindo2
# Generation Time: 2020-04-02 11:12:26 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `code` varchar(20) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `category_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;

INSERT INTO `category` (`id`, `name`, `code`, `category_id`, `parent_id`)
VALUES
	(1,'GTG',NULL,NULL,NULL),
	(2,'STG','',1,NULL),
	(3,NULL,'#1',NULL,1),
	(8,'OHL',NULL,NULL,NULL),
	(13,NULL,'#1',NULL,8),
	(14,NULL,'#1',NULL,2),
	(16,NULL,'#2',NULL,1),
	(19,NULL,'#3',NULL,1),
	(20,NULL,'#4',NULL,1),
	(21,NULL,'#5',NULL,1),
	(22,NULL,'#6',NULL,1),
	(23,NULL,'#7',NULL,1),
	(24,NULL,'#8',NULL,1),
	(25,NULL,'#9',NULL,1),
	(26,NULL,'#2',NULL,2),
	(27,NULL,'#3',NULL,2);

/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table record
# ------------------------------------------------------------

DROP TABLE IF EXISTS `record`;

CREATE TABLE `record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `total` double NOT NULL,
  `unit_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `data_created` bigint(20) NOT NULL,
  `input_created` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `unit_id` (`unit_id`),
  CONSTRAINT `record_ibfk_1` FOREIGN KEY (`unit_id`) REFERENCES `unit` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `record_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `record` WRITE;
/*!40000 ALTER TABLE `record` DISABLE KEYS */;

INSERT INTO `record` (`id`, `total`, `unit_id`, `category_id`, `data_created`, `input_created`)
VALUES
	(7,1234569,1,3,1585785600,1585825673),
	(8,1234567,1,3,1585699200,1585825694),
	(9,1234569.1,1,16,1585785600,1585825791),
	(10,1234567.1,1,16,1585699200,1585825844);

/*!40000 ALTER TABLE `record` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table unit
# ------------------------------------------------------------

DROP TABLE IF EXISTS `unit`;

CREATE TABLE `unit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `unit` WRITE;
/*!40000 ALTER TABLE `unit` DISABLE KEYS */;

INSERT INTO `unit` (`id`, `name`)
VALUES
	(1,'MWh');

/*!40000 ALTER TABLE `unit` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
