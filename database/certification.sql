-- Use the database
USE candidateprofile;
-- Create table for certifications
CREATE TABLE certification (
    candidate_id INT NOT NULL,
    certification_name VARCHAR(255) NOT NULL,
    url VARCHAR(2083),
    FOREIGN KEY (candidate_id) REFERENCES dashboardcandidate(candidate_id) ON DELETE CASCADE ON UPDATE CASCADE
);
