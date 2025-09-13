import mongoose, { Schema } from 'mongoose';
import type { Types } from 'mongoose';

export interface IToken {
  token: string;
  user: Types.ObjectId;
}

const tokenSchema = new Schema<IToken>({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Token = mongoose.model<IToken>('Token', tokenSchema);

export default Token;
