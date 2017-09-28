/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

// Validate Function to check e-mail length
let titleLengthChecker = (title) => {
  // Check if e-mail exists
  if (!title) {
    return false; // Return error
  } else {
    // Check the length of Title string
    if (title.length < 5 || title.length > 50) {
      return false; // Return error if not within proper length
    } else {
      return true; // Return as valid e-mail
    }
  }
};

// Validate Function to check if valid Title format
let alphaNumericTitleChecker = (title) => {
  // Check if e-mail exists
  if (!title) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid Title
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    return regExp.test(title); // Return regular expression test results (true or false)
  }
};

// Array of Title Validators
const titleValidators = [
  // First Title Validator
  {
    validator: titleLengthChecker,
    message: 'Title must be at least 5 characters but no more than 50'
  },
  // Second Title Validator
  {
    validator: alphaNumericTitleChecker,
    message: 'Title Must be a alphanumeric'
  }
];

// Validate Function to check body length
let bodyLengthChecker = (body) => {
  // Check if body exists
  if (!body) {
    return false; // Return error
  } else {
    // Check length of body string
    if (body.length < 5 || body.length > 500) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid body
    }
  }
};

// Array of Username validators
const bodyValidators = [
  // First body validator
  {
    validator: bodyLengthChecker,
    message: 'Body must be at least 5 characters but no more than 500'
  },
];

// Validate Function to check comment length
let commentLengthChecker = (comment) => {
  // Check if comment exists
  if (!comment[0]) {
    return false; // Return error
  } else {
    // Check Comment length
    if (comment[0].length < 1 || comment[0].length > 200) {
      return false; // Return error if comment requirement is not met
    } else {
      return true; // Return comment as valid
    }
  }
};

// Array of Comment validators
const commentValidators = [
  // First Comment validator
  {
    validator: commentLengthChecker,
    message: 'Comment must be at least 1 characters but no more than 200'
  }
];

// User Model Definition
const blogSchema = new Schema({
  title: { type: String, required: true, validate: titleValidators },
  body: { type: String, required: true, validate: bodyValidators },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now() },
  likes: { type: Number, default: 0 },
  likedby: { type: Array },  
  dislikes: { type: Number, default: 0 },
  dislikedby: { type: Array },
  comments: [
    {
        comment: { type: String, validate: commentValidators },
        commentator: { type: String }
    }
  ] 
});

// Export Module/Schema
module.exports = mongoose.model('Blog', blogSchema);