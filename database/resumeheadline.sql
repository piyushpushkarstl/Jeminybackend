-- Use the database
USE candidateprofile;
-- Create table for resume headline
CREATE TABLE resumeheadline (
    candidate_id INT NOT NULL,
    resume_headline TEXT NOT NULL,
    FOREIGN KEY (candidate_id) REFERENCES dashboardcandidate(candidate_id) ON DELETE CASCADE ON UPDATE CASCADE
);
