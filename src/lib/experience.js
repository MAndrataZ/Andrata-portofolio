// Newest first; entries with no end date (current) come first.
export function sortNewest(list) {
  return [...list].sort(
    (a, b) => (b.end ?? '9999-12').localeCompare(a.end ?? '9999-12') || b.start.localeCompare(a.start)
  )
}