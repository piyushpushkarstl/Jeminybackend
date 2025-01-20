USE candidateprofile;
CREATE TABLE signin (
  candidate_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL
);
ALTER TABLE signin ADD COLUMN resume VARCHAR(255) NOT NULL;
ALTER TABLE signin MODIFY resume LONGBLOB;
ALTER TABLE signin ADD COLUMN otp VARCHAR(6), ADD COLUMN otp_expiry DATETIME;
ALTER TABLE signin MODIFY otp VARCHAR(6) DEFAULT NULL;
ALTER TABLE signin MODIFY otp_expiry DATETIME DEFAULT NULL;
ALTER TABLE signin MODIFY otp CHAR(6);

SELECT * FROM signin; 
DESCRIBE signin;
INSERT INTO signin (name, email, phone, password, resume, otp, otp_expiry)
VALUES ('Test Name', 'test@email.com', '1234567890', 'hashed_password', 'resume_data', '123456', NOW());

