import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contacts: { type: String, required: true },
  city: { type: String, required: true },
  slug: {
    type: String,
    required: true,
    unique: true
},
image: { type: String }, //
},{timestamps:true} );

export default mongoose.model('owner',employeeSchema)