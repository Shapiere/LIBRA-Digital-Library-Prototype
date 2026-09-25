import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Discover, BookDetail, Login, Borrow, Confirmation, Success, MyLoans } from './screens/screens.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/borrow/:id" element={<Borrow />} />
        <Route path="/confirmation/:id" element={<Confirmation />} />
        <Route path="/success/:id" element={<Success />} />
        <Route path="/my-loans" element={<MyLoans />} />
        <Route path="*" element={<div style={{ padding: 40, textAlign: 'center' }}><h1>Not found</h1><a href="/">Home</a></div>} />
      </Routes>
    </BrowserRouter>
  );
}
