import Mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "please provide a email address"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

// UserSchema.methods.createJWT = function () {
//   return Jwt.sign(
//     { userID: this._id, name: this.username },
//     process.env.JWT_WEB_TOKEN,
//     { expiresIn: "30d" }
//   );
// };

const UserModel = Mongoose.model("User", UserSchema);
export default UserModel;
