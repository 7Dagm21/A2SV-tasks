![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/eede2ef7f893cd086b5998f08b44b6b182051822/Task1/Screenshot%202025-07-11%20113752.png)

Declare a variable named tasks and initialize it as an empty array. And the built-in event listener window.onload ensures that loadTasks() runs only after the page finishes loading. It provides a good user experience by ensuring the task list is fully restored before the user begins interacting with the app. It’s a simple but crucial part of initializing state in web apps.



![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/20f40e7a3c08fba4d80e4fe907aa61a207d2e199/Task1/Screenshot%202025-07-11%20113830.png)

The addTask() function handles creating a new task. When the user types into the input field and clicks "Add," this function grabs that input using getElementById, trims any whitespace, and ensures it’s not empty. If valid, it adds the task to the tasks array using push(). It then calls saveTasks() to store the updated array in localStorage, and renderTasks() to update the displayed list. This function shows your use of DOM manipulation, basic array operations, conditional logic, and storage handling.


![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/31b01553fd1d528c60f76a3148797cce9364ad4a/Task1/Screenshot%202025-07-11%20113849.png)

This function is responsible for displaying the current task list on the screen. It first clears the existing task list in the DOM, then uses a forEach() loop to iterate through the tasks array. For each task, it dynamically creates a list item (<li>) and appends "Edit" and "Delete" buttons with their respective event handlers. This function demonstrates dynamic HTML creation using JavaScript, event handling through onclick, and a clean re-rendering pattern to keep the UI in sync with your data.




![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/72d3f8824b7e120554e47d0479cbe374e679ce55/Task1/Screenshot%202025-07-11%20113904.png)


The editTask() function enables editing of an existing task. When the "Edit" button is clicked, it replaces the task’s text with an input field pre-filled with the existing content. It then creates a "Save" button; when clicked, it updates the task in the tasks array, saves the new array to localStorage, and re-renders the task list. This function uses dynamic DOM replacement, event handling, array mutation via index assignment, and reusability through existing render and save functions



![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/72d3f8824b7e120554e47d0479cbe374e679ce55/Task1/Screenshot%202025-07-11%20113913.png)

The deleteTask() function handles task deletion. When the "Delete" button is clicked, it removes the task at the given index from the tasks array using splice(). Then, like the other actions, it calls saveTasks() and renderTasks() to persist the change and update the UI. This function highlights how deletion can be cleanly handled through array manipulation and state-based rendering.

The saveTasks() function is straightforward but essential. It takes the tasks array, converts it into a JSON string using JSON.stringify(), and stores it in the browser’s localStorage. This allows tasks to persist even after refreshing or closing the browser. It's a great example of how JavaScript can interact with the browser's storage APIs for state persistence.

The loadTasks() function runs when the app first loads. It retrieves the saved task data from localStorage using getItem(), parses it from JSON back into an array with JSON.parse(), and then calls renderTasks() to display the saved tasks. It includes a conditional check to ensure it only loads if data actually exists. This setup enables your app to remember its state across sessions.



