const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const multer = require('multer');

// User model
const User = require('../models/User');

const handleError = (err, res) => {
  res 
    .status(500)
    .contentType('text/plain')
    .end("Oops ! Something went wrong!");
};

const upload = multer({
  dest: "store/uploaded/files"
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2, imageUpload } = req.body;
    let errors = [];

    // Check required fields
    if(!name || !email || !password || !password2 || !imageUpload) {
      errors.push({msg: 'Please fill in all fields'});
    }

    // Check pass length 
    if(password.length < 6) {
      errors.push({msg: 'Password should be at least 6 characters'});
    }

    if(password != password2) {
      errors.push({msg: 'Passwords do not match'});
    }

    console.log('imageUpload ' + imageUpload);

    if(imageUpload != undefined) {
      upload.single("file" /* name attribute of <file> element in your form */),
      (req, res) => {
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "./uploads/image.png");
    
        if (path.extname(req.file.originalname).toLowerCase() === ".png") {
          fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);
    
            res
              .status(200)
              .contentType("text/plain")
              .end("File uploaded!");
          });
        } else {
          fs.unlink(tempPath, err => {
            if (err) return handleError(err, res);
    
            res
              .status(403)
              .contentType("text/plain")
              .end("Only .png files are allowed!");
          });
        }
      }
    }

    if (errors.length > 0) {
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
          imageUpload
        });
      } else {
        User.findOne({ email: email }).then(user => {
          if (user) {
            errors.push({ msg: 'Email already exists' });
            res.render('register', {
              errors,
              name,
              email,
              password,
              password2,
              imageUpload
            });
          } else {
            const newUser = new User({
              name,
              email,
              password,
              imageUpload
            });
    
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                  .save()
                  .then(user => {
                    req.flash(
                      'success_msg',
                      'You are now registered and can log in'
                    );
                    res.redirect('/users/login');
                  })
                  .catch(err => console.log(err));
              });
            });
          }
        });
      }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;