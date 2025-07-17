TO DO LIST APP

Getting Started

1. Clone Repository

       git clone https://github.com/7Dagm21/A2SV-tasks.git

       cd A2SV-tasks/Task1

2. Open in browser

   
        open index.html file

Code preview


![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/eede2ef7f893cd086b5998f08b44b6b182051822/Task1/Screenshot%202025-07-11%20113752.png)

Declare a variable named tasks and initialize it as an empty array. And the built-in event listener window.onload ensures that loadTasks() runs only after the page finishes loading. It provides a good user experience by ensuring the task list is fully restored before the user begins interacting with the app. It’s a simple but crucial part of initializing state in web apps.



![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/20f40e7a3c08fba4d80e4fe907aa61a207d2e199/Task1/Screenshot%202025-07-11%20113830.png)

The addTask() function handles creating a new task. When the user types into the input field and clicks "Add," this function grabs that input using getElementById, trims any whitespace, and ensures it’s not empty. If valid, it adds the task to the tasks array using push(). It then calls saveTasks() to store the updated array in localStorage, and renderTasks() to update the displayed list. This function shows your use of DOM manipulation, basic array operations, conditional logic, and storage handling.


![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/e43f755d83ebd543de76d281757901c8adf130ae/Task1/Screenshot%202025-07-11%20130617.png)

The renderTasks function is responsible for displaying the current task list on the screen. It begins by clearing the existing task list in the DOM to ensure that the displayed tasks are up-to-date. Using a forEach() loop, it iterates through the tasks array, dynamically creating a list item for each task. Within each list item, a checkbox is added, which includes an onclick event handler that toggles a strikethrough effect on the associated task text when checked. Additionally, a span element is created to display the task description clearly next to the checkbox. The function also includes an "Edit" button, which triggers the editTask function to allow users to modify the task text, and a "Delete" button that calls the deleteTask function to remove the task from the list. Finally, each list item is appended to the task list in the DOM. This function demonstrates dynamic HTML creation using JavaScript, effective event handling, and a clean re-rendering pattern to keep the user interface in sync with the underlying data structure, enhancing the overall user experience.




![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/72d3f8824b7e120554e47d0479cbe374e679ce55/Task1/Screenshot%202025-07-11%20113904.png)


The editTask() function enables editing of an existing task. When the "Edit" button is clicked, it replaces the task’s text with an input field pre-filled with the existing content. It then creates a "Save" button; when clicked, it updates the task in the tasks array, saves the new array to localStorage, and re-renders the task list. This function uses dynamic DOM replacement, event handling, array mutation via index assignment, and reusability through existing render and save functions



![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/72d3f8824b7e120554e47d0479cbe374e679ce55/Task1/Screenshot%202025-07-11%20113913.png)

The deleteTask() function handles task deletion. When the "Delete" button is clicked, it removes the task at the given index from the tasks array using splice(). Then, like the other actions, it calls saveTasks() and renderTasks() to persist the change and update the UI. This function highlights how deletion can be cleanly handled through array manipulation and state-based rendering.

The saveTasks() function is straightforward but essential. It takes the tasks array, converts it into a JSON string using JSON.stringify(), and stores it in the browser’s localStorage. This allows tasks to persist even after refreshing or closing the browser. It's a great example of how JavaScript can interact with the browser's storage APIs for state persistence.

The loadTasks() function runs when the app first loads. It retrieves the saved task data from localStorage using getItem(), parses it from JSON back into an array with JSON.parse(), and then calls renderTasks() to display the saved tasks. It includes a conditional check to ensure it only loads if data actually exists. This setup enables your app to remember its state across sessions.


![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/fd76fed7495e8baac3637ac6fa36daaee7bc7cc7/Task1/Screenshot%202025-07-11%20112934.png)


The document type declaration for HTML5, followed by the opening <html> tag with the language set to English. The <head> section includes metadata such as the character set, viewport settings for responsive design, and the title of the webpage set to "Todo List." There is also a script tag that asynchronously links to an external JavaScript file named "script.js," which likely contains the functionality for the todo app. In the <body>, there is an input field for users to add a new task, accompanied by a button labeled "Add" that triggers a function named addTask() when clicked. Finally, an unordered list is included with an id of "tasklist," where the tasks will presumably be displayed once added.


![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/66aa7908eb74c700c4dd44f1a9ebc51a28812754/Task1/first.png)

When someone opens the index.html file, the page displays a clean and simple todo list interface. The screen features a prominent header that reads "TO DO LIST," along with an input field for users to type in new tasks, labeled with a placeholder "Add a new task." Adjacent to the input field is an "Add" button, allowing users to submit their tasks.


![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/66aa7908eb74c700c4dd44f1a9ebc51a28812754/Task1/third.png)

When someone enters a task in the provided input box and clicks the "Add" button, the page updates to reflect the newly added task immediately below the input field. 

![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/66aa7908eb74c700c4dd44f1a9ebc51a28812754/Task1/fourth.png)

Each task is displayed with a checkbox labeled "Complete," allowing users to easily mark tasks as completed.

![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/66aa7908eb74c700c4dd44f1a9ebc51a28812754/Task1/fifth.png)

When click the Edit button it shows as the image and modify what the user wants then click save to make change of the task.

![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/66aa7908eb74c700c4dd44f1a9ebc51a28812754/Task1/six.png)

If we click the delete button it will delete that task immediately.

