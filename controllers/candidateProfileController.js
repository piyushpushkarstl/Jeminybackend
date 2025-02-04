/*const db = require('../db'); // Import your database connection

// POST API: Create Candidate Profile
const createCandidateProfile = async (req, res) => {
    const { candidate_id } = req; // Extracted from JWT
    const {

        full_name,
        photo BLOB,
        profile_last_updated ,
        location ,
        fresher_experience,
        availability_to_join ,
        phone_no ,
        email 
        gender ,
        marital_status ,
        dob ,
        category ,
        differently_abled ,
        career_break ,
        work_permit_to_usa ,
        work_permit_to_country ,
        permanent_address ,
        home_town ,
        pin_code ,
        language_proficiency ,
        current_industry ,
        department ,
        desired_job_type ,
        desired_employment_type,
        preferred_shift ,
        preferred_work_location ,
        expected_salary ,
        current_employment ,
        employment_type ,
        current_company_name ,
        current_job_title ,
        joining_date ,
        current_salary ,
        skill_used ,
        job_profile ,
        notice_period ,
        resume_headline ,
        resume_file ,
        summary ,
        project_title,
        client ,
        project_status ,
        start_date ,
        end_date ,
        work_duration ,
        details_of_project ,
        software_name ,
        software_version,
        certification_name ,
        certification_url ,
        work_title ,
        work_sample_url, 
        work_sample_description ,
    
    
    } = req.body;

    try {
        const query = `
            INSERT INTO candidate_profile (
                 full_name,
        photo BLOB,
        profile_last_updated ,
        location ,
        fresher_experience,
        availability_to_join ,
        phone_no ,
        email 
        gender ,
        marital_status ,
        dob ,
        category ,
        differently_abled ,
        career_break ,
        work_permit_to_usa ,
        work_permit_to_country ,
        permanent_address ,
        home_town ,
        pin_code ,
        language_proficiency ,
        current_industry ,
        department ,
        desired_job_type ,
        desired_employment_type,
        preferred_shift ,
        preferred_work_location ,
        expected_salary ,
        current_employment ,
        employment_type ,
        current_company_name ,
        current_job_title ,
        joining_date ,
        current_salary ,
        skill_used ,
        job_profile ,
        notice_period ,
        resume_headline ,
        resume_file ,
        summary ,
        project_title,
        client ,
        project_status ,
        start_date ,
        end_date ,
        work_duration ,
        details_of_project ,
        software_name ,
        software_version,
        certification_name ,
        certification_url ,
        work_title ,
        work_sample_url, 
        work_sample_description ,
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await db.execute(query, [
            candidate_id,
            location || null,
            fresher_experience || null,
            availability_to_join || null,
            gender || null,
            marital_status || null,
            dob || null,
            resume_headline || null,
            more_information || null,
            permanent_address || null
        ]);

        res.status(201).json({ message: 'Candidate profile created successfully' });
    } catch (error) {
        console.error('Error creating candidate profile:', error);
        res.status(500).json({ error: 'Failed to create candidate profile', details: error.message });
    }
};

// PATCH API: Update Candidate Profile
const updateCandidateProfile = async (req, res) => {
    const { candidate_id } = req; // Extracted from JWT
    const {
        location,
        fresher_experience,
        availability_to_join,
        gender,
        marital_status,
        dob,
        resume_headline,
        more_information,
        permanent_address
    } = req.body;

    try {
        const query = `
            UPDATE candidate_profile
            SET
                location = COALESCE(?, location),
                fresher_experience = COALESCE(?, fresher_experience),
                availability_to_join = COALESCE(?, availability_to_join),
                gender = COALESCE(?, gender),
                marital_status = COALESCE(?, marital_status),
                dob = COALESCE(?, dob),
                resume_headline = COALESCE(?, resume_headline),
                more_information = COALESCE(?, more_information),
                permanent_address = COALESCE(?, permanent_address)
            WHERE candidate_id = ?
        `;

        const [result] = await db.execute(query, [
            location || null,
            fresher_experience || null,
            availability_to_join || null,
            gender || null,
            marital_status || null,
            dob || null,
            resume_headline || null,
            more_information || null,
            permanent_address || null,
            candidate_id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Candidate profile not found' });
        }

        res.status(200).json({ message: 'Candidate profile updated successfully' });
    } catch (error) {
        console.error('Error updating candidate profile:', error);
        res.status(500).json({ error: 'Failed to update candidate profile', details: error.message });
    }
};

// GET API: Fetch Candidate Profile
const getCandidateProfile = async (req, res) => {
    const { candidate_id } = req; // Extracted from JWT

    try {
        const query = `SELECT * FROM candidate_profile WHERE candidate_id = ?`;
        const [rows] = await db.execute(query, [candidate_id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Candidate profile not found' });
        }

        res.status(200).json(rows[0]); // Send the first row (only one profile per candidate)
    } catch (error) {
        console.error('Error fetching candidate profile:', error);
        res.status(500).json({ error: 'Failed to fetch candidate profile', details: error.message });
    }
};

module.exports = {
    createCandidateProfile,
    updateCandidateProfile,
    getCandidateProfile
};*/








/*const db = require('../db'); // Import your database connection

// POST API: Create Candidate Profile
const createCandidateProfile = async (req, res) => {
    const { candidate_id } = req; // Extracted from JWT
    const profileData = req.body; // Extract all fields from the request body

    try {
        // Dynamically construct the SQL query based on the fields provided
        const fields = Object.keys(profileData).filter((key) => profileData[key] !== undefined);
        const placeholders = fields.map(() => '?').join(', ');
        const query = `
            INSERT INTO candidate_profile (candidate_id, ${fields.join(', ')})
            VALUES (?, ${placeholders})
        `;

        // Execute the query with the candidate ID and provided fields
        await db.execute(query, [candidate_id, ...fields.map((field) => profileData[field])]);

        res.status(201).json({ message: 'Candidate profile created successfully.' });
    } catch (error) {
        console.error('Error creating candidate profile:', error);
        res.status(500).json({ error: 'Failed to create candidate profile.', details: error.message });
    }
};

// PATCH API: Update Candidate Profile
const updateCandidateProfile = async (req, res) => {
    const { candidate_id } = req; // Extracted from JWT
    const profileData = req.body; // Extract fields to update from the request body

    try {
        // Dynamically construct the SET clause based on provided fields
        const fields = Object.keys(profileData).filter((key) => profileData[key] !== undefined);
        if (fields.length === 0) {
            return res.status(400).json({ error: 'No fields provided to update.' });
        }

        const setClause = fields.map((field) => `${field} = COALESCE(?, ${field})`).join(', ');
        const query = `
            UPDATE candidate_profile
            SET ${setClause}
            WHERE candidate_id = ?
        `;

        // Execute the query with the provided fields
        const [result] = await db.execute(query, [...fields.map((field) => profileData[field]), candidate_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Candidate profile not found.' });
        }

        res.status(200).json({ message: 'Candidate profile updated successfully.' });
    } catch (error) {
        console.error('Error updating candidate profile:', error);
        res.status(500).json({ error: 'Failed to update candidate profile.', details: error.message });
    }
};

// GET API: Fetch Candidate Profile
const getCandidateProfile = async (req, res) => {
    const { candidate_id } = req; // Extracted from JWT

    try {
        const query = `SELECT * FROM candidate_profile WHERE candidate_id = ?`;
        const [rows] = await db.execute(query, [candidate_id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Candidate profile not found.' });
        }

        res.status(200).json(rows[0]); // Send the first row (only one profile per candidate)
    } catch (error) {
        console.error('Error fetching candidate profile:', error);
        res.status(500).json({ error: 'Failed to fetch candidate profile.', details: error.message });
    }
};

module.exports = {
    createCandidateProfile,
    updateCandidateProfile,
    getCandidateProfile
};*/







//const { CandidateProfile, Signin } = require("../models");
//candidateProfileController.js

const OTP = require("../models/otp");
const TemporaryUsers = require("../models/temporaryUsers");
const User = require("../models/user");
/*const CandidateProfile = require("../models/candidateProfile"); // Add this import, ensure the path is correct

console.log("candidateProfileController file loaded");


// Updated getUserDetails with token-only validation
exports.getUserDetails = async (req, res) => {
    try {
      const { candidate_id } = req.params;
  
      if (!candidate_id) {
        return res.status(400).json({ error: "Candidate ID is required" });
      }
  
      const userDetails = await CandidateProfile.findOne({ 
        where: { candidate_id } 
      });
  
      if (!userDetails) {
        return res.status(404).json({ error: "Candidate profile not found" });
      }
  
      res.status(200).json({
        message: "Candidate profile fetched successfully",
        data: userDetails
      });
    } catch (error) {
      console.error("Error fetching candidate details:", error);
      res.status(500).json({ 
        error: "An error occurred while fetching candidate details" 
      });
    }
  };
  
  // Updated updateUserDetails with token-only validation
  exports.updateUserDetails = async (req, res) => {
    try {
      const { candidate_id, name, phone, resume, ...rest } = req.body;
  
      if (!candidate_id) {
        return res.status(400).json({ error: "Candidate ID is required" });
      }
  
      if (rest.email) {
        return res.status(400).json({ error: "Email cannot be updated" });
      }
  
      const existingProfile = await CandidateProfile.findOne({ 
        where: { candidate_id } 
      });
  
      if (!existingProfile) {
        const newProfile = await CandidateProfile.create({
          candidate_id,
          name,
          phone,
          resume,
          ...rest,
        });
  
        return res.status(201).json({
          message: "Profile created successfully",
          data: newProfile,
        });
      }
  
      const updatedProfile = await CandidateProfile.update(
        { name, phone, resume, ...rest },
        { where: { candidate_id }, returning: true, plain: true }
      );
  
      return res.status(200).json({
        message: "Profile updated successfully",
        data: updatedProfile[1],
      });
    } catch (error) {
      console.error("Error updating candidate details:", error);
      res.status(500).json({ 
        error: "An error occurred while updating candidate details" 
      });
    }
  };*/

  // controllers/candidateProfileController.js
/*const CandidateProfile = require("../models/candidateProfile");

exports.getUserDetails = async (req, res) => {
  try {
    const { candidate_id } = req.params;

    if (!candidate_id) {
      return res.status(400).json({ error: "Candidate ID is required" });
    }

    const userDetails = await CandidateProfile.findOne({ 
      where: { candidate_id }
    });

    if (!userDetails) {
      return res.status(404).json({ error: "Candidate profile not found" });
    }

    res.status(200).json({
      message: "Candidate profile fetched successfully",
      data: userDetails
    });
  } catch (error) {
    console.error("Error fetching candidate details:", error);
    res.status(500).json({ 
      error: "An error occurred while fetching candidate details",
      details: error.message
    });
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const { candidate_id } = req.params;
    const updateData = req.body;

    if (!candidate_id) {
      return res.status(400).json({ error: "Candidate ID is required" });
    }

    // Remove any readonly or non-existent fields
    delete updateData.profile_last_updated; // This is auto-updated
    delete updateData.candidate_id; // Don't allow changing the ID

    const existingProfile = await CandidateProfile.findOne({ 
      where: { candidate_id } 
    });

    if (!existingProfile) {
      const newProfile = await CandidateProfile.create({
        candidate_id,
        ...updateData
      });

      return res.status(201).json({
        message: "Profile created successfully",
        data: newProfile,
      });
    }

    await CandidateProfile.update(
      updateData,
      { 
        where: { candidate_id }
      }
    );

    // Fetch the updated record
    const updatedProfile = await CandidateProfile.findOne({
      where: { candidate_id }
    });

    return res.status(200).json({
      message: "Profile updated successfully",
      data: updatedProfile
    });
  } catch (error) {
    console.error("Error updating candidate details:", error);
    res.status(500).json({ 
      error: "An error occurred while updating candidate details",
      details: error.message
    });
  }
};*/





/*const Signin = require("../models/user");
const CandidateProfile = require("../models/candidateProfile");
const { Op, Sequelize } = require('sequelize'); // Import Sequelize and Op for query operations


console.log('CandidateProfile model:', !!CandidateProfile);
console.log('CandidateProfile methods:', Object.keys(CandidateProfile));

exports.getUserDetails = async (req, res) => {
  try {
    const { candidate_id } = req.params;

    if (!candidate_id) {
      return res.status(400).json({ error: "Candidate ID is required" });
    }

    // Get data from both tables
    const [signinData, profileData] = await Promise.all([
      Signin.findOne({
        where: { candidate_id },
        attributes: ['name', 'email','phone', 'resume'] // Only get what we need
      }),
      CandidateProfile.findOne({
        where: { candidate_id }
      })
    ]);

    if (!signinData) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    // Combine the data
    const combinedData = {
      ...signinData.get({ plain: true }),
      ...(profileData ? {
        ...profileData.get({ plain: true }),
        // Format the profile_last_updated to return only the date
        profile_last_updated: profileData.profile_last_updated ? profileData.profile_last_updated.toISOString().split('T')[0] : null
      } : {})
    };

    res.status(200).json({
      message: "Candidate profile fetched successfully",
      data: combinedData
    });

  } catch (error) {
    console.error("Error fetching candidate details:", error);
    res.status(500).json({
      error: "An error occurred while fetching candidate details",
      details: error.message
    });
  }
};

exports.updateUserDetails = async (req, res) => {
    try {
        const { candidate_id } = req.params;
        const updateData = req.body;
  
        if (!candidate_id) {
            return res.status(400).json({ error: "Candidate ID is required" });
        }
  
        // Remove readonly fields
        delete updateData.profile_last_updated;
        delete updateData.candidate_id;
  
        // Check if update data is empty after removing readonly fields
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: "No valid fields provided for update" });
        }
  
        // First check if user exists in signin
        const signin = await Signin.findOne({ 
            where: { candidate_id },
            attributes: ['email', 'name', 'phone', 'resume']
        });
  
        if (!signin) {
            return res.status(404).json({ error: "User not found" });
        }

        // Find or create profile with explicit primary key
        let [profile, created] = await CandidateProfile.findOrCreate({ 
            where: { candidate_id },
            defaults: {
                candidate_id,  // Explicitly set the primary key
                ...updateData
            }
        });

        if (!created) {
            // Update existing profile
            await CandidateProfile.update(updateData, {
                where: { candidate_id }
            });
        }
  
        // If phone or resume is being updated, update in signin table too
        if (updateData.phone || updateData.resume) {
            await Signin.update({
                phone: updateData.phone || signin.phone,
                resume: updateData.resume || signin.resume
            }, {
                where: { candidate_id }
            });
        }

        // Fetch the final updated profile
        const updatedProfile = await CandidateProfile.findOne({
            where: { candidate_id }
        });
  
        // Get final combined data
        const updatedData = {
            name: signin.name,
            email: signin.email,
            ...(updatedProfile ? updatedProfile.get({ plain: true }) : {})
        };
  
        return res.status(200).json({
            message: "Profile updated successfully",
            data: updatedData
        });
  
    } catch (error) {
        console.error("Error updating candidate details:", error);
        
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: "Invalid data provided",
                details: error.message
            });
        }
        
        res.status(500).json({
            error: "An error occurred while updating candidate details",
            details: error.message
        });
    } 
  
};

exports.getCandidatesByExperience = async (req, res) => {
  try {
    const { min_experience, max_experience } = req.query;

    // Ensure that both min_experience and max_experience are numbers
    const minExp = parseFloat(min_experience);
    const maxExp = parseFloat(max_experience);

    // Validate experience range
    if (isNaN(minExp) || isNaN(maxExp)) {
      return res.status(400).json({
        error: "Both minimum and maximum experience values are required and must be numbers",
      });
    }

    if (minExp > maxExp) {
      return res.status(400).json({
        error: "Minimum experience cannot be greater than maximum experience",
      });
    }

    // Fetch candidates with experience in the given range
    const candidates = await CandidateProfile.findAll({
      where: {
        experience_in_year: {
          [Op.gte]: minExp,  // Greater than or equal to minExp
          [Op.lte]: maxExp,  // Less than or equal to maxExp
        },
      },
      attributes: {
        include: [
          [Sequelize.col('Signin.name'), 'name'], // Alias for name from Signin
          [Sequelize.col('Signin.email'), 'email'], // Alias for email from Signin
        ],
      },
      include: {
        model: Signin,
        attributes: [], // Avoid nesting Signin in the response
        required: true,
      },
      order: [['experience_in_year', 'ASC']], // Ordering by experience
    });

    // Check if candidates exist
    if (!candidates || candidates.length === 0) {
      return res.status(404).json({
        error: `No candidates found with experience between ${minExp} and ${maxExp} years`,
      });
    }

    // Format candidates into plain objects for response
    const formattedCandidates = candidates.map((candidate) => candidate.get({ plain: true }));

    // Include total number of candidates in the response
    res.status(200).json({
      total_candidates: formattedCandidates.length, // Total count of filtered candidates
      data: formattedCandidates,
    });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({
      error: "An error occurred while fetching candidates",
      details: error.message,
    });
  }
};*/





/*const Signin = require("../models/user");
const CandidateProfile = require("../models/candidateProfile");
const Education = require("../models/education");
const EmploymentDetails = require("../models/employmentdetails");
const Projects = require("../models/projects");
const { Op, Sequelize } = require("sequelize");

console.log("CandidateProfile model:", !!CandidateProfile);
console.log("CandidateProfile methods:", Object.keys(CandidateProfile));

exports.getUserDetails = async (req, res) => {
  try {
    const { candidate_id } = req.params;

    if (!candidate_id) {
      return res.status(400).json({ error: "Candidate ID is required" });
    }

    // Get data from all tables
    const [signinData, profileData, educationData, employmentData, projectsData] = await Promise.all([
      Signin.findOne({
        where: { candidate_id },
        attributes: ["name", "email", "phone", "resume"], // Only get what we need
      }),
      CandidateProfile.findOne({
        where: { candidate_id },
      }),
      Education.findAll({
        where: { candidate_id },
      }),
      EmploymentDetails.findAll({
        where: { candidate_id },
      }),
      Projects.findAll({
        where: { candidate_id },
      }),
    ]);

    if (!signinData) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    // Combine the data
    const combinedData = {
      ...signinData.get({ plain: true }),
      ...(profileData
        ? {
            ...profileData.get({ plain: true }),
            // Format the profile_last_updated to return only the date
            profile_last_updated: profileData.profile_last_updated
              ? profileData.profile_last_updated.toISOString().split("T")[0]
              : null,
          }
        : {}),
      education: educationData.map((edu) => edu.get({ plain: true })),
      employment: employmentData.map((emp) => emp.get({ plain: true })),
      projects: projectsData.map((proj) => proj.get({ plain: true })),
    };

    res.status(200).json({
      message: "Candidate profile fetched successfully",
      data: combinedData,
    });
  } catch (error) {
    console.error("Error fetching candidate details:", error);
    res.status(500).json({
      error: "An error occurred while fetching candidate details",
      details: error.message,
    });
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const { candidate_id } = req.params;
    const updateData = req.body;

    if (!candidate_id) {
      return res.status(400).json({ error: "Candidate ID is required" });
    }

    // Remove readonly fields
    delete updateData.profile_last_updated;
    delete updateData.candidate_id;

    // Check if update data is empty after removing readonly fields
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No valid fields provided for update" });
    }

    // First check if user exists in signin
    const signin = await Signin.findOne({
      where: { candidate_id },
      attributes: ["email", "name", "phone", "resume"],
    });

    if (!signin) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update or create profile data
    const [profile, created] = await CandidateProfile.findOrCreate({
      where: { candidate_id },
      defaults: {
        candidate_id, // Explicitly set the primary key
        ...updateData,
      },
    });

    if (!created) {
      await CandidateProfile.update(updateData, { where: { candidate_id } });
    }

    // If phone or resume is being updated, update in signin table too
    if (updateData.phone || updateData.resume) {
      await Signin.update(
        {
          phone: updateData.phone || signin.phone,
          resume: updateData.resume || signin.resume,
        },
        { where: { candidate_id } }
      );
    }

    // Fetch the final updated profile
    const updatedProfile = await CandidateProfile.findOne({
      where: { candidate_id },
    });

    const updatedData = {
      name: signin.name,
      email: signin.email,
      ...(updatedProfile ? updatedProfile.get({ plain: true }) : {}),
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating candidate details:", error);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Invalid data provided",
        details: error.message,
      });
    }

    res.status(500).json({
      error: "An error occurred while updating candidate details",
      details: error.message,
    });
  }
};

exports.getCandidatesByExperience = async (req, res) => {
  try {
    const { min_experience, max_experience } = req.query;

    const minExp = parseFloat(min_experience);
    const maxExp = parseFloat(max_experience);

    if (isNaN(minExp) || isNaN(maxExp)) {
      return res.status(400).json({
        error: "Both minimum and maximum experience values are required and must be numbers",
      });
    }

    if (minExp > maxExp) {
      return res.status(400).json({
        error: "Minimum experience cannot be greater than maximum experience",
      });
    }

    const candidates = await CandidateProfile.findAll({
      where: {
        experience_in_year: {
          [Op.gte]: minExp,
          [Op.lte]: maxExp,
        },
      },
      attributes: {
        include: [
          [Sequelize.col("Signin.name"), "name"],
          [Sequelize.col("Signin.email"), "email"],
        ],
      },
      include: {
        model: Signin,
        attributes: [],
        required: true,
      },
      order: [["experience_in_year", "ASC"]],
    });

    if (!candidates || candidates.length === 0) {
      return res.status(404).json({
        error: `No candidates found with experience between ${minExp} and ${maxExp} years`,
      });
    }

    const formattedCandidates = candidates.map((candidate) =>
      candidate.get({ plain: true })
    );

    res.status(200).json({
      total_candidates: formattedCandidates.length,
      data: formattedCandidates,
    });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({
      error: "An error occurred while fetching candidates",
      details: error.message,
    });
  }
};*/




// candidateProfileController.js
const { sequelize } = require("../db");
const Signin = require("../models/user");
const CandidateProfile = require("../models/candidateProfile");
const Education = require("../models/education");
const EmploymentDetails = require("../models/employmentdetails");
const Projects = require("../models/projects");
const { Op, Sequelize } = require("sequelize");

exports.getUserDetails = async (req, res) => {
  try {
    const { candidate_id } = req.params;

    if (!candidate_id) {
      return res.status(400).json({ error: "Candidate ID is required" });
    }

    const [signinData, profileData, educationData, employmentData, projectsData] = await Promise.all([
      Signin.findOne({
        where: { candidate_id },
        attributes: ["name", "email", "phone", "resume"],
      }),
      CandidateProfile.findOne({ where: { candidate_id } }),
      Education.findAll({ where: { candidate_id } }),
      EmploymentDetails.findAll({ where: { candidate_id } }),
      Projects.findAll({ where: { candidate_id } }),
    ]);

    if (!signinData) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    const combinedData = {
      ...signinData.get({ plain: true }),
      ...(profileData
        ? {
            ...profileData.get({ plain: true }),
            profile_last_updated: profileData.profile_last_updated
              ? profileData.profile_last_updated.toISOString().split("T")[0]
              : null,
          }
        : {}),
      education: educationData.map((edu) => edu.get({ plain: true })),
      employment: employmentData.map((emp) => emp.get({ plain: true })),
      projects: projectsData.map((proj) => proj.get({ plain: true })),
    };

    res.status(200).json({
      message: "Candidate profile fetched successfully",
      data: combinedData,
    });
  } catch (error) {
    console.error("Error fetching candidate details:", error);
    res.status(500).json({
      error: "An error occurred while fetching candidate details",
      details: error.message,
    });
  }
};

exports.updateUserDetails = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { candidate_id } = req.params;
    const { education, employment, projects, ...profileData } = req.body;

    if (!candidate_id) {
      return res.status(400).json({ error: "Candidate ID is required" });
    }

    // Update main profile and signin data
    await Promise.all([
      CandidateProfile.update(profileData, { 
        where: { candidate_id },
        transaction 
      }),
      Signin.update({
        phone: profileData.phone,
        resume: profileData.resume
      }, { 
        where: { candidate_id },
        transaction 
      })
    ]);

    // Update education records
    if (education && education.length > 0) {
      await Education.destroy({ where: { candidate_id }, transaction });
      await Education.bulkCreate(
        education.map(edu => ({ 
          ...edu, 
          candidate_id,
          coursestart_year: edu.coursestart_year ? new Date(edu.coursestart_year).getFullYear() : null,
          courseend_year: edu.courseend_year ? new Date(edu.courseend_year).getFullYear() : null
        })), 
        { transaction }
      );
    }

    // Update employment details
    if (employment && employment.length > 0) {
      await EmploymentDetails.destroy({ where: { candidate_id }, transaction });
      await EmploymentDetails.bulkCreate(
        employment.map(emp => ({ 
          ...emp, 
          candidate_id,
          joining_date: emp.joining_date ? new Date(emp.joining_date) : null
        })), 
        { transaction }
      );
    }

    // Update projects
    if (projects && projects.length > 0) {
      await Projects.destroy({ where: { candidate_id }, transaction });
      await Projects.bulkCreate(
        projects.map(proj => ({ 
          ...proj, 
          candidate_id,
          project_start_date: proj.project_start_date 
            ? new Date(proj.project_start_date).toISOString().split('T')[0] 
            : null,
          project_end_date: proj.project_end_date 
            ? new Date(proj.project_end_date).toISOString().split('T')[0] 
            : null
        })), 
        { transaction }
      );
    }

    await transaction.commit();

    // Fetch and return updated profile
    const updatedProfile = await getUserDetailsById(candidate_id);

    return res.status(200).json({
      message: "Profile updated successfully",
      data: updatedProfile
    });

  } catch (error) {
    await transaction.rollback();
    console.error("Error updating candidate details:", error);
    res.status(500).json({
      error: "An error occurred while updating candidate details",
      details: error.message
    });
  }
};

// Helper function to get user details 
async function getUserDetailsById(candidate_id) {
  const [signinData, profileData, educationData, employmentData, projectsData] = await Promise.all([
    Signin.findOne({
      where: { candidate_id },
      attributes: ["name", "email", "phone", "resume"]
    }),
    CandidateProfile.findOne({ where: { candidate_id } }),
    Education.findAll({ where: { candidate_id } }),
    EmploymentDetails.findAll({ where: { candidate_id } }),
    Projects.findAll({ where: { candidate_id } })
  ]);

  return {
    ...signinData.get({ plain: true }),
    ...(profileData ? profileData.get({ plain: true }) : {}),
    education: educationData.map(edu => edu.get({ plain: true })),
    employment: employmentData.map(emp => emp.get({ plain: true })),
    projects: projectsData.map(proj => proj.get({ plain: true }))
  };
}

exports.getCandidatesByExperience = async (req, res) => {   
  try {     
    const { min_experience, max_experience } = req.query;      
    const minExp = parseFloat(min_experience);     
    const maxExp = parseFloat(max_experience);      
    
    if (isNaN(minExp) || isNaN(maxExp)) {       
      return res.status(400).json({         
        error: "Both minimum and maximum experience values are required and must be numbers",       
      });     
    }      
    
    if (minExp > maxExp) {       
      return res.status(400).json({         
        error: "Minimum experience cannot be greater than maximum experience",       
      });     
    }      
    
    const candidates = await CandidateProfile.findAll({       
      include: [
        {
          model: EmploymentDetails,
          where: {
            experience_in_year: {
              [Op.gte]: minExp,
              [Op.lte]: maxExp,
            },
          },
          required: true,
        },
        {
          model: Education,
          required: false // Set to false to get candidates even if they don't have education details
        },
        {
          model: Projects,
          required: false
        },
        {
          model: Signin,
          attributes: ['name', 'email'],
          required: true,
        }
      ],
      order: [[EmploymentDetails, 'experience_in_year', 'ASC']],
    });      
    
    if (!candidates || candidates.length === 0) {       
      return res.status(404).json({         
        error: `No candidates found with experience between ${minExp} and ${maxExp} years`,       
      });     
    }      
    
    const formattedCandidates = candidates.map((candidate) =>       
      candidate.get({ plain: true })     
    );      
    
    res.status(200).json({       
      total_candidates: formattedCandidates.length,       
      data: formattedCandidates,     
    });   
  } catch (error) {     
    console.error("Error fetching candidates:", error);     
    res.status(500).json({       
      error: "An error occurred while fetching candidates",       
      details: error.message,     
    });   
  } 
};