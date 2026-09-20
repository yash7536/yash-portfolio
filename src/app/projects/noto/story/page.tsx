"use client";

import { DeckShell } from "@/components/deck/DeckShell";
import { notoDeck } from "@/lib/decks/noto";

export default function NotoDeckPage() {
  return <DeckShell deck={notoDeck} />;
}
