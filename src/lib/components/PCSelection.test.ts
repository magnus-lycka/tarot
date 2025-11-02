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

		// Should show single PC message
		expect(screen.getByText('Single PC')).toBeInTheDocument();
	});

	it('shows "PC team" when user selects more than 1 PC', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Find and select 2 PCs
		const select = screen.getByLabelText(/how many (player characters|pcs)/i);
		await user.selectOptions(select, '2');

		// Should show team message
		expect(screen.getByText('PC team')).toBeInTheDocument();
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

		// Should show personality question
		expect(screen.getByText(/is the team more feeling or thinking/i)).toBeInTheDocument();

		// Should have both options
		const feelingRadio = screen.getByLabelText(/big hearts/i);
		const thinkingRadio = screen.getByLabelText(/sharp brains/i);
		expect(feelingRadio).toBeInTheDocument();
		expect(thinkingRadio).toBeInTheDocument();
	});

	it('does not show personality question for single PC', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select single PC
		const sizeSelect = screen.getByLabelText(/how many (player characters|pcs)/i);
		await user.selectOptions(sizeSelect, '1');

		// Should NOT show personality question
		expect(screen.queryByText(/is the team more feeling or thinking/i)).not.toBeInTheDocument();
	});

	it('asks if feeling team is passionate/bold or caring/loyal', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select team size
		const sizeSelect = screen.getByLabelText(/how many (player characters|pcs)/i);
		await user.selectOptions(sizeSelect, '4');

		// Select feeling (Big Hearts)
		const feelingRadio = screen.getByLabelText(/big hearts/i);
		await user.click(feelingRadio);

		// Should show wands/cups question
		expect(screen.getByText(/passionate.*bold.*caring.*loyal/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/passionate.*bold/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/caring.*loyal/i)).toBeInTheDocument();
	});

	it('shows "4 of Wands" for 4-person passionate/bold feeling team', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select 4 PCs
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '4');

		// Select feeling (Big Hearts)
		await user.click(screen.getByLabelText(/big hearts/i));

		// Select passionate & bold (Wands)
		await user.click(screen.getByLabelText(/passionate.*bold/i));

		// Should show card
		expect(screen.getByText('4 of Wands')).toBeInTheDocument();
	});

	it('shows "3 of Cups" for 3-person caring/loyal feeling team', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select 3 PCs
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '3');

		// Select feeling (Big Hearts)
		await user.click(screen.getByLabelText(/big hearts/i));

		// Select caring & loyal (Cups)
		await user.click(screen.getByLabelText(/caring.*loyal/i));

		// Should show card
		expect(screen.getByText('3 of Cups')).toBeInTheDocument();
	});

	it('shows "10 of Wands" for 10+ person passionate/bold feeling team', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select 10+ PCs
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '10+');

		// Select feeling (Big Hearts)
		await user.click(screen.getByLabelText(/big hearts/i));

		// Select passionate & bold (Wands)
		await user.click(screen.getByLabelText(/passionate.*bold/i));

		// Should show card (10+ maps to 10)
		expect(screen.getByText('10 of Wands')).toBeInTheDocument();
	});

	it('asks if thinking team is strategic/sharp or practical/grounded', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select team size
		const sizeSelect = screen.getByLabelText(/how many (player characters|pcs)/i);
		await user.selectOptions(sizeSelect, '5');

		// Select thinking (Sharp Brains)
		const thinkingRadio = screen.getByLabelText(/sharp brains/i);
		await user.click(thinkingRadio);

		// Should show swords/pentacles question
		expect(screen.getByText(/strategic.*sharp.*practical.*grounded/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/strategic.*sharp/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/practical.*grounded/i)).toBeInTheDocument();
	});

	it('shows "4 of Pentacles" for 4-person practical/grounded thinking team', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select 4 PCs
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '4');

		// Select thinking (Sharp Brains)
		await user.click(screen.getByLabelText(/sharp brains/i));

		// Select practical & grounded (Pentacles)
		await user.click(screen.getByLabelText(/practical.*grounded/i));

		// Should show card
		expect(screen.getByText('4 of Pentacles')).toBeInTheDocument();
	});

	it('shows "5 of Swords" for 5-person strategic/sharp thinking team', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select 5 PCs
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '5');

		// Select thinking (Sharp Brains)
		await user.click(screen.getByLabelText(/sharp brains/i));

		// Select strategic & sharp (Swords)
		await user.click(screen.getByLabelText(/strategic.*sharp/i));

		// Should show card
		expect(screen.getByText('5 of Swords')).toBeInTheDocument();
	});

	it('displays card image for selected card', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select 4 PCs → Feeling (Big Hearts) → Passionate & Bold (Wands)
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '4');
		await user.click(screen.getByLabelText(/big hearts/i));
		await user.click(screen.getByLabelText(/passionate.*bold/i));

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
		await user.click(screen.getByLabelText(/big hearts/i));
		await user.click(screen.getByLabelText(/caring.*loyal/i));

		let img = screen.getByRole('img', { name: /3 of cups/i });
		expect(img).toHaveAttribute('src', expect.stringContaining('c3.jpg'));

		unmount();

		// Test Pentacles (7 of Pentacles = p7.jpg)
		render(PCSelection);
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '7');
		await user.click(screen.getByLabelText(/sharp brains/i));
		await user.click(screen.getByLabelText(/practical.*grounded/i));

		img = screen.getByRole('img', { name: /7 of pentacles/i });
		expect(img).toHaveAttribute('src', expect.stringContaining('p7.jpg'));
	});

	it('clears emotional selection when switching from feeling to thinking', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select team size and feeling personality
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '4');
		await user.click(screen.getByLabelText(/big hearts/i));
		await user.click(screen.getByLabelText(/passionate.*bold/i));

		// Should show 4 of Wands
		expect(screen.getByText('4 of Wands')).toBeInTheDocument();

		// Switch to thinking
		await user.click(screen.getByLabelText(/sharp brains/i));

		// Card should disappear (no card selected yet)
		expect(screen.queryByText('4 of Wands')).not.toBeInTheDocument();
		expect(screen.queryByRole('img')).not.toBeInTheDocument();

		// Select rational type
		await user.click(screen.getByLabelText(/strategic.*sharp/i));

		// Should now show 4 of Swords (not Wands)
		expect(screen.getByText('4 of Swords')).toBeInTheDocument();
		expect(screen.queryByText('4 of Wands')).not.toBeInTheDocument();
	});

	it('clears rational selection when switching from thinking to feeling', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select team size and thinking personality
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '5');
		await user.click(screen.getByLabelText(/sharp brains/i));
		await user.click(screen.getByLabelText(/practical.*grounded/i));

		// Should show 5 of Pentacles
		expect(screen.getByText('5 of Pentacles')).toBeInTheDocument();

		// Switch to feeling
		await user.click(screen.getByLabelText(/big hearts/i));

		// Card should disappear (no card selected yet)
		expect(screen.queryByText('5 of Pentacles')).not.toBeInTheDocument();
		expect(screen.queryByRole('img')).not.toBeInTheDocument();

		// Select emotional type
		await user.click(screen.getByLabelText(/caring.*loyal/i));

		// Should now show 5 of Cups (not Pentacles)
		expect(screen.getByText('5 of Cups')).toBeInTheDocument();
		expect(screen.queryByText('5 of Pentacles')).not.toBeInTheDocument();
	});
});