import { Schema, model, Document } from 'mongoose';

interface IRole extends Document {
    name: string;
    description: string;
    remark: string;
    status: number
}

const roleSchema = new Schema<IRole>({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    remark: { type: String, required: false },
    status: { type: Number, required: false },
});

export const RoleSchema = model<IRole>('Role', roleSchema);
