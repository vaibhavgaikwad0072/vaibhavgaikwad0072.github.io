import { chromium } from 'playwright-core';
import fs from 'node:fs';

const EDGE =
  process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = process.env.VERIFY_BASE_URL || 'http://127.0.0.1:5173';
const OUT = 'shots';

fs.mkdirSync(OUT, { recursive: true });
const report = { console: [], pageErrors: [], checks: {} };

const browser = await chromium.launch({ executablePath: EDGE, headless: true });

async function newPage(viewport, mobile = false) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    isMobile: mobile,
    hasTouch: mobile,
    userAgent: mobile
      ? 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Mobile Safari/537.36'
      : undefined,
  });
  const page = await context.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') report.console.push(`[${msg.type()}] ${msg.text()}`);
  });
  page.on('pageerror', (error) => report.pageErrors.push(String(error)));
  return { context, page };
}

async function step(name, fn) {
  try {
    await fn();
    report.checks[name] = report.checks[name] ?? 'ok';
  } catch (error) {
    report.checks[name] = `FAILED: ${String(error.message).split('\n')[0]}`;
  }
}

// ---------- Desktop home ----------
const { context: desktop, page } = await newPage({ width: 1440, height: 1000 });
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2800);
await page.screenshot({ path: `${OUT}/home-desktop.png` });
await page.screenshot({ path: `${OUT}/home-desktop-full.png`, fullPage: true });

await step('sections', async () => {
  report.checks.sections = await page.$$eval('section[id]', (nodes) => nodes.map((node) => node.id));
});
await step('metrics', async () => {
  report.checks.pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  report.checks.overflowX = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  report.checks.h1 = await page.locator('h1').first().innerText();
  report.checks.photoLoaded = await page.evaluate(() => {
    const image = document.querySelector('img[alt*="Vaibhav"]');
    return image ? image.complete && image.naturalWidth > 0 : false;
  });
  report.checks.resumeStatus = await page.evaluate(async () => {
    const response = await fetch('/Vaibhav_Gaikwad_Resume.pdf', { method: 'HEAD' });
    return response.status;
  });
});

await page.screenshot({ path: `${OUT}/hero-crop.png`, clip: { x: 100, y: 150, width: 900, height: 620 } });

await step('navScroll', async () => {
  await page.getByRole('button', { name: 'Projects', exact: true }).first().click();
  await page.waitForTimeout(1400);
  report.checks.scrolledToProjects = await page.evaluate(() => window.scrollY > 500);
});

await step('aboutSectionShot', async () => {
  await page.evaluate(() => document.getElementById('about')?.scrollIntoView());
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/about.png` });
});

await step('skillsShot', async () => {
  await page.evaluate(() => document.getElementById('skills')?.scrollIntoView());
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/skills.png` });
});

await step('projectsShot', async () => {
  await page.evaluate(() => document.getElementById('projects')?.scrollIntoView());
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/projects.png` });
});

await step('servicesShot', async () => {
  await page.evaluate(() => document.getElementById('services')?.scrollIntoView());
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/services.png` });
});

await step('contactSectionShot', async () => {
  await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/contact.png` });
});

// ---------- Project page ----------
await step('projectPage', async () => {
  await page.goto(`${BASE}/projects/healthlens`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600);
  await page.screenshot({ path: `${OUT}/project-healthlens.png`, fullPage: true });
  report.checks.projectTitle = await page.locator('h1').first().innerText();
});

// ---------- Contact form ----------
await step('contactForm', async () => {
  await page.goto(`${BASE}/#contact`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1800);
  await page.fill('#contact-name', 'Test Recruiter');
  await page.fill('#contact-email', 'recruiter@example.com');
  await page.fill('#contact-message', 'Testing the contact form from the automated verification run.');
  await page.getByRole('button', { name: 'Send message' }).click();
  await page.waitForTimeout(1400);
  report.checks.contactSuccess = await page.getByText('Message received.').isVisible();
  await page.screenshot({ path: `${OUT}/contact-success.png` });
});

// ---------- Inquiry form ----------
await step('inquiryForm', async () => {
  await page.goto(`${BASE}/#inquiry`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600);
  await page.fill('#inq-name', 'Test Client');
  await page.fill('#inq-email', 'client@example.com');
  await page.selectOption('#inq-service', { label: 'RAG Application Development' });
  await page.fill('#inq-message', 'We need a retrieval system over our internal product documentation.');
  await page.getByRole('button', { name: 'Send project inquiry' }).click();
  await page.waitForTimeout(1400);
  report.checks.inquirySuccess = await page.getByText('Project brief received.').isVisible();
});

// ---------- Admin ----------
await step('adminLogin', async () => {
  await page.goto(`${BASE}/admin`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/admin-login.png` });
  await page.fill('#admin-password', 'wrong-password');
  await page.getByRole('button', { name: 'Unlock dashboard' }).click();
  await page.waitForTimeout(400);
  report.checks.adminRejectsWrongPassword = await page.getByText('That password does not match').isVisible();
  await page.fill('#admin-password', 'vg-admin-2026');
  await page.getByRole('button', { name: 'Unlock dashboard' }).click();
  await page.waitForTimeout(1000);
  report.checks.adminOverviewVisible = await page.getByText('Recent inquiries').isVisible();
  await page.screenshot({ path: `${OUT}/admin-overview.png` });
});

await step('adminInquiries', async () => {
  await page.locator('aside button', { hasText: 'Inquiries' }).first().click();
  await page.waitForTimeout(500);
  report.checks.adminInquiryCount = await page.locator('main article').count();
  await page.screenshot({ path: `${OUT}/admin-inquiries.png` });
});

await step('adminProjects', async () => {
  await page.locator('aside button', { hasText: 'Projects' }).first().click();
  await page.waitForTimeout(400);
  report.checks.adminProjectRows = await page.locator('main h2').count();
  await page.screenshot({ path: `${OUT}/admin-projects.png` });
  await page.getByRole('button', { name: 'Edit' }).first().click();
  await page.waitForTimeout(600);
  report.checks.projectEditorOpen = await page.getByText('Architecture', { exact: true }).isVisible();
  await page.screenshot({ path: `${OUT}/admin-project-editor.png` });
  await page.getByRole('button', { name: 'Cancel' }).first().click();
});

await step('adminSettings', async () => {
  await page.locator('aside button', { hasText: 'Settings' }).first().click();
  await page.waitForTimeout(500);
  report.checks.settingsPanel = await page.getByText('Profile photo').isVisible();
  await page.screenshot({ path: `${OUT}/admin-settings.png` });
});

await step('notFound', async () => {
  await page.goto(`${BASE}/does-not-exist`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  report.checks.notFound = await page.getByText('This page went off-pipeline.').isVisible();
});

await desktop.close();

// ---------- Mobile ----------
const { context: mobile, page: mobilePage } = await newPage({ width: 390, height: 844 }, true);
await step('mobileHome', async () => {
  await mobilePage.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2800);
  report.checks.mobileOverflowX = await mobilePage.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  await mobilePage.screenshot({ path: `${OUT}/home-mobile.png` });
  await mobilePage.screenshot({ path: `${OUT}/home-mobile-full.png`, fullPage: true });
});

await step('mobileMenu', async () => {
  await mobilePage.getByRole('button', { name: 'Open navigation menu' }).click();
  await mobilePage.waitForTimeout(700);
  report.checks.mobileMenuOpen = await mobilePage
    .getByRole('button', { name: 'Close navigation menu' })
    .isVisible();
  await mobilePage.screenshot({ path: `${OUT}/mobile-menu.png` });
  await mobilePage.locator('nav[aria-label="Mobile"] button', { hasText: 'Projects' }).click();
  await mobilePage.waitForTimeout(1400);
  report.checks.mobileMenuClosed = !(await mobilePage
    .getByRole('button', { name: 'Close navigation menu' })
    .isVisible()
    .catch(() => false));
  report.checks.mobileScrolled = await mobilePage.evaluate(() => window.scrollY > 400);
  await mobilePage.screenshot({ path: `${OUT}/mobile-after-nav.png` });
});

await step('mobileProject', async () => {
  await mobilePage.goto(`${BASE}/projects/transaction-risk-investigation`, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1400);
  await mobilePage.screenshot({ path: `${OUT}/project-mobile.png`, fullPage: true });
});

await step('mobileAdmin', async () => {
  await mobilePage.goto(`${BASE}/admin`, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(700);
  await mobilePage.screenshot({ path: `${OUT}/admin-mobile.png` });
});

await mobile.close();
await browser.close();

fs.writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
