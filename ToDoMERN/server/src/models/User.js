// import e from "express";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, min: 6, max: 32 },
  username: { type: String, min: 6, max: 32, required: true },
  email: { type: String, min: 6, max: 32, required: true },
  password: { type: String, min: 6, max: 32, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

export default mongoose.model("User", userSchema);
