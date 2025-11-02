/**
 * Core card types and definitions for the Tarot TTRPG system
 */

export type Suite = 'wands' | 'cups' | 'swords' | 'pentacles';

export type MinorArcanaRank =
	| 'ace'
	| 'two'
	| 'three'
	| 'four'
	| 'five'
	| 'six'
	| 'seven'
	| 'eight'
	| 'nine'
	| 'ten'
	| 'page'
	| 'knight'
	| 'queen'
	| 'king';

export type MajorArcana =
	| 'the_fool'
	| 'the_magician'
	| 'the_high_priestess'
	| 'the_empress'
	| 'the_emperor'
	| 'the_hierophant'
	| 'the_lovers'
	| 'the_chariot'
	| 'strength'
	| 'the_hermit'
	| 'wheel_of_fortune'
	| 'justice'
	| 'the_hanged_man'
	| 'death'
	| 'temperance'
	| 'the_devil'
	| 'the_tower'
	| 'the_star'
	| 'the_moon'
	| 'the_sun'
	| 'judgement'
	| 'the_world';

export type Orientation = 'upright' | 'reversed';

export interface MinorArcanaCard {
	type: 'minor';
	suite: Suite;
	rank: MinorArcanaRank;
	orientation: Orientation;
}

export interface MajorArcanaCard {
	type: 'major';
	arcana: MajorArcana;
	orientation: Orientation;
}

export type Card = MinorArcanaCard | MajorArcanaCard;

/**
 * Elements associated with each suite
 */
export const SUITE_ELEMENTS: Record<Suite, string> = {
	wands: 'fire',
	cups: 'water',
	swords: 'air',
	pentacles: 'earth'
};

/**
 * Numeric value for minor arcana ranks (used for group size matching)
 */
export const RANK_VALUES: Record<MinorArcanaRank, number> = {
	ace: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
	ten: 10,
	page: 11,
	knight: 12,
	queen: 13,
	king: 14
};
