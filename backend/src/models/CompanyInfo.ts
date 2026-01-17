import mongoose from 'mongoose';

const companyInfoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'seosites',
    },
    tagline: String,
    foundedYear: {
      type: Number,
      default: 2014,
    },
    story: {
      type: String,
    },
    mission: String,
    vision: String,
    values: [
      {
        icon: String,
        title: String,
        description: String,
        order: Number,
      },
    ],
    contact: {
      email: String,
      phone: String,
      address: String,
    },
    social: {
      twitter: String,
      linkedin: String,
      github: String,
      facebook: String,
      instagram: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('CompanyInfo', companyInfoSchema);
