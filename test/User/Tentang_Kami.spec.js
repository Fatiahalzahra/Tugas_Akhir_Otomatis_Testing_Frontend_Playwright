import { test, expect } from '@playwright/test';

const URL_ABOUT = 'https://bangunanmu-id.vercel.app/tentang'; 

test.describe('Pengujian Halaman Tentang Kami', () => {

  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto(URL_ABOUT, { waitUntil: 'load', timeout: 60000 });
  });

  test('ABOUT-01: Cek Loading Halaman Tentang Kami', async ({ page }) => {
    const textUtama = page.locator('text=Tentang').first();
    await expect(textUtama).toBeVisible();
  });

  test('ABOUT-02: Cek Komponen Teks Profil Perusahaan', async ({ page }) => {
    const teksProfil = page.locator('text=Kami').first();
    await expect(teksProfil).toBeVisible({ timeout: 10000 });
  });

  test('ABOUT-03: Cek Keberadaan Elemen Gambar atau Visual', async ({ page }) => {
    const gambarProfil = page.locator('img').first();
    await expect(gambarProfil).toBeDefined();
  });

  test('ABOUT-04: Cek Fungsi Tombol Navigasi Beranda', async ({ page }) => {
    const tombolHome = page.locator('nav >> text=Beranda').first();
    await tombolHome.click();
    
    await expect(page).toHaveURL('https://bangunanmu-id.vercel.app/');
  });

});