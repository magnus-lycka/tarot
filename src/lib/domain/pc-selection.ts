/**
 * Logic for determining the card that represents the PC(s)
 */

import type { Card, Suite, MinorArcanaRank } from './cards';

export type PersonalityAxis = 'emotional' | 'rational';
export type EmotionalType = 'hot' | 'cool';
export type RationalType = 'pragmatic' | 'visionary';

export interface GroupCharacteristics {
	size: number;
	personalityAxis: PersonalityAxis;
	emotionalType?: EmotionalType; // Required if personalityAxis is 'emotional'
	rationalType?: RationalType; // Required if personalityAxis is 'rational'
}

/**
 * Determines the suite based on group personality characteristics
 */
export function determineSuite(characteristics: GroupCharacteristics): Suite {
	if (characteristics.personalityAxis === 'emotional') {
		return characteristics.emotionalType === 'hot' ? 'wands' : 'cups';
	} else {
		return characteristics.rationalType === 'pragmatic' ? 'pentacles' : 'swords';
	}
}

/**
 * Determines the rank based on group size (2-10)
 * Groups larger than 10 use the 'ten' card
 */
export function determineRankFromSize(size: number): MinorArcanaRank {
	if (size < 2) {
		throw new Error('Group size must be at least 2 for minor arcana selection');
	}

	const rankMap: Record<number, MinorArcanaRank> = {
		2: 'two',
		3: 'three',
		4: 'four',
		5: 'five',
		6: 'six',
		7: 'seven',
		8: 'eight',
		9: 'nine'
	};

	return rankMap[size] || 'ten'; // 10+ becomes 'ten'
}

/**
 * Selects the PC card for a multi-person group
 */
export function selectGroupCard(characteristics: GroupCharacteristics): Card {
	const suite = determineSuite(characteristics);
	const rank = determineRankFromSize(characteristics.size);

	return {
		type: 'minor',
		suite,
		rank,
		orientation: 'upright' // PC card is always upright
	};
}

// TODO: Implement single PC card selection using major arcana and archetypes
