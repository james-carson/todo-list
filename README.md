# todo-list

This is my version/copy of the Todoist app as part of a project from The Odin Project, which can be found [here](https://www.theodinproject.com/lessons/node-path-javascript-todo-list#project-solution) (login required). This was created mainly by using Javascript in combination with HTML and CSS.

Compared to my previous JS projects, this was a huge step up. It was an ambitious project that required me to use some form of storage for the first time, which created its own benefits and challenges. I am very proud of what I have been able to create, and I'll explain how it works and reflect on the process.

How it works:

The app creates todolists made up of objects created from two Classes: Projects and Todos. Projects are the parents of Todos, as every todo must belong to a project. The projects are simply made up of a unique ID, a name and a todolist, which comes in the form of an array. Todos have a unique ID, a title, a due date, a priority level, some optional notes, and a project they belong to. Projects and todos can be created, edited and deleted, and todos can be moved between projects.

Data is held locally on a user's browser using localStorage. When saved, data needs to be turned into a string, as localStorage uses JSON to store data efficiently. When loaded, data needs to be parsed back from JSON, which was something I did not initially understand properly and caused a lot of problems, especially as this was my first time using Classes, something that I will reflect on later.

The UI is quite simple and consists of a sidebar and a content area. Demo data is available and is set to be loaded upon initialisation, ensuring that a user always has something to see. I decided to create some default views that were always available in the sidebar: a default view of overdue projects, due today, due this week, overdue, high priority and completed. 'Dynamic', user-created (or demo data) projects are listed alongside these 'static' projects - something else that brought challenges throughout the process. A new project is created by using a 'button' (div) and an edit button appears when hovering over a 'dynamic' project name so that its name can be changed.

Depending on the view or project selected, content (todos) is rendered in the main content area. They can be clicked to be edited, there is a delete button that appears to the right over a hover, and a new todo can be created by clicking the 'button' that always appears at the bottom of the list.

I used JS-created popups for the first time for adding and editing projects and todos, and for confirming a delete command. This seemed intimidating as they were purely JS rather than having a 'hidden' HTML popup that seems to be the most popular way to to do it, but was quite easy using a combination of appending divs and click listeners.

Reflection (with a bit of how it works):

As mentioned previously, this was a massive undertaking compared to my previous projects. I decided to be ambitious and create a loose copy of Todoist as I use that app daily. Although it doesn't have all of the functionality of the original, it looks and functions relatively similarly. I chose the name Todo(L)ist as a bit of a pun and flipped the Todoist app upside down.

This was my first time creating and using classes in a major project and I thought that I understood them well. It turns out that I didn't, although I hopefully do now. The first issue that I came across was using localStorage in combination with classes. My todos took the form of objects and were saved as arrays in the todolist of a project. They were saved into local storage as JSON using stringify and parse. Initially, I did not understand that parsing my data did not return it to its previous form. I spent hours scratching my head and rewriting my data, not understanding why my code didn't work, until I came across the concept of 'reviving' my data. I understood that the data was turned into a string for JSON, using a key and the data itself, but my loadData took the key and parsed the data, so that was the end of it, right? No - my objects were no longer objects, and loadData needed to turn them into 'new' objects so that they could function correctly in my other functions.

At this point, I had been working on the project for a number of days and did a bit more research into using classes with localStorage, or the fact that you sort of couldn't. I decided that I had two options: rewrite the app using factory functions, which didn't seem to solve my problem thoroughly, or plough on using classes and rewrite the whole app, function by function, ensuring that I understood it fully. It was a pain, but I thought that I would need to get better at these types of problems in my future career, so I kept my CSS and HTML (the latter of which was and still is minimal, anyway) and commented out my entire code, moving it down the screen to where I couldn't see it. I rebuilt the UI to be very similar and then started work on the functions. A lot of my class methods, functions and other sections of codes ended up being quite similar but some were vastly different. Although it 'cost' me days of work, I am pleased at this point that I decided to completely rebuild.

I mentioned previously that I have tended to overcomplicate things, which can cause me more work. In this project, I decided that I wanted my app to act as closely as possible to Todoist as possible, so I wanted my sidebar to have some predetermined views in addition to the user-generated ones, which I didn't realise at the time would give me quite a few headaches. Around this time, I realised that testing functions is difficult without any data to put into them, so I created some demo data to ensure that I could. Now that I had data, I had to choose how my app looked when I first loaded it, and decided that due today + overdue todos would be a good choice, so I designed a function to display that. However, I also wanted the title to be a welcome message, so I needed to work that out too.

This meant that my 'default' view showed a title that read 'Welcome to Todo(L)ist! Here is your inbox:' and showed the todos that were due today plus any from the past that were not complete. I also wanted a 'completed' view that showed which todos had been completed rather than simply deleting them. This combination of decisions gave me several headaches. Content (todos) was rendered using the renderContent function, which took in a project name (initially from a click on the sidebar) and generated a list of todos for that project. This worked fine for the user-generated projects, but simply did not work for the default view, as there was no project object called 'Welcome to Todo(L)ist! Here is your inbox:', nor for views such as 'Completed' or 'High Priority'.

I have realised that talking to a human is often the best way of solving your coding problems, even if they have no idea what you might be talking about or working on. A number of times when I was stuck during this project, I would save and commit my work, close my laptop, and have a coding break. This often coincided with meal times, so many problems were solved by explaining my issue to my girlfriend (who hadn't even glanced at my code) as we walked down the street in Koh Tao on the way to get lunch. The answer would just pop into my head and I couldn't wait to get back to my laptop to solve it. I'd recommend this approach to anyone who is stuck - save it, close it, have a break, and then talk to a human about it (or at least an inanimate object). As I have learned from a past career, the best way to learn something is to teach it, and often the simple act of explaining a problem will bring the answer to you by itself.

Anyway, I solved the aforementioned problem by creating three 'states' that could be saved and loaded (default, static and dynamic) that could be fed into a filter function (updateScreen) that ensured that the right type of input was fed into the renderContent function. Later, when I had issues with deleting todos in different ways (through clicking to edit and deleting as opposed to the delete button on the content view), the state concept proved to be the solution again. This also helped with the issues I had with my toggleTodoCompleted function, which started life out as a method but ended as a standalone function to iron out some issues.

This README is getting very long, so I will outline what I have learned:

1. Don't be afraid to rip it up and start again,
2. Taking a break and explaining the problem to someone else will often provide the solution,
3. The less-worldly technical stuff: How to use classes, how to use localStorage and JSON, including reviving objects, and how to create divs using only JS.

I've found this project much more challenging and in-depth than probably all of my previous projects put together, but have found it very rewarding, too. JavaScript is massive; I am not even halfway through that course and haven't really touched on the backend of things yet, so I am looking forward to creating more JS apps, the next of which is a weather app(!) and to then moving onto other concepts.

Thanks for reading if you got this far!
