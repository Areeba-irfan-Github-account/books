"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
type Book = {
  id: number;
  title: string;
  author: string;
  image: string;
  available: boolean;
};

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<{
    title: string;
    author: string;
    image: string | File;
    available: boolean;
  }>({
    title: "",
    author: "",
    image: "",
    available: true,
  });
  const [editBook, setEditBook] = useState<Book | null>(null);


  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };


  const updateBook = async () => {
    try {
      await fetch("/api/books", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editBook),
      });
      setEditBook(null);
      fetchBooks();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const deleteBook = async (id:number) => {
    try {
      await fetch("/api/books", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<
      React.SetStateAction<{
        title: string;
        author: string;
        image: string | File;
        available: boolean;
      }>
    >
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file); // Convert the file to a base64 string
    }
  };
  

  return (
    <div className=" m-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen flex flex-col justify-center items-center">
    <h1 className="text-5xl font-bold text-blue-800 mb-8 text-center drop-shadow-lg">Book List</h1>
    
    <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.length > 0 ? (
        books.map((book) => (
          <li key={book.id} className="bg-white p-6 rounded-2xl shadow-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform">
            <Image
              src={book.image}
              alt={book.title}
              width={300}
              height={300}
              className="rounded-xl object-cover w-full h-[300px] mb-4 border-2 border-gray-300"
            />
            <h2 className="text-center font-semibold text-2xl text-blue-600 mb-2">{book.title}</h2>
            <p className="text-center text-lg text-gray-700 mb-2">Author: {book.author}</p>
            <p className="text-center font-medium text-lg mb-4">
              Status: <span className={book.available ? 'text-green-600' : 'text-red-600'}>{book.available ? 'Available' : 'Not Available'}</span>
            </p>
            <div className="flex justify-center gap-6">
              <button
                className="bg-blue-600 text-white px-5 py-3 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
                onClick={() => setEditBook(book)}
              >
                <CiEdit size={24} />
              </button>
              <button
                className="bg-red-600 text-white px-5 py-3 rounded-full shadow-md hover:bg-red-700 transition-all duration-300"
                onClick={() => deleteBook(book.id)}
              >
                <MdDeleteOutline size={24} />
              </button>
            </div>
          </li>
        ))
      ) : (
        <p className="text-center text-xl text-gray-500">No books available.</p>
      )}
    </ul>

    {editBook && (
      <div className="mt-12 p-8 w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl transform transition-all duration-300 ease-in-out">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">Edit Book</h2>
        <input
          type="text"
          placeholder="Title"
          value={editBook.title}
          onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
          className="w-full p-5 mb-5 text-xl border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <input
          type="text"
          placeholder="Author"
          value={editBook.author}
          onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
          className="w-full p-5 mb-5 text-xl border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            if (file) {
              setEditBook((prev) => prev ? { ...prev, image: URL.createObjectURL(file) } : null);
            }
          }}
          className="w-full p-5 mb-5 bg-gray-100 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <div className="flex justify-center gap-6">
          <button
            className="bg-green-600 text-white px-8 py-4 rounded-full shadow-md hover:bg-green-700 transition-all duration-300"
            onClick={updateBook}
          >
            Save Changes
          </button>
          <button
            className="bg-gray-600 text-white px-8 py-4 rounded-full shadow-md hover:bg-gray-700 transition-all duration-300"
            onClick={() => setEditBook(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    )}
  </div>
  );
}