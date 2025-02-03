import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema({
  timestamps: true,
  expires: "30d",
})
export class SecurityLog extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User" })
  user: MongooseSchema.Types.ObjectId;

  @Prop({
    required: true,
    enum: [
      "login",
      "logout",
      "password_change",
      "profile_update",
      "order_created",
      "payment_processed",
      "failed_login_attempt",
    ],
  })
  action: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({
    required: true,
    validate: {
      validator: (ip: string) => {
        return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
          ip
        );
      },
    },
  })
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
