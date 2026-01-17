import mongoose, { Document, Schema } from 'mongoose';

export interface ITechnology extends Document {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops';
  icon: string;
  proficiency: number;
  createdAt: Date;
  updatedAt: Date;
}

const TechnologySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Technology name is required'],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Technology category is required'],
      enum: ['frontend', 'backend', 'database', 'devops'],
    },
    icon: {
      type: String,
      default: '',
    },
    proficiency: {
      type: Number,
      required: [true, 'Proficiency level is required'],
      min: [1, 'Proficiency must be at least 1'],
      max: [100, 'Proficiency cannot exceed 100'],
      default: 50,
    },
  },
  {
    timestamps: true,
  }
);

// Index for grouping by category
TechnologySchema.index({ category: 1, proficiency: -1 });

export default mongoose.model<ITechnology>('Technology', TechnologySchema);
