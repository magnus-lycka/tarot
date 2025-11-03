import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import PCSelection from './PCSelection.svelte';

describe('PCSelection', () => {
	it('shows "Single PC" when user selects 1 PC', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Find and select 1 PC
		const select = screen.getByLabelText(/how many (player characters|pcs)/i);
		await user.selectOptions(select, '1');

		// Should show single PC indicator
		expect(screen.getByTestId('single-pc-indicator')).toBeInTheDocument();
	});

	it('shows "PC team" when user selects more than 1 PC', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Find and select 2 PCs
		const select = screen.getByLabelText(/how many (player characters|pcs)/i);
		await user.selectOptions(select, '2');

		// Should show team indicator
		expect(screen.getByTestId('team-indicator')).toBeInTheDocument();
	});

	it('provides options from 1 to 10+', () => {
		render(PCSelection);

		const select = screen.getByLabelText(/how many (player characters|pcs)/i) as HTMLSelectElement;
		const options = Array.from(select.options).map((opt) => opt.value);

		expect(options).toContain('1');
		expect(options).toContain('2');
		expect(options).toContain('9');
		expect(options).toContain('10+');
	});

	it('asks for team personality (feeling vs thinking) when team size > 1', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select team size
		const sizeSelect = screen.getByLabelText(/how many (player characters|pcs)/i);
		await user.selectOptions(sizeSelect, '3');

		// Should show personality selection
		const personalityFieldset = screen.getByTestId('personality-selection');
		expect(personalityFieldset).toBeInTheDocument();

		// Should have both options (by value, not label text)
		const feelingRadio = screen.getByRole('radio', { name: /big hearts/i });
		const thinkingRadio = screen.getByRole('radio', { name: /sharp brains/i });
		expect(feelingRadio).toHaveAttribute('value', 'feeling');
		expect(thinkingRadio).toHaveAttribute('value', 'thinking');
	});

	it('shows personality selection for single PC', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select single PC
		const sizeSelect = screen.getByLabelText(/how many (player characters|pcs)/i);
		await user.selectOptions(sizeSelect, '1');

		// Should show personality selection (single PC also needs suite)
		expect(screen.getByTestId('personality-selection')).toBeInTheDocument();
	});

	it('shows court rank selection for single PC after suite selected', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select single PC
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '1');

		// Select feeling and passionate
		await user.click(screen.getByRole('radio', { name: /big hearts/i }));
		await user.click(screen.getByRole('radio', { name: /passionate.*bold/i }));

		// Should show court rank selection
		const courtFieldset = screen.getByTestId('court-rank-selection');
		expect(courtFieldset).toBeInTheDocument();

		// Should have all 5 court ranks
		expect(screen.getByRole('radio', { name: /ace/i })).toBeInTheDocument();
		expect(screen.getByRole('radio', { name: /page/i })).toBeInTheDocument();
		expect(screen.getByRole('radio', { name: /knight/i })).toBeInTheDocument();
		expect(screen.getByRole('radio', { name: /queen/i })).toBeInTheDocument();
		expect(screen.getByRole('radio', { name: /king/i })).toBeInTheDocument();
	});

	it('shows Ace of Wands for single PC with feeling/passionate/ace', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '1');
		await user.click(screen.getByRole('radio', { name: /big hearts/i }));
		await user.click(screen.getByRole('radio', { name: /passionate.*bold/i }));
		await user.click(screen.getByRole('radio', { name: /ace/i }));

		const cardDisplay = screen.getByTestId('card-display');
		expect(cardDisplay).toHaveTextContent('Ace of Wands');

		// Check image
		const img = screen.getByRole('img', { name: /ace of wands/i });
		expect(img).toHaveAttribute('src', expect.stringContaining('w1.jpg'));
	});

	it('shows Page of Cups for single PC with feeling/caring/page', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '1');
		await user.click(screen.getByRole('radio', { name: /big hearts/i }));
		await user.click(screen.getByRole('radio', { name: /caring.*loyal/i }));
		await user.click(screen.getByRole('radio', { name: /page/i }));

		const cardDisplay = screen.getByTestId('card-display');
		expect(cardDisplay).toHaveTextContent('Page of Cups');

		// Check image (Page = 11)
		const img = screen.getByRole('img', { name: /page of cups/i });
		expect(img).toHaveAttribute('src', expect.stringContaining('c11.jpg'));
	});

	it('shows Knight of Swords for single PC with thinking/strategic/knight', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '1');
		await user.click(screen.getByRole('radio', { name: /sharp brains/i }));
		await user.click(screen.getByRole('radio', { name: /strategic.*sharp/i }));
		await user.click(screen.getByRole('radio', { name: /knight/i }));

		const cardDisplay = screen.getByTestId('card-display');
		expect(cardDisplay).toHaveTextContent('Knight of Swords');

		// Check image (Knight = 12)
		const img = screen.getByRole('img', { name: /knight of swords/i });
		expect(img).toHaveAttribute('src', expect.stringContaining('s12.jpg'));
	});

	it('shows Queen of Pentacles for single PC with thinking/practical/queen', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '1');
		await user.click(screen.getByRole('radio', { name: /sharp brains/i }));
		await user.click(screen.getByRole('radio', { name: /practical.*grounded/i }));
		await user.click(screen.getByRole('radio', { name: /queen/i }));

		const cardDisplay = screen.getByTestId('card-display');
		expect(cardDisplay).toHaveTextContent('Queen of Pentacles');

		// Check image (Queen = 13)
		const img = screen.getByRole('img', { name: /queen of pentacles/i });
		expect(img).toHaveAttribute('src', expect.stringContaining('p13.jpg'));
	});

	it('shows King of Wands for single PC with feeling/passionate/king', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '1');
		await user.click(screen.getByRole('radio', { name: /big hearts/i }));
		await user.click(screen.getByRole('radio', { name: /passionate.*bold/i }));
		await user.click(screen.getByRole('radio', { name: /king/i }));

		const cardDisplay = screen.getByTestId('card-display');
		expect(cardDisplay).toHaveTextContent('King of Wands');

		// Check image (King = 14)
		const img = screen.getByRole('img', { name: /king of wands/i });
		expect(img).toHaveAttribute('src', expect.stringContaining('w14.jpg'));
	});

	it('asks if feeling team is passionate/bold or caring/loyal', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select team size
		const sizeSelect = screen.getByLabelText(/how many (player characters|pcs)/i);
		await user.selectOptions(sizeSelect, '4');

		// Select feeling
		const feelingRadio = screen.getByRole('radio', { name: /big hearts/i });
		await user.click(feelingRadio);

		// Should show emotional type selection
		const emotionalFieldset = screen.getByTestId('emotional-type-selection');
		expect(emotionalFieldset).toBeInTheDocument();

		// Should have passionate and caring options (by value)
		const passionateRadio = screen.getByRole('radio', { name: /passionate.*bold/i });
		const caringRadio = screen.getByRole('radio', { name: /caring.*loyal/i });
		expect(passionateRadio).toHaveAttribute('value', 'passionate');
		expect(caringRadio).toHaveAttribute('value', 'caring');
	});

	it('shows "4 of Wands" for 4-person passionate/bold feeling team', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select 4 PCs
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '4');

		// Select feeling
		await user.click(screen.getByRole('radio', { name: /big hearts/i }));

		// Select passionate (Wands)
		await user.click(screen.getByRole('radio', { name: /passionate.*bold/i }));

		// Should show card
		const cardDisplay = screen.getByTestId('card-display');
		expect(cardDisplay).toHaveTextContent('4 of Wands');
	});

	it('shows "3 of Cups" for 3-person caring/loyal feeling team', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select 3 PCs
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '3');

		// Select feeling
		await user.click(screen.getByRole('radio', { name: /big hearts/i }));

		// Select caring (Cups)
		await user.click(screen.getByRole('radio', { name: /caring.*loyal/i }));

		// Should show card
		const cardDisplay = screen.getByTestId('card-display');
		expect(cardDisplay).toHaveTextContent('3 of Cups');
	});

	it('shows "10 of Wands" for 10+ person passionate/bold feeling team', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select 10+ PCs
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '10+');

		// Select feeling
		await user.click(screen.getByRole('radio', { name: /big hearts/i }));

		// Select passionate (Wands)
		await user.click(screen.getByRole('radio', { name: /passionate.*bold/i }));

		// Should show card (10+ maps to 10)
		const cardDisplay = screen.getByTestId('card-display');
		expect(cardDisplay).toHaveTextContent('10 of Wands');
	});

	it('asks if thinking team is strategic/sharp or practical/grounded', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select team size
		const sizeSelect = screen.getByLabelText(/how many (player characters|pcs)/i);
		await user.selectOptions(sizeSelect, '5');

		// Select thinking
		const thinkingRadio = screen.getByRole('radio', { name: /sharp brains/i });
		await user.click(thinkingRadio);

		// Should show rational type selection
		const rationalFieldset = screen.getByTestId('rational-type-selection');
		expect(rationalFieldset).toBeInTheDocument();

		// Should have strategic and practical options (by value)
		const strategicRadio = screen.getByRole('radio', { name: /strategic.*sharp/i });
		const practicalRadio = screen.getByRole('radio', { name: /practical.*grounded/i });
		expect(strategicRadio).toHaveAttribute('value', 'strategic');
		expect(practicalRadio).toHaveAttribute('value', 'practical');
	});

	it('shows "4 of Pentacles" for 4-person practical/grounded thinking team', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select 4 PCs
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '4');

		// Select thinking
		await user.click(screen.getByRole('radio', { name: /sharp brains/i }));

		// Select practical (Pentacles)
		await user.click(screen.getByRole('radio', { name: /practical.*grounded/i }));

		// Should show card
		const cardDisplay = screen.getByTestId('card-display');
		expect(cardDisplay).toHaveTextContent('4 of Pentacles');
	});

	it('shows "5 of Swords" for 5-person strategic/sharp thinking team', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select 5 PCs
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '5');

		// Select thinking
		await user.click(screen.getByRole('radio', { name: /sharp brains/i }));

		// Select strategic (Swords)
		await user.click(screen.getByRole('radio', { name: /strategic.*sharp/i }));

		// Should show card
		const cardDisplay = screen.getByTestId('card-display');
		expect(cardDisplay).toHaveTextContent('5 of Swords');
	});

	it('displays card image for selected card', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select 4 PCs → Feeling → Passionate (Wands)
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '4');
		await user.click(screen.getByRole('radio', { name: /big hearts/i }));
		await user.click(screen.getByRole('radio', { name: /passionate.*bold/i }));

		// Should display image for 4 of Wands (w4.jpg)
		const img = screen.getByRole('img', { name: /4 of wands/i });
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute('src', expect.stringContaining('w4.jpg'));
	});

	it('displays correct card images for different suites', async () => {
		const user = userEvent.setup();
		const { unmount } = render(PCSelection);

		// Test Cups (3 of Cups = c3.jpg)
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '3');
		await user.click(screen.getByRole('radio', { name: /big hearts/i }));
		await user.click(screen.getByRole('radio', { name: /caring.*loyal/i }));

		let img = screen.getByRole('img', { name: /3 of cups/i });
		expect(img).toHaveAttribute('src', expect.stringContaining('c3.jpg'));

		unmount();

		// Test Pentacles (7 of Pentacles = p7.jpg)
		render(PCSelection);
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '7');
		await user.click(screen.getByRole('radio', { name: /sharp brains/i }));
		await user.click(screen.getByRole('radio', { name: /practical.*grounded/i }));

		img = screen.getByRole('img', { name: /7 of pentacles/i });
		expect(img).toHaveAttribute('src', expect.stringContaining('p7.jpg'));
	});

	it('clears emotional selection when switching from feeling to thinking', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select team size and feeling personality
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '4');
		await user.click(screen.getByRole('radio', { name: /big hearts/i }));
		await user.click(screen.getByRole('radio', { name: /passionate.*bold/i }));

		// Should show 4 of Wands
		expect(screen.getByTestId('card-display')).toHaveTextContent('4 of Wands');

		// Switch to thinking
		await user.click(screen.getByRole('radio', { name: /sharp brains/i }));

		// Card should disappear (no card selected yet)
		expect(screen.queryByTestId('card-display')).not.toBeInTheDocument();

		// Select rational type
		await user.click(screen.getByRole('radio', { name: /strategic.*sharp/i }));

		// Should now show 4 of Swords (not Wands)
		const cardDisplay = screen.getByTestId('card-display');
		expect(cardDisplay).toHaveTextContent('4 of Swords');
		expect(cardDisplay).not.toHaveTextContent('4 of Wands');
	});

	it('clears rational selection when switching from thinking to feeling', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select team size and thinking personality
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '5');
		await user.click(screen.getByRole('radio', { name: /sharp brains/i }));
		await user.click(screen.getByRole('radio', { name: /practical.*grounded/i }));

		// Should show 5 of Pentacles
		expect(screen.getByTestId('card-display')).toHaveTextContent('5 of Pentacles');

		// Switch to feeling
		await user.click(screen.getByRole('radio', { name: /big hearts/i }));

		// Card should disappear (no card selected yet)
		expect(screen.queryByTestId('card-display')).not.toBeInTheDocument();

		// Select emotional type
		await user.click(screen.getByRole('radio', { name: /caring.*loyal/i }));

		// Should now show 5 of Cups (not Pentacles)
		const cardDisplay = screen.getByTestId('card-display');
		expect(cardDisplay).toHaveTextContent('5 of Cups');
		expect(cardDisplay).not.toHaveTextContent('5 of Pentacles');
	});
});