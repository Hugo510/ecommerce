import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import * as bcrypt from "bcrypt";

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_, ret) => {
      delete ret.password;
      delete ret.__v;
      return ret;
    },
  },
})
export class User extends Document {
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  })
  email: string;

  @Prop({
    required: true,
    minlength: 8,
    validate: {
      validator: (password: string) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password
        );
      },
      message:
        "La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
    },
  })
  password: string;

  @Prop({
    required: true,
    maxLength: 100,
    trim: true,
  })
  name: string;

  @Prop([
    {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true, match: /^\d{5}$/ },
      isDefault: { type: Boolean, default: false },
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

// Obtener salt rounds desde variables de entorno, con valor por defecto.
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10");

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  }
  next();
});

// Se elimina el siguiente índice duplicado:
// UserSchema.index({ email: 1 }, { unique: true });

UserSchema.index({ role: 1 });
UserSchema.index({ createdAt: -1 });
UserSchema.index({ email: 1, role: 1 });
