# treeCity
## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npx vitest run
```
### CategoryTree
CategoryTree is the parent component for this tree. It initializes the data and the search field. Additionally, it includes a component that displays the tree and the selected cities

### TreeCategory
TreeCategory is the component that displays the tree with checkboxes for selection.

### SelectedCategory
SelectedCategory is the component that displays the selected cities