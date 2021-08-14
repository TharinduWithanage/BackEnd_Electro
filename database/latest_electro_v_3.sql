-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 14, 2021 at 06:18 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `latest_electro_v_3`
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
(1000, 'Minuri', 'Wickramanayaka', 'minuri@gmail.com', '$2b$10$rt9yvwkTymAohJYgl0E/ZORvAMlcx8dn48bdNjt4snHhznJcGfXYa', 'customer'),
(1001, 'Yasara', 'Wickramanayaka', 'yasara@gmail.com', '$2b$10$Wj7RiNfHy7yugJqCN5mXWez5lyo.YB8iodbgBG2gd42WX04ccjcK.', 'customer'),
(1003, 'Tharindu', 'withana', 'tdwithana@gmail.com', '$2b$10$HLjN./LYzrkoCWh0C1ZGielK.ck/q/6TMfhTv4RHIG1MK5ypjw32K', 'customer'),
(1018, 'Buthsara', 'madhushanka', 'buthsaramadhushanka@gmail.com', '$2b$10$sq/Q8YgJx4s6DcdCdjDVRuYhROgC4CjyU9muZhmQPAhuiKXM9nVKa', 'customer');

-- --------------------------------------------------------

--
-- Table structure for table `ebill_monthly_plan`
--

CREATE TABLE `ebill_monthly_plan` (
  `Bill_id` varchar(10) NOT NULL,
  `Total_cost_tou` float NOT NULL,
  `Cost_day_time` float NOT NULL,
  `Cost_off_peak_time` float NOT NULL,
  `Cost_peak_time` float NOT NULL,
  `Total_cost_fixed` float NOT NULL,
  `Total_units_tou` int(11) NOT NULL,
  `Units_day_time` int(11) NOT NULL,
  `Units_off_peak_time` int(11) NOT NULL,
  `Units_peak_time` int(11) NOT NULL,
  `Total_units_fixed` int(11) NOT NULL,
  `Best_model` int(11) NOT NULL,
  `Cust_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ebill_specialevent`
--

CREATE TABLE `ebill_specialevent` (
  `Bill_id` varchar(10) NOT NULL,
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
  `bill_id` varchar(10) NOT NULL,
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
  `total_units_fixed` float NOT NULL,
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

INSERT INTO `electric_device_mplan` (`device_id`, `bill_id`, `appliance`, `quantity`, `hPeak`, `mPeak`, `hOffPeak`, `mOffPeak`, `hDay`, `mDay`, `priority`, `using_minutes_peak_time`, `using_minutes_off_peak_time`, `using_minutes_day_time`, `power`, `total_units_fixed`, `units_peak_time`, `units_off_peak_time`, `units_day_time`, `total_cost_TOU`, `cost_peak_time`, `cost_off_peak_time`, `cost_day_time`, `Cust_id`) VALUES
(1, '1', 'iron', 1, NULL, NULL, NULL, NULL, NULL, NULL, 'low', 0, 1, 1, 12, 15, 5, 5, 5, 1500, 500, 500, 500, 1018),
(2, '1', 'iron', 1, NULL, NULL, NULL, NULL, NULL, NULL, 'low', 0, 1, 1, 12, 15, 5, 5, 5, 1500, 500, 500, 500, 1018),
(3, '1', 'iron', 1, NULL, NULL, NULL, NULL, NULL, NULL, 'low', 0, 1, 1, 12, 15, 5, 5, 5, 1500, 500, 500, 500, 1018),
(4, '1', 'iron', 1, NULL, NULL, NULL, NULL, NULL, NULL, 'low', 150, 75, 60, 500, 0, 0, 0, 0, 0, 0, 0, 0, 1018),
(5, '1', 'iron', 1, NULL, NULL, NULL, NULL, NULL, NULL, 'low', 150, 75, 60, 500, 2, 1, 1, 1, 88.125, 67.5, 8.125, 12.5, 1018),
(6, '1', 'iron', 1, NULL, NULL, NULL, NULL, NULL, NULL, 'low', 150, 75, 60, 500, 2.375, 1.25, 0.625, 0.5, 88.125, 67.5, 8.125, 12.5, 1018);

-- --------------------------------------------------------

--
-- Table structure for table `electric_device_special_event`
--

CREATE TABLE `electric_device_special_event` (
  `Device_id` varchar(10) NOT NULL,
  `Bill_id` varchar(10) NOT NULL,
  `Device_name` varchar(50) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Priority` varchar(20) NOT NULL,
  `Using_hours_peak_time` float NOT NULL,
  `Using_hours_off_peak_time` float NOT NULL,
  `Using_hours_day_time` float NOT NULL,
  `Power(W)` float NOT NULL,
  `Total_units_fixed` int(11) NOT NULL,
  `Units_off_peak_time` int(11) NOT NULL,
  `Units_peak_time` int(11) NOT NULL,
  `Units_day_time` int(11) NOT NULL,
  `Cost_day_time` float NOT NULL,
  `Cost_peak_time` float NOT NULL,
  `Cost_off_peak_time` float NOT NULL,
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
  ADD PRIMARY KEY (`Bill_id`),
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
  ADD PRIMARY KEY (`device_id`,`bill_id`) USING BTREE,
  ADD KEY `FK4` (`Cust_id`);

--
-- Indexes for table `electric_device_special_event`
--
ALTER TABLE `electric_device_special_event`
  ADD PRIMARY KEY (`Device_id`,`Bill_id`) USING BTREE,
  ADD KEY `FK7` (`Bill_id`),
  ADD KEY `FK8` (`Cust_id`);

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
  MODIFY `Cust_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1019;

--
-- AUTO_INCREMENT for table `electric_device_mplan`
--
ALTER TABLE `electric_device_mplan`
  MODIFY `device_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `Emp_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ebill_monthly_plan`
--
ALTER TABLE `ebill_monthly_plan`
  ADD CONSTRAINT `FK1` FOREIGN KEY (`Cust_id`) REFERENCES `customer` (`Cust_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ebill_specialevent`
--
ALTER TABLE `ebill_specialevent`
  ADD CONSTRAINT `FK2` FOREIGN KEY (`Cust_id`) REFERENCES `customer` (`Cust_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `electric_device_mplan`
--
ALTER TABLE `electric_device_mplan`
  ADD CONSTRAINT `FK4` FOREIGN KEY (`Cust_id`) REFERENCES `customer` (`Cust_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `electric_device_special_event`
--
ALTER TABLE `electric_device_special_event`
  ADD CONSTRAINT `FK6` FOREIGN KEY (`Bill_id`) REFERENCES `ebill_monthly_plan` (`Bill_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK7` FOREIGN KEY (`Bill_id`) REFERENCES `ebill_specialevent` (`Bill_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK8` FOREIGN KEY (`Cust_id`) REFERENCES `customer` (`Cust_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
