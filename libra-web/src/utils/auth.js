/**
 * Auth helpers — LIBRA feature/auth-myloans
 * Simple guest-is-default. Protected routes check localStorage key 'libra_authed'.
 * Wrapped so auth logic is not scattered in screens.jsx.
 */

export function isAuthed() {
  return typeof window !== 'undefined' && window.localStorage.getItem('libra_authed') === '1';
}

/** Persist sign-in; optionally redirect. Requires window. */
export function signIn(returnTo) {
  window.localStorage.setItem('libra_authed', '1');
  if (returnTo) window.location.assign(returnTo);
}

export function signOut() {
  window.localStorage.removeItem('libra_authed');
  // Back to home as guest
  window.location.assign('/');
}

/**
 * Build login URL preserving intent.
 * @param {string} intent — e.g. 'borrow'
 * @param {string} [bookId]
 * @param {string} [nextPath] — explicit return path
 */
export function loginUrl(intent, bookId, nextPath) {
  const params = new URLSearchParams();
  if (intent) params.set('context', intent);
  if (bookId) params.set('book', bookId);
  if (nextPath) params.set('next', nextPath);
  else if (bookId && intent === 'borrow') params.set('next', `/borrow/${bookId}`);
  const q = params.toString();
  return q ? `/login?${q}` : '/login';
}

/**
 * Gate helper — if not authed, return login URL; else return original path.
 * @param {string} nextPath
 * @param {string} [intent]
 * @param {string} [bookId]
 */
export function requireAuth(nextPath, intent, bookId) {
  if (isAuthed()) return nextPath;
  return loginUrl(intent || 'borrow', bookId, nextPath);
}
