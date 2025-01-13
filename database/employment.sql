-- Use the database
USE candidateprofile;
-- Create table for employment
CREATE TABLE employment (
    candidate_id INT NOT NULL,
    current_employment ENUM('Employed', 'Unemployed'),
    employment_type ENUM('Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'),
    experience VARCHAR(50),
    current_company_name VARCHAR(255),
    current_job_title VARCHAR(255),
    joining_date DATE,
    current_salary VARCHAR(50),
    skill_used TEXT,
    job_profile TEXT,
    notice_period VARCHAR(50),
    FOREIGN KEY (candidate_id) REFERENCES dashboardcandidate(candidate_id) ON DELETE CASCADE ON UPDATE CASCADE
);
