import React, { useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([
    { title: 'The Psychology of Money', author: 'Morgan Housel' },
    { title: 'Atomic Habits', author: 'James Clear' },
    { title: 'Deep Work', author: 'Cal Newport' },
  ]);
  const [search, setSearch] = useState('');
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    if (newBook.title.trim() && newBook.author.trim()) {
      setBooks([...books, newBook]);
      setNewBook({ title: '', author: '' });
    }
  };

  const handleRemoveBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          📚 Library Management System
        </h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
          />

          <form onSubmit={handleAddBook} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              name="title"
              placeholder="Book Title"
              value={newBook.title}
              onChange={handleInputChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={newBook.author}
              onChange={handleInputChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow">
          {filteredBooks.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No books found.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredBooks.map((book, idx) => (
                <li key={idx} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-800">{book.title}</p>
                    <p className="text-sm text-gray-500">by {book.author}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveBook(books.indexOf(book))}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Total: {books.length} books
        </p>
      </div>
    </div>
  );
}

export default App;
