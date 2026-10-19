import { Link } from "react-router-dom";
import { ArrowRight, Code, ExternalLink } from "lucide-react";
import Chip from "../ui/Chip.jsx";
import StatusDot from "../ui/StatusDot.jsx";
import GeneratedCover from "./GeneratedCover.jsx";
import BrowserFrame from "./BrowserFrame.jsx";
import { asset } from "../../lib/assets.js";
import {
  categoryLabels,
  getProjectLink,
  statusTone,
} from "../../lib/projects.js";
import "./ProjectCard.css";

function StackChips({ stack, max }) {
  if (!stack?.length) return null;
  const shown = stack.slice(0, max);
  const extra = stack.length - shown.length;

  return (
    <ul className="card__chips">
      {shown.map((item) => (
        <li key={item}>
          <Chip>{item}</Chip>
        </li>
      ))}
      {extra > 0 && (
        <li>
          <Chip>+{extra}</Chip>
        </li>
      )}
    </ul>
  );
}

function ProjectCard({ project, variant = "default" }) {
  const {
    slug,
    title,
    tagline,
    category,
    year,
    status,
    type,
    cover,
    coverStyle,
    stack,
    metrics = [],
    links = {},
    caseStudy,
  } = project;
  const link = getProjectLink(project);

  let titleNode = title;
  if (link?.to) {
    titleNode = (
      <Link to={link.to} className="card__link">
        {title}
      </Link>
    );
  } else if (link?.href) {
    titleNode = (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="card__link"
      >
        {title}
      </a>
    );
  }

  if (variant === "compact") {
    return (
      <article className="card card--compact">
        <h3 className="card__title">{titleNode}</h3>
        <span className="label">
          {[type, year].filter(Boolean).join(" · ")}
        </span>
        <StackChips stack={stack} max={3} />
      </article>
    );
  }

  const coverSrc = cover ? asset(cover) : null;
  const meta = [categoryLabels[category] ?? category, year, status]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className={`card card--${variant}`}>
      <div className="card__cover">
        {coverSrc && coverStyle === "browser" ? (
          <BrowserFrame src={coverSrc} url={links.demo} />
        ) : coverSrc ? (
          <img src={coverSrc} alt="" width="1600" height="900" loading="lazy" />
        ) : (
          <GeneratedCover slug={slug} />
        )}
      </div>

      <div className="card__body">
        <p className="label card__meta">
          <StatusDot tone={statusTone(status)} /> {meta}
        </p>
        <h3 className="card__title">{titleNode}</h3>
        {tagline && <p className="card__tagline">{tagline}</p>}

        {metrics.length > 0 && (
          <dl className="card__metrics">
            {metrics.slice(0, 2).map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <StackChips stack={stack} max={4} />

        {(links.github || links.demo || caseStudy) && (
          <div className="card__footer">
            <div className="card__icons">
              {links.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Source code on GitHub"
                >
                  <Code size={18} strokeWidth={1.5} /> Code
                </a>
              )}
              {links.demo && (
                <a
                  href={links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live demo"
                >
                  <ExternalLink size={18} strokeWidth={1.5} /> Demo
                </a>
              )}
              {links.demo && (
                <span className="label card__live">
                  <StatusDot /> Live
                </span>
              )}
            </div>
            {caseStudy && (
              <span className="card__cta" aria-hidden="true">
                Case study <ArrowRight size={16} strokeWidth={1.5} />
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
