// src/components/QuoteCard.jsx
import React from "react";

const quotes = [
  "Focus on progress, not perfection.",
  "Small steps every day lead to big results.",
  "Study smarter, not harder.",
  "Consistency beats intensity."
];

export default function QuoteCard() {
  const q = quotes[Math.floor(Math.random()*quotes.length)];
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow">
      <h4 className="font-semibold">Motivation</h4>
      <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{q}</p>
    </div>
  );
}
