import { expect, test } from "@playwright/test";

test("redirects unauthenticated visitor from categories to sign-in", async ({ page }) => {
  await page.goto("/categories");
  await expect(page).toHaveURL(/\/connexion/);
});

test("shows sign-in form and link to registration", async ({ page }) => {
  await page.goto("/connexion");
  await expect(page.getByRole("heading", { name: "ChannelFinder" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Se connecter" })).toBeVisible();
  await expect(page.getByRole("link", { name: "S'inscrire" })).toBeVisible();
});

