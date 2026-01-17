import mongoose from 'mongoose';

const statSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    page: {
      type: String,
      enum: ['home', 'about', 'portfolio', 'all'],
      default: 'all',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Stat', statSchema);
