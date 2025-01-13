USE jeminy;
CREATE TABLE previous_employment (
    Employment_ID INT AUTO_INCREMENT PRIMARY KEY,
    Candidate_ID INT,
    Start_Date DATE,
    End_Date DATE,
    Company VARCHAR(100),
    City VARCHAR(100),
    Country VARCHAR(100),
    Employment_Type VARCHAR(50),
    Designation VARCHAR(50),
    Job_Description TEXT,
    Skill_Used TEXT,
    Current_Industry VARCHAR(100),
    Current_Department VARCHAR(100),
    FOREIGN KEY (Candidate_ID) REFERENCES personaldetails(Candidate_ID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
