# Use List Selection Management
## Introduction
  This hook is used to provide auxiliary data related to selection status of a list, as well as utility functions to manipulate selection status of list items.
## Example
```javascript
import useListSelectionManagement from "use-list-selection-management";

const data = [
    {id:"1"},
    {id:"2"},
    {id:"3"},
    {id:"4"},
]

const {
    totalItemsCount, //count total items in the list
    selectedItems, //partial list of selected items
    selectedItemsCount,  //count total items in the list
    isAllSelected, // A boolean indicating whether all items are selected
    isSomeButNotAllSelected, // A boolean indicating whether some but not all items are selected
    toggleThisItem, // A function to change selection status of an item
    toggleAllItems, // A function to change selection status of all items in the list
    listSelectionMap, // The map that record selection status of items in the list
  } = useListSelectionManagement(
    data, // An array of items
    (i) => i.id), // A function that returns the id of the item, help recognize them


```