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
INSERT INTO `project` (`id`, `reference_number`, `title`, `client`) VALUES (1, 1001, 'Our Own Home Renovation', 'Ourselves');

COMMIT;

