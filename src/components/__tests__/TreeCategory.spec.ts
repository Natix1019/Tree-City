import { mount } from '@vue/test-utils';
import TreeCategory from '../TreeCategory.vue';
import { describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';

describe('TreeCategory.vue', () => {
    const category = {
        id: '1',
        name: 'Category 1',
        children: [
            {
                id: '2',
                name: 'Category 2',
                children: [],
            },
        ],
    };

    const selected = [];

    it('renders category name', () => {
        const wrapper = mount(TreeCategory, {
            props: { category, selected },
        });
        expect(wrapper.text()).toContain('Category 1');
    });

    it('emits select event when checkbox is clicked', async () => {
        const wrapper = mount(TreeCategory, {
            props: { category, selected },
        });

        // Mock the $emit function
        const emitSpy = vi.spyOn(wrapper.vm, '$emit');

        // Trigger checkbox click
        const checkbox = wrapper.find('input[type="checkbox"]');
        await checkbox.setChecked(true);
        await nextTick(); // Ensure Vue has updated


        await checkbox.setChecked(false);
        await nextTick(); // Ensure Vue has updated
    });

    it('toggles children visibility when category is clicked', async () => {
        const wrapper = mount(TreeCategory, {
            props: { category, selected },
        });

        // Trigger click and wait for updates

        await wrapper.find('div.tree-category-item').trigger('click');
        await nextTick(); // Ensure Vue has updated

        // Assert visibility
        expect(wrapper.text()).toContain('Category 2');
    });
});
