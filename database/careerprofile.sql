-- Use the database
USE candidateprofile;
-- Create table for career profile
CREATE TABLE careerprofile (
    candidate_id INT NOT NULL,
    current_industry VARCHAR(255),
    department VARCHAR(255),
    desired_job_type VARCHAR(255),
    desired_employment_type VARCHAR(255),
    preferred_shift VARCHAR(255),
    preferred_work_location VARCHAR(255),
    expected_salary VARCHAR(50),
    FOREIGN KEY (candidate_id) REFERENCES dashboardcandidate(candidate_id) ON DELETE CASCADE ON UPDATE CASCADE
);
