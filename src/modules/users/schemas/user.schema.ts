import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import * as bcrypt from "bcrypt";

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_, ret) => {
      delete ret.password;
      return ret;
    },
  },
  indexes: [{ email: 1, unique: true }, { role: 1 }, { createdAt: -1 }],
})
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop([
    {
      street: String,
      city: String,
      zipCode: String,
      isDefault: Boolean,
    },
  ])
  addresses: Array<Record<string, any>>;

  @Prop({
    type: String,
    enum: ["user", "admin", "seller"],
    default: "user",
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.index({ email: 1, role: 1 });
