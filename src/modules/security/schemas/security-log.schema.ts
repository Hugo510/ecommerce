import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema({
  timestamps: true,
  expires: "30d",
})
export class SecurityLog extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User" })
  user: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  action: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ required: true })
  ip: string;

  @Prop()
  userAgent: string;

  @Prop({
    enum: ["success", "failure", "warning", "error"],
    required: true,
  })
  status: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;
}

export const SecurityLogSchema = SchemaFactory.createForClass(SecurityLog);
SecurityLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 }); // 30 días
SecurityLogSchema.index({ userId: 1, createdAt: -1 });
SecurityLogSchema.index({ action: 1, status: 1 });
SecurityLogSchema.index({ ip: 1, createdAt: -1 });
