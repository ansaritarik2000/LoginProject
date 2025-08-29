import { User } from "../../models/User.js";
import bcrypt from "bcryptjs"
import  jwt  from "jsonwebtoken";

// user login controller
export const loginController = async (req, res) => {
    try{
        const {email, password} = req.body;
     // check if user exists
     const user = await  User.findOne({ email });
     if(!user){
        return res.status(400).json({message: "User not found"})
     }

     // check password
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch){
        return res.status(400).json({message: "Invalid Credantials"})
     } 

      // generate token
      const token = jwt.sign(
        {id: user._id, email: user.email},
        process.env.JWT_SECRET,
        { expiresIn: "1d"}
      )
      res.status(200).json({message: "Login Successfully", token, user: {id: user._id, email: user.email, username: user.username} });
    } catch (error){
        res.status(500).json({message: "Server error", error: error.message})
    }
    
}