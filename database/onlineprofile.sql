-- Use the database
USE candidateprofile;
-- Create table for online profile
CREATE TABLE onlineprofile (
    candidate_id INT NOT NULL,
    social_profile VARCHAR(255) NOT NULL,
    url VARCHAR(2083),
    FOREIGN KEY (candidate_id) REFERENCES dashboardcandidate(candidate_id) ON DELETE CASCADE ON UPDATE CASCADE
);
