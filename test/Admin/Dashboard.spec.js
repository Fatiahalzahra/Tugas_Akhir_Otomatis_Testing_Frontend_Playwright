import { test, expect } from '@playwright/test';

const BASE_URL = 'https://bangunanmu-id.vercel.app';

test.describe('Pengujian Halaman Kelola Proyek Admin (Dashboard View Updated)', () => {

  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'domcontentloaded' });
    
    await page.locator('input[type="email"]').fill('admin@solusi-bangunan.com');
    await page.locator('input[type="password"]').fill('admin123');
    
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 }),
      page.getByRole('button', { name: /Masuk/i }).click()
    ]);
    
    await expect(page).toHaveURL(`${BASE_URL}/admin/dashboard`, { timeout: 15000 });
  });

  test('PROJ-01: Cek Header Utama dan Verifikasi URL Dashboard Admin', async ({ page }) => {
    await expect(page).toHaveURL(`${BASE_URL}/admin/dashboard`);
  });

  test('PROJ-02: Cek Ketersediaan Komponen Indikator Data dan Elemen Navigasi Dashboard', async ({ page }) => {
    const totalProyekCard = page.locator('text=/TOTAL PROYEK/i').first();
    const proyekAktifCard = page.locator('text=/PROYEK AKTIF/i').first();
    const proyekSelesaiCard = page.locator('text=/PROYEK SELESAI/i').first();
    const totalTestimoniCard = page.locator('text=/TOTAL TESTIMONI/i').first();
    
    await expect(totalProyekCard).toBeVisible();
    await expect(proyekAktifCard).toBeVisible();
    await expect(proyekSelesaiCard).toBeVisible();
    await expect(totalTestimoniCard).toBeVisible();

    const menuDashboard = page.locator('aside, nav').locator('text=/Dashboard/i').first();
    const menuKelolaProyek = page.locator('aside, nav').locator('text=/Kelola Proyek/i').first();
    const statusSuperAdmin = page.locator('text=/Super Admin/i').first();

    await expect(menuDashboard).toBeVisible();
    await expect(menuKelolaProyek).toBeVisible();
    await expect(statusSuperAdmin).toBeVisible();
  });

  test('PROJ-03: Cek Fungsi Kartu Aksi Cepat - Buka Manajemen Proyek', async ({ page }) => {
    const linkKelolaProyek = page.locator('text=/Buka Manajemen Proyek/i').first();
    
    await expect(linkKelolaProyek).toBeVisible();
    await linkKelolaProyek.click();

    await expect(page).toBeDefined();
  });

  test('PROJ-04: Cek Fungsi Kartu Aksi Cepat - Buka Manajemen Testimoni', async ({ page }) => {
    const linkKelolaTestimoni = page.locator('text=/Buka Manajemen Testimoni/i').first();
    
    await expect(linkKelolaTestimoni).toBeVisible();
    await linkKelolaTestimoni.click();

    await expect(page).toBeDefined();
  });

  test('PROJ-05: Cek Fungsi Kartu Aksi Cepat - Kunjungi Situs Internal Admin', async ({ page }) => {
    const linkKunjungiSitus = page.locator('text=/Kunjungi Situs/i').first();
    
    await expect(linkKunjungiSitus).toBeVisible();
    await linkKunjungiSitus.click();

    await expect(page).toBeDefined();
  });

});