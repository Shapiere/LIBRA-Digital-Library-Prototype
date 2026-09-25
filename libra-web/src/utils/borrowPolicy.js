/**
 * Borrow policy — LIBRA feature/borrow-flow
 * Source of truth for loan period, date math, and validation.
 * Used by Borrow / Confirmation / Success screens.
 */

export const LOAN_PERIOD_DAYS = 14;

/**
 * Get borrow + return dates.
 * @param {Date} [borrowDate] — default today (read-only per V2 R2)
 * @returns {{ borrowDate: Date, returnDate: Date, loanPeriod: string }}
 */
export function getBorrowDates(borrowDate = new Date()) {
  const ret = new Date(borrowDate);
  ret.setDate(ret.getDate() + LOAN_PERIOD_DAYS);
  return {
    borrowDate: new Date(borrowDate),
    returnDate: ret,
    loanPeriod: `${LOAN_PERIOD_DAYS} days`,
  };
}

/**
 * Validate borrow input (Return date + Pickup).
 * Borrow date is read-only — not validated here.
 * @param {{ returnDate: string|Date }} input
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateBorrow({ returnDate }) {
  if (!returnDate) return { valid: false, error: 'Return date is required.' };
  const d = new Date(returnDate);
  if (Number.isNaN(d.getTime())) return { valid: false, error: 'Return date is invalid.' };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const r = new Date(d);
  r.setHours(0, 0, 0, 0);
  if (r <= today) return { valid: false, error: 'Return date must be after today.' };
  const max = new Date(today);
  max.setDate(max.getDate() + 60);
  if (r > max) return { valid: false, error: 'Return date is too far (max 60 days).' };
  return { valid: true };
}

/** Guard: can this book be borrowed? */
export function canBorrow(book) {
  return Boolean(book && book.available !== false);
}
