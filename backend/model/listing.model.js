import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  { 
    property: {
    type: String,
    required: true,
  },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      
    },
    bedrooms: {
      type: Number,
      
    },
    furnished: {
      type: Boolean,
      
    },
    parking: {
      type: Boolean,
      
    },
    ploatarea:{
      type:Number
    },
    length:{
      type:Number
    },
    width:{
      type:Number
    },
    roadWidth:{
      type:Number
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Listing = mongoose.model('Listing', listingSchema);

export default Listing;

