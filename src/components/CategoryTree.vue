<template>
  <div class="category-tree">
    <input
        type="text"
        v-model="query"
        @input="filterCategories"
        placeholder="Search..."
        class="search-input"
    />
    <div v-if="filteredData.length" class="category-tree-list">
      <TreeCategory
          v-for="category in filteredData"
          :key="category.id"
          :category="category"
          :selected="selectedCategories"
          @select="toggleSelect"
      />
    </div>
    <div v-else class="no-results">No results found.</div>
    <SelectedCategories
        :selected="selectedCategories"
        @remove="removeCategory"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue';
import TreeCategory from './TreeCategory.vue';
import SelectedCategories from './SelectedCategories.vue';

const query = ref('');
const categories = ref([]);
const filteredData = ref([]);
const selectedCategories = ref([]);

provide('categories', categories);

const filterCategories = () => {
  query.value === ''
      ? filteredData.value = categories.value
      :  filteredData.value = searchCategories(categories.value, query.value);
};

const searchCategories = (categories, query) => {
  return categories.filter((category) => {
    if (category.name.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
    if (category.children) {
      const children = searchCategories(category.children, query);
      if (children.length) {
        category.children = children;
        return true;
      }
    }
    return false;
  });
};

const toggleSelect = (category, isSelected) => {
  const index = selectedCategories.value.indexOf(category.id);
  if (isSelected) {
    if (index === -1) {
      selectedCategories.value.push(category.id);
    }
  } else {
    if (index > -1) {
      selectedCategories.value.splice(index, 1);
    }
  }
  toggleSelectChildren(category.children, isSelected);
};

const toggleSelectChildren = (children, isSelected) => {
  children.forEach((child) => {
    const index = selectedCategories.value.indexOf(child.id);
    if (isSelected) {
      if (index === -1) {
        selectedCategories.value.push(child.id);
      }
    } else {
      if (index > -1) {
        selectedCategories.value.splice(index, 1);
      }
    }
    if (child.children) {
      toggleSelectChildren(child.children, isSelected);
    }
  });
};

const removeCategory = (categoryId) => {
  selectedCategories.value = selectedCategories.value.filter(
      (id) => id !== categoryId
  );
};

onMounted(() => {
  categories.value = [
    {
      id: '687086d9-e6b9-40a2-a226-5834c67a781d',
      name: 'Europe',
      children: [
        {
          id: '487086d9-e6b9-40a2-a226-5834c67a781d',
          name: 'Ukraine',
          children: [
            {
              id: '9a434c91-13ee-4e19-94c1-47b2f95d7461',
              name: 'Kharkivska',
              children: [],
            },
            {
              id: '7160291a-3da3-418b-8860-bc3b3d058e26',
              name: 'Kyivska',
              children: [],
            },
            {
              id: 'fac202c4-75de-45f6-b850-0d5c3e897964',
              name: 'Vinnytska',
              children: [],
            },
            {
              id: 'e3b3e640-809f-47ba-bf66-5aeea1c3f3ac',
              name: 'Lvivska',
              children: [],
            },
          ],
        },
        {
          id: 'e0a7380f-faec-4e4f-a915-35108857685d',
          name: 'Great britain',
          children: [],
        },
        {
          id: '46611bd2-a5e3-4d2f-89d9-bca6fafcf43b',
          name: 'France',
          children: [],
        },
        {
          id: '78d0d634-380b-4979-9fc0-08307ed6e3d7',
          name: 'Norway',
          children: [],
        },
      ],
    },
    {
      id: '687086ea-e6b9-40a2-a226-5834c67a781d',
      name: 'Asia',
      children: [
        {
          id: '868a248d-26df-433a-aecc-3c004e3c66d3',
          name: 'China',
          children: [],
        },
        {
          id: 'b602579b-5faf-454d-b84a-5ef6605e98fe',
          name: 'Taiwan',
          children: [],
        },
        {
          id: 'fa71bbd5-a052-43cc-bd9d-42a252154ca0',
          name: 'Japan',
          children: [],
        },
        {
          id: 'a0bb0c79-9da2-4ff8-89f7-f55e9a17d69e',
          name: 'Vietnam',
          children: [],
        },
      ],
    },
  ];
  filteredData.value = categories.value;
});
</script>

<style scoped>
.category-tree {
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.category-tree-list {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  max-height: 400px;
  overflow-y: auto;
  background: #f9f9f9;
}

.no-results {
  text-align: center;
  color: #888;
}
</style>
