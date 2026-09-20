"use client";

import { DeckShell } from "@/components/deck/DeckShell";
import { squadpayDeck } from "@/lib/decks/squadpay";

export default function SquadPayDeckPage() {
  return <DeckShell deck={squadpayDeck} />;
}
