import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import PCMultiSelection from './PCMultiSelection.svelte';

describe('PCMultiSelection', () => {
	it('shows personality selection', () => {
		render(PCMultiSelection);

		const personalityFieldset = screen.getByTestId('personality-selection');
		expect(personalityFieldset).toBeInTheDocument();

		// Should have both feeling and thinking options
		const feelingRadio = screen.getByRole('radio', { name: /big hearts/i });
		const thinkingRadio = screen.getByRole('radio', { name: /sharp brains/i });
		expect(feelingRadio).toHaveAttribute('value', 'feeling');
		expect(thinkingRadio).toHaveAttribute('value', 'thinking');
	});

	it('shows emotional type selection when feeling is selected', async () => {
		const user = userEvent.setup();
		render(PCMultiSelection);

		// Select feeling
		await user.click(screen.getByRole('radio', { name: /big hearts/i }));

		// Should show emotional type selection
		const emotionalFieldset = screen.getByTestId('emotional-type-selection');
		expect(emotionalFieldset).toBeInTheDocument();

		// Should have passionate and caring options
		const passionateRadio = screen.getByRole('radio', { name: /passionate.*bold/i });
		const caringRadio = screen.getByRole('radio', { name: /caring.*loyal/i });
		expect(passionateRadio).toHaveAttribute('value', 'passionate');
		expect(caringRadio).toHaveAttribute('value', 'caring');
	});

	it('shows rational type selection when thinking is selected', async () => {
		const user = userEvent.setup();
		render(PCMultiSelection);

		// Select thinking
		await user.click(screen.getByRole('radio', { name: /sharp brains/i }));

		// Should show rational type selection
		const rationalFieldset = screen.getByTestId('rational-type-selection');
		expect(rationalFieldset).toBeInTheDocument();

		// Should have strategic and practical options
		const strategicRadio = screen.getByRole('radio', { name: /strategic.*sharp/i });
		const practicalRadio = screen.getByRole('radio', { name: /practical.*grounded/i });
		expect(strategicRadio).toHaveAttribute('value', 'strategic');
		expect(practicalRadio).toHaveAttribute('value', 'practical');
	});

	it('clears emotional selection when switching to thinking', async () => {
		const user = userEvent.setup();
		render(PCMultiSelection);

		// Select feeling and passionate
		await user.click(screen.getByRole('radio', { name: /big hearts/i }));
		await user.click(screen.getByRole('radio', { name: /passionate.*bold/i }));

		// Switch to thinking
		await user.click(screen.getByRole('radio', { name: /sharp brains/i }));

		// Emotional fieldset should not be visible
		expect(screen.queryByTestId('emotional-type-selection')).not.toBeInTheDocument();

		// Rational fieldset should be visible
		expect(screen.getByTestId('rational-type-selection')).toBeInTheDocument();
	});

	it('clears rational selection when switching to feeling', async () => {
		const user = userEvent.setup();
		render(PCMultiSelection);

		// Select thinking and strategic
		await user.click(screen.getByRole('radio', { name: /sharp brains/i }));
		await user.click(screen.getByRole('radio', { name: /strategic.*sharp/i }));

		// Switch to feeling
		await user.click(screen.getByRole('radio', { name: /big hearts/i }));

		// Rational fieldset should not be visible
		expect(screen.queryByTestId('rational-type-selection')).not.toBeInTheDocument();

		// Emotional fieldset should be visible
		expect(screen.getByTestId('emotional-type-selection')).toBeInTheDocument();
	});
});
