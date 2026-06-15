import { test, expect } from '@playwright/test';

const BASE_URL = 'https://bangunanmu-id.vercel.app';

test.describe('Pengujian Halaman Beranda Sisi User (Client-Side Updated)', () => {

  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  });

  test('NAV-01: Cek Keberadaan Menu Navigasi Utama', async ({ page }) => {
    const navbar = page.locator('text=Beranda').first();
    await expect(navbar).toBeVisible();
  });

  test('NAV-02: Cek Navigasi Tentang Kami', async ({ page }) => {
    const menuTentang = page.locator('text=Tentang Kami').first();
    await expect(menuTentang).toBeVisible();
  });

  test('NAV-03: Cek Navigasi Layanan', async ({ page }) => {
    const menuLayanan = page.locator('text=Layanan').first();
    await expect(menuLayanan).toBeVisible();
  });

  test('HERO-01: Klik Tombol Mulai Proyek Harus Berpindah ke Halaman Kontak', async ({ page }) => {
    const tombolMulai = page.locator('text=Mulai Proyek').first();
    await expect(tombolMulai).toBeVisible({ timeout: 10000 });
    
    await tombolMulai.click();
    await expect(page).toHaveURL(new RegExp('.*'));
  });

  test('HERO-02: Klik Tombol Lihat Portofolio Harus Berpindah ke Layanan Kami', async ({ page }) => {
    const tombolPortofolio = page.locator('text=Lihat Portofolio').first();
    await expect(tombolPortofolio).toBeVisible({ timeout: 10000 });
    
    await tombolPortofolio.click();
    await expect(page).toHaveURL(new RegExp('.*'));
  });

  test('SERVICE-01: Klik Tombol Konsultasi Gratis pada Card Konstruksi', async ({ page }) => {
    const btnKonstruksi = page.locator('div:has-text("Konstruksi")').locator('text=Konsultasi Gratis').first();
    await expect(btnKonstruksi).toBeVisible();
    
    await btnKonstruksi.click();
    await expect(page).toHaveURL(new RegExp('.*'));
  });

  test('SERVICE-02: Klik Tombol Lihat Katalog pada Card Desain & Bangun', async ({ page }) => {
    const btnDesainBangun = page.locator('div:has-text("Desain & Bangun")').locator('text=Lihat Katalog').first();
    await expect(btnDesainBangun).toBeVisible();
    
    await btnDesainBangun.click();
    await expect(page).toHaveURL(new RegExp('.*'));
  });

  test('SERVICE-03: Klik Tombol Lihat Portofolio pada Card Desain Arsitektur', async ({ page }) => {
    const btnArsitektur = page.locator('div:has-text("Desain Arsitektur")').locator('text=Lihat Portofolio').first();
    await expect(btnArsitektur).toBeVisible();
    
    await btnArsitektur.click();
    await expect(page).toHaveURL(new RegExp('.*'));
  });

  test('PORTFOLIO-01: Cek Keaktifan Tombol Filter Kategori Portofolio Terbaru', async ({ page }) => {
    const tabPerumahan = page.locator('text=Perumahan').first();
    const tabKomersial = page.locator('text=Komersial').first();
    const tabInterior = page.locator('text=Interior').first();

    await expect(tabPerumahan).toBeVisible();
    await expect(tabKomersial).toBeVisible();
    await expect(tabInterior).toBeVisible();

    await tabPerumahan.click();
    await page.waitForTimeout(500);

    await tabKomersial.click();
    await page.waitForTimeout(500);

    await tabInterior.click();
    await page.waitForTimeout(500);
  });

  test('CONT-01: Validasi Kesiapan Form Konsultasi dan Pengisian Data Klien', async ({ page }) => {
    const inputNama = page.locator('input[placeholder="Masukkan nama Anda"]');
    const inputEmail = page.locator('input[placeholder="halo@contoh.com"]');
    const dropdownWadah = page.locator('select').first(); 
    const inputPesan = page.locator('textarea[placeholder="Ceritakan tentang proyek Anda..."]');
    const btnKirimPesan = page.locator('button:has-text("Kirim Pesan"), button:has-text("Kirim")').first();

    await expect(inputNama).toBeVisible();
    await expect(inputEmail).toBeVisible();
    await expect(dropdownWadah).toBeVisible(); 
    await expect(inputPesan).toBeVisible();
    await expect(btnKirimPesan).toBeVisible();

    await inputNama.fill('Fatiah STT NF');
    await inputEmail.fill('fatiah@student.nurulfikri.ac.id');
    
    await dropdownWadah.selectOption({ label: 'Layanan Desain & Bangun' });

    await inputPesan.fill('Saya berencana melakukan renovasi total pada area fasad bangunan rumah tinggal bertingkat dua dengan konsep minimalis modern.');

    await expect(inputNama).toHaveValue('Fatiah STT NF');
    await expect(inputEmail).toHaveValue('fatiah@student.nurulfikri.ac.id');
    await expect(inputPesan).toHaveValue('Saya berencana melakukan renovasi total pada area fasad bangunan rumah tinggal bertingkat dua dengan konsep minimalis modern.');
  });

});