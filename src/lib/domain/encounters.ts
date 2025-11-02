/**
 * Encounter card drawing and spread logic
 */

import type { Card } from './cards';

export interface EncounterSpread {
	pcCard: Card; // Column 1: The PC(s) card
	reactionCard: Card; // Column 2: How NPC reacts to PCs
	npcCard: Card; // Column 3: The encountered NPC
	contextCard: Card; // Column 4: Context/background for NPC
}

/**
 * Creates an encounter spread by drawing three cards from the deck
 * The PC card is provided (already determined)
 *
 * Drawing order:
 * 1. NPC card (column 3)
 * 2. Context card (column 4)
 * 3. Reaction card (column 2)
 */
export function createEncounterSpread(pcCard: Card, deckCards: Card[]): EncounterSpread {
	if (deckCards.length < 3) {
		throw new Error('Need at least 3 cards in deck to create encounter spread');
	}

	const [npcCard, contextCard, reactionCard] = deckCards;

	return {
		pcCard,
		reactionCard,
		npcCard,
		contextCard
	};
}
