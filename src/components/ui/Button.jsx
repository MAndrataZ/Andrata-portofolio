import { Link } from 'react-router-dom'
import './Button.css'

function Button({ variant = 'primary', to, href, external, className = '', children, ...rest }) {
  const cls = `btn btn--${variant} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    const extra = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <a href={href} className={cls} {...extra} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  )
}

export default Button