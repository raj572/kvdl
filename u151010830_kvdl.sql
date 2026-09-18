-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 18, 2026 at 04:06 AM
-- Server version: 11.8.9-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u151010830_kvdl`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `admin_id` bigint(20) UNSIGNED DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`details`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `admin_id`, `action`, `ip_address`, `user_agent`, `details`, `created_at`, `updated_at`) VALUES
(1, NULL, 'login_failed', '49.47.130.106', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '{\"email\":\"lazfortstudio@gmail.com\"}', '2026-02-14 07:04:19', '2026-02-14 07:04:19'),
(2, NULL, 'login_failed', '49.47.130.106', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '{\"email\":\"lazfortstudio@gmail.com\"}', '2026-02-14 07:04:27', '2026-02-14 07:04:27'),
(3, NULL, 'login_failed', '49.47.130.106', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '{\"email\":\"lazfortstudio@gmail.com\"}', '2026-02-14 07:04:29', '2026-02-14 07:04:29'),
(4, NULL, 'login_failed', '49.47.130.106', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '{\"email\":\"lazfortstudio@gmail.com\"}', '2026-02-14 07:04:39', '2026-02-14 07:04:39'),
(5, 1, 'password_reset_requested', '49.47.130.106', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '[]', '2026-02-14 07:10:02', '2026-02-14 07:10:02'),
(6, 1, 'login_success', '49.47.130.106', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '[]', '2026-02-14 07:10:24', '2026-02-14 07:10:24'),
(7, 1, 'login_success', '2401:4900:530e:bf07:4ef:dff:fe63:100e', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '[]', '2026-02-14 07:20:37', '2026-02-14 07:20:37'),
(8, 1, 'logout', '2401:4900:530e:bf07:4ef:dff:fe63:100e', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '[]', '2026-02-14 07:23:17', '2026-02-14 07:23:17'),
(9, NULL, 'login_failed', '2401:4900:7c7a:3114:d020:92ff:fe6f:b584', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '{\"email\":\"admin@ecoflow.com\"}', '2026-02-14 08:59:58', '2026-02-14 08:59:58'),
(10, 1, 'login_success', '2401:4900:7c7a:3114:d020:92ff:fe6f:b584', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '[]', '2026-02-14 09:00:29', '2026-02-14 09:00:29'),
(11, 1, 'logout', '2401:4900:7c7a:3114:d020:92ff:fe6f:b584', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '[]', '2026-02-14 09:00:46', '2026-02-14 09:00:46'),
(12, 1, 'login_success', '2402:e280:3e30:2cc:14ec:91aa:370b:9925', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '[]', '2026-02-16 04:26:39', '2026-02-16 04:26:39'),
(13, 1, 'logout', '2402:e280:3e30:2cc:14ec:91aa:370b:9925', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '[]', '2026-02-16 04:31:38', '2026-02-16 04:31:38'),
(14, 1, 'logout', '49.47.130.247', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '[]', '2026-02-16 04:38:02', '2026-02-16 04:38:02'),
(15, 1, 'login_success', '2402:e280:3e30:2cc:14ec:91aa:370b:9925', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '[]', '2026-02-16 04:49:32', '2026-02-16 04:49:32'),
(16, NULL, 'login_failed', '49.47.130.247', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '{\"email\":\"lazfortstudio@gmail.com\"}', '2026-02-16 04:49:33', '2026-02-16 04:49:33'),
(17, 1, 'login_success', '49.47.130.247', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '[]', '2026-02-16 04:49:41', '2026-02-16 04:49:41'),
(18, 1, 'logout', '2402:e280:3e30:2cc:14ec:91aa:370b:9925', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '[]', '2026-02-16 04:51:46', '2026-02-16 04:51:46'),
(19, 1, 'login_success', '2401:4900:c0b7:ceac:d48e:457b:c990:7987', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '[]', '2026-02-16 09:59:22', '2026-02-16 09:59:22'),
(20, 1, 'logout', '2401:4900:c0b7:ceac:d48e:457b:c990:7987', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '[]', '2026-02-16 10:00:43', '2026-02-16 10:00:43'),
(21, 1, 'login_success', '2401:4900:c0b7:ceac:d48e:457b:c990:7987', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '[]', '2026-02-16 10:02:34', '2026-02-16 10:02:34'),
(22, 1, 'logout', '2401:4900:c0b7:ceac:d48e:457b:c990:7987', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '[]', '2026-02-16 10:02:51', '2026-02-16 10:02:51'),
(23, 1, 'login_success', '2401:4900:c0b7:ceac:d48e:457b:c990:7987', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '[]', '2026-02-16 10:06:54', '2026-02-16 10:06:54'),
(24, 1, 'login_success', '2405:201:a402:590c:e800:8f8d:b253:517c', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '[]', '2026-02-16 13:24:57', '2026-02-16 13:24:57'),
(25, 1, 'logout', '2405:201:a402:590c:e800:8f8d:b253:517c', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '[]', '2026-02-16 13:26:16', '2026-02-16 13:26:16'),
(26, 1, 'login_success', '49.47.130.68', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '[]', '2026-04-13 10:55:48', '2026-04-13 10:55:48'),
(27, 1, 'logout', '49.47.130.68', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '[]', '2026-04-13 11:30:51', '2026-04-13 11:30:51'),
(28, 1, 'login_success', '2401:4900:57c4:ef5e:950:6c46:172e:1471', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '[]', '2026-05-29 06:07:09', '2026-05-29 06:07:09'),
(29, 1, 'logout', '2401:4900:57c4:ef5e:950:6c46:172e:1471', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '[]', '2026-05-29 06:08:48', '2026-05-29 06:08:48'),
(30, 1, 'login_success', '2409:40e4:1318:bcbc:b017:305c:2813:b9fc', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '[]', '2026-05-29 08:59:55', '2026-05-29 08:59:55'),
(31, 1, 'logout', '2409:40e4:1318:bcbc:b017:305c:2813:b9fc', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '[]', '2026-05-29 09:03:00', '2026-05-29 09:03:00'),
(32, 1, 'login_success', '59.96.90.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '[]', '2026-06-01 07:58:44', '2026-06-01 07:58:44'),
(33, 1, 'logout', '59.96.90.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '[]', '2026-06-01 08:00:26', '2026-06-01 08:00:26'),
(34, NULL, 'login_failed', '2405:201:a402:5101:a18a:13d6:d2a4:a06c', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', '{\"email\":\"avinash@gmail.com\"}', '2026-07-17 08:55:56', '2026-07-17 08:55:56'),
(35, 1, 'login_success', '2405:201:a402:5101:a18a:13d6:d2a4:a06c', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', '[]', '2026-07-17 08:56:32', '2026-07-17 08:56:32'),
(36, 1, 'logout', '2405:201:a402:5101:a18a:13d6:d2a4:a06c', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', '[]', '2026-07-17 08:58:06', '2026-07-17 08:58:06'),
(37, 1, 'login_success', '2409:40e4:135b:5c3f:10ae:f724:e2cf:979e', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', '[]', '2026-07-29 11:29:41', '2026-07-29 11:29:41'),
(38, 1, 'logout', '2409:40e4:135b:5c3f:10ae:f724:e2cf:979e', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', '[]', '2026-07-29 11:29:57', '2026-07-29 11:29:57'),
(39, 2, 'super_login_success', '2409:40e4:1302:7387:a920:6725:8605:883b', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '[]', '2026-08-08 17:30:30', '2026-08-08 17:30:30'),
(40, 2, 'super_login_success', '2401:4900:57a3:2503:780e:dd42:96b4:ab4e', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', '[]', '2026-08-08 17:54:38', '2026-08-08 17:54:38'),
(41, 2, 'login_success', '103.157.231.139', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '[]', '2026-08-12 06:28:34', '2026-08-12 06:28:34'),
(42, 2, 'logout', '103.157.231.139', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '[]', '2026-08-12 06:28:41', '2026-08-12 06:28:41'),
(43, 2, 'super_login_success', '2409:40e4:2a:f39:912c:51ab:d0af:9ea4', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36 Edg/151.0.0.0', '[]', '2026-08-18 09:42:34', '2026-08-18 09:42:34'),
(44, 2, 'super_login_success', '2409:40e4:2a:f39:912c:51ab:d0af:9ea4', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36 Edg/151.0.0.0', '[]', '2026-08-18 09:58:00', '2026-08-18 09:58:00'),
(45, 2, 'super_login_success', '2401:4900:c0ac:daff:5874:eee4:e2c4:4e2b', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '[]', '2026-08-18 09:59:59', '2026-08-18 09:59:59'),
(46, 2, 'super_login_success', '2409:40e4:30:4f87:4ced:9489:320f:6b12', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '[]', '2026-08-20 11:30:28', '2026-08-20 11:30:28'),
(47, 2, 'super_login_success', '2401:4900:c0a3:4d5c:6576:6acb:db87:bcd3', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '[]', '2026-08-21 06:09:46', '2026-08-21 06:09:46'),
(48, NULL, 'super_login_failed', '2409:40e4:56:a2db:c8e5:98a7:b97c:9d20', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '{\"email\":\"developer@kvdl.com\"}', '2026-08-21 06:13:11', '2026-08-21 06:13:11'),
(49, 2, 'super_login_success', '2409:40e4:56:a2db:c8e5:98a7:b97c:9d20', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', '[]', '2026-08-21 06:14:38', '2026-08-21 06:14:38'),
(50, 2, 'super_login_success', '2409:40e4:53:4b95:904d:6e7c:4f70:7dfe', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36 Edg/151.0.0.0', '[]', '2026-08-22 10:40:46', '2026-08-22 10:40:46'),
(51, 1, 'login_success', '2409:40e4:1056:b4e6:9cf5:5b40:576f:1fbe', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '[]', '2026-09-17 05:04:06', '2026-09-17 05:04:06'),
(52, 1, 'login_success', '2401:4900:79d3:5589:3484:d455:fc23:91f6', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '[]', '2026-09-17 06:06:40', '2026-09-17 06:06:40'),
(53, 2, 'super_login_success', '2401:4900:79d3:5589:3484:d455:fc23:91f6', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '[]', '2026-09-17 06:07:12', '2026-09-17 06:07:12'),
(54, 1, 'logout', '2401:4900:79d3:5589:3484:d455:fc23:91f6', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36', '[]', '2026-09-17 06:08:07', '2026-09-17 06:08:07');

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_super_admin` tinyint(1) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `is_super_admin`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'lazfortstudio@gmail.com', '$2y$12$A3.uZuGlf.jBEFv80rQF/ezoxuQNF6LG13V7wkBxsbk.4cNABwpoy', 0, NULL, '2026-02-14 07:09:52', '2026-08-08 17:29:14'),
(2, 'Super Admin', 'developer@kvdl.in', '$2y$12$CTbJBiuR0ouiAAFQCedNoOGctetoI0RMk.TwZ2ijnsB4kDS7WU5p.', 1, NULL, '2026-08-08 17:29:14', '2026-08-08 17:29:14');

-- --------------------------------------------------------

--
-- Table structure for table `admin_password_resets`
--

CREATE TABLE `admin_password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_password_resets`
--

INSERT INTO `admin_password_resets` (`email`, `token`, `created_at`) VALUES
('lazfortstudio@gmail.com', 'wVBcsrLpDLYHfPVkT0tcunBfClwa4GqVskUnMeXt2y2VO0J6RF10NCHfruiVjA2k', '2026-02-14 07:10:02');

-- --------------------------------------------------------

--
-- Table structure for table `admin_tokens`
--

CREATE TABLE `admin_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `admin_id` bigint(20) UNSIGNED NOT NULL,
  `token_hash` varchar(64) NOT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_tokens`
--

INSERT INTO `admin_tokens` (`id`, `admin_id`, `token_hash`, `expires_at`, `created_at`, `updated_at`) VALUES
(6, 1, '23ecc7156c0b8b36aaf6c176172c072d9a699c00bb5ecf2826e5d18cc1537edf', '2026-02-23 04:49:41', '2026-02-16 04:49:41', '2026-02-16 04:49:41'),
(9, 1, '9fd9d12e6a77af5f6a9d095d40ceac93900c55d94f3e030c3415db4066db5b16', '2026-02-23 10:06:54', '2026-02-16 10:06:54', '2026-02-16 10:06:54'),
(17, 2, '0856cff8eafe5ab6b5aa95d0addae5d571e26d7283aa561e94ab3b73ac9e89cf', '2026-08-15 17:30:30', '2026-08-08 17:30:30', '2026-08-08 17:30:30'),
(18, 2, '445be61fa28822b8caf3309e063b7e704d28558bfff45765c02fa43045689d0e', '2026-08-15 17:54:38', '2026-08-08 17:54:38', '2026-08-08 17:54:38'),
(20, 2, '0fb613f2b24764c0e9d7ad1b5453e5fdc528a7bdb486894e66b66faf4914051f', '2026-08-25 09:42:34', '2026-08-18 09:42:34', '2026-08-18 09:42:34'),
(21, 2, '4dfffbde58bbbc598b3cb88f8a79c61a74595ef798c921e59af5769856d7731a', '2026-08-25 09:58:00', '2026-08-18 09:58:00', '2026-08-18 09:58:00'),
(22, 2, 'dc28a283362a98734806279652fe6c0c8125c71af0433480ccc6cbc5bee75c47', '2026-08-25 09:59:59', '2026-08-18 09:59:59', '2026-08-18 09:59:59'),
(23, 2, 'ed818b7c141080ad5e3e09a6469903a2472893195541ad8e11c9b015a30e8f47', '2026-08-27 11:30:28', '2026-08-20 11:30:28', '2026-08-20 11:30:28'),
(24, 2, '5d2acfda476e9beed459ca0cb1f334d00698136f10d4ec79004cce709799702e', '2026-08-28 06:09:46', '2026-08-21 06:09:46', '2026-08-21 06:09:46'),
(25, 2, '68f6c205e9609634a59dca431891617f8460ca7a27141ae65626d0dd61d0fe85', '2026-08-28 06:14:38', '2026-08-21 06:14:38', '2026-08-21 06:14:38'),
(26, 2, 'b2f340dd46518ef4d59a92afbd01d0fb3f3d29f48c735c1d1e6aba85ffbf8341', '2026-08-29 10:40:46', '2026-08-22 10:40:46', '2026-08-22 10:40:46'),
(27, 1, '2c19b71a10bae097a21e4d9cb44c28a61ed4875d0996123f4204c577ad107125', '2026-09-24 05:04:06', '2026-09-17 05:04:06', '2026-09-17 05:04:06'),
(29, 2, '10e4ed5ced3d87de9f49bac7f73bdc60e50a7259555475c1a6f5a3d8252a4d09', '2026-09-24 06:07:12', '2026-09-17 06:07:12', '2026-09-17 06:07:12');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext NOT NULL,
  `cover_url` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'published',
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `meta_keywords` varchar(255) DEFAULT NULL,
  `video_type` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `author`, `excerpt`, `content`, `cover_url`, `status`, `meta_title`, `meta_description`, `meta_keywords`, `video_type`, `video_url`, `created_at`, `updated_at`) VALUES
(1, 'this is the test blog', 'Admin', NULL, '<h2>subject : for testing the blogs </h2><blockquote><p>it is working </p></blockquote><ul><li><p>one </p></li><li><p>two </p></li><li><p>three</p></li></ul><p><img class=\"rounded-xl shadow-lg max-w-full my-4 border border-black/5\" src=\"https://kvdl.lazfort.com/backend/public/uploads/blogs/content_images/1771216247_322630c0-ca37-4045-841c-b5cb65036c6c.png\"></p>', '/uploads/blogs/images/1771217496_Gemini_Generated_Image_r8xxlsr8xxlsr8xx.png', 'published', NULL, NULL, NULL, 'youtube', NULL, '2026-02-16 04:31:20', '2026-02-16 04:51:36');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('kvdl-cache-155c51fd1d674507c08701c27657be04275e789d', 'i:1;', 1789621506),
('kvdl-cache-155c51fd1d674507c08701c27657be04275e789d:timer', 'i:1789621506;', 1789621506),
('kvdl-cache-3ba5358434d5b858f3f1ada97d1792fd86a1c0ac', 'i:2;', 1789625260),
('kvdl-cache-3ba5358434d5b858f3f1ada97d1792fd86a1c0ac:timer', 'i:1789625260;', 1789625260);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `career_applications`
--

CREATE TABLE `career_applications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `cover_letter` text DEFAULT NULL,
  `resume_path` varchar(255) NOT NULL,
  `status` enum('new','reviewed','contacted','rejected') NOT NULL DEFAULT 'new',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `career_applications`
--

INSERT INTO `career_applications` (`id`, `full_name`, `email`, `phone`, `position`, `cover_letter`, `resume_path`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Carol Boone', 'mykytyv@mailinator.com', '+1 (518) 975-7996', 'Voluptas quisquam au', 'Aliquid labore et no', 'resumes/ogFWyN9xGZJM9OYuH4m5EF9voJwwNWnPBkqQfdlO.docx', 'reviewed', '2026-02-14 07:21:13', '2026-02-16 10:00:30');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `property_type` varchar(255) DEFAULT NULL,
  `status` enum('new','read','replied') NOT NULL DEFAULT 'new',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `phone`, `subject`, `message`, `property_type`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Avinash', 'avinash@gmail.com', '8935894362', 'Searching for best property', 'please contact us soon', 'Commercial', 'new', '2026-02-14 07:03:42', '2026-02-14 07:03:42'),
(2, 'Sarthak sonar', 'sarthaksonar511@gmail.com', '07720043415', 'flat', 'want to connect regarding the flat inquire', 'Residential', 'new', '2026-02-16 10:01:56', '2026-02-16 10:01:56');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_01_01_000000_create_contacts_table', 1),
(5, '2024_01_02_000000_create_blogs_table', 1),
(6, '2024_01_02_010000_create_admin_tokens_table', 1),
(7, '2024_01_02_020001_add_is_admin_to_users_table', 1),
(8, '2024_02_01_000000_add_blog_enhancements', 1),
(9, '2024_02_09_000000_create_career_applications_table', 1),
(10, '2026_02_10_075411_create_admins_table', 1),
(11, '2026_02_10_075413_create_activity_logs_table', 1),
(12, '2026_02_10_075415_create_admin_password_resets_table', 1),
(13, '2026_02_10_080000_update_admin_tokens_table', 1),
(14, '2026_08_08_000000_add_is_super_admin_to_admins_table', 2),
(15, '2026_08_08_000001_create_projects_table', 2),
(16, '2026_08_22_104300_add_floorplan_to_projects_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `reraid` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'completed',
  `title` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `rating` varchar(255) NOT NULL DEFAULT '4.0',
  `amneties` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`amneties`)),
  `highlights` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`highlights`)),
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `floorplan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`floorplan`)),
  `brochure` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `reraid`, `type`, `title`, `image`, `location`, `pincode`, `rating`, `amneties`, `highlights`, `images`, `floorplan`, `brochure`, `description`, `created_at`, `updated_at`) VALUES
(1, 'P52100000555', 'completed', 'Dhruva', '/images/Completed Projects/KVDL-Dhruv Project/1.webp', 'Punawale, Pune', 'NA', '4.2', '[\"Power Backup\",\"Lift\",\"Security\",\"Intercom Facility\",\"Rain Water Harvesting\",\"Fire Fighting Equipment\",\"Parking\"]', '[{\"label\":\"Units\",\"value\":\"120 Total\"},{\"label\":\"Project Size\",\"value\":\"2 acre\"},{\"label\":\"Launch Date\",\"value\":\"Aug 2017\"},{\"label\":\"Total Towers\",\"value\":\"2 Towers\"}]', '[\"\\/images\\/Completed Projects\\/KVDL-Dhruv Project\\/1.webp\",\"\\/images\\/Completed Projects\\/KVDL-Dhruv Project\\/2.webp\",\"\\/images\\/Completed Projects\\/KVDL-Dhruv Project\\/3.webp\",\"\\/images\\/Completed Projects\\/KVDL-Dhruv Project\\/4.webp\",\"\\/images\\/Completed Projects\\/KVDL-Dhruv Project\\/5.webp\",\"\\/images\\/Completed Projects\\/KVDL-Dhruv Project\\/6.webp\",\"\\/images\\/Completed Projects\\/KVDL-Dhruv Project\\/7.webp\",\"\\/images\\/Completed Projects\\/KVDL-Dhruv Project\\/8.webp\"]', NULL, NULL, 'At Dhruva, we have tried to blend location and comfort at perfection as the location is just like the name suggests, truly iconic! Right on the western Mumbai-Banglore Highway giving all opportunity flourish any business and connectivity to every work place around making it deal for residence So come, be a part fo \'Dhruva\' and enjoy the iconic position.', '2026-08-08 17:29:14', '2026-08-12 04:52:01'),
(2, 'P52100002460', 'completed', 'Whitefield', '/storage/projects/94f4M8Qs32M5OMjVOD4iFlndoU7z3F3Eu58DiwhF.jpg', 'Pashan - Sus Road, Pune', '411021', '3.9', '[\"Club House\",\"Jogging Track\",\"Cycling Track\",\"Parking\",\"Indoor Games Room\",\"Meditation Area\",\"Internet\\/Wifi Connectivity\",\"Waste Disposal\",\"Multipurpose Courts\",\"Indoor Squash & Badminton Courts\",\"Solar Energy\",\"Early Learning Centre\",\"Library And Business Centre\",\"Flower Gardens\",\"Maintenance Staff\",\"Water Storage\",\"Power Backup\",\"Lift\",\"Security\",\"Gymnasium\",\"Intercom Facility\",\"Rain Water Harvesting\",\"Fire Fighting Equipment\"]', '[{\"label\":\"Units\",\"value\":\"190 Total\"},{\"label\":\"Project Size\",\"value\":\"3 acre\"},{\"label\":\"Launch Date\",\"value\":\"Dec 2016\"},{\"label\":\"Total Towers\",\"value\":\"3 Towers\"}]', '[\"\\/images\\/Completed Projects\\/KVDL-WhiteField\\/1.webp\",\"\\/images\\/Completed Projects\\/KVDL-WhiteField\\/2.webp\",\"\\/images\\/Completed Projects\\/KVDL-WhiteField\\/3.webp\",\"\\/images\\/Completed Projects\\/KVDL-WhiteField\\/4.webp\",\"\\/images\\/Completed Projects\\/KVDL-WhiteField\\/5.webp\",\"\\/images\\/Completed Projects\\/KVDL-WhiteField\\/6.webp\",\"\\/images\\/Completed Projects\\/KVDL-WhiteField\\/7.webp\",\"\\/images\\/Completed Projects\\/KVDL-WhiteField\\/8.webp\",\"\\/images\\/Completed Projects\\/KVDL-WhiteField\\/9.webp\",\"\\/images\\/Completed Projects\\/KVDL-WhiteField\\/10.webp\",\"\\/images\\/Completed Projects\\/KVDL-WhiteField\\/11.webp\",\"\\/images\\/Completed Projects\\/KVDL-WhiteField\\/12.webp\",\"\\/images\\/Completed Projects\\/KVDL-WhiteField\\/13.webp\",\"\\/images\\/Completed Projects\\/KVDL-WhiteField\\/14.webp\",\"\\/images\\/Completed Projects\\/KVDL-WhiteField\\/15.webp\",\"\\/images\\/Completed Projects\\/KVDL-WhiteField\\/3718 Salehittal Sus_BIRDS-R.jpg.webp\",\"\\/images\\/Completed Projects\\/KVDL-WhiteField\\/Club House.jpg.webp\"]', NULL, NULL, 'Whitefield priced at the range Rs 57.0 Lac onwards, these living spaces are designed keeping in mind all the basic as well as advanced facilities as well as necessities.', '2026-08-08 17:29:14', '2026-08-22 06:16:33'),
(3, 'P52100001856', 'completed', 'The Prestige Avenue', '/storage/projects/CmFpkkBCFXi9j0Xwu76d9PVs8FFPLfxQfXmMPbpy.png', 'Baner-Pashan Link Road, Pune', '411021', '4', '[\"Parking\",\"Vaastu Complaint\",\"Premium branded fittings\",\"DTH Television Facility\",\"Earth quake resistant\",\"Maintenance Staff\",\"Intercom Facility\",\"Water Storage\",\"Power Backup\",\"Service\\/Goods Lift\",\"Security\",\"Rain Water Harvesting\",\"Fire Fighting Equipment\"]', '[{\"label\":\"Units\",\"value\":\"82 Total\"},{\"label\":\"Project Size\",\"value\":\"1 acre\"},{\"label\":\"Launch Date\",\"value\":\"Dec 2015\"},{\"label\":\"Total Towers\",\"value\":\"1 Tower\"}]', '[\"\\/images\\/Completed Projects\\/KVDL-The Prestige Avenue\\/1.webp\",\"\\/images\\/Completed Projects\\/KVDL-The Prestige Avenue\\/2.webp\",\"\\/images\\/Completed Projects\\/KVDL-The Prestige Avenue\\/4.webp\",\"\\/images\\/Completed Projects\\/KVDL-The Prestige Avenue\\/5.webp\",\"\\/images\\/Completed Projects\\/KVDL-The Prestige Avenue\\/6.webp\",\"\\/images\\/Completed Projects\\/KVDL-The Prestige Avenue\\/7.webp\",\"\\/images\\/Completed Projects\\/KVDL-The Prestige Avenue\\/8.webp\",\"\\/images\\/Completed Projects\\/KVDL-The Prestige Avenue\\/9.webp\"]', '[\"\\/storage\\/projects\\/floorplans\\/40j9Ri9iG3mveR2KuvRtDWpBE5k1nBEy1HTugKTe.png\",\"\\/storage\\/projects\\/floorplans\\/wFI95pmWtW4eGt0itKjdbFtJ7lDdIs5z7suOrRpn.png\",\"\\/storage\\/projects\\/floorplans\\/AUufKAVgQykGxdp0EKa2eQucKY2ac5bjiC4FDD9Y.png\",\"\\/storage\\/projects\\/floorplans\\/r23f5lYzRjjgu1f8ElCnFRnCy8TJVKg3bhl9QebM.png\",\"\\/storage\\/projects\\/floorplans\\/mN7ZAEL1iVhorwcDz6TibTH9fXW5PypBPhEz5Ghl.png\",\"\\/storage\\/projects\\/floorplans\\/UI39VpCSSixO3HUUUYXiv5nCZiC3RhLmIKToK2zu.png\"]', '/storage/projects/brochures/FxFl3qf3XhEUoRYIDdVB4Wji6ke9ccBimwCYc3CU.pdf', 'The Prestige Avenue is a beautiful living space, which is beautifully completed by Kedar Vanjape Developers Pvt Ltd in Pashan Link Road, Pune. The project is designed beautifully where a huge number of buyers are looking to buy their house. The Prestige Avenue is nominally priced and conveniently located therefore you can choose your living space in this project and enjoy a lavish lifestyle with comfortable facilities. The also the beautiful surroundings.', '2026-08-08 17:29:14', '2026-08-22 12:57:39'),
(4, 'NA', 'completed', 'Anantshilp', '/images/Completed Projects/KVDL-Anantshilp/4.webp', 'Bavdhan, Pune', '411021', '3.9', '[\"Parking\",\"Internet\\/Wifi Connectivity\",\"Library And Business Centre\",\"Park\",\"Swimming Pool\",\"Club House\",\"Indoor Games Room\",\"Gymnasium\",\"Intercom Facility\",\"Power Backup\",\"Flower Garden\",\"Lift\",\"Security\",\"Rain Water Harvesting\",\"Outdoor Tennis Courts\",\"Indoor Squash & Badminton Courts\"]', '[{\"label\":\"Units\",\"value\":\"135 Total\"},{\"label\":\"Project Size\",\"value\":\"3 acre\"},{\"label\":\"Launch Date\",\"value\":\"March 2011\"},{\"label\":\"Total Towers\",\"value\":\"3 Tower\"}]', '[\"\\/images\\/Completed Projects\\/KVDL-Anantshilp\\/1.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantshilp\\/2.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantshilp\\/3.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantshilp\\/4.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantshilp\\/5.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantshilp\\/6.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantshilp\\/7.webp\"]', NULL, '/storage/projects/brochures/9MY4RqxSnlBOlTxQvMndSNk158VZ4oFQJr2aRWda.pdf', 'Anant Shilp Apartment is strategically located at Bavdhan with a seamless connectivity to the prominent areas of Pune. The property spreads over an area of 3 Acre.', '2026-08-08 17:29:14', '2026-08-12 04:48:55'),
(5, 'NA', 'completed', 'Anantvaibhav', '/images/Completed Projects/KVDL-Anantvaibhav/1.webp', 'Bavdhan, Pune', '411021', '3.5', '[\"Club House\",\"Swimming Pool\",\"Parking\",\"Indoor Games Room\",\"DTH Television Facility\",\"Indoor Squash & Badminton Courts\",\"Park\",\"Water Storage\",\"Power Backup\",\"Security\",\"Gymnasium\",\"Flower Garden\"]', '[{\"label\":\"Units\",\"value\":\"50 Total\"},{\"label\":\"Project Size\",\"value\":\"1 acre\"},{\"label\":\"Launch Date\",\"value\":\"May 2012\"},{\"label\":\"Total Towers\",\"value\":\"1 Tower\"}]', '[\"\\/images\\/Completed Projects\\/KVDL-Anantvaibhav\\/1.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantvaibhav\\/2.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantvaibhav\\/3.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantvaibhav\\/4.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantvaibhav\\/5.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantvaibhav\\/6.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantvaibhav\\/7.webp\"]', NULL, NULL, 'Anant Vaibhav is strategically located in Bavdhan in the city of Pune and is a well-planned project. The project is spread over a wide area of 1 Acre.', '2026-08-08 17:29:14', '2026-08-08 17:29:14'),
(6, 'P52100015968', 'completed', 'Anantsrishti', '/images/Completed Projects/KVDL-Anantsrishti/6.webp', 'Kanhe, Pune', '412106', '3.9', '[\"Club House\",\"Swimming Pool\",\"Jogging Track\",\"Cycling Track\",\"Reserved Parking\",\"Event Space & Amphitheatre\",\"RO Water System\",\"Power Backup\",\"Lift\",\"Security\",\"Gymnasium\",\"Intercom Facility\",\"Rain Water Harvesting\"]', '[{\"label\":\"Units\",\"value\":\"890 Total\"},{\"label\":\"Project Size\",\"value\":\"15 acre\"},{\"label\":\"Launch Date\",\"value\":\"Apr 2011\"},{\"label\":\"Total Towers\",\"value\":\"8 Towers\"}]', '[\"\\/images\\/Completed Projects\\/KVDL-Anantsrishti\\/1.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantsrishti\\/2.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantsrishti\\/3.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantsrishti\\/4.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantsrishti\\/5.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantsrishti\\/6.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantsrishti\\/7.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantsrishti\\/8.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantsrishti\\/9.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantsrishti\\/10.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantsrishti\\/11.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantsrishti\\/12.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantsrishti\\/13.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantsrishti\\/14.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantsrishti\\/15.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantsrishti\\/16.webp\",\"\\/images\\/Completed Projects\\/KVDL-Anantsrishti\\/17.webp\"]', NULL, NULL, 'Even beyond the charm of green and good living, amid rustic hillsides and the splashing waters of river Indrayani, lies Anant Srishti, a 35-acre township in Kanhe Phata that is not just a lifetime investment but a lifetime of peace, happiness and contentment. Its proximity to the Kanhe Phata railway station and national highway cuts your traveling time to half.', '2026-08-08 17:29:14', '2026-08-08 17:29:14'),
(7, 'P52700006321', 'completed', 'Nisargsrishti', '/images/Completed Projects/KVDL-Nisarg-srushti/1.jpg', 'Shirwal, Pune', '412801', '4.2', '[\"Power Backup\",\"Lift\"]', '[{\"label\":\"Units\",\"value\":\"110 Total\"},{\"label\":\"Project Size\",\"value\":\"10 acre\"},{\"label\":\"Launch Date\",\"value\":\"Mar 2015\"},{\"label\":\"Total Towers\",\"value\":\"2 Towers\"}]', '[\"\\/images\\/Completed Projects\\/KVDL-Nisarg-srushti\\/1.jpg\",\"\\/images\\/Completed Projects\\/KVDL-Nisarg-srushti\\/3.jpg\",\"\\/images\\/Completed Projects\\/KVDL-Nisarg-srushti\\/5.jpg\",\"\\/images\\/Completed Projects\\/KVDL-Nisarg-srushti\\/6.jpg\",\"\\/images\\/Completed Projects\\/KVDL-Nisarg-srushti\\/7.jpg\",\"\\/images\\/Completed Projects\\/KVDL-Nisarg-srushti\\/8.jpg\",\"\\/images\\/Completed Projects\\/KVDL-Nisarg-srushti\\/9.jpg\",\"\\/images\\/Completed Projects\\/KVDL-Nisarg-srushti\\/lo_largez.jpg\",\"\\/images\\/Completed Projects\\/KVDL-Nisarg-srushti\\/si_large.jpg\"]', '[]', NULL, 'Located in Shirwal, Pune, the Nisargsrishti is a thoughtfully planned one, equipped with all amenities for a comfortable living. This project has a total of 110 units. Nisargsrishti has been built by reputed real estate developer Kedar Vanjape Developers Pvt. Ltd. . Its pincode is 412801. At Nisargsrishti, a quality living is guaranteed by modern amenities and healthy surroundings.', '2026-08-08 17:29:14', '2026-09-17 06:07:36'),
(8, 'P52100080676', 'ongoing', 'Divine Valley', '/images/Ongoing projects/KVDL-DivineVally/4.webp', 'Karanjgaon, Pune', '410405', 'NA', '[\"Waste Disposal\",\"Power Backup\",\"Security\",\"CCTV Camera\",\"Rain Water Harvesting\",\"Fire Safety\",\"Jogging Track\",\"Cycling Track\",\"Swimming Pool\",\"Senior Citizen Corner\",\"Indoor Games Room\",\"Gymnasium\",\"Indoor Squash & Badminton Courts\",\"Library And Business Centre\",\"Fire Fighting Equipment\",\"Gazebo\",\"Club House\",\"Party Lawn\",\"Amphitheater\"]', '[{\"label\":\"Units\",\"value\":\"NA\"},{\"label\":\"Project Area\",\"value\":\"NA\"},{\"label\":\"Launch Date\",\"value\":\"NA\"},{\"label\":\"Total Towers\",\"value\":\"NA\"}]', '[\"\\/images\\/Ongoing projects\\/KVDL-DivineVally\\/1.webp\",\"\\/images\\/Ongoing projects\\/KVDL-DivineVally\\/2.webp\",\"\\/images\\/Ongoing projects\\/KVDL-DivineVally\\/3.webp\",\"\\/images\\/Ongoing projects\\/KVDL-DivineVally\\/4.webp\",\"\\/images\\/Ongoing projects\\/KVDL-DivineVally\\/5.webp\"]', '[\"\\/storage\\/projects\\/floorplans\\/f0QYy34HPNrU2mPo8fA1G8dADvNhLXVfASPKjphA.webp\",\"\\/storage\\/projects\\/floorplans\\/HAlwPWtyVa5oLQRWgcW7hXMtIfsHVrovVBD0cnQh.webp\",\"\\/storage\\/projects\\/floorplans\\/le2EgXbHJy34W9hAqhvZ2Rs0vrUqM6s5txFr5QlJ.webp\",\"\\/storage\\/projects\\/floorplans\\/CuvK9G97k7NjqpOPjeIZ4ZNGKg49g1qw5d5a7FIs.webp\",\"\\/storage\\/projects\\/floorplans\\/MWdTcPl32Gjqjp7FByxCbydRyVAVDb9mI4MBelkL.webp\"]', '/storage/projects/brochures/v7zUXNkyH0js4XujwxbcpHJzS9Q2lKrCsUdh43qy.pdf', 'Pune Construction Karanjgaon is famous for their well-planned societies like Divine Valley in Pune. If you have always wanted to be part of a vibrant and well managed society, this is the best option for you. You get ample & dedicated bike parking facility with this home. Working from home is convenient as this society has reliable generator for back up.', '2026-08-08 17:29:14', '2026-08-22 10:59:44'),
(9, 'P52100078804', 'ongoing', 'Godavari', '/images/Ongoing projects/KVDL-Godavari/1.webp', 'Bhosale Nagar, Pune', '411007', '4.2', '[\"Meditation Area\",\"Water Storage\",\"Power Backup\",\"Lift\",\"Security\",\"Kids Play Area\",\"Open Gym\",\"Sit Out\'s\",\"Gazebo\",\"Decorative Wall\",\"Stargazing\",\"Party Lawn\"]', '[{\"label\":\"Units\",\"value\":\"35\"},{\"label\":\"Project Area\",\"value\":\"1222.43 sqm\"},{\"label\":\"Launch Date\",\"value\":\"March 2025\"},{\"label\":\"Total Towers\",\"value\":\"1 Tower\"}]', '[\"\\/images\\/Ongoing projects\\/KVDL-Godavari\\/1.webp\",\"\\/images\\/Ongoing projects\\/KVDL-Godavari\\/2.webp\",\"\\/images\\/Ongoing projects\\/KVDL-Godavari\\/3.webp\",\"\\/images\\/Ongoing projects\\/KVDL-Godavari\\/4.webp\"]', '[]', '/storage/projects/brochures/vJXi9W9wE7VLriEoXBP48lL6OZHOwfHlqHxZF362.pdf', 'Experience the joys of living at Godavari Shree CHS, a premier residential project located in the heart of Bhosale Nagar, Pune. With its prime location, youre only a stone throw away from important connecting roads like Ganeshkhind Road and Baner Road. The project offers a range of amenities that cater to your needs, from kids play areas and power backup to ensuring a comfortable living experience. Whether youre a young professional or a growing family, Godavari Shree CHS is the perfect choice to call home.', '2026-08-08 17:29:14', '2026-08-25 11:08:44'),
(10, 'P52100050198', 'ongoing', 'Harshada', '/images/Ongoing projects/KVDL-Harshada/2.webp', 'Kothrud, Pune', '411038', 'NA', '[\"Parking\",\"Flower Gardens\",\"Maintenance Staff\",\"Water Storage\",\"Power Backup\",\"Security\",\"Rain Water Harvesting\",\"Fire Fighting Equipment\"]', '[{\"label\":\"Units\",\"value\":\"30 Total\"},{\"label\":\"Project Size\",\"value\":\"0.32 Acres\"},{\"label\":\"Launch Date\",\"value\":\"Apr 2023\"},{\"label\":\"Total Towers\",\"value\":\"1 Tower\"}]', '[\"\\/images\\/Ongoing projects\\/KVDL-Harshada\\/1.webp\",\"\\/images\\/Ongoing projects\\/KVDL-Harshada\\/2.webp\",\"\\/images\\/Ongoing projects\\/KVDL-Harshada\\/3.webp\",\"\\/images\\/Ongoing projects\\/KVDL-Harshada\\/4.webp\",\"\\/images\\/Ongoing projects\\/KVDL-Harshada\\/5.webp\",\"\\/images\\/Ongoing projects\\/KVDL-Harshada\\/6.webp\",\"\\/images\\/Ongoing projects\\/KVDL-Harshada\\/7.webp\"]', NULL, NULL, 'Possession date of Badhekar Harshada CHSL is Sep, 2025. The property offers 1 BHK, 2 BHK, 3 BHK units. As per the area plan, units are in the size range of 360.0 - 1073.0 sq.ft.', '2026-08-08 17:29:14', '2026-08-08 17:29:14'),
(11, 'P52100034495', 'ongoing', 'Sneh', '/images/Ongoing projects/KVDL-SNEH/2.webp', 'Plot No. 69, Kothrud, Pune', '411038', 'NA', '[\"Parking\",\"Flower Gardens\",\"Maintenance Staff\",\"Water Storage\",\"Power Backup\",\"Security\",\"Kids\' Play Ground\",\"Rain Water Harvesting\",\"Fire Fighting Equipment\"]', '[{\"label\":\"Units\",\"value\":\"23 Total\"},{\"label\":\"Project Size\",\"value\":\"0.29 Acres\"},{\"label\":\"Launch Date\",\"value\":\"Apr, 2022\"},{\"label\":\"Total Towers\",\"value\":\"1 Tower\"}]', '[\"\\/images\\/Ongoing projects\\/KVDL-SNEH\\/1.webp\",\"\\/images\\/Ongoing projects\\/KVDL-SNEH\\/2.webp\",\"\\/images\\/Ongoing projects\\/KVDL-SNEH\\/3.webp\",\"\\/images\\/Ongoing projects\\/KVDL-SNEH\\/4.webp\",\"\\/images\\/Ongoing projects\\/KVDL-SNEH\\/5.webp\"]', NULL, NULL, 'Badhekar Sneh offers some of the most conveniently designed Apartment. Located in Kothrud, it is a residential project. The project is spread over 0.29 Acres . It has 23 units. There is 1 building in this project. Badhekar Sneh offers some of the most exclusive 2 BHK, 3 BHK. As per the area plan, units are in the size range of 740.0 - 1050.0 sq.ft.', '2026-08-08 17:29:14', '2026-08-08 17:29:14'),
(12, 'P52200055199', 'ongoing', 'Varad Paradise', '/images/Ongoing projects/KVDL-VaradParadise/1.webp', 'Kopargaon, Ahmednagar', '423601', '4.5', '[\"Parking\",\"Lift\",\"Water Storage\",\"Security\",\"Community Hall\"]', '[{\"label\":\"Units\",\"value\":\"23 Total\"},{\"label\":\"Project Size\",\"value\":\"713.25 Sqm\"},{\"label\":\"Completion Date\",\"value\":\"Dec 2027\"},{\"label\":\"Total Towers\",\"value\":\"1\"}]', '[\"\\/images\\/Ongoing projects\\/KVDL-VaradParadise\\/1.webp\",\"\\/storage\\/projects\\/gallery\\/xDKzOIN1qE82Z8TCzcYUxFEDRmpiwX9kMaGNNkAx.jpg\"]', '[]', NULL, 'Nestled in Kopargaon (R), this project is strategically situated near 24 MTR ROAD, providing easy access to major transportation hubs. With a total plot area of 713.25 sqmts, VARAD PARADISE boasts of 23 apartments .', '2026-08-08 17:29:14', '2026-08-25 11:00:24'),
(13, 'PR1260002501435', 'ongoing', 'Westend', '/images/Ongoing projects/KVDL-westend/1.jpeg', 'Rambaug Colony, Pune', '411038', '4.5', '[\"Parking\",\"Water Storage\",\"Power Backup\",\"Security\"]', '[{\"label\":\"Units\",\"value\":\"21\"},{\"label\":\"Project Size\",\"value\":\"511.15  Sqm\"},{\"label\":\"Launch Date\",\"value\":\"June 2026\"},{\"label\":\"Total Towers\",\"value\":\"1 Tower\"}]', '[\"\\/images\\/Ongoing projects\\/KVDL-westend\\/1.jpeg\",\"\\/images\\/Ongoing projects\\/KVDL-westend\\/2.jpeg\",\"\\/storage\\/projects\\/gallery\\/URJ6BibcJ867fXN0Nx3KzddbtcK2Zeh12r9zWICX.jpg\",\"\\/storage\\/projects\\/gallery\\/uJ7Z6WTEs94Snyp573Z4XuyoEYfDE3zY0zinFqIc.jpg\",\"\\/storage\\/projects\\/gallery\\/ACBWQxSsXBX02KvhYinFN0ub8Te9nByQeDlDurTD.jpg\",\"\\/storage\\/projects\\/gallery\\/oRngMTLxTl52pTP8aAF1Q7h6v6BnH5HoiFazBdRM.jpg\",\"\\/storage\\/projects\\/gallery\\/5xuHx1WyrA1yqE3RkJm6l0niRxzxtlroAP8h1KLj.jpg\",\"\\/storage\\/projects\\/gallery\\/pmT4AHK5JamldEKYJvWrbX4pxMaiym87oSyfIydm.jpg\",\"\\/storage\\/projects\\/gallery\\/JkLFli2rbWsklqhAKV06UhKBNVPrseEn0T86O2Sz.jpg\",\"\\/storage\\/projects\\/gallery\\/LLsjr1QAjPLAdrGmMtIJl9084pkilRNfPw5C3aNg.jpg\",\"\\/storage\\/projects\\/gallery\\/BDyvj4pVECJEac6AT3fmnJezAutA4Iyig34UFIil.jpg\",\"\\/storage\\/projects\\/gallery\\/0ATIdElAF5gD4eXQimRom3CSqdX1wPSTlSL04mBY.jpg\",\"\\/storage\\/projects\\/gallery\\/8FVhUrFm5enW5d2QaUnn6FMLeTO289OI2o2n6ajr.jpg\",\"\\/storage\\/projects\\/gallery\\/5FavtgXvJYX2ZYS3oI6HGWWAkvUVtHynEBXdVcnZ.jpg\",\"\\/storage\\/projects\\/gallery\\/UHPjr0XaMbglcASqdMC0z6WNAfz4MHrLkazoOh7O.jpg\",\"\\/storage\\/projects\\/gallery\\/73JNddfoUqAHfSUHv6nt1YOLYM8JhtqrkFEKRDaE.jpg\",\"\\/storage\\/projects\\/gallery\\/DiBcQglw7nB6WP7rnZrqKJN1xOkozZnaMKcFLOPo.jpg\",\"\\/storage\\/projects\\/gallery\\/fPUetI3nge4BfLasnSc5GwV7Try5gZKHfkPJoY8c.jpg\",\"\\/storage\\/projects\\/gallery\\/erDnREpxBlFH1XzQOobklhokOzfRLFUjeyzf7kjD.jpg\",\"\\/storage\\/projects\\/gallery\\/ORTb4z7uyZcaKqihg45WfsxXMah366o10vXEVwQu.jpg\",\"\\/storage\\/projects\\/gallery\\/mDv0klxVxl6ffvsGN1zghMexy2kB1ICKDdPeckAJ.jpg\",\"\\/storage\\/projects\\/gallery\\/82lfEP0RmyATohIuhC4XDruCMkTAQ2EgyenHipAY.jpg\",\"\\/storage\\/projects\\/gallery\\/t5QxaAaHv1Fnr3oFS7phbQsn0lJHALuOokUJkw6U.jpg\",\"\\/storage\\/projects\\/gallery\\/zccyvp4MAljj1h4fogrZlZJe8cbMzKOR3IqIAQje.jpg\",\"\\/storage\\/projects\\/gallery\\/AmvgmHNaC6XjG3dIbRWoI7nVWx3vqZ4OwDxHetnD.jpg\",\"\\/storage\\/projects\\/gallery\\/4vBQ8XqnkPDyuO7aeDj1b3rkHU7j2TaM4zGnyTFd.jpg\",\"\\/storage\\/projects\\/gallery\\/kQ3X0FkSHl2roeOsnoWcpAS4t6PO4B0565lxYgPD.jpg\",\"\\/storage\\/projects\\/gallery\\/XD0ZEOBtyAu7wvEHzupyXPaxtotUTxBWoJhC4dya.jpg\",\"\\/storage\\/projects\\/gallery\\/G9SImkkCr8ARE013Jimm4RXTivv8fW6G5M1fTuLG.jpg\",\"\\/storage\\/projects\\/gallery\\/DNM1lm6bJMbFEo7JRaLptMIp5BrvLs7NDNaxf6fa.jpg\",\"\\/storage\\/projects\\/gallery\\/YYf9hmOmM2HzQQuoQbIvCKWwbLcFykiyrLIaW3Je.jpg\",\"\\/storage\\/projects\\/gallery\\/fvOvrktajEcwZJ4Em9lOTUFTYz0hTTp5PJ7X5x6n.jpg\",\"\\/storage\\/projects\\/gallery\\/5q1Jb8mZgJtrQvfBS7qqLU0ycBJk4AGBmv6U3Ohh.jpg\",\"\\/storage\\/projects\\/gallery\\/YEgRtmLTxg7tVxmCvJ7gucNFXaKv5MqUrIAMmtKt.jpg\",\"\\/storage\\/projects\\/gallery\\/OhZoCGj7yeiUTCC9BAS4ovUOjCru242he1KIeOVL.jpg\",\"\\/storage\\/projects\\/gallery\\/rUMNLZ0ArZHUifkstJRoR3lrSMJKytY17SNM7uzy.jpg\",\"\\/storage\\/projects\\/gallery\\/H6RqblsV02hhI0d2B3BflfZmhrukz37rOPd2e87h.jpg\",\"\\/storage\\/projects\\/gallery\\/rg7jio5HHMDRmRsWRZRDUncKysKnEaYVLnbO9OFB.jpg\",\"\\/storage\\/projects\\/gallery\\/UtIhoMsDEQl2xkErjmCPb1XIPnqlVz8GZzllEdju.jpg\",\"\\/storage\\/projects\\/gallery\\/FkBHTjS2x6YYXRM0FcUu5TBMOK6npS2ap1xMgi5f.jpg\",\"\\/storage\\/projects\\/gallery\\/r2BEsOITNoYptMmv1MUtlL5q09OXoQC4lQ1OW7xE.jpg\"]', '[]', NULL, 'KVDL Westend is a premium residential project located at Rambaug Colony, Pune. Designed with modern amenities and high-quality construction, it offers the perfect combination of comfort and convenience.', '2026-08-08 17:29:14', '2026-09-17 06:08:01');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activity_logs_admin_id_index` (`admin_id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_email_unique` (`email`);

--
-- Indexes for table `admin_password_resets`
--
ALTER TABLE `admin_password_resets`
  ADD KEY `admin_password_resets_email_index` (`email`);

--
-- Indexes for table `admin_tokens`
--
ALTER TABLE `admin_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_tokens_token_hash_unique` (`token_hash`),
  ADD KEY `admin_tokens_admin_id_foreign` (`admin_id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `career_applications`
--
ALTER TABLE `career_applications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `admin_tokens`
--
ALTER TABLE `admin_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `career_applications`
--
ALTER TABLE `career_applications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_tokens`
--
ALTER TABLE `admin_tokens`
  ADD CONSTRAINT `admin_tokens_admin_id_foreign` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
