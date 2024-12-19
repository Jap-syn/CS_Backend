import { Schema, model, Document } from 'mongoose';

interface IDivision extends Document {
    name: string;
    description: string;
    remark: string;
    status: number
}

const divisionSchema = new Schema<IDivision>({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    remark: { type: String, required: false },
    status: { type: Number, required: false },
});

export const DivisionSchema = model<IDivision>('Division', divisionSchema);
