/**
 * Deck management and card drawing logic
 */

import type { Card, Suite, MinorArcanaRank, MajorArcana, Orientation } from './cards';

/**
 * Creates a full 78-card tarot deck
 */
export function createFullDeck(): Card[] {
	const deck: Card[] = [];

	// Add minor arcana (56 cards)
	const suites: Suite[] = ['wands', 'cups', 'swords', 'pentacles'];
	const ranks: MinorArcanaRank[] = [
		'ace',
		'two',
		'three',
		'four',
		'five',
		'six',
		'seven',
		'eight',
		'nine',
		'ten',
		'page',
		'knight',
		'queen',
		'king'
	];

	for (const suite of suites) {
		for (const rank of ranks) {
			deck.push({
				type: 'minor',
				suite,
				rank,
				orientation: 'upright'
			});
		}
	}

	// Add major arcana (22 cards)
	const majorArcana: MajorArcana[] = [
		'the_fool',
		'the_magician',
		'the_high_priestess',
		'the_empress',
		'the_emperor',
		'the_hierophant',
		'the_lovers',
		'the_chariot',
		'strength',
		'the_hermit',
		'wheel_of_fortune',
		'justice',
		'the_hanged_man',
		'death',
		'temperance',
		'the_devil',
		'the_tower',
		'the_star',
		'the_moon',
		'the_sun',
		'judgement',
		'the_world'
	];

	for (const arcana of majorArcana) {
		deck.push({
			type: 'major',
			arcana,
			orientation: 'upright'
		});
	}

	return deck;
}

/**
 * Shuffles a deck using Fisher-Yates algorithm
 */
export function shuffleDeck(deck: Card[]): Card[] {
	const shuffled = [...deck];

	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled;
}

/**
 * Randomly assigns orientation to a card (50/50 chance)
 */
export function assignRandomOrientation(card: Card): Card {
	const orientation: Orientation = Math.random() < 0.5 ? 'upright' : 'reversed';
	return { ...card, orientation };
}

/**
 * Draws N cards from the deck, removing them from the deck
 * Each card gets a random orientation when drawn
 */
export function drawCards(deck: Card[], count: number): { drawn: Card[]; remaining: Card[] } {
	if (count > deck.length) {
		throw new Error(`Cannot draw ${count} cards from deck with ${deck.length} cards`);
	}

	const remaining = [...deck];
	const drawn: Card[] = [];

	for (let i = 0; i < count; i++) {
		const card = remaining.pop()!;
		drawn.push(assignRandomOrientation(card));
	}

	return { drawn, remaining };
}
