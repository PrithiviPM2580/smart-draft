import mongoose, { Schema } from 'mongoose';
import type { Types } from 'mongoose';

export interface IComment {
  blogId: Types.ObjectId;
  name: string;
  content: string;
  isApproves: boolean;
}
const commentSchema = new Schema<IComment>({
  blogId: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isApproves: {
    type: Boolean,
    default: false,
  },
});

const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;
