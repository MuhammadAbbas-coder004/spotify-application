import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";
import bcrypt from "bcryptjs";



const registerUser = async (req, res) => {

    const { username, email, password, role } = req.body;

    const userAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (userAlreadyExists) {

        return res.status(409).json({
            message: "User Already Exist",
        });

    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    });

    const token = jwt.sign({
        id: user._id,
        role: user
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(201).json({
        message: "User Rigesterd Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });

};


const loginUser = async(req, res) => {

const {username, email, password} = req.body

const user = await userModel.findOne({

$or:[

    {username},

    {email}

]

})


if(!user){

return res.status(401).json({

    message:"Invalid Credentials"

})

}


const isPasswordValid = await bcrypt.compare(password, user.password)

if(!isPasswordValid){

return res.status(401).json({

    message:"Invalid Credentials"

})

}

const token = jwt.sign({

id:user._id,

role:user.role

},process.env.JWT_SECRET)

res.cookie("token", token)


res.status(200).json({

message:"User logged In Successfully",

user:{

    id:user._id,

    username:user.username,

    email:user.email,

    role:user.role

}

})

}


export default {registerUser, loginUser}