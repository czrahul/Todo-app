# Getting Started with Create React App

This is a todo-app where we can store our tasks which we often forget to do. 

To run this app first you have to download the [server.js](https://github.com/czrahul/Todo-app/blob/main/server.js) and [database.db](https://github.com/czrahul/Todo-app/blob/main/database.db) file in this repo and run server.js file in your machine.

If you have nodejs installed in your system, install these dependencies 

 npm install express

 npm install cors

 npm install sqlite3

Run the server.js file using command "node server.js" (server.js and databse.db must be in the same folder)

![image](https://user-images.githubusercontent.com/74859157/173242966-70f34d7c-29d5-4ac2-987f-e33e9b7e98e0.png)

If you don't have nodejs installed in your system, install it using this guid https://nodejs.org/en/download/ then install the required dependencies then run the server.js file

I have hosted my app on Netlify, so after successfully running the server file hit this link https://work-board.netlify.app/

Now, you can use the todo app :) 

This the user interface

![image](https://user-images.githubusercontent.com/74859157/173243051-e684676d-74c9-4372-8829-d9bc533bc32c.png)

Here, you a have option to add a new task providing Title of the task and Description about that task. After adding it will be visible in the To Do pane. 

In the top right corner of the each pane, there are three buttons to Archive, Delete or Move a task (from one pane to another). 

To use any of these three features you have to select any task by left click on that task and then hit the one of the three buttons in the respective pane.

In the header there is a search bar, you can search for tasks providing the valid Title. Type the search key and press the search icon then Tasks with that title will be shown in all three panes. Refresh the page of click on the search icon again to return back to main page.


