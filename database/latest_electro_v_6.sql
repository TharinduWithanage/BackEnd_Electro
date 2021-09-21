-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 21, 2021 at 02:08 PM
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
  `Role` varchar(20) NOT NULL DEFAULT 'customer',
  `Profile_pic` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`Cust_id`, `First_name`, `Last_name`, `Email`, `Password`, `Role`, `Profile_pic`) VALUES
(1019, 'buthsara', 'madhushanka', 'buthsaramadhushanka@gmail.com', '$2b$10$E/m1.N4WWEB02TM88A1SnuAudCnMell0cmwb1WwIQliAyBuAsD1B.', 'customer', ''),
(1020, 'Tharindu', 'Dulshan', 'twtdulshan@gmail.com', '$2b$10$GLExitPGWHXpIChzY.VKx.jCkzrDWjAX08nCwYYgzJ6YotxLIQSSO', 'customer', ''),
(1022, 'Ashika', 'Abeysuriya', 'ashika234@gmail.com', '$2b$10$MCo6b6AfuZoMiyMx/eng3epcr6WyYX88htBu302jfIWW4svRDcGXG', 'customer', ''),
(1023, 'asdf', 'dfgh', 'asdf@gmail.com', '$2b$10$Tb9EgftKYXqauciqkkBbj.k54BOBMmYQtUsz6dJWczBio2lgU09Re', 'customer', ''),
(1024, 'Minuri', 'Yasara', 'minuri@gmail.com', '$2b$10$NQ8SDF34XmpkcGHHxAdqM.hL3Nf.kqQxlc/nmpbqsXdJL7rEGOt2G', 'customer', '');

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
(1, 3559.95, 1310, 136.5, 2168.1, 850.5, 52, 11, 40, 89, 'Fixed', 1020);

-- --------------------------------------------------------

--
-- Table structure for table `ebill_special_event`
--

CREATE TABLE `ebill_special_event` (
  `bill_id` int(11) NOT NULL,
  `bill_plan_name` varchar(100) NOT NULL,
  `bill_model` varchar(50) NOT NULL,
  `Total_units` float NOT NULL,
  `Cust_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ebill_special_event`
--

INSERT INTO `ebill_special_event` (`bill_id`, `bill_plan_name`, `bill_model`, `Total_units`, `Cust_id`) VALUES
(1, 'Pirith Ceremony', 'TOU', 11.45, 1020),
(2, 'BirthDay Party', 'fixed', 2.0267, 1020),
(3, 'Plan 1 Special', 'fixed', 1.7, 1020);

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
  `Cust_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ebill_special_event_tou`
--

INSERT INTO `ebill_special_event_tou` (`bill_id`, `Total_cost_tou`, `Cost_day_time`, `Cost_off_peak_time`, `Cost_peak_time`, `Units_day_time`, `Units_off_peak_time`, `Units_peak_time`, `Cust_id`) VALUES
(1, 324.33, 123, 47.97, 153.36, 4.92, 3.69, 2.84, 1020);

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
(1, 1, 'Bedroom - Bulbs', 4, 2, 30, 3, 0, 0, 0, 'mid', 150, 0, 0, 12, 0, 3.6, 0, 0, 0, 194.4, 0, 0, 1020),
(2, 1, 'Table Fan', 1, 2, 0, 3, 0, 0, 0, 'low', 120, 180, 0, 30, 4.5, 1.8, 2.7, 0, 132.3, 97.2, 35.1, 0, 1020),
(3, 1, 'Rice Cooker', 1, 0, 15, 0, 0, 0, 30, 'mid', 15, 0, 30, 200, 0, 1.5, 0, 3, 0, 81, 0, 75, 1020),
(4, 1, 'Lap', 1, 2, 0, 0, 0, 0, 0, 'low', 120, 0, 0, 65, 3.9, 3.9, 0, 0, 210.6, 210.6, 0, 0, 1020),
(5, 1, 'Blender', 1, 0, 5, 0, 0, 0, 10, 'low', 5, 0, 10, 550, 0, 1.375, 0, 2.75, 0, 74.25, 0, 68.75, 1020),
(6, 1, 'TV', 1, 2, 0, 2, 0, 4, 0, 'low', 120, 120, 240, 40, 9.6, 2.4, 2.4, 4.8, 280.8, 129.6, 31.2, 120, 1020),
(7, 1, 'Ceiling Fan', 2, 3, 0, 0, 0, 3, 30, 'mid', 180, 0, 210, 80, 31.2, 14.4, 0, 16.8, 1197.6, 777.6, 0, 420, 1020),
(8, 1, 'Water Motor', 1, 0, 0, 0, 0, 0, 15, 'low', 0, 0, 15, 1200, 9, 0, 0, 9, 225, 0, 0, 225, 1020),
(9, 1, 'Electric Kettle', 1, 0, 10, 0, 0, 0, 15, 'mid', 10, 0, 15, 1500, 18.75, 7.5, 0, 11.25, 686.25, 405, 0, 281.25, 1020),
(10, 1, 'phone Charger', 2, 0, 0, 0, 0, 3, 0, 'low', 0, 0, 180, 5, 0.9, 0, 0, 0.9, 22.5, 0, 0, 22.5, 1020),
(11, 1, 'Router', 1, 4, 0, 4, 0, 10, 0, 'mid', 240, 240, 600, 5, 2.7, 0.6, 0.6, 1.5, 77.7, 32.4, 7.8, 37.5, 1020),
(12, 1, 'Washing Machine', 1, 0, 15, 0, 0, 0, 0, 'mid', 15, 0, 0, 250, 0, 1.875, 0, 0, 0, 101.25, 0, 0, 1020),
(13, 1, 'Radio', 2, 0, 0, 4, 0, 2, 0, 'mid', 0, 240, 120, 20, 7.2, 0, 4.8, 2.4, 122.4, 0, 62.4, 60, 1020),
(14, 1, 'Tv', 1, 2, 0, 0, 0, 0, 0, 'mid', 120, 0, 0, 20, 1.2, 1.2, 0, 0, 64.8, 64.8, 0, 0, 1020);

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
(1, 2, 'Amp', 1, 2, 0, 120, 25, 0.1, 2, 1020),
(2, 2, 'Air Coolers', 2, 4, 30, 270, 50, 0.45, 1, 1020),
(3, 2, 'Water Motor', 1, 2, 30, 150, 500, 1.25, 1, 1020),
(4, 2, 'Electric Water Filter', 1, 5, 40, 340, 40, 0.2267, 1, 1020),
(5, 3, 'Freezer', 1, 2, 0, 120, 200, 0.4, 1, 1020),
(6, 3, 'Fan', 2, 4, 0, 240, 50, 0.8, 2, 1020),
(7, 3, 'Radio', 2, 2, 0, 120, 50, 0.2, 1, 1020),
(8, 3, 'Flash Light', 1, 1, 0, 60, 150, 0.3, 2, 1020);

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
(1, 1, 'Flash Light', 2, 4, 0, 2, 0, 0, 0, 240, 120, 0, 150, 1.2, 0.6, 0, 72.6, 64.8, 7.8, 0, 1, 1.8, 1020),
(2, 1, 'Speakers', 2, 0, 0, 0, 0, 4, 0, 0, 0, 240, 80, 0, 0, 0.64, 16, 0, 0, 16, 1, 0.64, 1020),
(3, 1, 'Freezer', 2, 1, 0, 2, 0, 3, 0, 60, 120, 180, 700, 1.4, 2.8, 4.2, 217, 75.6, 36.4, 105, 3, 8.4, 1020),
(4, 1, 'Coffee machine', 1, 1, 0, 1, 0, 2, 0, 60, 60, 120, 40, 0.04, 0.04, 0.08, 4.68, 2.16, 0.52, 2, 2, 0.16, 1020),
(5, 1, 'BulbSets', 10, 4, 0, 5, 0, 0, 0, 240, 300, 0, 5, 0.2, 0.25, 0, 14.05, 10.8, 3.25, 0, 1, 0.45, 1020);

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
  `Unit_charges_requested_date` varchar(20) DEFAULT NULL,
  `Unit_charges_accepted_date` varchar(20) DEFAULT NULL,
  `Fixed_charge` float NOT NULL,
  `Update_fixed_charges` float NOT NULL,
  `Update_fcharge_status` tinyint(1) NOT NULL,
  `Fixed_charges_requested_date` varchar(20) DEFAULT NULL,
  `Fixed_charges_accepted_date` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fixed_ucharge`
--

INSERT INTO `fixed_ucharge` (`Unit_category`, `Unit_charge`, `Update_unit_charges`, `Update_ucharge_status`, `Unit_charges_requested_date`, `Unit_charges_accepted_date`, `Fixed_charge`, `Update_fixed_charges`, `Update_fcharge_status`, `Fixed_charges_requested_date`, `Fixed_charges_accepted_date`) VALUES
('00-30', 2.5, 2.5, 0, '2021-09-03', '2021-09-03', 30, 30, 0, '2021-09-03', '2021-09-03'),
('00-60', 7.85, 7.86, 0, '2021-09-03', NULL, 0, 0, 0, '2021-09-03', '2021-09-03'),
('121-180', 32, 0, 0, NULL, NULL, 480, 0, 0, NULL, NULL),
('31-60', 4.85, 0, 0, NULL, NULL, 60, 0, 0, NULL, NULL),
('61-90', 10, 0, 0, NULL, NULL, 90, 0, 0, NULL, NULL),
('91-120', 27.75, 0, 0, NULL, NULL, 480, 0, 0, NULL, NULL),
('More than 180', 45, 0, 0, NULL, NULL, 540, 0, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `suggestions`
--

CREATE TABLE `suggestions` (
  `suggest_id` int(11) NOT NULL,
  `device_id` int(11) NOT NULL,
  `bill_id` int(11) NOT NULL,
  `appliance` varchar(20) NOT NULL,
  `priority` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `cur_time` varchar(20) NOT NULL,
  `change_time` varchar(20) NOT NULL,
  `can_change_hours` int(11) NOT NULL,
  `can_change_minutes` int(11) NOT NULL,
  `save_amount` float NOT NULL,
  `total_cost_TOU` float NOT NULL,
  `Cust_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `suggestions`
--

INSERT INTO `suggestions` (`suggest_id`, `device_id`, `bill_id`, `appliance`, `priority`, `quantity`, `cur_time`, `change_time`, `can_change_hours`, `can_change_minutes`, `save_amount`, `total_cost_TOU`, `Cust_id`) VALUES
(1, 1, 1, 'Bedroom - Bulbs', 'mid', 4, 'peak', 'day', 2, 30, 104.4, 0, 1020),
(5, 3, 1, 'Rice Cooker', 'mid', 1, 'peak', 'day', 0, 15, 43.5, 0, 1020),
(6, 4, 1, 'Lap', 'low', 1, 'peak', 'off peak', 2, 0, 159.9, 210.6, 1020),
(7, 4, 1, 'Lap', 'low', 1, 'peak', 'day', 2, 0, 113.1, 210.6, 1020),
(8, 5, 1, 'Blender', 'low', 1, 'peak', 'day', 0, 5, 39.875, 0, 1020),
(9, 6, 1, 'TV', 'low', 1, 'peak', 'off peak', 2, 0, 98.4, 280.8, 1020),
(10, 6, 1, 'TV', 'low', 1, 'peak', 'day', 2, 0, 69.6, 280.8, 1020),
(11, 6, 1, 'TV', 'low', 1, 'day', 'off peak', 4, 0, 57.6, 280.8, 1020),
(12, 7, 1, 'Ceiling Fan', 'mid', 2, 'peak', 'off peak', 3, 0, 590.4, 1197.6, 1020),
(13, 7, 1, 'Ceiling Fan', 'mid', 2, 'peak', 'day', 3, 0, 417.6, 1197.6, 1020),
(14, 7, 1, 'Ceiling Fan', 'mid', 2, 'day', 'off peak', 3, 30, 201.6, 1197.6, 1020),
(17, 9, 1, 'Electric Kettle', 'mid', 1, 'peak', 'off peak', 0, 10, 307.5, 686.25, 1020),
(18, 9, 1, 'Electric Kettle', 'mid', 1, 'peak', 'day', 0, 10, 217.5, 686.25, 1020),
(19, 9, 1, 'Electric Kettle', 'mid', 1, 'day', 'off peak', 0, 15, 135, 686.25, 1020),
(20, 10, 1, 'phone Charger', 'low', 2, 'day', 'off peak', 3, 0, 10.8, 22.5, 1020),
(21, 11, 1, 'Router', 'mid', 1, 'peak', 'off peak', 3, 0, 18.45, 77.7, 1020),
(22, 11, 1, 'Router', 'mid', 1, 'peak', 'day', 3, 0, 13.05, 77.7, 1020),
(23, 11, 1, 'Router', 'mid', 1, 'day', 'off peak', 3, 0, 5.4, 77.7, 1020),
(24, 12, 1, 'Washing Machine', 'mid', 1, 'peak', 'day', 0, 15, 54.375, 0, 1020),
(28, 8, 1, 'Water Motor', 'low', 1, 'day', 'off peak', 0, 15, 108, 225, 1020),
(29, 2, 1, 'Table Fan', 'low', 1, 'peak', 'off peak', 2, 0, 73.8, 132.3, 1020),
(30, 2, 1, 'Table Fan', 'low', 1, 'peak', 'day', 2, 0, 52.2, 132.3, 1020),
(34, 14, 1, 'Tv', 'mid', 1, 'peak', 'off peak', 2, 0, 49.2, 64.8, 1020),
(35, 14, 1, 'Tv', 'mid', 1, 'peak', 'day', 2, 0, 34.8, 64.8, 1020),
(36, 13, 1, 'Radio', 'mid', 2, 'day', 'off peak', 2, 0, 28.8, 122.4, 1020);

-- --------------------------------------------------------

--
-- Table structure for table `tou_ucharge`
--

CREATE TABLE `tou_ucharge` (
  `Time_category` varchar(50) NOT NULL,
  `Unit_charge` float NOT NULL,
  `Update_unit_charges` float NOT NULL,
  `Update_ucharge_status` tinyint(1) NOT NULL,
  `Unit_charges_requested_date` varchar(20) DEFAULT NULL,
  `Unit_charges_accepted_date` varchar(20) DEFAULT NULL,
  `Fixed_charge` float NOT NULL,
  `Update_fixed_charges` float NOT NULL,
  `Update_fcharge_status` tinyint(1) NOT NULL,
  `Fixed_charges_requested_date` varchar(20) DEFAULT NULL,
  `Fixed_charges_accepted_date` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tou_ucharge`
--

INSERT INTO `tou_ucharge` (`Time_category`, `Unit_charge`, `Update_unit_charges`, `Update_ucharge_status`, `Unit_charges_requested_date`, `Unit_charges_accepted_date`, `Fixed_charge`, `Update_fixed_charges`, `Update_fcharge_status`, `Fixed_charges_requested_date`, `Fixed_charges_accepted_date`) VALUES
('Day', 25, 20, 0, NULL, NULL, 540, 540, 0, NULL, NULL),
('Off Peak', 13, 13, 0, NULL, NULL, 540, 0, 0, NULL, NULL),
('Peak', 54, 54, 0, '2021-09-03', '2021-09-03', 540, 540, 0, '2021-09-03', '2021-09-03');

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
-- Indexes for table `ebill_special_event`
--
ALTER TABLE `ebill_special_event`
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
-- Indexes for table `suggestions`
--
ALTER TABLE `suggestions`
  ADD PRIMARY KEY (`suggest_id`,`device_id`,`bill_id`),
  ADD KEY `FK10` (`device_id`),
  ADD KEY `FK12` (`bill_id`),
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
  MODIFY `Cust_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1025;
--
-- AUTO_INCREMENT for table `electric_device_mplan`
--
ALTER TABLE `electric_device_mplan`
  MODIFY `device_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `electric_device_special_event_fixed`
--
ALTER TABLE `electric_device_special_event_fixed`
  MODIFY `device_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `electric_device_special_event_tou`
--
ALTER TABLE `electric_device_special_event_tou`
  MODIFY `device_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `Emp_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `suggestions`
--
ALTER TABLE `suggestions`
  MODIFY `suggest_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `ebill_special_event`
--
ALTER TABLE `ebill_special_event`
  ADD CONSTRAINT `FK16` FOREIGN KEY (`Cust_id`) REFERENCES `customer` (`Cust_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
