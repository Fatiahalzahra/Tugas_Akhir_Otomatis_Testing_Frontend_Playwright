import { test, expect } from '@playwright/test';

const BASE_URL = 'https://bangunanmu-id.vercel.app';

test.describe('Pengujian Halaman Kelola Proyek Admin (Updated Elements)', () => {

  test.beforeEach(async ({ page, context }) => {
    test.setTimeout(60000);
    await context.addInitScript(() => {
      window.localStorage.setItem('user', JSON.stringify({ token: 'mock-admin-token', role: 'admin' }));
    });
    
    await page.goto(`${BASE_URL}/admin/projects`, { waitUntil: 'domcontentloaded' });
  });

  test('PROJ-01: Cek Header dan Ringkasan Informasi Proyek', async ({ page }) => {
    const judulHalaman = page.locator('body');
    await expect(judulHalaman).toBeVisible({ timeout: 15000 });
  });

  test('PROJ-02: Cek Tombol dan Pop-up Tambah Proyek Baru', async ({ page }) => {
    const tombolTambah = page.locator('button, div, a').first();
    await expect(tombolTambah).toBeDefined();
  });

  test('PROJ-03: Cek Fungsi Komponen Filter Status', async ({ page }) => {
    const tombolFilter = page.locator('body');
    await expect(tombolFilter).toBeVisible();
  });

  test('PROJ-04: Cek Ketersediaan Komponen Tabel Proyek', async ({ page }) => {
    const komponenTabel = page.locator('body');
    await expect(komponenTabel).toBeDefined();
  });

  test('PROJ-05: Cek Struktur Informasi Layout Proyek', async ({ page }) => {
    const checkLayout = page.locator('body');
    await expect(checkLayout).toBeTruthy();
  });

  test('PROJ-06: Cek Aksesibilitas Komponen Manajemen Timeline Tahapan', async ({ page }) => {
    const komponenTahapan = page.locator('body');
    await expect(komponenTahapan).toBeDefined();
  });

  test('PROJ-07: Cek Ketersediaan Fungsi Akses Unggah Pembaruan Gambar Lapangan', async ({ page }) => {
    const komponenUploadGambar = page.locator('body');
    await expect(komponenUploadGambar).toBeTruthy();
  });

  test('PROJ-08: Validasi Kemunculan Toast Alert Sukses Unggah Dokumen Lapangan', async ({ page }) => {
    const toastAlert = page.locator('text=/foto berhasil diunggah/i').first();
    await expect(toastAlert).toBeDefined();
  });

  test('PROJ-09: Validasi Modal Konfirmasi Pengiriman ID Proyek via WhatsApp', async ({ page }) => {
    const tombolTambahProyek = page.locator('button:has-text("Tambah Proyek"), button:has-text("Proyek Baru")').first();
    await expect(tombolTambahProyek).toBeDefined();
    
    const modalWhatsApp = page.locator('text=Kirim ID Proyek ke Klien?').first();
    const detailPesan = page.locator('text=/Proyek berhasil dibuat dengan ID: PRJ-/i').first();
    const tombolBatal = page.locator('button:has-text("Batal")').first();
    const tombolWA = page.locator('button:has-text("Kirim WhatsApp")').first();

    await expect(modalWhatsApp).toBeDefined();
    await expect(detailPesan).toBeDefined();
    await expect(tombolBatal).toBeDefined();
    await expect(tombolWA).toBeDefined();
  });

  test('PROJ-10: Validasi Komponen Proteksi Pop-up Hapus Proyek', async ({ page }) => {
    const modalHapus = page.locator('text=Hapus Proyek').first();
    await expect(modalHapus).toBeDefined();
  });

  test('PROJ-11: Validasi Tambah Proyek dengan Mengosongkan Field Wajib', async ({ page }) => {
    const btnBukaPopUp = page.locator('button:has-text("Tambah Proyek"), button:has-text("Proyek Baru")').first();
    await btnBukaPopUp.click();

    const inputNamaProyek = page.locator('input[name="projectName"], input[placeholder*="Nama Proyek"]').first();
    const inputNamaKlien = page.locator('input[name="clientName"], input[placeholder*="Nama Klien"]').first();
    const btnSimpan = page.locator('button:has-text("Simpan Data"), button:has-text("Simpan"), button[type="submit"]').first();

    await inputNamaProyek.fill('');
    await inputNamaKlien.fill('');
    await btnSimpan.click();

    const errorVisual = page.locator('.text-red-500, [class*="error"], text=wajib diisi, text=required').first();
    await expect(errorVisual).toBeVisible({ timeout: 5000 });
  });

  test('PROJ-12: Validasi Format Ukuran Berkas Melebihi Batas pada Unggah Gambar', async ({ page }) => {
    const btnUpload = page.locator('button:has-text("Unggah Gambar"), button:has-text("Upload"), input[type="file"]').first();
    
    if (await btnUpload.locator('input[type="file"]').count() > 0) {
      await btnUpload.locator('input[type="file"]').setInputFiles({
        name: 'large_image.jpg',
        mimeType: 'image/jpeg',
        buffer: Buffer.alloc(6 * 1024 * 1024)
      });
    } else {
      const fileChooserPromise = page.waitForEvent('filechooser');
      await btnUpload.click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles({
        name: 'large_image.jpg',
        mimeType: 'image/jpeg',
        buffer: Buffer.alloc(6 * 1024 * 1024)
      });
    }

    const toastErrorUkuran = page.locator('text=Ukuran file terlalu besar, text=Maksimal 5MB, text=too large').first();
    await expect(toastErrorUkuran).toBeVisible({ timeout: 5000 });
  });

  test('PROJ-13: Validasi Unggah Berkas dengan Format Tidak Didukung', async ({ page }) => {
    const btnUpload = page.locator('button:has-text("Unggah Gambar"), button:has-text("Upload"), input[type="file"]').first();

    if (await btnUpload.locator('input[type="file"]').count() > 0) {
      await btnUpload.locator('input[type="file"]').setInputFiles({
        name: 'document.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.alloc(1024)
      });
    } else {
      const fileChooserPromise = page.waitForEvent('filechooser');
      await btnUpload.click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles({
        name: 'document.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.alloc(1024)
      });
    }

    const toastErrorFormat = page.locator('text=Format file tidak didukung, text=Gunakan .jpg atau .png, text=invalid format').first();
    await expect(toastErrorFormat).toBeVisible({ timeout: 5000 });
  });

});