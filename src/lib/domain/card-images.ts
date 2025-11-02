/**
 * Maps card names to image filenames
 */

/**
 * Convert card display name to image filename
 * Examples:
 *   "4 of Wands" → "w4.jpg"
 *   "3 of Cups" → "c3.jpg"
 *   "10 of Pentacles" → "p10.jpg"
 */
export function getCardImageFilename(cardName: string): string {
	// Extract number and suite from card name
	const match = cardName.match(/^(\d+) of (Wands|Cups|Swords|Pentacles)$/);

	if (!match) {
		throw new Error(`Invalid card name: ${cardName}`);
	}

	const [, number, suite] = match;

	// Map suite to prefix
	const suitePrefix: Record<string, string> = {
		Wands: 'w',
		Cups: 'c',
		Swords: 's',
		Pentacles: 'p'
	};

	return `${suitePrefix[suite]}${number}.jpg`;
}
