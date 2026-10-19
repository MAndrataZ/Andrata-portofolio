import './BrowserFrame.css'

function hostOf(url) {
  try {
    return new URL(url).host
  } catch {
    return ''
  }
}

function BrowserFrame({ src, url, alt = '', full = false }) {
  const host = url ? hostOf(url) : ''

  return (
    <div className={`browser${full ? ' browser--full' : ''}`}>
      <div className="browser__bar" aria-hidden="true">
        <span className="browser__dots">
          <i />
          <i />
          <i />
        </span>
        {host && <span className="browser__url">{host}</span>}
      </div>
      <div className="browser__view">
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </div>
    </div>
  )
}

export default BrowserFrame