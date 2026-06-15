import { test, expect } from '@playwright/test';

const BASE_URL = 'https://bangunanmu-id.vercel.app';

test.describe('Pengujian Komprehensif Halaman Layanan Sisi User (Client-Side)', () => {

  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  });

  test('SERV-01: Validasi Akses Menu dan Ekspansi Pilihan Dropdown Layanan', async ({ page }) => {
    const headerLayanan = page.locator('text=Layanan Kami').first();
    await expect(headerLayanan).toBeVisible();
  });

  test('SERV-02: Cek Structure Konten Komponen dan Tombol Detail Layanan', async ({ page }) => {
    const menuDropdownLayanan = page.locator('text=Layanan').first();
    await expect(menuDropdownLayanan).toBeVisible();
    
    await menuDropdownLayanan.click();

    const subMenuKonstruksi = page.locator('text=Konstruksi').first();
    await expect(subMenuKonstruksi).toBeVisible();

    await subMenuKonstruksi.click();

    await expect(page).toHaveURL(`${BASE_URL}/layanan?tab=konstruksi`, { timeout: 10000 });
  });

  test('SERV-03: Cek Keberadaan Alur Tahapan Kerja dan Navigasi Serah Terima Kunci', async ({ page }) => {
    const tahapanKonsultasi = page.locator('text=KONSULTASI').first();
    await expect(tahapanKonsultasi).toBeVisible();

    await tahapanKonsultasi.click();
    
    await expect(page).toHaveURL(`${BASE_URL}/kontak`, { timeout: 10000 });
  });

  test('SERV-04: Simulasi Pengisian Lengkap Form Kontak Konsultasi via Alur Landing Layanan', async ({ page }) => {
    await page.goto(`${BASE_URL}/kontak`, { waitUntil: 'domcontentloaded' });

    const inputNama = page.locator('input[placeholder="Masukkan nama Anda"]');
    const inputEmail = page.locator('input[placeholder="halo@contoh.com"]');
    const dropdownWadah = page.locator('select').first();
    const inputPesan = page.locator('textarea[placeholder="Ceritakan tentang proyek Anda..."]');

    await expect(inputNama).toBeVisible();
    await expect(inputEmail).toBeVisible();

    await inputNama.fill('Fatiah STT NF');
    await inputEmail.fill('fatiah@student.nurulfikri.ac.id');
    await dropdownWadah.selectOption({ label: 'Layanan Desain & Bangun' });
    await inputPesan.fill('Simulasi pengujian form halaman layanan.');

    await expect(inputNama).toHaveValue('Fatiah STT NF');
  });

});