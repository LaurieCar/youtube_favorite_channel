import { beforeEach, describe, expect, it, vi } from "vitest";

const { findUniqueMock, updateMock, compareMock, hashMock } = vi.hoisted(() => ({
  findUniqueMock: vi.fn(),
  updateMock: vi.fn(),
  compareMock: vi.fn(),
  hashMock: vi.fn(),
}));

vi.mock("../../lib/db/prisma", () => ({
  prisma: {
    user: {
      findUnique: findUniqueMock,
      update: updateMock,
    },
  },
}));

vi.mock("bcryptjs", () => ({
  compare: compareMock,
  hash: hashMock,
}));

import { updateUserProfile } from "../../lib/auth/user-service";

describe("profile update integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates user email when it is unique", async () => {
    findUniqueMock
      .mockResolvedValueOnce({ id: "u1", email: "old@example.com", passwordHash: "h", updatedAt: new Date() })
      .mockResolvedValueOnce(null);

    updateMock.mockResolvedValueOnce({
      id: "u1",
      email: "new@example.com",
      updatedAt: new Date(),
    });

    const result = await updateUserProfile("u1", { email: "new@example.com" });

    expect(result.email).toBe("new@example.com");
    expect(updateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "u1" },
        data: { email: "new@example.com" },
      }),
    );
  });

  it("updates password when current password is valid", async () => {
    findUniqueMock.mockResolvedValueOnce({
      id: "u1",
      email: "user@example.com",
      passwordHash: "old-hash",
      updatedAt: new Date(),
    });

    compareMock.mockResolvedValueOnce(true);
    hashMock.mockResolvedValueOnce("new-hash");
    updateMock.mockResolvedValueOnce({
      id: "u1",
      email: "user@example.com",
      updatedAt: new Date(),
    });

    await updateUserProfile("u1", {
      currentPassword: "Password1",
      newPassword: "NewPassword1",
    });

    expect(compareMock).toHaveBeenCalledWith("Password1", "old-hash");
    expect(hashMock).toHaveBeenCalledWith("NewPassword1", 12);
    expect(updateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { passwordHash: "new-hash" },
      }),
    );
  });

  it("throws when current password is invalid", async () => {
    findUniqueMock.mockResolvedValueOnce({
      id: "u1",
      email: "user@example.com",
      passwordHash: "old-hash",
      updatedAt: new Date(),
    });

    compareMock.mockResolvedValueOnce(false);

    await expect(
      updateUserProfile("u1", {
        currentPassword: "WrongPassword1",
        newPassword: "NewPassword1",
      }),
    ).rejects.toMatchObject({ code: "INVALID_CREDENTIALS" });
  });
});
