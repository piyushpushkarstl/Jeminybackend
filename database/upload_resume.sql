-- Use the database
USE candidateprofile;
-- Create table for upload resume
CREATE TABLE upload_resume (
    resume_id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT NOT NULL,
    resume_file BLOB NOT NULL,
    FOREIGN KEY (candidate_id) REFERENCES dashboardcandidate(candidate_id) ON DELETE CASCADE ON UPDATE CASCADE
);
