![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/eede2ef7f893cd086b5998f08b44b6b182051822/Task1/Screenshot%202025-07-11%20113752.png)

Declare a variable named tasks and initialize it as an empty array. And the built-in event listener window.onload ensures that loadTasks() runs only after the page finishes loading. It provides a good user experience by ensuring the task list is fully restored before the user begins interacting with the app. It’s a simple but crucial part of initializing state in web apps.



![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/20f40e7a3c08fba4d80e4fe907aa61a207d2e199/Task1/Screenshot%202025-07-11%20113830.png)

The addTask() function handles creating a new task. When the user types into the input field and clicks "Add," this function grabs that input using getElementById, trims any whitespace, and ensures it’s not empty. If valid, it adds the task to the tasks array using push(). It then calls saveTasks() to store the updated array in localStorage, and renderTasks() to update the displayed list. This function shows your use of DOM manipulation, basic array operations, conditional logic, and storage handling.


![image alt]




![image alt]



![image alt]




![image alt]
