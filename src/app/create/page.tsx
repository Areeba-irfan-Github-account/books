"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
type Book = {
    id: number;
    title: string;
    author: string;
    image: string;
    available: boolean;
};


const CreateBook = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const router = useRouter
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


    const addBook = async () => {

        try {
            const formData = new FormData();
            formData.append("title", newBook.title);
            formData.append("author", newBook.author);
            formData.append("image", newBook.image);
            formData.append("available", newBook.available.toString());


            await fetch("/api/books", {
                method: "POST",
                body: JSON.stringify(newBook),
                headers: { "Content-Type": "application/json" },
            });


            setNewBook({ title: "", author: "", image: "", available: true });
            fetchBooks();

        } catch (error) {
            console.error("Error adding book:", error);
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
        <div>
            <Navbar />
            <div className="max-w-3xl mx-auto  p-6 rounded-lg shadow-md m-12">
                <div className="my-6 flex flex-col justify-center items-center w-full">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Add a New Book</h2>

                    <input
                        type="file"
                        onChange={(e) => handleImageUpload(e, setNewBook)}
                        className="md:w-[50%] w-full p-3 my-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="text"
                        placeholder="Title"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                        className="md:w-[50%] w-full py-2 px-4 mt-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
                    />

                    <input
                        type="text"
                        placeholder="Author"
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                        className="md:w-[50%] w-full py-2 px-4 mt-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
                    />

                    <button
                        className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all md:w-[40%] w-[90%] text-center"
                        onClick={addBook}
                    >
                        Add Book
                    </button>
                </div>
            </div>

        </div>
    )
}

export default CreateBook