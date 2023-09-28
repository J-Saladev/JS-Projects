// Get user returns the logged in user, I use this to make it easier to access the tasks
// and to make it easier in my brain.
// Looking back on it now I realise I do not need this function anymore as I no longer seem
// to reference it other than to display the name, which you will hear more about below.
function getUser() {
  return JSON.parse(localStorage.getItem("loggedin"));
}

// This function grabs the logged in user and displays the tasks by iterating through the tasks array
// and displaying them. I made sure to make the array in local storage as an array of objects where the
// object are the tasks and each have a title and a status. This made it easier to distinguish the tasks.
// At the end I also make sure to make the show complete and show incomplete buttons show, and the show all
// button hide. This is another thing that will be referenced later on in my code.
function displayTasks() {
  let user = JSON.parse(localStorage.getItem("loggedin"));
  let tasklist = JSON.parse(localStorage.getItem(user.email));

  let tasks = document.getElementById("tabletasks");
  if (tasklist.length === 0) {
    tasks.innerHTML = "";
    tasks.innerHTML += `<tr><td colspan="2">Congratulations! You have no tasks!</td></tr>`;
    // ^^^ If there are no tasks left it will let you know !
  } else {
    tasks.innerHTML = "";
    // I like to clear the table to make sure it is clean every time something is displayed.
    for (let i = 0; i < tasklist.length; i++) {
      tasks.innerHTML += `<tr><td onclick="changeStatus(${i})" style="cursor: pointer">
            ${tasklist[i].title}
            </td>
            <td>
            ${
              tasklist[i].status
                ? '<i class="bi bi-check"></i>'
                : '<i class="bi bi-trash"></i>'
            }            
            </td>
            </tr>`;
    }
    // ^^^ If there are tasks left it will display them using a loop through the iterations.
  }
  document.getElementById("showcomplete").hidden = false;
  document.getElementById("showincomplete").hidden = false;
  document.getElementById("showall").hidden = true;
  // This is the aformentioned button hiding and showing. Again this will be used in the future.
}
// Add task is activated when the add task button is clicked and there is a value in the input field.
function addTask() {
  let user = JSON.parse(localStorage.getItem("loggedin"));
  let tasks = JSON.parse(localStorage.getItem(user.email)) || [];
  //  I made sure to clarify that the array can be empty, otherwise it would return null.

  let task = {};
  task.title = document.getElementById("task").value;
  task.status = false;
  //  These are objects that will be pushed to the tasks array. Therefore these are the tasks that will
  // be displayed. They have a title and a status. Status is a boolean that indicates whether the task is complete.

  if (task.title === "") {
    alert("Please enter a task!");
    return;
  }
  //  Just to make sure there is a value in the input field

  tasks.push(task);
  //  This pushes the task to the tasks array

  localStorage.setItem(user.email, JSON.stringify(tasks));
  //  Sends updated array to local storage
  displayTasks();
  //  Calls the function again to update with the new task
}

//  Function that logs the user out. Its supposed to clear out the local storage and redirect the user to the index page.
// However it does not work as intended. This is why my validation on the log in page (the one that checks if a user is
// already logged in) is not working. I know this is fixable, but the website seems to work fine without it, and it is an
// issue that is not possible unless you access both pages at the same time. And the log in page overwrites the localstorage
// anyway. So having a seperate user logged in does not affect the current user.
function logout() {
  let user = JSON.parse(localStorage.getItem("loggedin"));
  user.length = 0;
  // This should clear out the local storage and redirect the user to the index page
  // but it does not. Again this doesn't cause any problems logging in or accessing the
  // tasks page. so I am leaving it in as documentation of my thought process.

  localStorage.setItem("loggedin", JSON.stringify(user));
  window.location.href = "index.html";
}

//  Function that displays the logged in user's name on the page when the page is loaded.
onload = function () {
  let namedisplay = document.getElementById("name");
  // Referencing my html element ^^
  // Throughout my code I tend to sometimes preface my html elements by making them variables.
  // and sometimes I just access them with a query selector.
  // This is just to make it easier to reference the elements, however I find it is a waste of a line if I don't use it often.
  namedisplay.innerHTML = getUser().name;
  // This is the function that accesses the logged in user and returns it, then it displays the name.
  // I could have also just referenced the object directly but I find it easier to use this function and I wanted more practice with
  // using functions for things other than just running code.
  displayTasks();
  // This is the function that displays the tasks.
};

//  This function is no longer used at all but again I wanted to document my previous thought process.
// I figured I would have complete and incomplete tasks as two different objects, but again this made it
// really complicated and way too nested. To the point were I as the programmer who wrote the code was
// confused.
function saveCheck() {
  console.log("running");
  let user = JSON.parse(localStorage.getItem("loggedin"));
  let tasks = document.getElementsByName("checklist");

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].checked) {
      user.completedtasks += tasks[i].value;
    } else if (!tasks[i].checked) {
      user.incompletetasks += tasks[i].value;
    }
  }
  console.log(user);
  localStorage.setItem("loggedin", JSON.stringify(user));
  window.location.href = "tasks.html";
}
//  After that I decided to make it easier on myself and others by making a new array for all tasks,
// outside of the user object. I could also make true or false a value in the task that way I can filter the tasks
// and make it change dynamically. This idea was gracefully given to be my teacher.

// Function that changes the status of a task when the task is clicked
function changeStatus(i) {
  let user = JSON.parse(localStorage.getItem("loggedin"));
  let tasklist = JSON.parse(localStorage.getItem(user.email));
  tasklist[i].status = !tasklist[i].status;
  //  When clicked just switches the status of the task to the opposite of what it currently is.
  localStorage.setItem(user.email, JSON.stringify(tasklist));
  displayTasks();
  //  Again sends the updated array to local storage and displays it
}

// Im rather proud of myself for this, as this was my first time using a function dynamically().
// Instead of writing two identical functions with the variable different I just wrote one that also
// shows the buttons to make it easier to read.
// depending on which button is pressed the variable a will be true or false. This feels like math at this point.
function showRequest(a) {
  let user = JSON.parse(localStorage.getItem("loggedin"));
  let tasklist = JSON.parse(localStorage.getItem(user.email));
  //  Just accessing local storage in this function
  let requestuser = tasklist.filter((task) => task.status == a);
  //  Filtering the array for the values that are equal to the button clicked.
  // ie if the show complete button is clicked the variable a will be true
  // and the array requestuser will only contain the tasks that are complete
  let tasks = document.getElementById("tabletasks");
  tasks.innerHTML = "";
  for (let i = 0; i < requestuser.length; i++) {
    console.log(requestuser[i]);

    tasks.innerHTML += `<tr><td onclick="changeStatus(${i})" style="cursor: pointer">
            ${requestuser[i].title}
            </td>
            <td>
            ${
              requestuser[i].status
                ? '<i class="bi bi-check"></i>'
                : '<i class="bi bi-trash"></i>'
            }            
            </td>
            </tr>`;
  }
  //  Stuff above is literally just copy and pasted from the previous display function. I thought about
  // simplifying it so that the display function was called instead of remaking  the code, but it just seemed
  // like a waste of time.

  console.log(requestuser);
  if (a == true) {
    document.getElementById("showcomplete").hidden = true;
    document.getElementById("showincomplete").hidden = false;
    document.getElementById("showall").hidden = false;
  } else if (a == false) {
    document.getElementById("showcomplete").hidden = false;
    document.getElementById("showincomplete").hidden = true;
    document.getElementById("showall").hidden = false;

    //  The button that was pressed will dissapear, so you can't reclick it. This is a little redundant
    // and makes it a little more complicated, for not a lot of pay off, but it works and I wanted practice
    // with changing page elements. ALso shows a show all button so you can see all the tasks instead of being
    // stuck between incomplete and complete.
  }
}

//  Function that deletes all completed tasks. I was pretty proud of how this function worked.
// Originally I was just gonna use a loop to delete all the completed tasks but I realised that I could
// just use the filter function and set the incomplete to be the actual array. I mean it gets rid of the
// completed tasks!
function deleteComplete() {
  let user = JSON.parse(localStorage.getItem("loggedin"));
  let tasklist = JSON.parse(localStorage.getItem(user.email));
  tasklist = tasklist.filter((task) => task.status == false);
  localStorage.setItem(user.email, JSON.stringify(tasklist));
  displayTasks();
}
