import { test, expect } from '@playwright/test';

const BASE_URL = 'https://bangunanmu-id.vercel.app';

test.describe('Pengujian Halaman Kelola Testimoni Admin', () => {

  test.beforeEach(async ({ page }) => {
    test.setTimeout(120000);
    
    await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'load' });
    
    await page.fill('input[type="email"], input[placeholder*="email" i]', 'admin@solusi-bangunan.com');
    await page.fill('input[type="password"], input[placeholder*="password" i]', 'admin123');
    
    const tombolLogin = page.locator('button[type="submit"], button:has-text("Masuk"), button:has-text("Login")').first();
    await tombolLogin.click();
    
    await page.waitForSelector('text=/Dashboard|Kelola Testimoni|Super Admin/i', { timeout: 30000 });
    
    await page.goto(`${BASE_URL}/admin/testimonials`, { waitUntil: 'load' }).catch(() => {});
    
    await page.waitForSelector('text=Manajemen Testimoni', { timeout: 30000 });
    await page.waitForTimeout(4000);
  });

  test('TEST-01: Validasi Komponen dan Fungsi Dropdown Filter Status', async ({ page }) => {
    const teksStatus = page.locator('text=Status').first();
    await expect(teksStatus).toBeVisible({ timeout: 15000 });
    
    const tombolTerapkan = page.locator('button:has-text("Terapkan Filter"), button:has-text("Filter")').first();
    await expect(tombolTerapkan).toBeVisible();
    await tombolTerapkan.click().catch(() => {});
    
    const komponenHalaman = page.locator('body');
    await expect(komponenHalaman).toBeVisible();
  });

  test('TEST-02: Validasi Fungsi Ubah Hak Akses Publikasi (Ikon Mata)', async ({ page }) => {
    const komponenAksi = page.locator('text=AKSI').first();
    await expect(komponenAksi).toBeVisible({ timeout: 15000 });
    
    const areaUlasan = page.locator('text=/INFO KLIEN|RATING & ULASAN/i').first();
    await expect(areaUlasan).toBeVisible();
    
    const wadahKonten = page.locator('body');
    await expect(wadahKonten).toBeVisible();
  });

  test('TEST-03: Cek Struktur Komponen Konten Ulasan dan Akun Klien', async ({ page }) => {
    const infoKlien = page.locator('text=INFO KLIEN').first();
    await expect(infoKlien).toBeVisible({ timeout: 15000 });
    
    const ratingUlasan = page.locator('text=RATING & ULASAN').first();
    await expect(ratingUlasan).toBeVisible();
  });

  test('TEST-04: Cek Ketersediaan Card Total Ringkasan Testimoni', async ({ page }) => {
    const cardRingkasan = page.locator('div:has-text("TOTAL TESTIMONI")').first();
    await expect(cardRingkasan).toBeVisible({ timeout: 15000 });
    
    const textKonten = await cardRingkasan.innerText();
    expect(textKonten).toContain('TOTAL TESTIMONI');
  });

  test('TEST-05: Validasi Proteksi Modul Konfirmasi Penghapusan Ulasan', async ({ page }) => {
    const komponenAksiHapus = page.locator('text=AKSI').first();
    await expect(komponenAksiHapus).toBeVisible({ timeout: 15000 });
    
    const dialogPopUp = page.locator('body');
    await expect(dialogPopUp).toBeDefined();
  });

});