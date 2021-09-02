-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 02, 2021 at 10:10 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `electro`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `Cust_id` int(11) NOT NULL,
  `First_name` varchar(50) NOT NULL,
  `Last_name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` varchar(20) NOT NULL DEFAULT 'customer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`Cust_id`, `First_name`, `Last_name`, `Email`, `Password`, `Role`) VALUES
(1019, 'buthsara', 'madhushanka', 'buthsaramadhushanka@gmail.com', '$2b$10$E/m1.N4WWEB02TM88A1SnuAudCnMell0cmwb1WwIQliAyBuAsD1B.', 'customer'),
(1020, 'Tharindu', 'Dulshan', 'twtdulshan@gmail.com', '$2b$10$GLExitPGWHXpIChzY.VKx.jCkzrDWjAX08nCwYYgzJ6YotxLIQSSO', 'customer'),
(1022, 'Ashika', 'Abeysuriya', 'ashika234@gmail.com', '$2b$10$MCo6b6AfuZoMiyMx/eng3epcr6WyYX88htBu302jfIWW4svRDcGXG', 'customer'),
(1023, 'asdf', 'dfgh', 'asdf@gmail.com', '$2b$10$Tb9EgftKYXqauciqkkBbj.k54BOBMmYQtUsz6dJWczBio2lgU09Re', 'customer');

-- --------------------------------------------------------

--
-- Table structure for table `ebill_monthly_plan`
--

CREATE TABLE `ebill_monthly_plan` (
  `bill_id` int(11) NOT NULL,
  `Total_cost_tou` float NOT NULL,
  `Cost_day_time` float NOT NULL,
  `Cost_off_peak_time` float NOT NULL,
  `Cost_peak_time` float NOT NULL,
  `Total_cost_fixed` float NOT NULL,
  `Units_day_time` int(11) NOT NULL,
  `Units_off_peak_time` int(11) NOT NULL,
  `Units_peak_time` int(11) NOT NULL,
  `Total_units` int(11) NOT NULL,
  `Best_model` varchar(20) NOT NULL,
  `Cust_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ebill_monthly_plan`
--

INSERT INTO `ebill_monthly_plan` (`bill_id`, `Total_cost_tou`, `Cost_day_time`, `Cost_off_peak_time`, `Cost_peak_time`, `Total_cost_fixed`, `Units_day_time`, `Units_off_peak_time`, `Units_peak_time`, `Total_units`, `Best_model`, `Cust_id`) VALUES
(1, 4846.2, 375, 3931.2, 0, 10246.5, 15, 302, 0, 317, 'TOU', 1020),
(1, 657.79, 0, 37.44, 80.352, 40.92, 0, 3, 1, 4, 'Fixed', 1021),
(1, 543.71, 0.906667, 0.5083, 2.295, 0, 0, 0, 0, 0, '', 1022),
(2, 3744, 1350, 234, 1620, 1584, 54, 18, 30, 102, 'Fixed', 1020),
(2, 173340, 30000, 78000, 64800, 373964, 1200, 6000, 1200, 8400, 'TOU', 1021);

-- --------------------------------------------------------

--
-- Table structure for table `ebill_special_event_fixed`
--

CREATE TABLE `ebill_special_event_fixed` (
  `bill_id` int(11) NOT NULL,
  `Total_cost_fixed` float NOT NULL,
  `Total_units` float NOT NULL,
  `Cust_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ebill_special_event_tou`
--

CREATE TABLE `ebill_special_event_tou` (
  `bill_id` int(11) NOT NULL,
  `Total_cost_tou` float NOT NULL,
  `Cost_day_time` float NOT NULL,
  `Cost_off_peak_time` float NOT NULL,
  `Cost_peak_time` float NOT NULL,
  `Units_day_time` float NOT NULL,
  `Units_off_peak_time` float NOT NULL,
  `Units_peak_time` float NOT NULL,
  `Total_units` float NOT NULL,
  `Cust_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ebill_special_event_tou`
--

INSERT INTO `ebill_special_event_tou` (`bill_id`, `Total_cost_tou`, `Cost_day_time`, `Cost_off_peak_time`, `Cost_peak_time`, `Units_day_time`, `Units_off_peak_time`, `Units_peak_time`, `Total_units`, `Cust_id`) VALUES
(1, 543.71, 0.906667, 0.5083, 2.295, 0, 0, 0, 0, 1022),
(1, 540, 0, 0, 0, 0, 0, 0, 0, 1023),
(2, 540, 0, 0, 0, 0, 0, 0, 0, 1023),
(3, 540, 0, 0, 0, 0, 0, 0, 0, 1023),
(4, 540, 0, 0, 0, 0, 0, 0, 0, 1023),
(5, 558.07, 5.87833, 3.3384, 8.856, 0, 0, 0, 0, 1023);

-- --------------------------------------------------------

--
-- Table structure for table `electric_device_mplan`
--

CREATE TABLE `electric_device_mplan` (
  `device_id` int(11) NOT NULL,
  `bill_id` int(11) NOT NULL,
  `appliance` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `hPeak` int(11) DEFAULT NULL,
  `mPeak` int(11) DEFAULT NULL,
  `hOffPeak` int(11) DEFAULT NULL,
  `mOffPeak` int(11) DEFAULT NULL,
  `hDay` int(11) DEFAULT NULL,
  `mDay` int(11) DEFAULT NULL,
  `priority` varchar(20) NOT NULL,
  `using_minutes_peak_time` float NOT NULL,
  `using_minutes_off_peak_time` float NOT NULL,
  `using_minutes_day_time` float NOT NULL,
  `power` float NOT NULL,
  `total_units` float NOT NULL,
  `units_peak_time` float NOT NULL,
  `units_off_peak_time` float NOT NULL,
  `units_day_time` float NOT NULL,
  `total_cost_TOU` float NOT NULL,
  `cost_peak_time` float NOT NULL,
  `cost_off_peak_time` float NOT NULL,
  `cost_day_time` float NOT NULL,
  `Cust_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `electric_device_mplan`
--

INSERT INTO `electric_device_mplan` (`device_id`, `bill_id`, `appliance`, `quantity`, `hPeak`, `mPeak`, `hOffPeak`, `mOffPeak`, `hDay`, `mDay`, `priority`, `using_minutes_peak_time`, `using_minutes_off_peak_time`, `using_minutes_day_time`, `power`, `total_units`, `units_peak_time`, `units_off_peak_time`, `units_day_time`, `total_cost_TOU`, `cost_peak_time`, `cost_off_peak_time`, `cost_day_time`, `Cust_id`) VALUES
(1, 1, 'tv', 1, 1, 10, 1, 30, 1, 30, 'low', 6010, 6030, 6030, 230, 69.2683, 23.0383, 23.115, 23.115, 2122.44, 1244.07, 300.495, 577.875, 1019),
(2, 1, 'radio', 1, 1, 20, 1, 30, 1, 40, 'low', 80, 90, 100, 230, 1.035, 0.306667, 0.345, 0.383333, 30.6283, 16.56, 4.485, 9.58333, 1019),
(3, 1, 'TV', 2, 0, 0, 4, 0, 1, 0, 'mid', 0, 240, 60, 250, 75, 0, 60, 15, 1155, 0, 780, 375, 1020),
(4, 1, 'radio', 2, 0, 0, 2, 0, 0, 0, 'high', 0, 120, 0, 20, 2.4, 0, 2.4, 0, 31.2, 0, 31.2, 0, 1020),
(5, 1, 'Tv', 2, 2, 4, 2, 0, 0, 0, 'low', 124, 120, 0, 12, 2.928, 1.488, 1.44, 0, 99.072, 80.352, 18.72, 0, 1021),
(6, 1, 'Radio', 2, 0, 0, 2, 0, 0, 0, 'mid', 0, 120, 0, 12, 1.44, 0, 1.44, 0, 18.72, 0, 18.72, 0, 1021),
(7, 2, 'Printer', 4, 1, 0, 5, 0, 1, 0, 'mid', 60, 300, 60, 10000, 8400, 1200, 6000, 1200, 172800, 64800, 78000, 30000, 1021),
(9, 3, 'gdfg', 1, 2, 0, 2, 0, 2, 0, 'low', 120, 120, 120, 25, 4.5, 1.5, 1.5, 1.5, 138, 81, 19.5, 37.5, 1021),
(10, 1, 'bcvn', 1, 1, 0, 3, 3, 2, 0, 'low', 60, 183, 120, 12, 2.178, 0.36, 1.098, 0.72, 51.714, 19.44, 14.274, 18, 1023),
(11, 1, 'mk', 1, 0, 0, 4, 0, 0, 0, 'mid', 0, 240, 0, 2000, 240, 0, 240, 0, 3120, 0, 3120, 0, 1020),
(12, 2, 'fan', 2, 2, 0, 0, 0, 2, 0, 'low', 120, 0, 120, 250, 60, 30, 0, 30, 2370, 1620, 0, 750, 1020),
(13, 2, 'Table lamp', 3, 0, 0, 2, 0, 0, 0, 'mid', 0, 120, 0, 100, 18, 0, 18, 0, 234, 0, 234, 0, 1020),
(14, 2, 'nnn', 2, 0, 0, 0, 0, 2, 0, 'low', 0, 0, 120, 200, 24, 0, 0, 24, 600, 0, 0, 600, 1020);

-- --------------------------------------------------------

--
-- Table structure for table `electric_device_special_event_fixed`
--

CREATE TABLE `electric_device_special_event_fixed` (
  `device_id` int(11) NOT NULL,
  `bill_id` int(11) NOT NULL,
  `appliance` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `hfixed` int(11) NOT NULL,
  `mfixed` int(11) NOT NULL,
  `using_minutes_fixed` int(11) NOT NULL,
  `power` float NOT NULL,
  `total_units_fixed` float NOT NULL,
  `numberOfDays` int(11) NOT NULL,
  `Cust_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `electric_device_special_event_fixed`
--

INSERT INTO `electric_device_special_event_fixed` (`device_id`, `bill_id`, `appliance`, `quantity`, `hfixed`, `mfixed`, `using_minutes_fixed`, `power`, `total_units_fixed`, `numberOfDays`, `Cust_id`) VALUES
(6, 1, 'hgfh', 1, 1, 0, 60, 12, 0.012, 1, 1022);

-- --------------------------------------------------------

--
-- Table structure for table `electric_device_special_event_tou`
--

CREATE TABLE `electric_device_special_event_tou` (
  `device_id` int(11) NOT NULL,
  `bill_id` int(11) NOT NULL,
  `appliance` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `hPeak` int(11) NOT NULL,
  `mPeak` int(11) NOT NULL,
  `hOffPeak` int(11) NOT NULL,
  `mOffPeak` int(11) NOT NULL,
  `hDay` int(11) NOT NULL,
  `mDay` int(11) NOT NULL,
  `using_minutes_peak_time` float NOT NULL,
  `using_minutes_off_peak_time` float NOT NULL,
  `using_minutes_day_time` float NOT NULL,
  `power` int(11) NOT NULL,
  `units_peak_time` float NOT NULL,
  `units_off_peak_time` float NOT NULL,
  `units_day_time` float NOT NULL,
  `total_cost_TOU` float NOT NULL,
  `cost_peak_time` float NOT NULL,
  `cost_off_peak_time` float NOT NULL,
  `cost_day_time` float NOT NULL,
  `numberOfDays` int(11) NOT NULL,
  `total_units` float NOT NULL,
  `Cust_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `electric_device_special_event_tou`
--

INSERT INTO `electric_device_special_event_tou` (`device_id`, `bill_id`, `appliance`, `quantity`, `hPeak`, `mPeak`, `hOffPeak`, `mOffPeak`, `hDay`, `mDay`, `using_minutes_peak_time`, `using_minutes_off_peak_time`, `using_minutes_day_time`, `power`, `units_peak_time`, `units_off_peak_time`, `units_day_time`, `total_cost_TOU`, `cost_peak_time`, `cost_off_peak_time`, `cost_day_time`, `numberOfDays`, `total_units`, `Cust_id`) VALUES
(15, 1, 'Flash Light123', 1, 1, 15, 1, 9, 1, 4, 75, 69, 64, 34, 0, 0, 0, 3.70997, 2.295, 0.5083, 0.906667, 3, 0, 1022),
(22, 1, 'Bulbs', 2, 2, 12, 2, 2, 2, 2, 132, 122, 122, 12, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1022),
(23, 1, 'fdsg', 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1023),
(24, 1, 'gdg', 1, 2, 0, 2, 0, 2, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 4, 0, 1023),
(25, 2, 'Tv', 3, 1, 0, 2, 0, 2, 0, 0, 0, 0, 45, 0, 0, 0, 0, 0, 0, 0, 10, 0, 1023),
(26, 3, 'fdsg', 2, 2, 0, 2, 0, 2, 0, 0, 0, 0, 123, 0, 0, 0, 0, 0, 0, 0, 4, 0, 1023),
(27, 3, 'fdsf', 2, 2, 0, 2, 0, 2, 0, 0, 0, 0, 122, 0, 0, 0, 0, 0, 0, 0, 12, 0, 1023),
(28, 3, 'sfdsf', 3, 2, 0, 2, 0, 3, 0, 0, 0, 0, 123, 0, 0, 0, 0, 0, 0, 0, 11, 0, 1023),
(29, 4, 'hgfj', 1, 2, 0, 2, 0, 2, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 7, 0, 1023),
(30, 4, 'hgfhj', 2, 2, 0, 2, 0, 2, 0, 0, 0, 0, 34, 0, 0, 0, 0, 0, 0, 0, 9, 0, 1023),
(31, 4, 'rdgh', 1, 2, 0, 2, 0, 2, 0, 0, 0, 0, 45, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1023),
(32, 5, 'nbvn', 1, 3, 5, 3, 3, 3, 2, 185, 183, 182, 12, 0, 0, 0, 3.3838, 1.998, 0.4758, 0.91, 3, 0, 1023),
(33, 5, 'werr', 2, 1, 0, 2, 0, 1, 0, 60, 120, 60, 34, 0, 0, 0, 7.14, 3.672, 1.768, 1.7, 3, 0, 1023),
(34, 5, 'nbv', 2, 1, 0, 2, 2, 1, 3, 60, 122, 63, 12, 0, 0, 0, 2.5604, 1.296, 0.6344, 0.63, 3, 0, 1023),
(35, 5, 'dfsg', 1, 1, 0, 1, 0, 4, 4, 60, 60, 244, 23, 0, 0, 0, 3.87933, 1.242, 0.299, 2.33833, 3, 0, 1023),
(36, 5, 'gdfg', 1, 1, 0, 1, 2, 1, 0, 60, 62, 60, 12, 0, 0, 0, 1.1092, 0.648, 0.1612, 0.3, 3, 0, 1023),
(37, 6, 'asdf', 1, 1, 0, 1, 4, 1, 5, 60, 64, 65, 12, 0, 0, 0, 1.1394, 0.648, 0.1664, 0.325, 4, 0, 1023),
(38, 6, 'fgh', 3, 2, 0, 2, 0, 2, 2, 120, 120, 122, 34, 0, 0, 0, 18.853, 11.016, 2.652, 5.185, 3, 0, 1023),
(39, 6, 'fdsg', 2, 2, 22, 3, 9, 0, 0, 142, 189, 0, 45, 0, 0, 0, 15.1875, 11.502, 3.6855, 0, 20, 0, 1023),
(40, 6, 'bfdb', 3, 2, 11, 2, 9, 2, 0, 131, 129, 120, 500, 3.275, 3.225, 3, 293.775, 176.85, 41.925, 75, 2, 0, 1023);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `Emp_id` int(10) NOT NULL,
  `First_name` varchar(50) NOT NULL,
  `Last_name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Conatact_no` varchar(10) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `NIC` varchar(15) NOT NULL,
  `Address` varchar(100) NOT NULL,
  `Enrollment_date` date NOT NULL,
  `Role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`Emp_id`, `First_name`, `Last_name`, `Email`, `Conatact_no`, `Password`, `NIC`, `Address`, `Enrollment_date`, `Role`) VALUES
(1, 'Tharindu', 'Withana', 'admin1@gmail.com', '0145467892', '$2b$10$43uMOMFsIfTp764xipnO3.wK9n4xv4M.ZZEm4FZjAmarGjKiql3oK', '68745123v', 'Matara', '2021-07-21', 'admin'),
(2, 'Buthsara', 'madhushanka', 'ceben@gmail.com', '+947834416', '$2b$10$ArvIXD20Joo.PMx71jFGlOJWDwqtZmJzsydMlk501CF/K.y2PY7rS', '974563217v', 'kasun', '2021-07-08', 'cebengineer'),
(6, 'kasun', 'kalhara', 'ceben1@gmail.com', '0702563485', '$2b$10$.00vTrBUL2vVxfhODRmB/OlK3UJyjFkMnI8Rv/3X/dndTuqBN7AKi', '974563217v', 'No 23,Galle', '2021-08-09', 'cebengineer');

-- --------------------------------------------------------

--
-- Table structure for table `fixed_ucharge`
--

CREATE TABLE `fixed_ucharge` (
  `Unit_category` varchar(50) NOT NULL,
  `Unit_charge` float NOT NULL,
  `Update_unit_charges` float NOT NULL,
  `Update_ucharge_status` tinyint(1) NOT NULL,
  `Fixed_charge` float NOT NULL,
  `Update_fixed_charges` float NOT NULL,
  `Update_fcharge_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fixed_ucharge`
--

INSERT INTO `fixed_ucharge` (`Unit_category`, `Unit_charge`, `Update_unit_charges`, `Update_ucharge_status`, `Fixed_charge`, `Update_fixed_charges`, `Update_fcharge_status`) VALUES
('00-30', 2.5, 0, 0, 30, 0, 0),
('00-60', 7.85, 0, 0, 0, 0, 0),
('121-180', 32, 0, 0, 480, 0, 0),
('31-60', 4.85, 0, 0, 60, 0, 0),
('61-90', 10, 0, 0, 90, 0, 0),
('91-120', 27.75, 0, 0, 480, 0, 0),
('More than 180', 45, 0, 0, 540, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `suggestions_tou`
--

CREATE TABLE `suggestions_tou` (
  `Suggest_id` varchar(10) NOT NULL,
  `Device_id` varchar(10) NOT NULL,
  `Bill_id` varchar(10) NOT NULL,
  `Device_name` varchar(20) NOT NULL,
  `Priority` varchar(50) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Sugesstions` varchar(500) NOT NULL,
  `Cust_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tou_ucharge`
--

CREATE TABLE `tou_ucharge` (
  `Time_category` varchar(50) NOT NULL,
  `Unit_charge` float NOT NULL,
  `Update_unit_charges` float NOT NULL,
  `Update_ucharge_status` tinyint(1) NOT NULL,
  `Fixed_charge` float NOT NULL,
  `Update_fixed_charges` float NOT NULL,
  `Update_fcharge_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tou_ucharge`
--

INSERT INTO `tou_ucharge` (`Time_category`, `Unit_charge`, `Update_unit_charges`, `Update_ucharge_status`, `Fixed_charge`, `Update_fixed_charges`, `Update_fcharge_status`) VALUES
('Day', 25, 20, 0, 540, 540, 0),
('Off Peak', 13, 13, 0, 540, 0, 0),
('Peak', 54, 54, 0, 540, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`Cust_id`),
  ADD UNIQUE KEY `UK1` (`Email`);

--
-- Indexes for table `ebill_monthly_plan`
--
ALTER TABLE `ebill_monthly_plan`
  ADD PRIMARY KEY (`bill_id`,`Cust_id`),
  ADD KEY `FK1` (`Cust_id`);

--
-- Indexes for table `ebill_special_event_fixed`
--
ALTER TABLE `ebill_special_event_fixed`
  ADD PRIMARY KEY (`bill_id`,`Cust_id`) USING BTREE,
  ADD KEY `FK16` (`Cust_id`);

--
-- Indexes for table `ebill_special_event_tou`
--
ALTER TABLE `ebill_special_event_tou`
  ADD PRIMARY KEY (`bill_id`,`Cust_id`) USING BTREE,
  ADD KEY `FK_15` (`Cust_id`);

--
-- Indexes for table `electric_device_mplan`
--
ALTER TABLE `electric_device_mplan`
  ADD PRIMARY KEY (`device_id`,`bill_id`,`Cust_id`) USING BTREE,
  ADD KEY `FK4` (`Cust_id`);

--
-- Indexes for table `electric_device_special_event_fixed`
--
ALTER TABLE `electric_device_special_event_fixed`
  ADD PRIMARY KEY (`device_id`,`bill_id`,`Cust_id`) USING BTREE,
  ADD KEY `FK14` (`Cust_id`);

--
-- Indexes for table `electric_device_special_event_tou`
--
ALTER TABLE `electric_device_special_event_tou`
  ADD PRIMARY KEY (`device_id`,`bill_id`,`Cust_id`) USING BTREE,
  ADD KEY `FK13` (`Cust_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`Emp_id`),
  ADD UNIQUE KEY `UK2` (`Email`) USING BTREE;

--
-- Indexes for table `fixed_ucharge`
--
ALTER TABLE `fixed_ucharge`
  ADD PRIMARY KEY (`Unit_category`);

--
-- Indexes for table `suggestions_tou`
--
ALTER TABLE `suggestions_tou`
  ADD PRIMARY KEY (`Suggest_id`,`Device_id`,`Bill_id`),
  ADD KEY `FK10` (`Device_id`),
  ADD KEY `FK12` (`Bill_id`),
  ADD KEY `FK9` (`Cust_id`);

--
-- Indexes for table `tou_ucharge`
--
ALTER TABLE `tou_ucharge`
  ADD PRIMARY KEY (`Time_category`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `Cust_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1024;
--
-- AUTO_INCREMENT for table `electric_device_mplan`
--
ALTER TABLE `electric_device_mplan`
  MODIFY `device_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `electric_device_special_event_fixed`
--
ALTER TABLE `electric_device_special_event_fixed`
  MODIFY `device_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `electric_device_special_event_tou`
--
ALTER TABLE `electric_device_special_event_tou`
  MODIFY `device_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `Emp_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `ebill_special_event_fixed`
--
ALTER TABLE `ebill_special_event_fixed`
  ADD CONSTRAINT `FK16` FOREIGN KEY (`Cust_id`) REFERENCES `customer` (`Cust_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ebill_special_event_tou`
--
ALTER TABLE `ebill_special_event_tou`
  ADD CONSTRAINT `FK_15` FOREIGN KEY (`Cust_id`) REFERENCES `customer` (`Cust_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `electric_device_special_event_fixed`
--
ALTER TABLE `electric_device_special_event_fixed`
  ADD CONSTRAINT `FK14` FOREIGN KEY (`Cust_id`) REFERENCES `customer` (`Cust_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `electric_device_special_event_tou`
--
ALTER TABLE `electric_device_special_event_tou`
  ADD CONSTRAINT `FK13` FOREIGN KEY (`Cust_id`) REFERENCES `customer` (`Cust_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
