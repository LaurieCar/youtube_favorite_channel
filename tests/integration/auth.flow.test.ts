import { beforeEach, describe, expect, it, vi } from "vitest";

const { findUniqueMock, createMock, hashMock, compareMock } = vi.hoisted(() => ({
  findUniqueMock: vi.fn(),
  createMock: vi.fn(),
  hashMock: vi.fn(),
  compareMock: vi.fn(),
}));

vi.mock("../../lib/db/prisma", () => ({
  prisma: {
    user: {
      findUnique: findUniqueMock,
      create: createMock,
    },
  },
}));

vi.mock("bcryptjs", () => ({
  hash: hashMock,
  compare: compareMock,
}));

import { POST } from "../../app/api/auth/register/route";
import { createUser, verifyCredentials } from "../../lib/auth/user-service";

describe("auth flow integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates an account then verifies credentials", async () => {
    findUniqueMock.mockResolvedValueOnce(null);
    hashMock.mockResolvedValueOnce("hashed-password");
    const createdUser = {
      id: "user_1",
      email: "user@example.com",
      passwordHash: "hashed-password",
    };
    createMock.mockResolvedValueOnce(createdUser);
    findUniqueMock.mockResolvedValueOnce(createdUser);
    compareMock.mockResolvedValueOnce(true);

    const user = await createUser("User@Example.com", "Password1");
    const verified = await verifyCredentials("user@example.com", "Password1");

    expect(user.email).toBe("user@example.com");
    expect(verified?.id).toBe("user_1");
    expect(findUniqueMock).toHaveBeenNthCalledWith(1, { where: { email: "user@example.com" } });
  });

  it("rejects duplicate email at register route", async () => {
    findUniqueMock.mockResolvedValueOnce({ id: "existing" });

    const request = new Request("http://localhost/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "user@example.com",
        password: "Password1",
        confirmPassword: "Password1",
      }),
    });

    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(409);
    expect(payload.error.code).toBe("EMAIL_ALREADY_USED");
  });

  it("returns null when credentials are invalid", async () => {
    findUniqueMock.mockResolvedValueOnce({
      id: "user_1",
      email: "user@example.com",
      passwordHash: "hashed-password",
    });
    compareMock.mockResolvedValueOnce(false);

    const result = await verifyCredentials("user@example.com", "wrong");

    expect(result).toBeNull();
  });
});
