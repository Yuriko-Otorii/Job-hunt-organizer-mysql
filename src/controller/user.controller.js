const { login, loginTest } = require("../model/user.model");
const User = require("../model/user.model")

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { response } = require("express");
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
            if(err.message.includes("for key 'userInfo.username'")){
                res.render('error', {message: "Username already exists.", btnMessage: "Back to sign up", url: "signup"})
                console.log("Username already exists.");
            }else if(err.message.includes("for key 'userInfo.email'")){
                res.render('error', {message: "E-mail already exists.", btnMessage: "Back to sign up", url: "signup"})
                console.log("E-mail already exists.");
            }else{
                res.render('error', {message: "Something wrong. Please try again", btnMessage: "Back to sign up", url: "signup"})
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
                res.render('error', {message: "Wrong login information...", btnMessage: "Back to login", url: "login"})
                console.log("E-mail doesn't exist...");
            } else {
                const userObj = passwordFromdb[0][0]
                bcrypt.compare(password, userObj.password, (err, result) => {
                    if(err) return res.status(404).render('404error')

                    if(!result){
                        res.render('error', {message: "Wrong login information...", btnMessage: "Back to login", url: "login"})
                        console.log('Wrong password...');
                    }else{
                        console.log('Successfully logged in!');
                        const payload = {
                            user_id: userObj.user_id,
                            username: userObj.username,
                            email: userObj.email,
                        }
                                                
                        const token = jwt.sign(payload, 'secret', { expiresIn: '1h' })
                        res.cookie('token', token, { 
                            httpOnly: true,
                        });
                        res.redirect('/home')
                    }
                })
            }
        })
        .catch((err) => {
            console.error(err.message)
            res.render('error', {message: "Something wrong in server.", btnMessage: "Back to home", url: "home"})
        })
}

exports.checkToken = (req, res, next) => {
    try {
        const tokenStr = req.headers.cookie
        const token = tokenStr.slice(6)
        const decoded = jwt.verify(token, "secret");
        req.jwtPayload = decoded;
        next();
    } catch (error) {
        res.render('error', {message: "It seems you are not authorized ...", btnMessage: "Back to login", url: "login"})
    }
}

exports.postDeleteCookie = (req, res, next) => {
    res.clearCookie('token')
    res.redirect('/login')
}


