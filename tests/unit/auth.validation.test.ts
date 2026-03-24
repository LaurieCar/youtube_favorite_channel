import { describe, expect, it } from "vitest";
import { normalizeEmail, registerSchema, signInSchema } from "../../lib/validations/auth";

describe("auth validation", () => {
  it("accepts a valid registration payload", () => {
    const result = registerSchema.safeParse({
      email: "User@Example.com ",
      password: "Password1",
      confirmPassword: "Password1",
    });

    expect(result.success).toBe(true);
  });

  it("rejects password without uppercase and number", () => {
    const result = registerSchema.safeParse({
      email: "user@example.com",
      password: "password",
      confirmPassword: "password",
    });

    expect(result.success).toBe(false);
  });

  it("rejects password mismatch", () => {
    const result = registerSchema.safeParse({
      email: "user@example.com",
      password: "Password1",
      confirmPassword: "Password2",
    });

    expect(result.success).toBe(false);
  });

  it("requires email and password for sign in", () => {
    const result = signInSchema.safeParse({
      email: "",
      password: "",
    });

    expect(result.success).toBe(false);
  });

  it("normalizes email", () => {
    expect(normalizeEmail("  USER@Example.COM ")).toBe("user@example.com");
  });
});

