USE candidateprofile;

CREATE TABLE signin (
  candidate_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL
);
ALTER TABLE signin ADD COLUMN resume VARCHAR(255) NOT NULL;


SELECT * FROM signin;