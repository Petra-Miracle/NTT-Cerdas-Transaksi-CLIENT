const numberFormatter = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 })

// Intl's 'currency' style inserts a non-breaking space after "Rp" depending
// on ICU data version — format manually instead for a stable "RpX.XXX.XXX".
export function formatRupiah(value) {
  return `Rp${numberFormatter.format(value)}`
}

/**
 * Formats hours as "X jam" or "X,Y jam" (Indonesian decimal comma),
 * trimming a trailing ".0" so whole numbers stay clean.
 */
export function formatJam(value) {
  const rounded = Math.round(value * 10) / 10
  const label = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1).replace('.', ',')
  return `${label} jam`
}
