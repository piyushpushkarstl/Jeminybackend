-- Use the database
USE candidateprofile;
-- Create table for profile summary
CREATE TABLE profile_summary (
    candidate_id INT NOT NULL,
    summary TEXT NOT NULL,
    FOREIGN KEY (candidate_id) REFERENCES dashboardcandidate(candidate_id) ON DELETE CASCADE ON UPDATE CASCADE
);
