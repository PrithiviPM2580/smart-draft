import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Username is required'],
    maxLength: [20, 'Username must be less than 20 characters'],
    minLength: [10, 'Username must be at least 10 characters'],
    unique: [true, 'Username must be unique'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    maxLength: [50, 'Email must be less than 50 characters'],
    unique: [true, 'Email must be unique'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: {
      values: ['admin', 'user'],
      message: 'Role is either admin or user',
    },
    default: 'user',
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
