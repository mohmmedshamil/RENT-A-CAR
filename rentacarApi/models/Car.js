const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    imageurl:{type:String},
    carName: { type: String, require: true },
    price: { type: Number, require: true },
    maxperson:{type:Number,require:true},
    type:{type:String,require:true},
    location: { type: String, require: true },
    collectionName:{type:String,require:true},
    available: { type: Boolean, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cars", carSchema);
