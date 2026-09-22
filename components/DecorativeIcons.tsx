export function SeedIcon() {
  return <svg className="seed-icon" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 27V15" /><path d="M16 20C10 20 7 17 7 12c5 0 9 3 9 8Z" /><path d="M16 17c0-5 3-8 9-9 0 6-3 9-9 9Z" /></svg>;
}

export function SmallBloom() {
  return <svg className="small-bloom" viewBox="0 0 34 34" aria-hidden="true"><g>{[0,60,120,180,240,300].map((angle) => <ellipse key={angle} cx="17" cy="8" rx="5" ry="8" transform={`rotate(${angle} 17 17)`} />)}</g><circle cx="17" cy="17" r="5" /></svg>;
}
