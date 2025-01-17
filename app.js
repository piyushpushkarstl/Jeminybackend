const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes'); // Import signin routes here
const dashboardRoutes = require('./routes/dashboardRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const resumeHeadlineRoutes = require('./routes/resumeHeadlineRoutes');
const keySkillsRoutes = require('./routes/keySkillsRoutes');
const itSkillsRoutes = require('./routes/itSkillsRoutes');
const educationRoutes = require('./routes/educationRoutes');
const employmentRoutes = require('./routes/employmentRoutes');
const projectsRoutes = require('./routes/projectsRoutes');
const profileSummaryRoutes = require('./routes/profileSummaryRoutes');
const careerProfileRoutes = require('./routes/careerProfileRoutes');
const personalDetailsRoutes = require('./routes/personalDetailsRoutes');
const workSampleRoutes = require('./routes/workSampleRoutes');
const socialProfileRoutes = require('./routes/socialProfileRoutes');
const certificationsRoutes = require('./routes/certificationsRoutes');

// Import the database connection from db.js (since it's in the root directory)
const db = require('./db');  // Assuming db.js is in the root directory

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use('/api/resume', resumeRoutes);
app.use('/api/resume-headline', resumeHeadlineRoutes);
app.use('/api/key-skills', keySkillsRoutes);
app.use('/api/it-skills', itSkillsRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/employment', employmentRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/profile-summary', profileSummaryRoutes);
app.use('/api/career-profile', careerProfileRoutes);
app.use('/api/personal-details', personalDetailsRoutes);
app.use('/api/work-sample', workSampleRoutes);
app.use('/api/social-profile', socialProfileRoutes);
app.use('/api/certifications', certificationsRoutes);


// Test the database connection
db.getConnection()
  .then((connection) => {
    console.log('Successfully connected to MySQL database!');
    connection.release(); // Release the connection back to the pool
  })
  .catch((err) => {
    console.error('Error connecting to MySQL database:', err.message);
  });

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


