import { z } from "zod";
import { UserSchema } from "./user";
import { SessionSchema } from "./session";

export const AuthContextSchema = z.object({
  user: UserSchema.nullable(),
  session: SessionSchema.nullable(),
});

export interface AuthContext extends z.infer<typeof AuthContextSchema> {}
