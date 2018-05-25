-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2018 at 10:57 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `workout_builder`
--

-- --------------------------------------------------------

--
-- Table structure for table `days`
--

CREATE TABLE `days` (
  `day_id` int(11) NOT NULL,
  `day_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `days`
--

INSERT INTO `days` (`day_id`, `day_name`) VALUES
(1, 'Leg Day 1'),
(2, 'Chest Day'),
(3, 'Arm Day'),
(5, 'Back Day');

-- --------------------------------------------------------

--
-- Table structure for table `days_exercises`
--

CREATE TABLE `days_exercises` (
  `day_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `days_exercises`
--

INSERT INTO `days_exercises` (`day_id`, `exercise_id`) VALUES
(3, 1),
(1, 3),
(3, 3),
(5, 4),
(3, 5),
(1, 13),
(3, 13),
(1, 14),
(1, 15);

-- --------------------------------------------------------

--
-- Table structure for table `days_plans`
--

CREATE TABLE `days_plans` (
  `day_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `days_plans`
--

INSERT INTO `days_plans` (`day_id`, `plan_id`) VALUES
(1, 2),
(2, 2),
(3, 2),
(1, 5),
(2, 7),
(5, 7),
(3, 8),
(5, 8);

-- --------------------------------------------------------

--
-- Table structure for table `exercises`
--

CREATE TABLE `exercises` (
  `exercise_id` int(11) NOT NULL,
  `exercise_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `exercises`
--

INSERT INTO `exercises` (`exercise_id`, `exercise_name`) VALUES
(1, 'Jumping Jacks'),
(2, 'Curtsy Lunges'),
(3, 'Jump Lunges'),
(4, 'High Knees'),
(5, 'Push Ups'),
(6, 'Rainbows'),
(7, 'Tricep Dips'),
(8, 'Planks'),
(9, 'Sit Ups'),
(10, 'Supermans'),
(11, 'High Legs'),
(12, 'Cobra Stretch'),
(13, 'Simple Squats'),
(14, 'Rotational Toe Touches'),
(15, 'Sumo Squats'),
(16, 'Bird Dogs');

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `plan_id` int(11) NOT NULL,
  `plan_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`plan_id`, `plan_name`) VALUES
(2, 'hubert plan 1'),
(5, 'george plan'),
(7, 'light plan1 red'),
(8, 'linda plan');

-- --------------------------------------------------------

--
-- Table structure for table `plans_users`
--

CREATE TABLE `plans_users` (
  `user_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_firstname` varchar(100) NOT NULL,
  `user_lastname` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `plan_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_firstname`, `user_lastname`, `user_email`, `plan_id`) VALUES
(1, 'Hubert ', 'Nashenda', 'hubert.nashenda@gmail.com', 5),
(2, 'Jon ', 'Doe', 'jon.doe@gmail.com', 2),
(3, 'Arjen ', 'Robben', 'arjen.robben@gmail.com', 2),
(4, 'test plan ', 'test lastname', 'test@gmail.com', 2),
(5, 'monday12', 'tuesday', 'monday@gmail.com', 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `days`
--
ALTER TABLE `days`
  ADD PRIMARY KEY (`day_id`);

--
-- Indexes for table `days_exercises`
--
ALTER TABLE `days_exercises`
  ADD PRIMARY KEY (`day_id`,`exercise_id`),
  ADD KEY `exercise_id` (`exercise_id`);

--
-- Indexes for table `days_plans`
--
ALTER TABLE `days_plans`
  ADD PRIMARY KEY (`day_id`,`plan_id`),
  ADD KEY `plan_id` (`plan_id`);

--
-- Indexes for table `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`exercise_id`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`plan_id`);

--
-- Indexes for table `plans_users`
--
ALTER TABLE `plans_users`
  ADD PRIMARY KEY (`user_id`,`plan_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `days`
--
ALTER TABLE `days`
  MODIFY `day_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `exercises`
--
ALTER TABLE `exercises`
  MODIFY `exercise_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `plan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `days_exercises`
--
ALTER TABLE `days_exercises`
  ADD CONSTRAINT `days_exercises_ibfk_1` FOREIGN KEY (`day_id`) REFERENCES `days` (`day_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `days_exercises_ibfk_2` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`exercise_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `days_plans`
--
ALTER TABLE `days_plans`
  ADD CONSTRAINT `days_plans_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`plan_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `days_plans_ibfk_2` FOREIGN KEY (`day_id`) REFERENCES `days` (`day_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
