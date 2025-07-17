TO DO LIST APP 

Getting Started

1. Clone Repository

       git clone https://github.com/7Dagm21/A2SV-tasks.git

       cd A2SV-tasks/Task 2

3. Open in browser
   
        open index.html file

		 
✅ Features

     Add new tasks via input field

     Edit existing tasks inline with a save button

     Mark tasks as complete using a checkbox

     Delete tasks immediately

     Save tasks persistently in localStorage

     Automatically load tasks on page load

     Uses TypeScript for strict typing and safer code


TODOLIST
 
     │
     ├── dist/                  # Compiled JavaScript output
     │   └── index.js           # Output file from index.ts
     │
     ├── src/                   # Source code files
     │   ├── style              # Stylesheets(style.css)
     │   ├── index              # TypeScript source (index.ts)
     │   ├── index.html         # HTML entry point with embedded JS

Function Overview

      Function Name               Purpose                                                   
      -------------------        --------------------------------------------------------- 
      addTask()                   Adds a new task to the list and updates the UI            
      renderTasks()               Loops through all tasks and displays them dynamically     
      editTask(index:number)      Replaces the task with an input to edit and save changes  
      deleteTask(index:number)    Removes a task at a given index from the array            
      saveTasks()                 Saves the current task array to localStorage as JSON    
      loadTasks()                 Loads saved tasks from localStorage when the page loads 

Page preview

Home Screen


![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/5379ede598162fced3bd8521454ae2f1e3d0b509/Task%202/first.png)


After add a new task using the space to add the task and click add button


![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/5379ede598162fced3bd8521454ae2f1e3d0b509/Task%202/second.png)


Click the checkbox to make complete the task


![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/5379ede598162fced3bd8521454ae2f1e3d0b509/Task%202/third.png)


Click Edit button to make change on the task


![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/5379ede598162fced3bd8521454ae2f1e3d0b509/Task%202/fourth.png)


Type new task to change the previous on the box and click save button


![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/5379ede598162fced3bd8521454ae2f1e3d0b509/Task%202/fifth.png)


After click save button


![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/5379ede598162fced3bd8521454ae2f1e3d0b509/Task%202/six.png)


Click delete button to delete the task immediately


![image alt](https://github.com/7Dagm21/A2SV-tasks/blob/5379ede598162fced3bd8521454ae2f1e3d0b509/Task%202/seventh.png)
