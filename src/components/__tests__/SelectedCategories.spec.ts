import { render, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import SelectedCategories from '../SelectedCategories.vue';

describe('SelectedCategories', () => {
    it('renders selected categories and emits remove event', async () => {
        const categories = [
            { id: '1', name: 'Category 1' },
            { id: '2', name: 'Category 2', children: [] },
        ];

        const { getByText, queryByText, getAllByText, emitted } = render(SelectedCategories, {
            props: {
                selected: ['1', '2'],
            },
            global: {
                provide: {
                    categories: { value: categories },
                },
            },
        });

        expect(queryByText('Category 1')).not.toBeNull();
        expect(queryByText('Category 2')).not.toBeNull();

        // Click the remove button for 'Category 1'
        const buttons = getAllByText('x');
        await fireEvent.click(buttons[0]); // Click the first button with 'x'

        expect(emitted().remove).toBeTruthy();
        expect(emitted().remove[0]).toEqual(['1']); // Adjust based on which button was clicked
    });
});
