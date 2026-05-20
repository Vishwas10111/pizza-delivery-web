#!/usr/bin/env node
/**
 * Slices Pizzeria - Diagnostic Script
 * Run this with:  node check.js
 * It will tell you exactly what is wrong.
 */

import http from 'http'
import { execSync } from 'child_process'

const BACKEND_URL = 'http://localhost:5000'
const FRONTEND_URL = 'http://localhost:3301'

const GREEN = '\x1b[32m'
const RED = '\x1b[31m'
const YELLOW = '\x1b[33m'
const CYAN = '\x1b[36m'
const RESET = '\x1b[0m'

function ok(msg) { console.log(`${GREEN}✅ ${msg}${RESET}`) }
function fail(msg) { console.log(`${RED}❌ ${msg}${RESET}`) }
function warn(msg) { console.log(`${YELLOW}⚠️  ${msg}${RESET}`) }
function info(msg) { console.log(`${CYAN}ℹ️  ${msg}${RESET}`) }

function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}`, (res) => {
      resolve(true)
    })
    req.on('error', () => resolve(false))
    req.setTimeout(2000, () => { req.destroy(); resolve(false) })
  })
}

function checkUrl(url, path = '') {
  return new Promise((resolve) => {
    const fullUrl = url + path
    const req = http.get(fullUrl, (res) => {
      let data = ''
      res.on('data', (chunk) => data += chunk)
      res.on('end', () => {
        try { resolve({ ok: true, status: res.statusCode, body: JSON.parse(data) }) }
        catch { resolve({ ok: true, status: res.statusCode, body: data }) }
      })
    })
    req.on('error', (e) => resolve({ ok: false, error: e.message }))
    req.setTimeout(3000, () => { req.destroy(); resolve({ ok: false, error: 'timeout' }) })
  })
}

async function main() {
  console.log('\n' + '='.repeat(55))
  console.log('  🍕 Slices Pizzeria — Diagnostic Check')
  console.log('='.repeat(55) + '\n')

  // 1. Check Node version
  const nodeVersion = process.version
  const major = parseInt(nodeVersion.slice(1))
  if (major >= 18) ok(`Node.js ${nodeVersion}`)
  else fail(`Node.js ${nodeVersion} — need v18+. Download from nodejs.org`)

  // 2. Check MongoDB running
  info('Checking MongoDB...')
  try {
    execSync('mongod --version', { stdio: 'pipe' })
    ok('MongoDB is installed')
  } catch {
    warn('Could not detect mongod — make sure MongoDB is installed and running')
  }

  // 3. Check backend running
  info('\nChecking backend (port 5000)...')
  const backendUp = await checkPort(5000)
  if (!backendUp) {
    fail('Backend is NOT running on port 5000')
    console.log(`\n  Fix: Open a terminal and run:`)
    console.log(`  ${CYAN}cd backend && npm install && npm run dev${RESET}\n`)
  } else {
    ok('Backend is running on port 5000')

    // Check health endpoint
    const health = await checkUrl(BACKEND_URL, '/api/health')
    if (health.ok && health.body?.status === 'OK') {
      ok(`Health check passed — DB: ${health.body.db}`)
      if (health.body.db !== 'connected') {
        fail('MongoDB is NOT connected!')
        console.log(`\n  Fix: Start MongoDB:`)
        console.log(`  ${CYAN}# macOS:   brew services start mongodb-community${RESET}`)
        console.log(`  ${CYAN}# Windows: net start MongoDB${RESET}`)
        console.log(`  ${CYAN}# Linux:   sudo systemctl start mongod${RESET}\n`)
      }
    } else {
      warn('Health endpoint returned unexpected response')
    }

    // Check auth routes exist
    const register = await checkUrl(BACKEND_URL, '/api/auth/register')
    if (register.status === 400 || register.status === 200 || register.status === 201) {
      ok('/api/auth/register route exists')
    } else if (register.status === 404) {
      fail('/api/auth/register route NOT FOUND — check routes/auth.js is imported in server.js')
    } else {
      ok(`/api/auth/register responded (${register.status})`)
    }
  }

  // 4. Check frontend running
  info('\nChecking frontend (port 3301)...')
  const frontendUp = await checkPort(3301)
  if (!frontendUp) {
    fail('Frontend is NOT running on port 3301')
    console.log(`\n  Fix: Open another terminal and run:`)
    console.log(`  ${CYAN}cd frontend && npm install && npm run dev${RESET}\n`)
  } else {
    ok('Frontend is running on port 3301')
  }

  // 5. Summary
  console.log('\n' + '='.repeat(55))
  if (backendUp && frontendUp) {
    ok('Everything looks good!')
    console.log(`\n  🌐 Website:     ${CYAN}http://localhost:3301${RESET}`)
    console.log(`  🔐 Admin panel: ${CYAN}http://localhost:3301/adminlogin${RESET}`)
    console.log(`  🔧 API health:  ${CYAN}http://localhost:5000/api/health${RESET}`)
    console.log(`\n  Admin: admin@slicespizzeria.com / admin123`)
    console.log(`  (Run "npm run seed" in backend if admin login fails)\n`)
  } else {
    fail('Some services are not running. Fix the issues above and try again.')
    console.log()
  }
}

main()
