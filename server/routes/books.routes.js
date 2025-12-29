import { Router } from "express";
import Book from "../models/Book.js";

const router = Router();

// Get my books
router.get("/", async (req, res) => {
  const books = await Book.find({ creatorId: req.session.userId }).sort({ createdAt: -1 });
  res.json(books);
});

// Create book
router.post("/", async (req, res) => {
  const { title, author, year, genre } = req.body;

  if (!title || !author || year === undefined || !genre) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const book = await Book.create({
    title,
    author,
    year: Number(year),
    genre,
    creatorId: req.session.userId,
  });

  res.status(201).json(book);
});

// Update (ownership in query)
router.put("/:id", async (req, res) => {
  const { title, author, year, genre } = req.body;

  const update = {};
  if (title !== undefined) update.title = title;
  if (author !== undefined) update.author = author;
  if (year !== undefined) update.year = Number(year);
  if (genre !== undefined) update.genre = genre;

  const updated = await Book.findOneAndUpdate(
    { _id: req.params.id, creatorId: req.session.userId }, 
    update,
    { new: true }
  );

  if (!updated) return res.status(403).json({ message: "Not allowed" });
  res.json(updated);
});

// Delete (ownership in query)
router.delete("/:id", async (req, res) => {
  const deleted = await Book.findOneAndDelete({
    _id: req.params.id,
    creatorId: req.session.userId, 
  });

  if (!deleted) return res.status(403).json({ message: "Not allowed" });
  res.json({ message: "Deleted" });
});

export default router;
