import { Schema, model, Document } from 'mongoose';

interface ICity extends Document {
    name: string;
    division_id: string;
    description: string;
    remark: string;
    status: number
}

const citySchema = new Schema<ICity>({
    name: { type: String, required: true, unique: true },
    division_id: { type: String, required: true },
    description: { type: String, required: false },
    remark: { type: String, required: false },
    status: { type: Number, required: false },
});

export const CitySchema = model<ICity>('City', citySchema);
