-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema archidb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `archidb` ;

-- -----------------------------------------------------
-- Schema archidb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `archidb` DEFAULT CHARACTER SET utf8 ;
USE `archidb` ;

-- -----------------------------------------------------
-- Table `project`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `project` ;

CREATE TABLE IF NOT EXISTS `project` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `reference_number` INT NULL,
  `title` VARCHAR(150) NULL,
  `client` VARCHAR(150) NULL,
  `is_active` TINYINT NULL,
  `contract_phase` VARCHAR(45) NULL,
  `working_phase` VARCHAR(45) NULL,
  `phase_status` VARCHAR(45) NULL,
  `fee` DECIMAL(7,2) NULL,
  `created_at` DATE NULL,
  `updated_at` DATE NULL,
  `note` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `projectcol_UNIQUE` (`reference_number` ASC))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS archie@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'archie'@'localhost' IDENTIFIED BY 'archie';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'archie'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `project`
-- -----------------------------------------------------
START TRANSACTION;
USE `archidb`;
INSERT INTO `project` (`id`, `reference_number`, `title`, `client`, `is_active`, `contract_phase`, `working_phase`, `phase_status`, `fee`, `created_at`, `updated_at`, `note`) VALUES (1, 1001, 'Single Family Home Porch Addition', 'Molly Moderne', 1, '100% Construction Documents', '35% Schematic Design', 'Revisions', 2580.00, '2022-08-15', '2023-06-03', '');
INSERT INTO `project` (`id`, `reference_number`, `title`, `client`, `is_active`, `contract_phase`, `working_phase`, `phase_status`, `fee`, `created_at`, `updated_at`, `note`) VALUES (2, 1002, 'Townhome Rehabilitation', 'Iggy Italianate', 1, '65% Design Development', '15% Preliminary Design', 'Delivered', 4150.00, '2022-09-30', '2023-06-03', 'Pending client comments for revisions.');
INSERT INTO `project` (`id`, `reference_number`, `title`, `client`, `is_active`, `contract_phase`, `working_phase`, `phase_status`, `fee`, `created_at`, `updated_at`, `note`) VALUES (3, 1010, 'Retail Buildout', 'Charlie Craftsman', 0, 'Consultation', 'Consultation', 'Complete', 50.00, '2022-11-18', '2023-06-03', '');
INSERT INTO `project` (`id`, `reference_number`, `title`, `client`, `is_active`, `contract_phase`, `working_phase`, `phase_status`, `fee`, `created_at`, `updated_at`, `note`) VALUES (4, 1011, 'Change of Use to Mercantile', 'Vance Victorian', 1, '100% Construction Documents', '65% Design Development', 'Working', 11375.00, '2023-01-12', '2023-06-03', '');
INSERT INTO `project` (`id`, `reference_number`, `title`, `client`, `is_active`, `contract_phase`, `working_phase`, `phase_status`, `fee`, `created_at`, `updated_at`, `note`) VALUES (5, 1023, 'New Construction Duplex', 'Robert Builder', 0, '35% Schematic Design', '35% Schematic Design', 'Complete', 6245.00, '2023-02-25', '2023-06-03', '');

COMMIT;

