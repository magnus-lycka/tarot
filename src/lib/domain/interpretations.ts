/**
 * Card interpretations and meanings
 * TODO: Add comprehensive tarot card interpretations
 */

import type { Card } from './cards';

export interface CardInterpretation {
	upright: string[];
	reversed: string[];
}

/**
 * Gets the interpretation for a card based on its orientation
 * Returns keywords/themes to inspire encounter design
 */
export function getCardInterpretation(card: Card): string[] {
	// TODO: Implement full interpretation database
	// For now, return placeholder
	return card.orientation === 'upright'
		? ['Placeholder upright meaning']
		: ['Placeholder reversed meaning'];
}

/**
 * Formats a card name for display
 */
export function formatCardName(card: Card): string {
	if (card.type === 'major') {
		return card.arcana
			.split('_')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	} else {
		const rank = card.rank.charAt(0).toUpperCase() + card.rank.slice(1);
		const suite = card.suite.charAt(0).toUpperCase() + card.suite.slice(1);
		return `${rank} of ${suite}`;
	}
}
