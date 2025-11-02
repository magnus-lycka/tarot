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

	it('asks if feeling team is hot or cool', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select team size
		const sizeSelect = screen.getByLabelText(/how many (player characters|pcs)/i);
		await user.selectOptions(sizeSelect, '4');

		// Select feeling (Big Hearts)
		const feelingRadio = screen.getByLabelText(/big hearts/i);
		await user.click(feelingRadio);

		// Should show hot/cool question
		expect(screen.getByText(/hot or cool/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/^hot$/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/^cool$/i)).toBeInTheDocument();
	});

	it('shows "4 of Wands" for 4-person hot feeling team', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select 4 PCs
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '4');

		// Select feeling (Big Hearts)
		await user.click(screen.getByLabelText(/big hearts/i));

		// Select hot
		await user.click(screen.getByLabelText(/^hot$/i));

		// Should show card
		expect(screen.getByText('4 of Wands')).toBeInTheDocument();
	});

	it('shows "3 of Cups" for 3-person cool feeling team', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select 3 PCs
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '3');

		// Select feeling (Big Hearts)
		await user.click(screen.getByLabelText(/big hearts/i));

		// Select cool
		await user.click(screen.getByLabelText(/^cool$/i));

		// Should show card
		expect(screen.getByText('3 of Cups')).toBeInTheDocument();
	});

	it('shows "10 of Wands" for 10+ person hot feeling team', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select 10+ PCs
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '10+');

		// Select feeling (Big Hearts)
		await user.click(screen.getByLabelText(/big hearts/i));

		// Select hot
		await user.click(screen.getByLabelText(/^hot$/i));

		// Should show card (10+ maps to 10)
		expect(screen.getByText('10 of Wands')).toBeInTheDocument();
	});

	it('asks if thinking team is pragmatic or visionary', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select team size
		const sizeSelect = screen.getByLabelText(/how many (player characters|pcs)/i);
		await user.selectOptions(sizeSelect, '5');

		// Select thinking (Sharp Brains)
		const thinkingRadio = screen.getByLabelText(/sharp brains/i);
		await user.click(thinkingRadio);

		// Should show pragmatic/visionary question
		expect(screen.getByText(/pragmatic or visionary/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/^pragmatic$/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/^visionary$/i)).toBeInTheDocument();
	});

	it('shows "4 of Pentacles" for 4-person pragmatic thinking team', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select 4 PCs
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '4');

		// Select thinking (Sharp Brains)
		await user.click(screen.getByLabelText(/sharp brains/i));

		// Select pragmatic
		await user.click(screen.getByLabelText(/^pragmatic$/i));

		// Should show card
		expect(screen.getByText('4 of Pentacles')).toBeInTheDocument();
	});

	it('shows "5 of Swords" for 5-person visionary thinking team', async () => {
		const user = userEvent.setup();
		render(PCSelection);

		// Select 5 PCs
		await user.selectOptions(screen.getByLabelText(/how many (player characters|pcs)/i), '5');

		// Select thinking (Sharp Brains)
		await user.click(screen.getByLabelText(/sharp brains/i));

		// Select visionary
		await user.click(screen.getByLabelText(/^visionary$/i));

		// Should show card
		expect(screen.getByText('5 of Swords')).toBeInTheDocument();
	});
});