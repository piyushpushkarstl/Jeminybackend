USE jeminy;
CREATE TABLE candidate_education (
    Education_ID INT AUTO_INCREMENT PRIMARY KEY,
    Candidate_ID INT,
    Start_Date DATE,
    End_Date DATE,
    Education_Type VARCHAR(50),
    Education_Category VARCHAR(50),
    Education_Mode VARCHAR(50),
    Institute_ID VARCHAR(50),
    Institute_Name VARCHAR(100),
    CGPA DECIMAL(3, 2),
    IIT BOOLEAN,
    IIM BOOLEAN,
    NIT BOOLEAN,
    FOREIGN KEY (Candidate_ID) REFERENCES personaldetails(Candidate_ID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

select *from candidate_education;
