SET FOREIGN_KEY_CHECKS = 0;
SET AUTCOMMIT = 0;

CREATE DATABASE raincheck;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id int NOT NULL AUTO_INCREMENT,
    email varchar(50) NOT NULL,
    default_location varchar(50) NOT NULL,
    pword varchar(50) NOT NULL,
    PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS garments; 
CREATE TABLE garments (
    garment_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    image_url varchar(50) NOT NULL,
    category_id int,
    date_updated datetime NOT NULL,
    PRIMARY KEY (garment_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories (category_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
    category_id int NOT NULL AUTO_INCREMENT,
    category varchar(50) NOT NULL,
    PRIMARY KEY (category_id)
);