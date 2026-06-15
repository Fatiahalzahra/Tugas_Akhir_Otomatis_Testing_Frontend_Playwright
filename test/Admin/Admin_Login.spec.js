import { test, expect } from '@playwright/test';

const BASE_URL = 'https://bangunanmu-id.vercel.app';

test.describe('Pengujian Validasi Antarmuka Halaman Admin Login', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
  });

  test('ADMIN-01: Verifikasi Form Login Siap Menerima Input Kredensial', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/login`);

    const inputEmail = page.locator('input[type="email"]');
    const inputPassword = page.locator('input[type="password"]');

    await expect(inputEmail).toBeVisible();
    await expect(inputPassword).toBeVisible();

    await inputEmail.fill('admin@solusi-bangunan.com');
    await inputPassword.fill('admin123'); 

    await expect(inputEmail).toHaveValue('admin@solusi-bangunan.com');
    await expect(inputPassword).toHaveValue('admin123');

    const btnMasuk = page.getByRole('button', { name: /Masuk/i });
    await expect(btnMasuk).toBeVisible();
  });

});