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
});