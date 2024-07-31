import { render, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import CategoryTree from '../CategoryTree.vue';

describe('CategoryTree', () => {
    it('renders correctly and filters categories', async () => {
        const { getByPlaceholderText, getByText, queryByText } = render(CategoryTree, {
            props: {
                categories: [
                    {
                        id: '1',
                        name: 'Europe',
                        children: [
                            { id: '2', name: 'Ukraine', children: [] },
                        ],
                    },
                    {
                        id: '3',
                        name: 'Asia',
                        children: [
                            { id: '4', name: 'China', children: [] },
                        ],
                    },
                ],
            },
        });

        const input = getByPlaceholderText('Search...');
        await fireEvent.update(input, 'Asia');
        expect(getByText('Asia')).toBeTruthy(); // Use toBeTruthy() for simple truthy checks
        expect(queryByText('Europe')).toBeNull();

        await fireEvent.update(input, '');
        expect(getByText('Europe')).toBeTruthy();
        expect(getByText('Asia')).toBeTruthy();
    });
});
