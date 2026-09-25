import React, { useMemo, useState } from 'react';
import { Nav, BookCard, Chip, SearchBar, RatingRow, CoverSmall } from '../components/ui.jsx';
import { BOOKS, CATEGORIES, BORROW_META, USER } from '../data/books.js';
import { useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom';

// Auth: simple guest-is-default. Protected routes check localStorage key 'libra_authed'
function useAuth() {
  const authed = typeof window !== 'undefined' && window.localStorage.getItem('libra_authed') === '1';
  return authed;
}
export function useAuthActions() {
  const nav = useNavigate();
  const location = useLocation();
  function signIn(returnTo) {
    if (typeof window !== 'undefined') window.localStorage.setItem('libra_authed', '1');
    if (returnTo) nav(returnTo, { replace: true });
    else nav('/', { replace: true });
  }
  function signOut() {
    if (typeof window !== 'undefined') window.localStorage.removeItem('libra_authed');
    nav('/', { replace: true });
  }
  // build login url preserving intent
  function loginUrl(intent) {
    if (intent) return `/login?next=${encodeURIComponent(intent)}`;
    return '/login';
  }
  return { signIn, signOut, loginUrl, authed: useAuth() };
}

export function Home() {
  const navigate = useNavigate();
  const authed = useAuth();
  const [q, setQ] = useState('');
  function onSearch(v) {
    navigate(`/discover?q=${encodeURIComponent(v)}`);
  }
  const recommended = BOOKS.slice(0, 5);
  const trending = BOOKS.slice(5, 10);
  return (
    <div className="canvas">
      <Nav active="home" guest={!authed} />
      <div className="container" style={{ paddingTop: 8 }}>
        {/* Hero */}
        <section className="hero">
          <h1>A library that reads like a product.</h1>
          <p>Discover. Borrow. Keep track — without the paperwork.</p>
          <SearchBar value={q} onChange={setQ} onSubmit={onSearch} />
        </section>

        {/* Personal strip — authenticated only */}
        {authed && (
          <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', marginBottom: 24 }}>
            <div style={{ fontSize: 13, color: '#111' }}><strong>Current loan:</strong> Clean Code — Due 08 Oct 2026</div>
            <a href="/my-loans" className="btn-primary" style={{ height: 32, padding: '0 14px' }}>View</a>
          </div>
        )}

        {/* Recommended */}
        <section style={{ marginTop: 8 }}>
          <div className="section-head">
            <div className="section-title">{authed ? 'Recommended for you' : 'Recommended'}</div>
            <a href="/discover" className="view-all">View all →</a>
          </div>
          <div className="grid-home-rail">
            {recommended.map(b => <BookCard key={b.id} book={b} onClick={() => navigate(`/book/${b.id}`)} />)}
          </div>
        </section>

        {/* Trending */}
        <section style={{ marginTop: 32 }}>
          <div className="section-head">
            <div className="section-title">Trending</div>
            <a href="/discover" className="view-all">View all →</a>
          </div>
          <div className="grid-home-rail">
            {trending.map(b => <BookCard key={b.id} book={b} onClick={() => navigate(`/book/${b.id}`)} />)}
          </div>
        </section>

        {/* Categories */}
        <section style={{ marginTop: 32 }}>
          <div className="section-title" style={{ marginBottom: 12 }}>Browse by category</div>
          <div className="chip-row">
            {['Programming', 'Design', 'Science', 'Business', 'Fiction', 'History'].map((c, i) => (
              <Chip key={c} label={c} selected={i === 0} onClick={() => navigate(`/discover?category=${encodeURIComponent(c)}`)} />
            ))}
          </div>
        </section>

        <div className="footer-tiny">© LIBRA · Built for students.</div>
      </div>
    </div>
  );
}

export function Discover() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const authed = useAuth();
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'All';
  const [localQ, setLocalQ] = useState(q);
  const filtered = useMemo(() => {
    let list = BOOKS;
    if (category && category !== 'All') list = list.filter(b => b.category === category);
    if (q) {
      const qq = q.toLowerCase();
      list = list.filter(b => b.title.toLowerCase().includes(qq) || b.author.toLowerCase().includes(qq));
    }
    return list;
  }, [q, category]);
  function applySearch(v) {
    const next = new URLSearchParams(searchParams);
    if (v) next.set('q', v); else next.delete('q');
    setSearchParams(next);
  }
  function setCategory(c) {
    const next = new URLSearchParams(searchParams);
    if (c === 'All') next.delete('category'); else next.set('category', c);
    setSearchParams(next);
  }
  return (
    <div className="canvas">
      <Nav active="discover" guest={!authed} />
      <div className="container" style={{ paddingTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 className="page-title">Discover</h1>
          <div style={{ fontSize: 14, color: 'var(--sec)' }}>{filtered.length} {q ? `results for "${q}"` : 'books'}</div>
        </div>

        <div style={{ marginTop: 16 }}>
          <SearchBar value={localQ} onChange={setLocalQ} onSubmit={applySearch} />
        </div>

        <div className="chip-row" style={{ marginTop: 16 }}>
          {CATEGORIES.map(c => (
            <Chip key={c} label={c} selected={c === category} onClick={() => setCategory(c)} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="panel" style={{ padding: '40px 24px', textAlign: 'center', marginTop: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#111' }}>No books match &quot;{q}&quot;</div>
            <div style={{ fontSize: 13, color: 'var(--sec)', marginTop: 6 }}>Try another keyword or clear filters.</div>
            <button className="btn-primary" style={{ marginTop: 16, height: 36 }} onClick={() => { setLocalQ(''); setSearchParams(new URLSearchParams()); }}>Clear filters</button>
          </div>
        ) : (
          <div className="grid-4" style={{ marginTop: 16 }}>
            {filtered.map(b => <BookCard key={b.id} book={b} onClick={() => navigate(`/book/${b.id}`)} />)}
          </div>
        )}

        {filtered.length > 0 && (
          <div style={{ textAlign: 'center', fontSize: 12, color: '#999', padding: '20px 0 24px' }}>Showing {filtered.length} of 128</div>
        )}
      </div>
    </div>
  );
}

export function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authed = useAuth();
  const book = BOOKS.find(b => b.id === id) || BOOKS[0];
  function onBorrow() {
    if (!authed) {
      navigate(`/login?next=${encodeURIComponent(`/borrow/${book.id}`)}&context=borrow&book=${encodeURIComponent(book.id)}`);
    } else {
      navigate(`/borrow/${book.id}`);
    }
  }
  return (
    <div className="canvas">
      <Nav guest={!authed} />
      <div className="container" style={{ paddingTop: 8 }}>
        <button className="back-link" onClick={() => navigate('/discover')}>← Back to discover</button>

        <div style={{ display: 'flex', gap: 64, marginTop: 16, alignItems: 'flex-start' }}>
          {/* Left cover */}
          <div style={{ width: 480, flex: '0 0 480px' }}>
            <div style={{ width: 480, height: 640, background: 'var(--accent-wash)', border: '1px solid var(--accent-border)', borderRadius: 12, display: 'grid', placeItems: 'center', textAlign: 'center', padding: 40 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--accent)' }}>{book.coverTitle}</div>
                <div style={{ fontSize: 13, color: 'var(--sec)', marginTop: 8 }}>{book.coverAuthor}</div>
                {book.coverSub && <div style={{ fontSize: 11, color: '#999', marginTop: 6 }}>{book.coverSub}</div>}
              </div>
            </div>
          </div>

          {/* Right */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.1, color: 'var(--text)' }}>{book.title}</div>
            <div style={{ fontSize: 16, color: '#444' }}>{book.author}</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 2 }}>
              <span className="badge">{book.category}</span>
              <span className="availability"><span className="dot" /> Available</span>
            </div>
            <RatingRow book={book} />
            <div style={{ fontSize: 15, color: 'var(--body)', lineHeight: 1.6, marginTop: 6 }}>
              {book.description}
            </div>

            <button
              className="btn-primary"
              style={{ height: 48, borderRadius: 10, fontSize: 16, marginTop: 8, width: '100%' }}
              onClick={onBorrow}
            >
              Borrow this book
            </button>
            <div style={{ fontSize: 12, color: 'var(--sec)', textAlign: 'center' }}>Returns in 14 days · Pickup at Library</div>

            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
              <div style={{ fontSize: 13, color: 'var(--sec)' }}>Publisher: Prentice Hall</div>
              <div style={{ fontSize: 13, color: 'var(--sec)' }}>ISBN: 978-0132350884</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const next = searchParams.get('next') || '/my-loans';
  const ctx = searchParams.get('context'); // borrow | myloans
  const bookId = searchParams.get('book');
  const book = BOOKS.find(b => b.id === bookId) || BOOKS[0];
  const [email, setEmail] = useState('shapiere@student.ac.id');
  const [pass, setPass] = useState('••••••••');
  const isBorrow = ctx === 'borrow' || next.startsWith('/borrow/');
  const isAuthedNow = typeof window !== 'undefined' && window.localStorage.getItem('libra_authed') === '1';
  function submit(e) {
    e.preventDefault();
    if (typeof window !== 'undefined') window.localStorage.setItem('libra_authed', '1');
    navigate(next, { replace: true });
  }
  function goBack() {
    if (isBorrow) navigate(`/book/${book.id}`);
    else navigate(-1);
  }
  return (
    <div className="canvas" style={{ background: 'var(--muted)' }}>
      <Nav guest={!isAuthedNow} />
      <div style={{ padding: '16px 80px 0' }}>
        <button className="back-link" onClick={goBack}>← Back</button>
      </div>
      <div style={{ display: 'grid', placeItems: 'center', padding: '24px 0 40px' }}>
        <div style={{ width: 400 }}>
          {/* Banner */}
          {isBorrow ? (
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 16px', marginBottom: 16 }}>
              <div style={{ width: 40, height: 56, borderRadius: 6, background: 'var(--accent-wash)', border: '1px solid var(--accent-border)', display: 'grid', placeItems: 'center', fontSize: 8, fontWeight: 700, color: 'var(--accent)', flex: '0 0 40px' }}>CC</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Sign in to borrow “Clean Code”</div>
                <div style={{ fontSize: 11, color: 'var(--sec)' }}>{book.author} · {book.category}</div>
              </div>
            </div>
          ) : next.includes('my-loans') ? (
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 16px', marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--muted)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center', fontSize: 14 }}>📚</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Sign in to view your loans</div>
                <div style={{ fontSize: 11, color: 'var(--sec)' }}>Track your borrowing and history</div>
              </div>
            </div>
          ) : null}

          {/* Card */}
          <form onSubmit={submit} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>Sign in</div>
            <div style={{ fontSize: 13, color: 'var(--sec)' }}>{isBorrow ? 'You need an account to borrow this book.' : 'Access your loans and history.'}</div>
            {isBorrow && (
              <div style={{ background: 'var(--accent-wash)', border: '1px solid var(--accent-border)', borderRadius: 8, padding: '8px 12px', fontSize: 11, color: 'var(--accent)', lineHeight: 1.5 }}>
                Your borrowing intent is saved — you’ll return to borrowing Clean Code.
              </div>
            )}

            <label className="field">
              <span className="label">Email</span>
              <input className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="student@university.ac.id" />
            </label>
            <label className="field">
              <span className="label">Password</span>
              <input className="input" value={pass} onChange={e => setPass(e.target.value)} type="text" placeholder="••••••••" />
            </label>

            <button type="submit" className="btn-primary btn-primary-lg" style={{ marginTop: 6 }}>Sign in</button>
            <button type="button" onClick={goBack} style={{ background: 'none', border: 'none', fontSize: 13, color: 'var(--sec)', textAlign: 'center', padding: 4 }}>Back · Continue browsing</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function Borrow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authed = useAuth();
  const book = BOOKS.find(b => b.id === id) || BOOKS[0];
  const [returnDate, setReturnDate] = useState(BORROW_META.returnDate);
  const [pickup, setPickup] = useState(BORROW_META.pickup);
  React.useEffect(() => {
    if (!authed) navigate(`/login?next=${encodeURIComponent(`/borrow/${book.id}`)}&context=borrow&book=${book.id}`, { replace: true });
  }, [authed, book.id, navigate]);

  if (!authed) return null;

  return (
    <div className="canvas" style={{ background: 'var(--muted)' }}>
      <Nav active="" guest={false} />
      <div style={{ padding: '16px 80px 0' }}>
        <button className="back-link" onClick={() => navigate(`/book/${book.id}`)}>← Back</button>
      </div>
      <div style={{ display: 'grid', placeItems: 'center', padding: '12px 0 24px' }}>
        <div style={{ width: 640 }}>
          <h1 className="page-title" style={{ textAlign: 'center' }}>Borrow</h1>
          <div className="page-subtitle" style={{ textAlign: 'center' }}>Review your borrowing details</div>

          <div className="panel" style={{ padding: 24, marginTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Book row */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', background: 'var(--muted)', borderRadius: 8, padding: 12 }}>
              <CoverSmall book={book} size={56} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{book.title}</div>
                <div style={{ fontSize: 12, color: 'var(--sec)' }}>{book.author} · {book.category}</div>
                <div style={{ marginTop: 4 }}><span className="availability" style={{ fontSize: 11 }}><span className="dot" /> Available</span></div>
              </div>
            </div>

            {/* Borrower */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, border: '1px solid var(--border)', borderRadius: 8, padding: '10px 12px', background: '#fff' }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--sec)' }}>Borrower:</span>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{USER.name}</span>
              <span style={{ fontSize: 12, color: '#999' }}>{USER.studentId} · Student</span>
            </div>

            {/* Borrow date read-only */}
            <label className="field">
              <span className="label">Borrow date</span>
              <div className="input readonly" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 44, padding: '0 12px', border: '1px solid var(--border)', borderRadius: 8, background: 'var(--muted)' }}>
                <span style={{ fontSize: 14, color: 'var(--body)' }}>{BORROW_META.borrowDate}</span>
                <span style={{ fontSize: 11, color: '#999' }}>Today · set by the library</span>
              </div>
            </label>

            <label className="field">
              <span className="label">Return date</span>
              <div style={{ position: 'relative', display: 'flex' }}>
                <input className="input" value={returnDate} onChange={e => setReturnDate(e.target.value)} />
                <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#999' }}>📅</span>
              </div>
              <div className="helper">Loan period: 14 days · Please return by the due date</div>
            </label>

            <label className="field">
              <span className="label">Pickup method</span>
              <div style={{ position: 'relative', display: 'flex' }}>
                <input className="input" value={pickup} onChange={e => setPickup(e.target.value)} />
                <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#999' }}>▾</span>
              </div>
            </label>

            <div style={{ fontSize: 11, color: 'var(--hint)' }}>You’ll confirm details on the next step.</div>

            <button className="btn-primary" style={{ height: 48, borderRadius: 10, fontSize: 15, width: '100%' }} onClick={() => navigate(`/confirmation/${book.id}`, { state: { returnDate, pickup } })}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Confirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const book = BOOKS.find(b => b.id === id) || BOOKS[0];
  const returnDate = location.state?.returnDate || BORROW_META.returnDate;
  const pickup = location.state?.pickup || BORROW_META.pickup;
  return (
    <div className="canvas" style={{ background: 'var(--muted)' }}>
      <Nav guest={false} />
      <div style={{ padding: '16px 80px 0' }}>
        <button className="back-link" onClick={() => navigate(`/borrow/${id}`, { replace: true })}>← Back</button>
      </div>
      <div style={{ display: 'grid', placeItems: 'center', padding: '12px 0 24px' }}>
        <div style={{ width: 640, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <h1 className="page-title">Confirm borrowing</h1>
          <div className="page-subtitle">Check your details before confirming</div>

          <div className="panel" style={{ width: 640, padding: 24, marginTop: 14, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* Book */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', paddingBottom: 12 }}>
              <CoverSmall book={book} size={56} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{book.title}</div>
                <div style={{ fontSize: 12, color: 'var(--sec)' }}>{book.author} · {book.category} · Available</div>
              </div>
            </div>
            <Divider />
            <Block label="Borrower" value={USER.name} />
            <Divider />
            <Block label="Borrow date" value={`${BORROW_META.borrowDate} · Today`} />
            <Divider />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#999' }}>Return date</div>
                <div style={{ fontSize: 14, color: 'var(--text)', marginTop: 2 }}>{returnDate}</div>
              </div>
              <span className="pill">14 days</span>
            </div>
            <Divider />
            <Block label="Pickup" value={pickup} />
            <div style={{ fontSize: 11, color: 'var(--hint)', marginTop: 12 }}>By confirming, you agree to return by the due date.</div>

            <button
              className="btn-primary"
              style={{ height: 48, borderRadius: 10, fontSize: 15, width: '100%', marginTop: 16 }}
              onClick={() => navigate(`/success/${book.id}`, { state: { returnDate, pickup } })}
            >
              Confirm borrowing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Block({ label, value }) {
  return (
    <div style={{ padding: '12px 0' }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: '#999' }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--text)', marginTop: 2 }}>{value}</div>
    </div>
  );
}
function Divider() {
  return <div style={{ height: 1, background: 'var(--border)' }} />;
}

export function Success() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const book = BOOKS.find(b => b.id === id) || BOOKS[0];
  const returnDate = location.state?.returnDate || BORROW_META.returnDate;
  const pickup = location.state?.pickup || BORROW_META.pickup;
  return (
    <div className="canvas" style={{ background: 'var(--muted)', minHeight: '100vh' }}>
      <Nav guest={false} />
      <div style={{ display: 'grid', placeItems: 'center', padding: '40px 0 24px' }}>
        <div className="panel" style={{ width: 560, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: 999, background: '#111', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 22 }}>✓</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>Borrowed!</div>
          <div style={{ fontSize: 15, color: 'var(--sec)' }}>Your borrowing is confirmed.</div>

          <div style={{ display: 'flex', gap: 16, alignItems: 'center', background: 'var(--muted)', borderRadius: 8, padding: 12, width: '100%', textAlign: 'left', marginTop: 4 }}>
            <CoverSmall book={book} size={56} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{book.title}</div>
              <div style={{ fontSize: 12, color: 'var(--sec)' }}>{book.author}</div>
              <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>Borrowed on {BORROW_META.borrowDate}</div>
            </div>
          </div>

          <div className="due-card" style={{ width: '100%' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#111' }}>Due: {returnDate}</div>
            <div style={{ fontSize: 12, color: 'var(--sec)', marginTop: 6 }}>14 days · {pickup}</div>
          </div>

          <div style={{ fontSize: 11, color: 'var(--hint)' }}>Pick up your book at the Library Pickup desk by the borrow date.</div>

          <button className="btn-primary" style={{ height: 48, borderRadius: 10, fontSize: 15, width: '100%', marginTop: 6 }} onClick={() => navigate('/my-loans')}>
            View my loans
          </button>
          {/* eslint-disable-next-line react/button-has-type */}
          <button style={{ background: 'none', border: 'none', fontSize: 13, color: 'var(--sec)', padding: 6 }} onClick={() => navigate('/')}>Back to home</button>
        </div>
      </div>
    </div>
  );
}

export function MyLoans() {
  const navigate = useNavigate();
  const authed = useAuth();
  const [tab, setTab] = useState('Active');
  if (!authed) {
    return (
      <div className="canvas">
        <Nav active="my-loans" guest />
        <div className="container" style={{ paddingTop: 24 }}>
          <h1 className="page-title">My loans</h1>
          <div style={{ display: 'grid', placeItems: 'center', padding: '60px 0' }}>
            <div className="panel" style={{ width: 480, padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: 999, background: 'var(--muted)', display: 'grid', placeItems: 'center', fontSize: 20, color: '#999', border: '1px solid var(--border)' }}>📚</div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Sign in to view your loans</div>
              <div style={{ fontSize: 13, color: 'var(--sec)', lineHeight: 1.5 }}>Track your current borrowing, due dates, and history in one place.</div>
              <button className="btn-primary" style={{ height: 44, borderRadius: 8, width: '100%', marginTop: 4 }} onClick={() => navigate('/login?next=%2Fmy-loans&context=myloans')}>Sign in</button>
              <button style={{ background: 'none', border: 'none', fontSize: 13, color: 'var(--sec)' }} onClick={() => navigate('/discover')}>Browse books</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const activeBook = BOOKS[0];
  return (
    <div className="canvas">
      <Nav active="my-loans" guest={false} />
      <div className="container" style={{ paddingTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 className="page-title">My loans</h1>
            <div style={{ fontSize: 14, color: 'var(--sec)', marginTop: 4 }}>1 active · 3 returned</div>
          </div>
          <div className="tabs" style={{ borderBottom: 'none', marginTop: 0 }}>
            <button className={'tab' + (tab === 'Active' ? ' active' : '')} onClick={() => setTab('Active')}>Active</button>
            <button className={'tab' + (tab === 'History' ? ' active' : '')} onClick={() => setTab('History')}>History</button>
          </div>
        </div>

        <div className="tabs" style={{ marginBottom: 16 }} />

        {tab === 'Active' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="loan-card" onClick={() => navigate(`/book/${activeBook.id}`)} style={{ cursor: 'pointer' }}>
              <div className="loan-cover">CC</div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{activeBook.title}</div>
                <div style={{ fontSize: 13, color: 'var(--sec)' }}>{activeBook.author} · {activeBook.category}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginTop: 2 }}>
                  <span className="badge badge-borrowed">Borrowed</span>
                  <span style={{ fontSize: 12, color: 'var(--sec)' }}>Borrowed {BORROW_META.borrowDate} · Due {BORROW_META.returnDate}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--accent)' }}>· 14 days</span>
                  <span style={{ fontSize: 12, color: '#999' }}>· Library Pickup</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 2 }}>Due in 14 days</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--sec)', whiteSpace: 'nowrap' }}>View details →</div>
            </div>

            <div style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>Borrowing history</div>
            <HistoryRows />
            <div style={{ fontSize: 12, color: '#999', paddingBottom: 24 }}>You have borrowed 4 books total.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <HistoryRows />
          </div>
        )}
      </div>
    </div>
  );
}

function HistoryRows() {
  const rows = [
    { title: 'The Design of Everyday Things', author: 'Don Norman', meta: 'Design · Returned 10 Sep 2026' },
    { title: 'Atomic Habits', author: 'James Clear', meta: 'Business · Returned 28 Aug 2026' },
    { title: 'Deep Work', author: 'Cal Newport', meta: 'Business · Returned 12 Aug 2026' },
  ];
  return (
    <>
      {rows.map(r => (
        <div key={r.title} className="panel" style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '12px 16px' }}>
          <div style={{ width: 48, height: 64, background: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, display: 'grid', placeItems: 'center', fontSize: 8, fontWeight: 700, color: '#999', flex: '0 0 48px' }}>{r.title.slice(0, 2).toUpperCase()}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{r.title}</div>
            <div style={{ fontSize: 12, color: '#999' }}>{r.author} · {r.meta}</div>
          </div>
          <span style={{ fontSize: 11, color: '#999' }}>Returned</span>
        </div>
      ))}
    </>
  );
}
