-- Use the database
USE candidateprofile;
-- Create table for candidate education
CREATE TABLE candidateeducation (
    education_id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT NOT NULL,
    level_of_education VARCHAR(255) NOT NULL,
    university VARCHAR(255) NOT NULL,
    course VARCHAR(255) NOT NULL,
    specialization VARCHAR(255),
    course_type ENUM('Full-time', 'Part-time', 'Distance') NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    grading_system VARCHAR(50),
    FOREIGN KEY (candidate_id) REFERENCES dashboardcandidate(candidate_id) ON DELETE CASCADE
    ON UPDATE CASCADE
);