import mongoose, { Schema } from 'mongoose';

export interface IBlog {
  title: string;
  subTitle: string;
  description: string;
  category: string;
  image: string;
  isPublished: boolean;
}

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subTitle: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;
