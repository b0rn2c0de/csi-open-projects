-- phpMyAdmin SQL Dump
-- version 4.0.9
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 17, 2016 at 06:55 PM
-- Server version: 5.6.14
-- PHP Version: 5.5.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `openprojects`
--

-- --------------------------------------------------------

--
-- Table structure for table `ideas`
--

CREATE TABLE IF NOT EXISTS `ideas` (
  `idea_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `shortd` text NOT NULL,
  `longd` text,
  `timespan` varchar(20) NOT NULL,
  `facets` text NOT NULL,
  `pl_win` tinyint(1) DEFAULT NULL,
  `pl_web` tinyint(1) DEFAULT NULL,
  `pl_android` tinyint(1) DEFAULT NULL,
  `pl_ios` tinyint(1) DEFAULT NULL,
  `pl_fos` tinyint(1) NOT NULL,
  `target` text,
  `funding` text,
  `resources` text,
  `competition` text,
  `experience` text NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `posted_on` datetime NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idea_id`),
  UNIQUE KEY `idea_id` (`idea_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `ideas`
--

INSERT INTO `ideas` (`idea_id`, `title`, `shortd`, `longd`, `timespan`, `facets`, `pl_win`, `pl_web`, `pl_android`, `pl_ios`, `pl_fos`, `target`, `funding`, `resources`, `competition`, `experience`, `owner_id`, `posted_on`, `status`) VALUES
(1, 'myproject', 'testing it ', NULL, '4 - 6 weeks', 'Designer (UI + Branding),Backend Developer', 1, 1, 0, 1, 0, 'targets', 'funding', 'external', 'compop', '', NULL, '0000-00-00 00:00:00', 0),
(2, 'myproject', 'testing it ', NULL, '4 - 6 weeks', 'Designer (UI + Branding),Backend Developer', 1, 1, 0, 1, 0, 'targets', 'funding', 'external', 'compop', '', NULL, '0000-00-00 00:00:00', 0),
(3, 'myproject', 'testing it ', NULL, '4 - 6 weeks', 'Designer (UI + Branding),Backend Developer', 1, 1, 0, 1, 0, 'targets', 'funding', 'external', 'compop', '', NULL, '0000-00-00 00:00:00', 0),
(4, 'myproject', 'testing it ', NULL, '4 - 6 weeks', 'Designer (UI + Branding),Backend Developer', 1, 1, 0, 1, 0, 'targets', 'funding', 'external', 'compop', '', NULL, '0000-00-00 00:00:00', 0),
(5, 'openprojects', 'short description', NULL, 'Less than 2 weeks', 'Manager/Business Analyst,Windows Developer', 1, 1, 0, 0, 0, 'target', 'funding', 'er', 'compo', '', NULL, '2016-01-13 02:14:02', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
