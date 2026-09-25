export const BOOKS = [
  {
    id: 'clean-code',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Programming',
    rating: 4.8,
    ratingsCount: '1,240',
    pages: 464,
    year: 2008,
    language: 'English',
    available: true,
    description: 'A handbook of agile software craftsmanship. Martin shows how to write readable, maintainable code through principles, patterns, and real examples. Essential for every developer who wants to write code that stands the test of time.',
    coverTitle: 'CLEAN CODE',
    coverAuthor: 'ROBERT C. MARTIN',
    coverSub: 'A Handbook of Agile Software Craftsmanship',
  },
  {
    id: 'designing-data-intensive',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    category: 'Programming',
    rating: 4.9, ratingsCount: '892', pages: 616, year: 2017, language: 'English', available: true,
    description: 'The big ideas behind reliable, scalable, maintainable systems.',
    coverTitle: 'DESIGNING DATA', coverAuthor: 'MARTIN KLEPPMANN', coverSub: 'Data-Intensive Applications',
  },
  { id: 'refactoring', title: 'Refactoring', author: 'Martin Fowler', category: 'Programming', rating: 4.7, ratingsCount: '641', pages: 448, year: 2018, language: 'English', available: true, description: 'Improving the design of existing code.', coverTitle: 'REFACTORING', coverAuthor: 'MARTIN FOWLER', coverSub: '2nd Edition' },
  { id: 'sicp', title: 'Structure and Interpretation of Computer Programs', author: 'Abelson & Sussman', category: 'Programming', rating: 4.9, ratingsCount: '512', pages: 657, year: 1996, language: 'English', available: true, description: 'A classic introduction to computer science.', coverTitle: 'SICP', coverAuthor: 'ABELSON & SUSSMAN', coverSub: '' },
  { id: 'ddd', title: 'Domain-Driven Design', author: 'Eric Evans', category: 'Programming', rating: 4.6, ratingsCount: '423', pages: 560, year: 2003, language: 'English', available: true, description: 'Tackling complexity in the heart of software.', coverTitle: 'DOMAIN-DRIVEN', coverAuthor: 'ERIC EVANS', coverSub: 'DESIGN' },
  { id: 'atomic-habits', title: 'Atomic Habits', author: 'James Clear', category: 'Business', rating: 4.8, ratingsCount: '2,041', pages: 320, year: 2018, language: 'English', available: true, description: 'Tiny changes, remarkable results.', coverTitle: 'ATOMIC HABITS', coverAuthor: 'JAMES CLEAR', coverSub: '' },
  { id: 'design-everyday', title: 'The Design of Everyday Things', author: 'Don Norman', category: 'Design', rating: 4.7, ratingsCount: '1,102', pages: 368, year: 2013, language: 'English', available: true, description: 'A powerful primer on how—and why—some products satisfy customers.', coverTitle: 'THE DESIGN', coverAuthor: 'DON NORMAN', coverSub: 'of Everyday Things' },
  { id: 'deep-work', title: 'Deep Work', author: 'Cal Newport', category: 'Business', rating: 4.6, ratingsCount: '987', pages: 304, year: 2016, language: 'English', available: true, description: 'Focused success in a distracted world.', coverTitle: 'DEEP WORK', coverAuthor: 'CAL NEWPORT', coverSub: '' },
  { id: 'thinking-fast-slow', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', category: 'Science', rating: 4.7, ratingsCount: '1,554', pages: 499, year: 2011, language: 'English', available: true, description: 'Two systems drive the way we think.', coverTitle: 'THINKING', coverAuthor: 'DANIEL KAHNEMAN', coverSub: 'Fast and Slow' },
  { id: 'pragmatic', title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', category: 'Programming', rating: 4.8, ratingsCount: '1,330', pages: 352, year: 2019, language: 'English', available: true, description: 'Your journey to mastery.', coverTitle: 'PRAGMATIC', coverAuthor: 'HUNT & THOMAS', coverSub: 'PROGRAMMER' },
  { id: 'lean-startup', title: 'The Lean Startup', author: 'Eric Ries', category: 'Business', rating: 4.5, ratingsCount: '842', pages: 336, year: 2011, language: 'English', available: true, description: 'How constant innovation creates success.', coverTitle: 'LEAN STARTUP', coverAuthor: 'ERIC RIES', coverSub: '' },
  { id: 'storytelling', title: 'Storytelling with Data', author: 'Cole Nussbaumer', category: 'Design', rating: 4.6, ratingsCount: '412', pages: 288, year: 2015, language: 'English', available: true, description: 'A data visualization guide.', coverTitle: 'STORYTELLING', coverAuthor: 'COLE NUSSBAUMER', coverSub: 'with Data' },
];

export const CATEGORIES = ['All', 'Programming', 'Design', 'Science', 'Business', 'Fiction', 'History'];

export const BORROW_META = {
  borrowDate: '24 Sep 2026',
  returnDate: '08 Oct 2026',
  loanPeriod: '14 days',
  pickup: 'Library Pickup — Main Library, 1st Floor',
};

export const USER = { name: 'Shapiere Januar', email: 'shapiere@student.ac.id', studentId: '2024XXXX' };
