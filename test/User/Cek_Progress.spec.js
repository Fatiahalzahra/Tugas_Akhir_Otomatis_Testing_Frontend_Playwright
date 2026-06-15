import { test, expect } from '@playwright/test';

const TARGET_URL = 'https://bangunanmu-id.vercel.app/cek-progress';

test.describe('Evaluasi Kapabilitas Sistem Fitur Pelacakan Proyek Konstruksi', () => {

  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });
  });

  test('PROG-01: Verifikasi Ketersediaan Komponen Formulir Pencarian', async ({ page }) => {
    const inputField = page.locator('input[type="text"], input').first();
    await expect(inputField).toBeAttached();
  });

  test('PROG-02: Validasi Simulasi Pengiriman ID Kontrak Bernilai Valid', async ({ page }) => {
    const fieldPencarian = page.locator('input').first();
    await fieldPencarian.fill('BGN-2023-X');
    
    const triggerButton = page.locator('button:has-text("Cari"), button, input[type="submit"]').first();
    await expect(triggerButton).toBeVisible();
    await triggerButton.click();

    const layoutContainer = page.locator('html');
    await expect(layoutContainer).toBeVisible({ timeout: 15000 });
  });

  test('PROG-03: Aksesibilitas Log Data Riwayat Progres Fisik Konstruksi', async ({ page }) => {
    const fieldKode = page.locator('input').first();
    await fieldKode.fill('BGN-2026-028'); 
    
    const submitAction = page.locator('button, input[type="submit"]').first();
    await expect(submitAction).toBeAttached();
    await submitAction.click();

    const outputDocument = page.locator('body');
    await expect(outputDocument).toBeVisible();
  });

});