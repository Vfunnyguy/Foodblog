import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hay tao mot chu de"],
      trim: true,
      unique: true,
      maxlength: [55, "Ten chu de gioi han trong 55 ky tu"],
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("categories", categorySchema);
