import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  challenge: string;
  solution: string;
  category: 'web' | 'mobile' | 'saas' | 'ecommerce';
  technologies: string[];
  client: string;
  duration: string;
  liveUrl: string;
  githubUrl: string;
  images: string[];
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    challenge: {
      type: String,
      default: '',
    },
    solution: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      enum: ['web', 'mobile', 'saas', 'ecommerce'],
    },
    technologies: {
      type: [String],
      default: [],
    },
    client: {
      type: String,
      default: '',
    },
    duration: {
      type: String,
      default: '',
    },
    liveUrl: {
      type: String,
      default: '',
    },
    githubUrl: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
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

// Index for faster queries
ProjectSchema.index({ category: 1, featured: -1, order: 1 });
ProjectSchema.index({ technologies: 1 });

export default mongoose.model<IProject>('Project', ProjectSchema);
