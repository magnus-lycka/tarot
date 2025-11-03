/**
 * Maps card names to image filenames
 */

/**
 * Convert card display name to image filename
 * Examples:
 *   "4 of Wands" → "w4.jpg"
 *   "Ace of Cups" → "c1.jpg"
 *   "Page of Swords" → "s11.jpg"
 *   "Knight of Pentacles" → "p12.jpg"
 *   "Queen of Wands" → "w13.jpg"
 *   "King of Cups" → "c14.jpg"
 */
export function getCardImageFilename(cardName: string): string {
	// Map suite to prefix
	const suitePrefix: Record<string, string> = {
		Wands: 'w',
		Cups: 'c',
		Swords: 's',
		Pentacles: 'p'
	};

	// Try numbered card pattern (e.g., "4 of Wands")
	const numberedMatch = cardName.match(/^(\d+) of (Wands|Cups|Swords|Pentacles)$/);
	if (numberedMatch) {
		const [, number, suite] = numberedMatch;
		return `${suitePrefix[suite]}${number}.jpg`;
	}

	// Try court card pattern (e.g., "Ace of Wands", "Page of Cups")
	const courtMatch = cardName.match(/^(Ace|Page|Knight|Queen|King) of (Wands|Cups|Swords|Pentacles)$/);
	if (courtMatch) {
		const [, rank, suite] = courtMatch;

		// Map court ranks to numbers
		const rankNumber: Record<string, string> = {
			Ace: '1',
			Page: '11',
			Knight: '12',
			Queen: '13',
			King: '14'
		};

		return `${suitePrefix[suite]}${rankNumber[rank]}.jpg`;
	}

	throw new Error(`Invalid card name: ${cardName}`);
}
