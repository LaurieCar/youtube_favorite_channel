import { describe, expect, it } from "vitest";
import {
  profileEmailSchema,
  profilePasswordSchema,
  profileUpdateSchema,
} from "../../lib/validations/profile";

describe("profile validation", () => {
  it("accepts a valid email payload", () => {
    const result = profileEmailSchema.safeParse({ email: "user@example.com" });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = profileEmailSchema.safeParse({ email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("accepts a valid password update payload", () => {
    const result = profilePasswordSchema.safeParse({
      currentPassword: "Password1",
      newPassword: "NewPassword1",
      confirmPassword: "NewPassword1",
    });

    expect(result.success).toBe(true);
  });

  it("requires at least one profile change", () => {
    const result = profileUpdateSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
