SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

create database IF NOT EXISTS actas;
use actas;

CREATE TABLE register (
  idregister INTEGER UNSIGNED  NOT NULL   AUTO_INCREMENT,
  assistants INTEGER UNSIGNED  NOT NULL  ,
  date DATE  NOT NULL  ,
  startHour VARCHAR(20)  NOT NULL  ,
  finishHour VARCHAR(20)  NOT NULL  ,
  matters TEXT  NOT NULL  ,
  responsible VARCHAR(100)  NOT NULL  ,
  develop TEXT  NOT NULL  ,
  commitments TEXT  NOT NULL    ,
PRIMARY KEY(idregister));


CREATE TABLE account (
  username VARCHAR(50)  NOT NULL  ,
  password_2 TEXT  NOT NULL    ,
PRIMARY KEY(username));

CREATE TABLE `refresh_token` (
  `token_hash` varchar(255) NOT NULL,
  `expires_at` int(128) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `students` (`id`, `name`, `age`, `gender`) VALUES
(1, 'John Doe', 20, 'Male'),
(2, 'Jane Smith', 4, 'Female'),
(3, 'David', 4, 'Male'),
(4, 'Bob Brown', 23, 'Male'),
(5, 'Emily Davis', 19, 'Female'),
(6, 'Michael Wilson', 20, 'Male'),
(7, 'Sarah Taylor', 22, 'Female'),
(8, 'David Clark', 21, 'Male'),
(9, 'Emma Martinez', 19, 'Female'),
(10, 'James White', 23, 'Male'),
(11, 'Chinedu Obi', 24, 'Male'),
(12, 'Chioma Nwosu', 20, 'Female'),
(13, 'Adesua Adeleke', 22, 'Female'),
(14, 'Emeka Okoro', 25, 'Male'),
(15, 'Ngozi Okafor', 21, 'Female');


CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `user` (`id`, `name`, `username`, `password_hash`) VALUES
(1, 'Admin', 'admin', '$2y$10$hR.gPkWC9i7K/BmrGi6fyePlal.LxSnoNe4aViXZa0kGsZoxCCTOm');

ALTER TABLE `refresh_token`
  ADD PRIMARY KEY (`token_hash`);

ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

