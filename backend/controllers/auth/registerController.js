import { User } from "../../models/User.js";
import bcrypt from "bcryptjs";

// user register controller
export const registerController = async (req, res) => {
   try{
    const {username, email, password} = req.body;
    
    // validation
    if(!username || !email || !password){
        return res.status(400).json({ message: "All fields are required" })
    }

    // check if user already exists
    const existstingUser = await User.findOne({ email })
    if(existstingUser){
        return res.status(400).json({ message: "User already exists" })
    }

      // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    await newUser.save();
    
    res.status(201).json({ message: "User Register Successfully", user: {id: newUser._id,username:newUser.username, email: newUser.email }
    })
   }
   catch(error){
    res.status(500).json({ message: "Server Error", error: error.message})
   } 
}