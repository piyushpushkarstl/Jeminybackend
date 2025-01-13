-- Use the database
USE candidateprofile;
-- Create table for work samples
CREATE TABLE worksamples (
    candidate_id INT NOT NULL,
    work_title VARCHAR(255) NOT NULL,
    url VARCHAR(2083),
    description TEXT,
    FOREIGN KEY (candidate_id) REFERENCES dashboardcandidate(candidate_id) ON DELETE CASCADE ON UPDATE CASCADE
);
