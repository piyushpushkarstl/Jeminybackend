-- Use the database
USE candidateprofile;
-- Create table for key skills
CREATE TABLE keyskills (
    skill_id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT NOT NULL,
    skill_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (candidate_id) REFERENCES dashboardcandidate(candidate_id) ON DELETE CASCADE ON UPDATE CASCADE
);
select *from keyskills;
