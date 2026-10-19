import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Code, ExternalLink, FileText, Play } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import Chip from "../components/ui/Chip.jsx";
import StatusDot from "../components/ui/StatusDot.jsx";
import Lightbox from "../components/projects/Lightbox.jsx";
import BrowserFrame from "../components/projects/BrowserFrame.jsx";
import NotFound from "./NotFound.jsx";
import { projects } from "../data/projects.js";
import { asset } from "../lib/assets.js";
import { categoryLabels, statusTone } from "../lib/projects.js";
import "./ProjectDetail.css";

const linkTypes = [
  { key: "github", label: "GitHub", icon: Code },
  { key: "demo", label: "Live demo", icon: ExternalLink },
  { key: "video", label: "Video", icon: Play },
  { key: "paper", label: "Paper", icon: FileText },
];

function Paragraphs({ text }) {
  return text.split(/\n{2,}/).map((p, i) => <p key={i}>{p}</p>);
}

function jumpTo(id) {
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
}

function CaseStudy({ project }) {
  const cs = project.caseStudy;
  const {
    tldr = {},
    architecture,
    decisions = [],
    evaluation = {},
    gallery = [],
    extraSections = [],
  } = cs ?? {};
  const metrics = project.metrics ?? [];
  const links = linkTypes.filter((l) => project.links?.[l.key]);

  const archSrc = architecture?.image ? asset(architecture.image) : null;
  const coverSrc = project.cover ? asset(project.cover) : null;
  const tldrKeys = ["problem", "approach", "result"].filter((k) => tldr[k]);
  const decisionItems = decisions.filter(
    (d) => d.title && (d.why || d.alternative),
  );
  const rows = (evaluation.table ?? []).filter((r) => r.metric);
  const shots = gallery
    .map((g) => ({ src: asset(g.image), alt: g.alt }))
    .filter((g) => g.src);

  const [selected, setSelected] = useState(null);

  const sections = cs
    ? [
        tldrKeys.length > 0 && {
          id: "summary",
          label: "Summary",
          content: (
            <dl className="cs__tldr">
              {tldrKeys.map((k) => (
                <div key={k}>
                  <dt className="label">{k}</dt>
                  <dd>{tldr[k]}</dd>
                </div>
              ))}
            </dl>
          ),
        },
        coverSrc &&
          project.coverStyle === "browser" && {
            id: "preview",
            label: "Preview",
            content: (
              <BrowserFrame
                src={coverSrc}
                url={project.links?.demo}
                alt={`Home page of ${project.title}`}
                full
              />
            ),
          },
        metrics.length > 0 && {
          id: "metrics",
          label: "Key metrics",
          content: (
            <ul className="cs__metrics">
              {metrics.map((m) => (
                <li key={m.label}>
                  <span className="cs__metric-value">{m.value}</span>
                  <span className="label">{m.label}</span>
                </li>
              ))}
            </ul>
          ),
        },
        archSrc && {
          id: "architecture",
          label: "Architecture",
          content: (
            <figure className="cs__figure">
              <img
                src={archSrc}
                alt={architecture.caption || "Architecture diagram"}
                width="1600"
                height="900"
                loading="lazy"
              />
              {architecture.caption && (
                <figcaption>{architecture.caption}</figcaption>
              )}
            </figure>
          ),
        },
        (cs.problem || cs.data) && {
          id: "problem",
          label: "Problem and data",
          content: (
            <div className="cs__prose">
              {cs.problem && (
                <>
                  <p className="label">Problem</p>
                  <Paragraphs text={cs.problem} />
                </>
              )}
              {cs.data && (
                <>
                  <p className="label">Data</p>
                  <Paragraphs text={cs.data} />
                </>
              )}
            </div>
          ),
        },
        decisionItems.length > 0 && {
          id: "decisions",
          label: "Decisions and trade-offs",
          content: (
            <ol className="cs__decisions">
              {decisionItems.map((d) => (
                <li key={d.title} className="cs__decision">
                  <h3>{d.title}</h3>
                  {d.why && (
                    <div>
                      <span className="label">Why</span>
                      <p>{d.why}</p>
                    </div>
                  )}
                  {d.alternative && (
                    <div>
                      <span className="label">Alternative considered</span>
                      <p>{d.alternative}</p>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          ),
        },
        (evaluation.summary || rows.length > 0) && {
          id: "evaluation",
          label: "Evaluation",
          content: (
            <div className="cs__prose">
              {evaluation.summary && <Paragraphs text={evaluation.summary} />}
              {rows.length > 0 && (
                <div className="cs__table-wrap">
                  <table className="cs__table">
                    <caption className="sr-only">Evaluation results</caption>
                    <thead>
                      <tr>
                        <th scope="col">Metric</th>
                        <th scope="col">Value</th>
                        <th scope="col">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r) => (
                        <tr key={r.metric}>
                          <th scope="row">{r.metric}</th>
                          <td>{r.value}</td>
                          <td>{r.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ),
        },
        cs.limitations && {
          id: "limitations",
          label: "Limitations and failure cases",
          content: (
            <div className="cs__prose">
              <Paragraphs text={cs.limitations} />
            </div>
          ),
        },
        cs.next && {
          id: "next",
          label: "What I’d do next",
          content: (
            <div className="cs__prose">
              <Paragraphs text={cs.next} />
            </div>
          ),
        },
        shots.length > 0 && {
          id: "gallery",
          label: "Gallery",
          content: (
            <ul className="cs__gallery">
              {shots.map((s) => (
                <li key={s.src}>
                  <button
                    type="button"
                    onClick={() => setSelected(s)}
                    aria-label={`Enlarge image${s.alt ? `: ${s.alt}` : ""}`}
                  >
                    <img
                      src={s.src}
                      alt=""
                      width="1600"
                      height="900"
                      loading="lazy"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ),
        },
        ...extraSections
          .filter((e) => e.heading && e.body)
          .map((e, i) => ({
            id: `extra-${i}`,
            label: e.heading,
            content: (
              <div className="cs__prose">
                <Paragraphs text={e.body} />
              </div>
            ),
          })),
      ].filter(Boolean)
    : [];

  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = document.querySelectorAll(".cs__section");
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const withStudy = projects.filter((p) => p.caseStudy);
  const index = withStudy.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? withStudy[index - 1] : null;
  const next =
    index >= 0 && index < withStudy.length - 1 ? withStudy[index + 1] : null;

  const meta = [
    project.type,
    project.year,
    project.role,
    categoryLabels[project.category],
  ].filter(Boolean);
  const showToc = sections.length > 1;

  return (
    <div className="container page">
      <Link to="/projects" className="cs__back mono">
        <ArrowLeft size={16} strokeWidth={1.5} /> All projects
      </Link>

      <header className="cs__header">
        <h1 className="cs__title">{project.title}</h1>
        {project.tagline && <p className="cs__tagline">{project.tagline}</p>}

        <ul className="cs__chips">
          {meta.map((m) => (
            <li key={m}>
              <Chip>{m}</Chip>
            </li>
          ))}
          {project.status && (
            <li>
              <Chip>
                <StatusDot tone={statusTone(project.status)} /> {project.status}
              </Chip>
            </li>
          )}
        </ul>

        {project.stack?.length > 0 && (
          <ul className="cs__chips">
            {project.stack.map((s) => (
              <li key={s}>
                <Chip>{s}</Chip>
              </li>
            ))}
          </ul>
        )}

        {links.length > 0 && (
          <div className="cs__links">
            {links.map((l, i) => {
              const Icon = l.icon;
              return (
                <Button
                  key={l.key}
                  variant={i === 0 ? "primary" : "secondary"}
                  href={project.links[l.key]}
                  external
                >
                  <Icon size={18} strokeWidth={1.5} /> {l.label}
                </Button>
              );
            })}
          </div>
        )}
      </header>

      {sections.length === 0 ? (
        <p className="cs__empty">
          No detailed case study for this project yet.
        </p>
      ) : (
        <div className={`cs__layout${showToc ? " cs__layout--toc" : ""}`}>
          {showToc && (
            <nav className="cs__toc" aria-label="On this page">
              <p className="label">On this page</p>
              <ul>
                {sections.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      className={active === s.id ? "is-active" : undefined}
                      aria-current={active === s.id ? "true" : undefined}
                      onClick={() => jumpTo(s.id)}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="cs__content">
            {sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                className="cs__section"
                aria-labelledby={`${s.id}-title`}
              >
                <h2 id={`${s.id}-title`} className="cs__h2">
                  {s.label}
                </h2>
                {s.content}
              </section>
            ))}
          </div>
        </div>
      )}

      {(prev || next) && (
        <nav className="cs__pager" aria-label="More projects">
          {prev && (
            <Link to={`/projects/${prev.slug}`} className="cs__pager-link">
              <span className="label">← Previous</span>
              <span className="cs__pager-title">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link
              to={`/projects/${next.slug}`}
              className="cs__pager-link cs__pager-link--next"
            >
              <span className="label">Next →</span>
              <span className="cs__pager-title">{next.title}</span>
            </Link>
          )}
        </nav>
      )}

      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <NotFound />;
  return <CaseStudy key={project.slug} project={project} />;
}

export default ProjectDetail;
