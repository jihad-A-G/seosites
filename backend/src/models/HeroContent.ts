import mongoose from 'mongoose';

const heroContentSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      enum: ['home', 'about', 'services', 'portfolio', 'contact'],
      required: true,
      unique: true,
    },
    badge: {
      icon: String,
      text: String,
    },
    title: {
      type: String,
      required: true,
    },
    highlightedText: String,
    subtitle: {
      type: String,
      required: true,
    },
    description: String,
    ctaButtons: [
      {
        text: String,
        link: String,
        variant: {
          type: String,
          enum: ['primary', 'secondary', 'outline'],
          default: 'primary',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('HeroContent', heroContentSchema);
