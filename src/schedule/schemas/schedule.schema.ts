import mongoose, { Document, Schema } from 'mongoose';

export const ScheduleSchema = new Schema(
  {
    establishmentId: { type: Schema.Types.ObjectId, required: true },
    specialties: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    collaborators: [{ type: Schema.Types.ObjectId, ref: 'Professional' }],
    days: [{ type: Number, required: true }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true },
);

interface ISchedule extends Document {
  establishmentId: string;
  specialties: string[];
  collaborators: string[];
  days: number[];
  startDate: Date;
  endDate: Date;
}

export const Schedule = mongoose.model<ISchedule>('Schedule', ScheduleSchema);
