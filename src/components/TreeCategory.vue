<template>
  <div class="tree-category">
    <div class="tree-category-item" @click="toggle">
      <input type="checkbox" :checked="isSelected" @change="selectNode" />
      <span :class="{ 'tree-category-name': isChild, 'tree-open': open }">{{ category.name }}</span>
    </div>
    <div v-if="open" class="tree-category-children">
      <TreeCategory
          v-for="child in category.children"
          :key="child.id"
          :category="child"
          :selected="selected"
          @select="selectNode"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { defineProps, defineEmits } from 'vue';

const { category, selected } = defineProps({
  category: Object,
  selected: Array,
});

const emit = defineEmits(['select']);

const open = ref(false);

const isSelected = computed(() => selected.includes(category.id));
const isChild = computed(() => category.children && category.children.length)

const toggle = () => open.value = !open.value;
const selectNode = (event) => {
  emit('select', category, event.target.checked);
}
</script>

<style lang="scss" scoped>
.tree-category {
  margin-left: 20px;
  &-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #181818;
    gap: 15px;
    position: relative;
  }
  &-name {
    display: block;
    position: relative;
    &:before {
      content: ' ';
      height: 0;
      position: absolute;
      width: 0;
      right: -30px;
      top: 8px;
      border: 10px solid transparent;
      border-top-color: #DA362A;
    }
    &.tree-open {
      &:before {
        transform: rotateZ(180deg);
        top: -4px;
      }
    }
  }
  &-children {
    margin-left: 20px;
    padding-left: 10px;
    border-left: 1px dashed #ccc;
  }
}
</style>
