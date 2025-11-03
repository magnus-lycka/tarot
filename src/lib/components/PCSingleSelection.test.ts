import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import PCSingleSelection from './PCSingleSelection.svelte';

describe('PCSingleSelection', () => {
	it('shows personality selection', () => {
		render(PCSingleSelection);

		const personalityFieldset = screen.getByTestId('personality-selection');
		expect(personalityFieldset).toBeInTheDocument();
	});

	it('shows emotional type selection when feeling is selected', async () => {
		const user = userEvent.setup();
		render(PCSingleSelection);

		await user.click(screen.getByRole('radio', { name: /big hearts/i }));

		const emotionalFieldset = screen.getByTestId('emotional-type-selection');
		expect(emotionalFieldset).toBeInTheDocument();
	});

	it('shows rational type selection when thinking is selected', async () => {
		const user = userEvent.setup();
		render(PCSingleSelection);

		await user.click(screen.getByRole('radio', { name: /sharp brains/i }));

		const rationalFieldset = screen.getByTestId('rational-type-selection');
		expect(rationalFieldset).toBeInTheDocument();
	});

	it('shows court rank selection after suite is selected', async () => {
		const user = userEvent.setup();
		render(PCSingleSelection);

		// Select feeling and passionate (Wands)
		await user.click(screen.getByRole('radio', { name: /big hearts/i }));
		await user.click(screen.getByRole('radio', { name: /passionate.*bold/i }));

		// Should show court rank selection
		const courtFieldset = screen.getByTestId('court-rank-selection');
		expect(courtFieldset).toBeInTheDocument();

		// Should have all 5 court cards
		expect(screen.getByRole('radio', { name: /ace/i })).toHaveAttribute('value', 'ace');
		expect(screen.getByRole('radio', { name: /page/i })).toHaveAttribute('value', 'page');
		expect(screen.getByRole('radio', { name: /knight/i })).toHaveAttribute('value', 'knight');
		expect(screen.getByRole('radio', { name: /queen/i })).toHaveAttribute('value', 'queen');
		expect(screen.getByRole('radio', { name: /king/i })).toHaveAttribute('value', 'king');
	});
});
