import { test, expect } from '@playwright/test';

const BASE_URL = 'https://bangunanmu-id.vercel.app';

test.describe('Pengujian Validasi Fungsionalitas Halaman Kontak Sisi User', () => {

  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto(`${BASE_URL}/kontak`, { waitUntil: 'domcontentloaded' });
  });

  test('KONTAK-01: Memastikan Elemen Formulir Kontak Muncul Sempurna', async ({ page }) => {
    const inputNama = page.locator('input[placeholder="Masukkan nama Anda"]');
    const inputEmail = page.locator('input[placeholder="halo@contoh.com"]');
    const dropdownSubjek = page.locator('select').first();
    const inputPesan = page.locator('textarea[placeholder="Ceritakan tentang proyek Anda..."]');
    const btnKirim = page.locator('button:has-text("Kirim Pesan")');

    await expect(inputNama).toBeVisible();
    await expect(inputEmail).toBeVisible();
    await expect(dropdownSubjek).toBeVisible();
    await expect(inputPesan).toBeVisible();
    await expect(btnKirim).toBeVisible();
  });

  test('KONTAK-02: Simulasi Pengisian Form dan Validasi Integrasi Pengalihan ke WhatsApp Admin', async ({ page, context }) => {
    const inputNama = page.locator('input[placeholder="Masukkan nama Anda"]');
    const inputEmail = page.locator('input[placeholder="halo@contoh.com"]');
    const dropdownSubjek = page.locator('select').first();
    const inputPesan = page.locator('textarea[placeholder="Ceritakan tentang proyek Anda..."]');
    const btnKirim = page.locator('button:has-text("Kirim Pesan")');

    await inputNama.fill('Fatiah STT NF');
    await inputEmail.fill('fatiah@student.nurulfikri.ac.id');
    
    await dropdownSubjek.selectOption({ label: 'Konsultasi bangunan/renovasi' });
    
    await inputPesan.fill('Saya berencana melakukan renovasi total pada area fasad bangunan rumah tinggal bertingkat dua dengan konsep minimalis modern.');

    await expect(inputNama).toHaveValue('Fatiah STT NF');
    await expect(inputEmail).toHaveValue('fatiah@student.nurulfikri.ac.id');
    await expect(inputPesan).toHaveValue('Saya berencana melakukan renovasi total pada area fasad bangunan rumah tinggal bertingkat dua dengan konsep minimalis modern.');

    const [pageWhatsApp] = await Promise.all([
      context.waitForEvent('page'),
      btnKirim.click()
    ]);

    await expect(pageWhatsApp).toHaveURL(/.*api\.whatsapp\.com|.*web\.whatsapp\.com|.*wa\.me.*/);
  });

});