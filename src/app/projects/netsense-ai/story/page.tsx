"use client";

import { DeckShell } from "@/components/deck/DeckShell";
import { netsenseDeck } from "@/lib/decks/netsense";

export default function NetSenseDeckPage() {
  return <DeckShell deck={netsenseDeck} />;
}
