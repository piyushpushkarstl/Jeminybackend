-- Use the database
USE candidateprofile;
-- Create table for personal details
CREATE TABLE personaldetails (
    candidate_id INT NOT NULL,
    gender ENUM('Male', 'Female', 'Other'),
    more_information TEXT,
    marital_status ENUM('Single', 'Married', 'Divorced', 'Widowed'),
    dob DATE,
    category VARCHAR(255),
    differently_abled ENUM('Yes', 'No'),
    career_break TEXT,
    work_permit_to_usa ENUM('Yes', 'No'),
    work_permit_to_country VARCHAR(255),
    permanent_address TEXT,
    home_town VARCHAR(255),
    pin_code VARCHAR(15),
    language_proficiency TEXT,
    FOREIGN KEY (candidate_id) REFERENCES dashboardcandidate(candidate_id) ON DELETE CASCADE ON UPDATE CASCADE
);
