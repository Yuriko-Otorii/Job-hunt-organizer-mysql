const { login } = require("../model/user.model");
const User = require("../model/user.model")

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const saltRounds = 10


exports.getSignupPage = (req, res, next) => {
    res.render('signup')
}

exports.postSignupInfo = (req, res, next) => {
    const { username, email, password } = req.body;
    const hassedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = new User(username, email, hassedPassword)
    newUser.signup()
        .then(() => {
            return res.redirect('/login')
        })
        .catch((err) => {
            if(err.message.includes("for key 'Users.username'")){
                console.log("Username already exists.");
            }else if(err.message.includes("for key 'Users.email'")){
                console.log("E-mail already exists.");
            }else{
                console.error(err.message);
            }
        })
}

exports.getLoginPage = (req, res, next) => {
    res.render('login')
}

exports.postLoginInfo = (req, res, next) => {
    const { email, password } = req.body;

    login(email)
        .then((passwordFromdb) => {
            if (passwordFromdb[0].length === 0) {
                console.log("E-mail doesn't exist...");
            } else {
                const userObj = passwordFromdb[0][0]
                bcrypt.compare(password, userObj.password, (err, result) => {
                    if(err) return res.status(404).send(`<h1>${err}</h1>`)

                    if(!result){
                        console.log('Wrong password...');
                    }else{
                        console.log('Successfully logged in!');
                        const payload = {
                            // user_id: userObj.user_id,
                            username: userObj.username,
                            email: userObj.email,
                        }
                        const token = jwt.sign(payload, 'secret', { expiresIn: '1h' })

                        res.status(200).json({token})
                        console.log(`Created token>>> ${token}`);
                        
                        // res.redirect('/')
                    }

                })

            }
        })
        .catch((err) => console.error(err.message))
}

exports.checkToken = (req, res, next) => {
    // const bearToken = req.headers["authorization"];
    // const bearer = bearToken.split(" ");
    // const token = bearer[1];

    // jwt.verify(token, "secret", (error, user) => {
    //   if (error) {
    //     console.log("Token not found");

    //     return res.sendStatus(403);
    //   } else {
    //     console.log("Token found");
    //     res.json({user});
    //   }
    // });
    // next();
    console.log(req.headers);
    const authHeader = req.headers["authorization"];
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, "secret");
        console.log(`Decoded>>> ${decoded}`);
        req.jwtPayload = decoded;
        next();
      } catch (err) {
        return res.status(401).json({
          message: 'Not authenticated'
        });
      }    
}


//https://nodejs.keicode.com/nodejs/express-jwtauth.php

