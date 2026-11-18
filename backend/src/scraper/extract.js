import * as cheerio from 'cheerio'

const clean = (s) => (s || '').replace(/\s+/g, ' ').trim()

export function parsePrice(text) {
  if (!text) return null
  const m = text.replace(/,/g, '').match(/([\d.]+)\s*(cr|crore|lac|lakh|l|k)?/i)
  if (!m) return null
  let n = parseFloat(m[1])
  if (Number.isNaN(n)) return null
  const unit = (m[2] || '').toLowerCase()
  if (unit.startsWith('cr')) n *= 1e7
  else if (unit === 'lac' || unit === 'lakh' || unit === 'l') n *= 1e5
  else if (unit === 'k') n *= 1e3
  return Math.round(n)
}

export function parseArea(text) {
  if (!text) return null
  const m = text.replace(/,/g, '').match(/([\d.]+)/)
  return m ? parseFloat(m[1]) : null
}

const abs = (href, base) => {
  if (!href) return ''
  try {
    return new URL(href, base).toString()
  } catch {
    return ''
  }
}

function fromJsonLd($, pageUrl) {
  const out = []
  $('script[type="application/ld+json"]').each((_, el) => {
    let data
    try {
      data = JSON.parse($(el).text())
    } catch {
      return
    }
    const nodes = []
    const walk = (n) => {
      if (!n) return
      if (Array.isArray(n)) return n.forEach(walk)
      if (typeof n === 'object') {
        nodes.push(n)
        if (n['@graph']) walk(n['@graph'])
        if (n.itemListElement) walk(n.itemListElement)
        if (n.item) walk(n.item)
      }
    }
    walk(data)
    for (const n of nodes) {
      const type = [].concat(n['@type'] || []).join(' ')
      if (!/RealEstateListing|Product|Residence|House|Apartment|Offer|Place/i.test(type)) continue
      if (!n.name || !n.url) continue
      const offer = [].concat(n.offers || [])[0] || {}
      const seller = offer.seller || n.seller || n.broker || {}
      const img = [].concat(n.image || [])[0]
      out.push({
        title: clean(n.name),
        priceText: clean(String(offer.price ?? '')),
        price: offer.price ? Number(offer.price) || null : null,
        location: clean(n.address?.addressLocality || n.address?.streetAddress || ''),
        url: abs(n.url, pageUrl),
        image: abs(typeof img === 'object' ? img?.url : img, pageUrl),
        description: clean(n.description || ''),
        retailerName: clean(seller.name || ''),
        retailerPhone: clean(seller.telephone || ''),
      })
    }
  })
  return out
}

function fromSelectors($, source, pageUrl) {
  const s = source.selectors || {}
  if (!s.item) return []
  const text = ($c, sel) => (sel ? clean($c.find(sel).first().text()) : '')
  const out = []
  $(s.item).each((_, el) => {
    const $c = $(el)
    const link = s.link ? $c.find(s.link).first().attr('href') : $c.find('a').first().attr('href')
    const img = s.image ? $c.find(s.image).first() : $c.find('img').first()
    const priceText = text($c, s.price)
    const areaText = text($c, s.area)
    out.push({
      title: text($c, s.title),
      priceText,
      price: parsePrice(priceText),
      areaText,
      area: parseArea(areaText),
      location: text($c, s.location),
      url: abs(link, pageUrl),
      image: abs(img.attr('src') || img.attr('data-src'), pageUrl),
      retailerName: text($c, s.retailerName),
      retailerPhone: text($c, s.retailerPhone),
      retailerAgency: text($c, s.retailerAgency),
    })
  })
  return out
}

export function extractPage(html, source, pageUrl) {
  const $ = cheerio.load(html)
  let items = source.useJsonLd ? fromJsonLd($, pageUrl) : []
  if (!items.length) items = fromSelectors($, source, pageUrl)
  const nextHref = source.selectors?.nextPage ? $(source.selectors.nextPage).first().attr('href') : null
  return {
    items: items.filter((i) => i.title && i.url),
    next: nextHref ? abs(nextHref, pageUrl) : null,
  }
}
