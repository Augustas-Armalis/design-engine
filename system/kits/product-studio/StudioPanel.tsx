// Product-studio kit: the React shells for in-app product UI in the affectUI / AlignUI style.
// Dependency-free (React only). Icons, buttons and menus come from the host as ReactNode, so the
// kit never imports a UI library. Class names are the ones in ./studio.css; import that file once.
// Evidence and numbers: knowledge/web/affectui-product-kit.md (AK-01..32). Guide: ./GUIDE.md.
import type { ReactNode } from 'react'

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ')

/* ------------------------------------------------------------------------------------------------
 * StudioTopbar: back tile, eyebrow over the screen title, status and actions on the right (AK-05).
 * --------------------------------------------------------------------------------------------- */
export function StudioTopbar({
  eyebrow,
  title,
  back,
  status,
  actions,
}: {
  /** Small line above the title: the flow or section name. */
  eyebrow: ReactNode
  /** Screen title (18/500, one line, ellipsis). Pass an <input className="studio-title-input"> to make it editable. */
  title: ReactNode
  /** Back tile. Rendered as a link when `href` is set, otherwise as a button. */
  back?: { label: string; icon: ReactNode; href?: string; onClick?: () => void }
  /** A StudioStatus for the whole screen (Saved, Generating, n of N approved). */
  status?: ReactNode
  /** Buttons, right-aligned, gap 8. Keep one button size in this region. */
  actions?: ReactNode
}) {
  return (
    <header className="studio-topbar">
      <div className="studio-topbar-title">
        {back &&
          (back.href ? (
            <a aria-label={back.label} className="studio-back" href={back.href} onClick={back.onClick} title={back.label}>
              {back.icon}
            </a>
          ) : (
            <button aria-label={back.label} className="studio-back" onClick={back.onClick} title={back.label} type="button">
              {back.icon}
            </button>
          ))}
        <div className="studio-title-text">
          <p className="studio-eyebrow">{eyebrow}</p>
          {typeof title === 'string' ? (
            <h1 className="studio-title" title={title}>
              {title}
            </h1>
          ) : (
            title
          )}
        </div>
      </div>
      {(status || actions) && (
        <div className="studio-actions">
          {status}
          {actions}
        </div>
      )}
    </header>
  )
}

/* ------------------------------------------------------------------------------------------------
 * StudioSteps: the step tray. Read-only by default; pass `onSelect` to let finished steps be revisited
 * (AK-07, AK-08).
 * --------------------------------------------------------------------------------------------- */
export type StudioStep = { label: string; caption?: string }

export function StudioSteps({
  label,
  steps,
  current,
  onSelect,
}: {
  /** Accessible name of the step navigation, e.g. "Video steps". */
  label: string
  steps: StudioStep[]
  /** Zero-based index of the current step. */
  current: number
  /** Called with a step index when a done step is clicked. Todo steps stay disabled. */
  onSelect?: (index: number) => void
}) {
  return (
    <nav aria-label={label} className="studio-steps">
      <ol className="studio-steps-list">
        {steps.map((step, index) => {
          const state = index < current ? 'done' : index === current ? 'current' : 'todo'
          const inner = (
            <>
              {state === 'current' && <span aria-hidden="true" className="studio-step-pill" />}
              <span aria-hidden="true" className="studio-step-index">
                {index + 1}
              </span>
              <span className="studio-step-text">
                <span className="studio-step-label" title={step.label}>
                  {step.label}
                </span>
                {step.caption && (
                  <span className="studio-step-caption" title={step.caption}>
                    {step.caption}
                  </span>
                )}
              </span>
            </>
          )
          return (
            <li key={`${index}-${step.label}`}>
              {onSelect ? (
                <button
                  aria-current={state === 'current' ? 'step' : undefined}
                  className="studio-step"
                  data-state={state}
                  disabled={state === 'todo'}
                  onClick={() => onSelect(index)}
                  type="button"
                >
                  {inner}
                </button>
              ) : (
                <div aria-current={state === 'current' ? 'step' : undefined} className="studio-step" data-state={state}>
                  {inner}
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/* ------------------------------------------------------------------------------------------------
 * StudioPanel: the one section grammar. Grey tray, title strip on the grey, one white card,
 * optional footer strip for secondary info and actions (AK-02..04).
 * --------------------------------------------------------------------------------------------- */
export function StudioPanel({
  title,
  icon,
  meta,
  action,
  footer,
  body = 'card',
  label,
  headingLevel = 2,
  children,
}: {
  title: ReactNode
  /** A plain 16px icon (secondary ink). Never an icon tile. */
  icon?: ReactNode
  /** Soft text after the title: a count, "n of N approved", a hint. */
  meta?: ReactNode
  /** Right side of the title strip: one ghost or secondary button, or a segmented control. */
  action?: ReactNode
  /** Footer strip on the tray: secondary info and secondary actions, never inside the card. */
  footer?: ReactNode
  /**
   * card  = white card with 16px padding (forms, text, single media)
   * flush = white card without padding (lists with full-bleed rows)
   * bare  = content straight on the tray (grids whose items are cards themselves)
   */
  body?: 'card' | 'flush' | 'bare'
  /** Accessible name when the visible title is not plain text. */
  label?: string
  headingLevel?: 2 | 3
  children?: ReactNode
}) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2'
  return (
    <section aria-label={label} className="studio-tray">
      <header className="studio-strip">
        {icon && (
          <span aria-hidden="true" className="studio-strip-icon">
            {icon}
          </span>
        )}
        <Heading className="studio-strip-title">{title}</Heading>
        {meta && <span className="studio-strip-meta">{meta}</span>}
        {action && <div className="studio-strip-action">{action}</div>}
      </header>
      {children !== undefined &&
        (body === 'bare' ? (
          <div className="studio-tray-body">{children}</div>
        ) : (
          <div className="studio-card" data-flush={body === 'flush' ? '' : undefined}>
            {children}
          </div>
        ))}
      {footer && <div className="studio-footer-strip">{footer}</div>}
    </section>
  )
}

/* ------------------------------------------------------------------------------------------------
 * StudioStatus: every status in the flow, from one closed vocabulary (AK-06, APR-03).
 * Extend the vocabulary here, in one place, never per screen.
 * --------------------------------------------------------------------------------------------- */
export type StudioStatusTone = 'neutral' | 'success' | 'error' | 'live'

export type StudioStatusLabel =
  | 'Approved'
  | 'Generating'
  | 'Making'
  | 'Ready to review'
  | 'Needs review'
  | 'Failed'
  | 'Saved'
  | 'Draft'
  | `${number} of ${number} approved`

const STATUS_TONE: Record<string, StudioStatusTone> = {
  Approved: 'success',
  Saved: 'success',
  Generating: 'live',
  Making: 'live',
  Failed: 'error',
  'Ready to review': 'neutral',
  'Needs review': 'neutral',
  Draft: 'neutral',
}

/** The tone a label carries by default. Counts ("3 of 8 approved") are neutral until n = N. */
export function studioStatusTone(label: StudioStatusLabel): StudioStatusTone {
  const fixed = STATUS_TONE[label]
  if (fixed) return fixed
  const count = /^(\d+) of (\d+) approved$/.exec(label)
  return count && count[1] === count[2] ? 'success' : 'neutral'
}

export function StudioStatus({
  label,
  tone,
  icon,
  className,
}: {
  label: StudioStatusLabel
  /** Override only when the state truly differs from the label's default tone. */
  tone?: StudioStatusTone
  /** Optional icon in place of the dot, for hosts whose accepted status grammar is an icon badge. */
  icon?: ReactNode
  className?: string
}) {
  const resolved = tone ?? studioStatusTone(label)
  return (
    <span className={cx('studio-status', className)} data-tone={resolved} role={resolved === 'live' ? 'status' : undefined}>
      {icon ?? <span aria-hidden="true" className="studio-status-dot" />}
      {label}
    </span>
  )
}

/* ------------------------------------------------------------------------------------------------
 * StudioMedia: a 3:4 (or 9:16) tile with a status chip slot, a pending blur and the generating sweep
 * (AK-12..14). Wrap it in a <button className="studio-tile"> to make it pickable.
 * --------------------------------------------------------------------------------------------- */
export function StudioMedia({
  src,
  alt,
  ratio = 'portrait',
  size,
  status,
  tag,
  pending = false,
  generating = false,
  selected = false,
  children,
}: {
  /** Image URL. Omit while nothing exists yet: the tile shows the tray fill. */
  src?: string
  alt: string
  /** portrait = 3:4 (galleries, library covers); tall = 9:16 (character views, the player). */
  ratio?: 'portrait' | 'tall'
  /** xs = 36px wide, sm = 48px wide; omit to fill the column. */
  size?: 'xs' | 'sm'
  /** A StudioStatus, placed top-left at 8px. */
  status?: ReactNode
  /** Bottom-left tag on a shade (duration, index), tabular. */
  tag?: ReactNode
  /** Blurs the (previous) image: something new is coming. */
  pending?: boolean
  /** Runs the sweep over the tile. The only loop allowed besides spinners; reduced motion stops it. */
  generating?: boolean
  /** 2px gap + 1.5px ring. Prefer aria-pressed on a wrapping .studio-tile button. */
  selected?: boolean
  /** Extra layers (a video, a play button). */
  children?: ReactNode
}) {
  return (
    <span
      aria-busy={generating || undefined}
      className="studio-media"
      data-pending={pending || generating ? '' : undefined}
      data-ratio={ratio === 'tall' ? 'tall' : undefined}
      data-selected={selected ? '' : undefined}
      data-size={size}
    >
      {src && <img alt={alt} decoding="async" draggable={false} loading="lazy" src={src} />}
      {children}
      {tag && <span aria-hidden="true" className="studio-media-shade" />}
      {tag && <span className="studio-media-tag">{tag}</span>}
      {generating && <span aria-hidden="true" className="studio-sweep" />}
      {status && <span className="studio-media-chip">{status}</span>}
    </span>
  )
}

/* ------------------------------------------------------------------------------------------------
 * StudioGrid: count-aware columns (min(items, 4), then 3 / 2 / 1 at 1100 / 860 / 520) or an
 * auto-fill grid for libraries (176), 9:16 views (150) and two-button tiles (200) (AK-18).
 * --------------------------------------------------------------------------------------------- */
export function StudioGrid({
  count,
  fill,
  label,
  children,
}: {
  /** Number of items; drives the column count when `fill` is not set. */
  count: number
  fill?: 'library' | 'tall' | 'tile'
  label?: string
  children: ReactNode
}) {
  return (
    <ul aria-label={label} className="studio-grid" data-count={fill ? undefined : Math.min(Math.max(count, 1), 4)} data-fill={fill}>
      {children}
    </ul>
  )
}

/* ------------------------------------------------------------------------------------------------
 * StudioFooter: the sticky pay / save bar. Context and price on the left, actions on the right;
 * it rests on the bottom edge of a short page and wraps on phones with the price visible
 * (AK-20, AK-21). Render it as the last child of the `.studio` page element.
 * --------------------------------------------------------------------------------------------- */
export function StudioFooter({
  context,
  price,
  actions,
}: {
  /** Where the user is or what will happen ("Step 3 of 5", "8 views"). */
  context?: ReactNode
  /**
   * The cost of the primary action. Pass items as an array; the first is emphasised
   * (e.g. ["120 credits", "about 4 min"]).
   */
  price?: ReactNode[]
  /** Ghost / secondary first, the primary last (rightmost). */
  actions: ReactNode
}) {
  return (
    <div className="studio-bar">
      <div className="studio-bar-side">
        {context}
        {price && price.length > 0 && (
          <span className="studio-cost">
            {price.map((item, index) => (
              <span key={index} style={{ display: 'contents' }}>
                {index > 0 && <span aria-hidden="true" className="studio-cost-divider" />}
                {index === 0 ? <strong>{item}</strong> : <span>{item}</span>}
              </span>
            ))}
          </span>
        )}
      </div>
      <div className="studio-actions">{actions}</div>
    </div>
  )
}
