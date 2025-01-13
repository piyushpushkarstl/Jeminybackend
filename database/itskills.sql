-- Use the database
USE candidateprofile;
-- Create table for IT skills
CREATE TABLE itskills (
    candidate_id INT NOT NULL,
    software_name VARCHAR(255) NOT NULL,
    software_version VARCHAR(50),
    experience VARCHAR(50),
    FOREIGN KEY (candidate_id) REFERENCES dashboardcandidate(candidate_id) ON DELETE CASCADE ON UPDATE CASCADE
);
