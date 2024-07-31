<template>
  <div class="selected-categories">
    <span v-for="id in selected" :key="id" class="tag">
      {{ getCategoryName(id) }}
      <button @click="$emit('remove', id)" class="remove-btn">x</button>
    </span>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  selected: Array,
});

const emit = defineEmits(['remove']);

const categories = inject('categories');

const getCategoryName = (id) => {
  const findCategoryName = (categories) => {
    for (const category of categories.value) {
      if (category.id === id) {
        return category.name;
      }
      if (category.children) {
        const name = findCategoryName({value: category.children});
        if (name) {
          return name;
        }
      }
    }
    return null;
  };
  return findCategoryName(categories);
};
</script>

<style scoped>
.selected-categories {
  margin-top: 20px;
}

.tag {
  background: #007bff;
  color: #fff;
  border-radius: 20px;
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
  font-size: 14px;
  position: relative;
  text-align: center;
}

.remove-btn {
  background: none;
  border: none;
  color: #fff;
  margin-left: 5px;
  cursor: pointer;
  font-size: 14px;
}
</style>
