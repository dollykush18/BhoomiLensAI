import robotsParser from 'robots-parser'

const UA = () => `BhoomiLensBot/1.0 (+contact: ${process.env.SCRAPER_CONTACT || 'unset'})`

const robotsCache = new Map()
const lastHit = new Map()
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function getRobots(origin) {
  if (robotsCache.has(origin)) return robotsCache.get(origin)
  let robots
  try {
    const res = await fetch(`${origin}/robots.txt`, { headers: { 'User-Agent': UA() } })
    robots = robotsParser(`${origin}/robots.txt`, res.ok ? await res.text() : '')
  } catch {
    robots = robotsParser(`${origin}/robots.txt`, '')
  }
  robotsCache.set(origin, robots)
  return robots
}

// Polite fetch: honours robots.txt and rate-limits per host.
export async function politeFetch(url) {
  const { origin, host } = new URL(url)
  const robots = await getRobots(origin)
  if (robots.isAllowed(url, UA()) === false) {
    throw new Error(`Blocked by robots.txt: ${url}`)
  }
  const delay = Number(process.env.SCRAPER_DELAY_MS || 2500)
  const wait = (lastHit.get(host) || 0) + delay - Date.now()
  if (wait > 0) await sleep(wait)
  lastHit.set(host, Date.now())

  const res = await fetch(url, {
    headers: { 'User-Agent': UA(), Accept: 'text/html,application/xhtml+xml' },
    signal: AbortSignal.timeout(20000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.text()
}
