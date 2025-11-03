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

	it('shows Ace of Wands for feeling/passionate/ace selection', async () => {
		const user = userEvent.setup();
		render(PCSingleSelection);

		await user.click(screen.getByRole('radio', { name: /big hearts/i }));
		await user.click(screen.getByRole('radio', { name: /passionate.*bold/i }));
		await user.click(screen.getByRole('radio', { name: /ace/i }));

		const cardDisplay = screen.getByTestId('card-display');
		expect(cardDisplay).toHaveTextContent('Ace of Wands');
	});

	it('shows Page of Cups for feeling/caring/page selection', async () => {
		const user = userEvent.setup();
		render(PCSingleSelection);

		await user.click(screen.getByRole('radio', { name: /big hearts/i }));
		await user.click(screen.getByRole('radio', { name: /caring.*loyal/i }));
		await user.click(screen.getByRole('radio', { name: /page/i }));

		const cardDisplay = screen.getByTestId('card-display');
		expect(cardDisplay).toHaveTextContent('Page of Cups');
	});

	it('shows Knight of Swords for thinking/strategic/knight selection', async () => {
		const user = userEvent.setup();
		render(PCSingleSelection);

		await user.click(screen.getByRole('radio', { name: /sharp brains/i }));
		await user.click(screen.getByRole('radio', { name: /strategic.*sharp/i }));
		await user.click(screen.getByRole('radio', { name: /knight/i }));

		const cardDisplay = screen.getByTestId('card-display');
		expect(cardDisplay).toHaveTextContent('Knight of Swords');
	});

	it('shows Queen of Pentacles for thinking/practical/queen selection', async () => {
		const user = userEvent.setup();
		render(PCSingleSelection);

		await user.click(screen.getByRole('radio', { name: /sharp brains/i }));
		await user.click(screen.getByRole('radio', { name: /practical.*grounded/i }));
		await user.click(screen.getByRole('radio', { name: /queen/i }));

		const cardDisplay = screen.getByTestId('card-display');
		expect(cardDisplay).toHaveTextContent('Queen of Pentacles');
	});

	it('shows King of Wands for feeling/passionate/king selection', async () => {
		const user = userEvent.setup();
		render(PCSingleSelection);

		await user.click(screen.getByRole('radio', { name: /big hearts/i }));
		await user.click(screen.getByRole('radio', { name: /passionate.*bold/i }));
		await user.click(screen.getByRole('radio', { name: /king/i }));

		const cardDisplay = screen.getByTestId('card-display');
		expect(cardDisplay).toHaveTextContent('King of Wands');
	});

	it('displays card image for selected card', async () => {
		const user = userEvent.setup();
		render(PCSingleSelection);

		// Select Ace of Wands
		await user.click(screen.getByRole('radio', { name: /big hearts/i }));
		await user.click(screen.getByRole('radio', { name: /passionate.*bold/i }));
		await user.click(screen.getByRole('radio', { name: /ace/i }));

		// Should display image (Ace = 1)
		const img = screen.getByRole('img', { name: /ace of wands/i });
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute('src', expect.stringContaining('w1.jpg'));
	});

	it('clears court rank when switching suite type', async () => {
		const user = userEvent.setup();
		render(PCSingleSelection);

		// Select feeling, passionate, ace
		await user.click(screen.getByRole('radio', { name: /big hearts/i }));
		await user.click(screen.getByRole('radio', { name: /passionate.*bold/i }));
		await user.click(screen.getByRole('radio', { name: /ace/i }));

		expect(screen.getByTestId('card-display')).toHaveTextContent('Ace of Wands');

		// Switch to caring
		await user.click(screen.getByRole('radio', { name: /caring.*loyal/i }));

		// Card should disappear until court rank is selected again
		expect(screen.queryByTestId('card-display')).not.toBeInTheDocument();
	});
});
