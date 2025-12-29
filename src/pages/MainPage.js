import React, { useEffect, useMemo, useState } from "react";
import { api } from "../api";

function MainPage() {
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("title");

  // Form add
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");

  async function load() {
    setErr("");
    try {
      const books = await api("/api/books");
      setData(books);
    } catch (e) {
      setData([]);
      setErr("You must login to view your books.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function addBook(e) {
    e.preventDefault();
    setErr("");
    try {
      const created = await api("/api/books", {
        method: "POST",
        body: JSON.stringify({ title, author, year: Number(year), genre }),
      });
      setData((prev) => [created, ...prev]);
      setTitle(""); setAuthor(""); setYear(""); setGenre("");
    } catch (e) {
      setErr(e.message);
    }
  }

  async function deleteBook(id) {
    setErr("");
    try {
      await api(`/api/books/${id}`, { method: "DELETE" });
      setData((prev) => prev.filter((x) => x._id !== id));
    } catch (e) {
      setErr(e.message);
    }
  }

  const filteredData = useMemo(() => {
    return data
      .filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOption === "year") return a.year - b.year;
        if (sortOption === "author") return a.author.localeCompare(b.author);
        if (sortOption === "genre") return a.genre.localeCompare(b.genre);
        return a.title.localeCompare(b.title);
      });
  }, [data, searchTerm, sortOption]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Main Page - My Books</h2>

      {err && <p style={{ color: "red" }}>{err}</p>}

      <form onSubmit={addBook} style={{ marginBottom: 16 }}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} style={{ marginLeft: 8 }} />
        <input placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} style={{ marginLeft: 8, width: 80 }} />
        <input placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} style={{ marginLeft: 8 }} />
        <button type="submit" style={{ marginLeft: 8 }}>Add</button>
      </form>

      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginRight: "10px" }}
      />

      <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value="title">Sort by Title</option>
        <option value="author">Sort by Author</option>
        <option value="year">Sort by Year</option>
        <option value="genre">Sort by Genre</option>
      </select>

      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>Year</th><th>Genre</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>{item.year}</td>
              <td>{item.genre}</td>
              <td>
                <button onClick={() => deleteBook(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {filteredData.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No books yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MainPage;
