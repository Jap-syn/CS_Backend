import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    phone: string,
    dob: Date,
    gender: string,
    status: string,
    remark: string,
}

const userSchema = new Schema<IUser>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  status: { type: String, required: true },
  remark: { type: String, required: true }
});

export const UserSchema = model<IUser>('User', userSchema);
