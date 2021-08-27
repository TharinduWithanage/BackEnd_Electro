-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 27, 2021 at 12:23 PM
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
(1020, 'Tharindu', 'Dulshan', 'twtdulshan@gmail.com', '$2b$10$GLExitPGWHXpIChzY.VKx.jCkzrDWjAX08nCwYYgzJ6YotxLIQSSO', 'customer');

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
(1, 3079.2, 900, 343.2, 1296, 825, 36, 26, 24, 86, 'Fixed', 1020);

-- --------------------------------------------------------

--
-- Table structure for table `ebill_specialevent`
--

CREATE TABLE `ebill_specialevent` (
  `Bill_id` int(11) NOT NULL,
  `No_of_days` int(11) NOT NULL,
  `Total_cost_tou` float NOT NULL,
  `Cost_day_time` float NOT NULL,
  `Cost_off_peak_time` float NOT NULL,
  `Cost_peak_time` float NOT NULL,
  `Total_units_tou` int(11) NOT NULL,
  `Units_day_time` int(11) NOT NULL,
  `Units_off_peak_time` int(11) NOT NULL,
  `Units_peak_time` int(11) NOT NULL,
  `Total_units_fixed` int(11) NOT NULL,
  `Cust_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(3, 1, 'TV', 2, 2, 0, 2, 0, 3, 0, 'mid', 120, 120, 180, 200, 84, 24, 24, 36, 2508, 1296, 312, 900, 1020),
(4, 1, 'radio', 2, 0, 0, 2, 0, 0, 0, 'high', 0, 120, 0, 20, 2.4, 0, 2.4, 0, 31.2, 0, 31.2, 0, 1020);

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
  `total_units_fixed` int(11) NOT NULL,
  `numberOfDays` int(11) NOT NULL,
  `Cust_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `electric_device_special_event_tou`
--

CREATE TABLE `electric_device_special_event_tou` (
  `device_id` int(11) NOT NULL,
  `bill_id` int(11) NOT NULL,
  `appliance` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `hPeak` int(11) NOT NULL,
  `mPeak` int(11) NOT NULL,
  `hOffPeak` int(11) NOT NULL,
  `mOffPeak` int(11) NOT NULL,
  `hDay` int(11) NOT NULL,
  `mDay` int(11) NOT NULL,
  `using_minutes_peak_time` int(11) NOT NULL,
  `using_minutes_off_peak_time` int(11) NOT NULL,
  `using_minutes_day_time` int(11) NOT NULL,
  `power` int(11) NOT NULL,
  `units_peak_time` int(11) NOT NULL,
  `units_off_peak_time` int(11) NOT NULL,
  `units_day_time` int(11) NOT NULL,
  `total_cost_TOU` float NOT NULL,
  `cost_peak_time` float NOT NULL,
  `cost_off_peak_time` float NOT NULL,
  `cost_day_time` float NOT NULL,
  `numberOfDays` int(11) NOT NULL,
  `Cust_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- Indexes for table `ebill_specialevent`
--
ALTER TABLE `ebill_specialevent`
  ADD PRIMARY KEY (`Bill_id`),
  ADD KEY `FK2` (`Cust_id`);

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
  MODIFY `Cust_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1021;
--
-- AUTO_INCREMENT for table `electric_device_mplan`
--
ALTER TABLE `electric_device_mplan`
  MODIFY `device_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `electric_device_special_event_fixed`
--
ALTER TABLE `electric_device_special_event_fixed`
  MODIFY `device_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `electric_device_special_event_tou`
--
ALTER TABLE `electric_device_special_event_tou`
  MODIFY `device_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `Emp_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- Constraints for dumped tables
--

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
