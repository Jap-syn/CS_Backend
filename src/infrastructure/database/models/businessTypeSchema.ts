import { Schema, model, Document } from 'mongoose';

interface IBusinessType extends Document {
    name: string;
    short_name: string;
    remark: string;
    status: number
}

const businessTypeSchema = new Schema<IBusinessType>({
    name: { type: String, required: true, unique: true },
    short_name: { type: String, required: false },
    remark: { type: String, required: false },
    status: { type: Number, required: false },
});

export const BusinessTypeSchema = model<IBusinessType>('BusinessType', businessTypeSchema);
