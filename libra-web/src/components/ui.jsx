import React from 'react';

export function Nav({ active = 'home', guest = true }) {
  const links = [
    { id: 'home', label: 'Home', to: '/' },
    { id: 'discover', label: 'Discover', to: '/discover' },
    { id: 'my-loans', label: 'My Loans', to: '/my-loans' },
  ];
  return (
    <nav className="nav">
      <div className="nav-left">
        <a href="/" className="wordmark">LIBRA.</a>
        <div className="nav-links">
          {links.map(l => (
            <a key={l.id} href={l.to} className={'nav-link' + (active === l.id ? ' active' : '')}>{l.label}</a>
          ))}
        </div>
      </div>
      <div className="nav-right">
        {guest ? (
          <a href="/login" className="btn-ghost">Sign in</a>
        ) : (
          <a href="/" className="nav-user"><span className="avatar">S</span> Shapiere ▾</a>
        )}
      </div>
    </nav>
  );
}

export function BookCard({ book, onClick }) {
  const alt = book.id.length % 2 === 0;
  return (
    <div className="card" onClick={onClick}>
      <div className={'card-cover' + (alt ? ' alt' : '')}>
        <div>
          <div className={'card-cover-title' + (alt ? ' alt' : '')}>{book.coverTitle}</div>
          <div className="card-cover-author">{book.coverAuthor}</div>
          {book.coverSub && <div style={{ fontSize: 9, color: '#999', marginTop: 4 }}>{book.coverSub}</div>}
        </div>
      </div>
      <div className="card-body">
        <div className="card-title">{book.title}</div>
        <div className="card-author">{book.author}</div>
        <div className="card-meta">
          <span className="badge">{book.category}</span>
          <span className="availability"><span className="dot" /> Available</span>
        </div>
      </div>
    </div>
  );
}

export function Chip({ label, selected, onClick }) {
  return (
    <button className={'chip' + (selected ? ' selected' : '')} onClick={onClick}>{label}</button>
  );
}

export function SearchBar({ value, onChange, onSubmit, placeholder = 'Search titles, authors, or ISBN' }) {
  return (
    <form
      className="search-bar"
      onSubmit={e => { e.preventDefault(); onSubmit?.(value); }}
    >
      <input
        value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
      />
      {/* eslint-disable-next-line react/button-has-type */}
      <button type="submit" className="btn-primary">Search</button>
    </form>
  );
}

export function RatingRow({ book }) {
  return (
    <div style={{ fontSize: 12, color: '#666' }}>
      ★ {book.rating} ({book.ratingsCount}) · {book.pages} pages · {book.year} · {book.language}
    </div>
  );
}

export function CoverSmall({ book, size = 56 }) {
  const w = size, h = Math.round(size * 4 / 3);
  return (
    <div style={{ width: w, height: h, flex: `0 0 ${w}px`, borderRadius: 6, background: 'var(--accent-wash)', border: '1px solid var(--accent-border)', display: 'grid', placeItems: 'center', fontSize: Math.max(8, w / 7), fontWeight: 700, color: 'var(--accent)', textAlign: 'center', padding: 6 }}>
      {book.coverTitle.split(' ')[0]}
    </div>
  );
}
