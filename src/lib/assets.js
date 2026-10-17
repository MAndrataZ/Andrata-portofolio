const files = import.meta.glob('/src/assets/**/*.{png,jpg,jpeg,webp,svg,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export function asset(path) {
  return files[`/src/assets/${path}`] ?? null
}