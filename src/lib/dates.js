export function formatMonth(value) {
  const [year, month] = value.split('-').map(Number)
  return new Date(year, month - 1).toLocaleString('en', { month: 'short', year: 'numeric' })
}

export function formatPeriod(start, end) {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : 'Present'}`
}