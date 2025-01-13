-- Use the database
USE candidateprofile;
-- Create table for projects
CREATE TABLE projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT NOT NULL,
    project_title VARCHAR(255) NOT NULL,
    client VARCHAR(255),
    project_status ENUM('Ongoing', 'Completed', 'On Hold') NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    work_duration VARCHAR(50),
    details_of_project TEXT,
    FOREIGN KEY (candidate_id) REFERENCES dashboardcandidate(candidate_id) ON DELETE CASCADE ON UPDATE CASCADE
);
