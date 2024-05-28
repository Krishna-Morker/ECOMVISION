import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ name:username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 120000000000000),
      httpOnly: true,
      sameSite: 'none',
      secure: true
    });
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    const usernameCheck = await User.findOne({ name:username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      name:username,
      password: hashedPassword,
    });

    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 120000000000000),
      httpOnly: true,
      sameSite: 'none',
      secure: true
    });

    return res.status(201).json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

export const logOut = async (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    const user = await User.findById(req.params.id);
    // console.log(req.cookies,"evfdsvc");
    const tokend = req.cookies.jwt;
    // console.log(tokend, "swdefd");
    user.tokens = user.tokens.filter((elem) => elem.token !== tokend);
    await user.save();
    res.clearCookie("jwt");
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

export const forgotpost = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const secret = user.password + process.env.Secret_Key;
      const token = jwt.sign({ email: user.email }, secret, { expiresIn: '15m' });
      const link = `https://ecomvision-jbtw.onrender.com/api/auth/reset-password/${user._id}/${token}`;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
          user: 'krishnamorker2021@gmail.com',
          pass: 'tahd pher pfkz ehla',
        }
      });

      const mailOptions = {
        from: 'CAREERFORGE',
        to: user.email,
        subject: 'Reset Password',
        text: `Thank you for joining our platform. This is your reset password link: ${link}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      return res.json({ sta: true, user });
    } else {
      return res.json({ sta: false, user });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

export const resetpass = async (req, res) => {
  try {
    const { id, token } = req.params;
    const user = await User.findOne({ _id: id });
    const secret = user.password + process.env.Secret_Key;
    jwt.verify(token, secret);
    res.redirect(`https://vercel.com/krishnas-projects-e183a75e/changepass/${id}`);
  } catch (error) {
    res.send(error.message);
  }
};

export const changepass = async (req, res, next) => {
  try {
    const { password1, params } = req.body;
    const user = await User.findOne({ _id: params.id });
    const hash = await bcrypt.hash(password1, 10);
    user.password = hash;
    await user.save();
    return res.json({ sta: true, user });
  } catch (error) {
    res.status(401).send(error);
  }
};
