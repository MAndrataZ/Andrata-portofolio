import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import './Lightbox.css'

function Lightbox({ item, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (item && !dialog.open) dialog.showModal()
    if (!item && dialog.open) dialog.close()
  }, [item])

  return (
    <dialog
      ref={ref}
      className="lightbox"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
    >
      {item && (
        <div className="lightbox__inner">
          <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close image">
            <X size={18} strokeWidth={1.5} />
          </button>
          <img src={item.src} alt={item.alt} />
          {item.alt && <p className="lightbox__caption">{item.alt}</p>}
        </div>
      )}
    </dialog>
  )
}

export default Lightbox