import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function loadEnv() {
  const values = {}
  try {
    for (const line of readFileSync(path.join(root, '.env'), 'utf8').split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*?)\s*$/)
      if (match) values[match[1]] = match[2].replace(/^['"]|['"]$/g, '')
    }
  } catch {
    // Fall back to process.env (e.g. in CI).
  }
  return values
}

const env = { ...loadEnv(), ...process.env }
const supabaseUrl = env.VITE_SUPABASE_URL
const anonKey = env.VITE_SUPABASE_ANON_KEY
const schema = env.VITE_DB_SCHEMA || 'bug_fix_automation_mock_prod'
const appUrl = env.APP_URL || 'http://localhost:5173'

if (!supabaseUrl || !anonKey) {
  throw new Error('Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY (check .env)')
}

async function rpc(name, params = {}) {
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ p_schema: schema, ...params }),
  })
  const text = await response.text()
  if (!response.ok) throw new Error(`${name} failed (${response.status}): ${text}`)
  return JSON.parse(text)
}

async function checkShortcut(browser, modifier, label) {
  const name = `BFA-301 ${label} ${Date.now()}`
  const before = await rpc('bfa_list_candidates')
  const page = await browser.newPage()

  try {
    await page.goto(`${appUrl}/login`)
    await page.fill('#email', 'qa@kudzu.test')
    await page.fill('#password', 'mock-pass')
    await page.getByRole('button', { name: 'Sign in' }).click()

    await page.goto(`${appUrl}/candidates/new`)
    await page.fill('#name', name)
    await page.fill('#cand-email', 'bfa301@kudzu.test')
    await page.fill('#cand-phone', '9000000001')
    await page.selectOption('#source', 'Referral')

    await page.keyboard.press(`${modifier}+s`)
    await page.waitForURL('**/candidates', { timeout: 15_000 })
  } finally {
    await page.close()
  }

  const after = await rpc('bfa_list_candidates')
  const created = after.filter((candidate) => candidate.name === name)
  assert.equal(
    created.length,
    1,
    `${label}: expected exactly ONE candidate per shortcut press, found ${created.length}`,
  )
  assert.equal(
    after.length - before.length,
    1,
    `${label}: expected the candidate count to grow by exactly one`,
  )
  console.log(`${label}: exactly one candidate created (${name})`)
}

const browser = await chromium.launch()
try {
  await checkShortcut(browser, 'Control', 'Ctrl+S')
  await checkShortcut(browser, 'Meta', 'Cmd+S')
  console.log('repro PASS')
} finally {
  await browser.close()
}
