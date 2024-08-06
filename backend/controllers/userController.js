const asyncHandler = require('express-async-handler');
const User = require('../schema/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const token = require('../schema/tokenSchema');
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'});
}

const registerUser = asyncHandler ( async (req, res) => {
    const {name, email, password, bio, photo} = req.body;

    //Validation
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Veuillez remplir tous les champs obligatoires")
    }

    if(password.length < 6){
        res.status(400);
        throw new Error("Le mot de passe doit comporter au moins 6 caractères")
    }

    // Check if user email already exists
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("L’adresse e-mail a déjà été utilisée")
    }

    //create new user
    const user = await User.create({
        name,
        email,
        password,
        bio,
        photo,
    })

    // JWT Token creation
    const token = generateToken(user._id);

    // Send HTTP-Only-Cookie
    res.cookie("token", token,{
        path: '/',
        expires: new Date(Date.now() + 1000 * 86400) , // 1 day
        sameSite: "none",
    });


    if(user){
        const { _id, name, email, photo, bio } = user;
        res.status(201).json({
            _id, name, email, photo, bio
        })
    } else {
        res.status(400);
        throw new Error("Données utilisateur invalides")
    }

})

//Login

const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body;

    //Validation Request
    if(!email || !password) {
        res.status(400);
        throw new Error("Veuillez ajouter une adresse e-mail et un mot de passe");
    }   

    //Check if user exists
    const user = await User.findOne({email});

    if(!user) {
        res.status(400);
        throw new Error("Utilisateur introuvable. Veuillez vous inscrire");
    }
    
    // check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

      // JWT Token creation
      const token = generateToken(user._id);

      // Send HTTP-Only-Cookie
      res.cookie("token", token,{
          path: '/',
          expires: new Date(Date.now() + 1000 * 86400) , // 1 day
          sameSite: "none",
      });

    if(user && passwordIsCorrect) {
        const { _id, name, email, photo, bio } = user;
        res.status(200).json({
            _id, name, email, photo, bio, token
        })
    } else {
        res.status(400);
        throw new Error("Adresse e-mail ou mot de passe invalide");
    }
})

// Logout 

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("token", "",{
        path: '/',
        expires: new Date(0) , // 1 day
        sameSite: "none",
    });
    
    return res.status(200).json({ message: 'Déconnexion réussie'});
})

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        const { _id, name, email, photo, bio } = user;
        res.status(200).json({
            _id, name, email, photo, bio
        })
    } else {
        res.status(400);
        throw new Error("Utilisateur introuvable");
    }
})

const loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json(false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
        return res.json(true);
    }
    return res.json(false);
})

const updateUser = asyncHandler(async (req,res) => {
    const user  = await User.findById(req.user._id);

    if (user) {
        const { name, email, photo, bio } = user;
        user. email = email;
        user.name = req.body.name || name;
        user.bio = req.body.bio || bio;
        user.photo = req.body.photo || photo;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            photo: updatedUser.photo,
            bio: updatedUser.bio
        })
    } else {
        res.status(404);
        throw new Error("Utilisateur introuvable")
    }
})

const changePassword = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);

    const {oldPassword, password} = req.body;
    if(!user) {
        res.status(400);
        throw new Error("Utilisateur introuvable. Veuillez vous inscrire");
    }
    //Validate

    if(!oldPassword || !password) {
        res.status(400);
        throw new Error("Veuillez ajouter ancien et le nouveau mot de passe");
    }

    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

    if(user && passwordIsCorrect) {
        user.password = password;
        await user.save();
        res.status(200).send("Le mot de passe a été changé avec succès");
        
    } else {
        res.status(400);
        throw new Error("Ancien mot de passe est incorrect");
    }
})

const forgetPassword = asyncHandler(async (req,res) => {
    const { email } =req.body;
    const user = await User.findOne({ email });

    if(!user) {
        res.status(404);
        throw new Error("Utilisateur introuvable.")
    }

    // Delete token if exists
    let tokenExists = await token.findOne({userId: user._id});
    if(tokenExists) {
        await token.deleteOne();
    }

    // Create reset token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    
    console.log(resetToken);

    // Hashed token
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    console.log(hashedToken);

    await new token ({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 5 * (60 * 1000) // 5 mins
    }).save();

    //Reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    //Reset Email
    const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please use the url to reset your password</p>
        <p>This reset link is valid for only 5 minutes.</p>

        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        <p>Regards.</p>
        <p>Team Saqif</p>
    `;

    const subject = "Password reset request";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER; 

    try {
        await sendEmail(subject, message, send_to, sent_from)
        res.status(200).json({success: true, message: "Reset link to your email"})
    } catch (error) {
        console.log(error);
        res.status(500);
        throw new Error("Email not sent, please try again");
    }
})

// Reset Password 

const resetPassword = asyncHandler(async(req, res) => {
    const { password } = req.body;
    const { resetToken } = req.params;

    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Find token in DB
    const userToken = await token.findOne({
        token: hashedToken,
        expiresAt: {$gt: Date.now()}
    })

    if(!userToken) {
        res.status(404);
        throw new Error("Invalid or expired token");
    }

    const user  = await User.fineOne({_id: userToken.userId});
    user.password = password;
    user.save();

    res.status(200).json({ message: "Réinitialisation du mot de passe réussie. Veuillez vous connecter avec le nouveau mot de passe"});

})


module.exports = { registerUser, loginUser, logoutUser, getUser, loginStatus, updateUser, changePassword, forgetPassword, resetPassword };
