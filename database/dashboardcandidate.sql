-- Create database
CREATE DATABASE candidateprofile;

-- Use the database
USE candidateprofile;

-- Create table
CREATE TABLE dashboardcandidate (
    candidate_id INT AUTO_INCREMENT PRIMARY KEY,
    photo BLOB,
    full_name VARCHAR(255) NOT NULL,
    profile_last_updated DATETIME NOT NULL,
    location VARCHAR(255),
    fresher_experience ENUM('Fresher', 'Experience') NOT NULL,
    availability_to_join DATE,
    phone_no VARCHAR(15),
    email VARCHAR(255) UNIQUE NOT NULL
);

ALTER TABLE dashboardcandidate 
MODIFY COLUMN fresher_experience VARCHAR(255) NOT NULL;

SELECT * FROM dashboardcandidate;




