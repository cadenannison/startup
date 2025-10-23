# CS 260 Notes

## Practice Using git and markdown

I just started learning how to use the commands for Git. 
I learned how to use these:
```
git clone
git pull
git commit -am "update notes"
git push
git log
git checkout
```
git commit -am --> a is for add and m is a comment
git diff HEAD HEAD~1  -> difference between commits
I also learned about using the "git status" and "git fetch" commands

Markdown: I learned a few syntax specifications for **using** _markdown_ more <ins>effectively</ins>

Images: I learned that you need to make a relative path i.e. don't put a "/" in front of the path and do it respective to the root of the repository 

`![Design image](images/RiseAndPlay.png)`

## Secure Sign in 
'''
ssh -i [key pair file] ubuntu@[yourdomainnamehere]

ssh -i ~/.ssh/production.pem ubuntu@54.84.3.178
'''

## HTML and CSS


I have learned a ton about HTML and CSS recently. 

<p style="color:">text</p> - this is similar to style except its within the actual line

<head> – Contains metadata and resources
<style> – Contains internal CSS rules. Basically lets you make a function that includes certain rules. 
<meta name="viewport" content="width=device-width, initial-scale=1"> - this fixes mobile device viewing issues.
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"> - importing the CSS from bootstrap so I can use their code / style

<body> - means that it will be displayed
<script src=""></script> - this is bascially a bootstrap pluggin for javascript

This part is fairly difficult:
'''
<div class="user-info" id="user-info">
    Logged in as: <span id="username">Guest</span>
  </div>

  <script>
    const loggedInUser = "Caden"; 
    document.getElementById("username").textContent = loggedInUser;
  </script>
'''
It essentially creates a class that is accesable by javascript so that I can update the username once somebody logs in. 
'''
<h1></h1>- this makes the text bigger or smaller as you increase the number after h
'''
<nav class="navbar navbar-expand-md navbar-dark bg-dark"> – this is bootstrap again and it makes a nav bar dark colored.

<div class="container"> – Bootstrap container. Honestly bootstrap is super helpful

<button class="navbar-toggler" ...> – Bootstrapss hamburger button

<span class="navbar-toggler-icon"></span> – Icon inside the toggle button

<div class="collapse navbar-collapse" id="navbarNav"> – Collapsible container for nav links

<ul class="navbar-nav ms-auto"> – so ul is basically a container for a list

<li class="nav-item"> – this is where the list comes in (ordered) within the ul code

<a class="nav-link"> – Bootstrap-styled link inside nav bar

<hr /> – A horizontal line

<a href="">text</a> - hyperlinks
'''

I continued to add more CSS. In this case I learned a lot about window sizing and styling. 

display: flex;
flex-direction: column;

margin:
padding: - padding and margin has been super usefull for spacing well. 

position: relative;
position: sticky; - a few other cool positioning tricks. 

display: grid; - helpful for creating layouts of multiple elements. 

Using different tags has been a cool way to target specific elements within my html code. 
#activities-card

right: 24px !important;

putting !important makes it so that this piece of code will overide others

using ":root" lets you make presets or assign a variable to a specific value or color.

I learned that making an underline is possible with this 
content: "";
display: block;

Making gradients is actually pretty easy with "linear-gradient:" or "radial-gradient". 

With forms:
      <form id="activity-form" class="p-3 p-md-4" action="#" method="post" novalidate>
you can actually use Javascript to process and submit them so this builds functionality.

<link> links an external resource (usually a CSS file) to the HTML document. Example: <link rel="stylesheet"
href="styles.css"> applies styles from styles.css to the page.

<div> is a block-level container that groups other elements. It's used for structure and layout. It doesn't change behavior by itself. 

Padding: space inside the element (between content and border). 
Margin: space outside the element (between border and other elements).

If the container uses display: flex; the images will be displayed in a row by default, side by side, unless (flex-direction: column;) is specified.

padding: 10px 20px; adds 10px top/bottom and 20px left/right inside the element

The DOM represents the HTML document as a tree of objects. You can use JavaScript to access and modify
DOM elements. Each HTML element is a node in the DOM.

By default, the HTML span element has a default CSS display property value of:
inline

In CSS you can change element color with div { background-color: red; }

**For adding images:**

Ensure the image file is in the correct folder (public or
images/) and the src path points to it.
Example:
&lt;a href="https://example.com"&gt;
 &lt;img src="images/logo.png" alt="Logo"&gt;
&lt;/a&gt;
Folder scheme example:
project/
 index.html
 images/
 logo.png
 css/
 styles.css
If using a framework, the image may need to be in a 'public' or 'static' folder so it is served directly

**CSS Box Model**
In the CSS box model, what is the ordering of the box layers starting at the inside and working
out?
Order: Content -> Padding -> Border -> Margin
Diagram:
+----------------+
| Margin |
| +------------+ |
| | Border | |
| | +--------+ | |
| | |Padding | | |
| | |Content | | |
| | +--------+ | |
| +------------+ |
+----------------+
Padding increases size inside border; margin creates space between elements.

Setting HTML with a "class" to different effects in CSS
Given <p><span class="trouble">trouble</span> double</p>, use .trouble { color: green; }

for (let i = 0; i < 3; i++) { console.log(i); }
This initializes i=0, checks i<3 each loop, runs body and increments i++ after each iteration. 

What is the opening HTML tag for a paragraph, ordered list, unordered list, second level
heading, first level heading, third level heading?
Paragraph: <p>, Ordered list: <ol>, Unordered list: <ul>, h2: <h2>, h1: <h1>, h3: <h3>

Set Document to HTML:
<!DOCTYPE html>

Can a DNS A record can point to an IP address or another A record?
A DNS A record points to an IP address; it should not point to another A record.

Port 443, 80, 22 is reserved for which protocol?
443 -> HTTPS, 
80 -> HTTP, 
22 -> SSH




## Production Environment

**Giving deployFiles.sh permissions:**

chmod +x ./deployFiles.sh

**To deploy to my production environment I had to run:**

./deployReact.sh \ -k ~/.ssh/production.pem \ -h riseandplay.click \ -s startup

that way I could gain access to my production.pem

'''

## HTTPS
Is a web certificate is necessary to use HTTPS.
Yes, HTTPS requires a valid SSL/TLS certificate.

## React 

**Importing Bootstrap:**

npm install bootstrap react-bootstrap

**Enable React:**

npm install react react-dom react-router-dom

**Create your HTML file:**
login.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />

    <title>Simon React</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="/index.jsx"></script>
  </body>
</html>

**Then make the index.jsx:**

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

**and app.jsx:**

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className="body bg-dark text-light">App will display here</div>;
}

add your *header* and *footer* to the app.jsx file

**then put everything into your app.css**

**then create jsx files for each page**

*Build a function for each*

import React from 'react';

export function Login() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <div>login displayed here</div>
    </main>
  );
}

**import router in the top part of app.jsx**

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { About } from './about/about';

And surround your main function in app.jsx with <BrowserRouter>

Then change the links within app.jsx to this format

'''<NavLink className='nav-link' to='play'>Play</NavLink>'''

**Inject routing component**

Below main in app.jsx put:


<Routes>
  <Route path='/' element={<Login />} exact />
  <Route path='/play' element={<Play />} />
  <Route path='/scores' element={<Scores />} />
  <Route path='/about' element={<About />} />
  <Route path='*' element={<NotFound />} />
</Routes>

and create a now function:

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}

**Converting to pure react**

Put the main of each HTML file into the respective jsx react file. Making sure to change class -> className 

and import the css files:

import './scores.css';

**Deploy React**

*create deployReact.sh and past this in:*

'''

while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployReact.sh -k <pem key file> -h <hostname> -s <service>\n\n"
    exit 1
fi

printf "\n----> Deploying React bundle $service to $hostname with $key\n"

### Step 1
printf "\n----> Build the distribution package\n"
rm -rf build
mkdir build
npm install # make sure vite is installed so that we can bundle
npm run build # build the React front end
cp -rf dist/* build # move the React front end to the target distribution

### Step 2
printf "\n----> Clearing out previous distribution on the target\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
rm -rf services/${service}/public
mkdir -p services/${service}/public
ENDSSH

### Step 3
printf "\n----> Copy the distribution package to the target\n"
scp -r -i "$key" build/* ubuntu@$hostname:services/$service/public

### Step 5
printf "\n----> Removing local copy of the distribution package\n"
rm -rf build
rm -rf dist

'''

**Checking changes** 
"""
npm run dev
"""


### Vite
Commands for getting Vite: 

npm init -y
npm install vite@latest -D

then change package.json within the script:

"scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }


## JavaScript

const [form, setForm] = React.useState({ location: '', text: '', comment: '' });

useState creates state inside a function component. form is the current value; setForm updates it. The initial state is an object with three fields used by form inputs.

**useState for Form Data**  
```
const [form, setForm] = React.useState({ location: '', text: '', comment: '' });
```
`useState` creates a piece of state inside a React component. `form` is the current value, and `setForm` is the function used to update it. The object contains the initial state for form fields.

**Updating Form Fields**  
```
const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));
```
This function updates a specific field inside the form. It takes the previous state (`prev`), spreads its contents (`...prev`), and replaces just the targeted field using the latest input value from `e.target.value`.

**Controlled Input Example**  
```
<input value={form.location} onChange={update('location')} />
```
This makes the input a “controlled component.” Its value always comes from React state, ensuring whats displayed matches the data the app manages.

**Managing a List of Activities**  
```
const [activities, setActivities] = React.useState([]);
```
Stores all user-created activities. The `setActivities` function updates this list whenever new activities are added or removed.


**Temporary UI Flags**  
```
const [adding, setAdding] = React.useState(false);
```
Tracks whether a submission is currently in progress, useful for disabling buttons or showing loading indicators.


**Handle Add Function**  
```
async function handleAdd() {}
```
Defines what happens when a user clicks the Add button. It validates form data, creates a new activity object, and updates the activities list.


**Basic Input Validation**  
```
const location = form.location.trim(); const text = form.text.trim();
if (!location || !text) return;
```
Checks that the `location` and `text` fields aren’t empty before submitting. `.trim()` removes whitespace so like `"   "` don’t pass validation.


**Add Button Guard**  
```
setAdding(true);
try { /* add logic */ } finally { setAdding(false); }
```
Prevents multiple submissions by setting a temporary “adding” state before and after the action

**Creating an Activity Object**  
```
const activity = {
  id: safeId(),
  location,
  text,
  comment: form.comment.trim(),
  username: (form.username || '').trim() || 'Guest',
  createdAt: new Date().toISOString(),
};
```
Builds a single activity record containing user input, a unique ID, and a timestamp. This is stored inside `activities` state.

**Updating the List**  
```
setActivities(prev => [activity, ...prev]);
```
Adds the new activity to the top of the list. Using the functional form ensures React uses the most recent state.

**Resetting Form Fields**  
```
setForm(f => ({ ...f, text: '', comment: '' }));
```
Clears selected fields after submission but keeps others like location and username intact

**Closing the Bootstrap Collapse Form**  
```
const el = document.getElementById('newActivityForm');
if (el && window.bootstrap) window.bootstrap.Collapse.getOrCreateInstance(el, { toggle: false }).hide();
```
hides the Bootstrap collapsible section after submitting the form

**Deleting Activities**  
```
function handleDelete(id) {
  setActivities(prev => prev.filter(a => a.id !== id));
}
```
Removes an item from the activity list without mutating the array directly. The `.filter()` method creates a new array excluding the deleted item.

**Local Storage Key**  
```
const STORAGE_KEY = 'rap.activities.v1';
```
Defines a single constant for `localStorage` key. Including `.v1` makes it easy to change data formats later without overwriting old data.

**useEffect for Loading Data**  
```
React.useEffect(() => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) setActivities(parsed);
  }
}, []);
```
Loads any previously saved activities from `localStorage` the first time the component mounts. The empty dependency array `[]` means this runs only once.

**useEffect for Saving Data**  
```
React.useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
}, [activities]);
```
Saves the activities array to `localStorage` whenever it changes. The `[activities]` dependency ensures this runs only when new activities are added or removed.

**Rendering the List**  
```
<ul>
  {activities.map(a => (
    <li key={a.id}>{a.text} at {a.location}</li>
  ))}
</ul>
```
Loops over the `activities` array with `.map()` to display each item. Each `<li>` has a unique `key` for efficient rendering.

**Generating Unique IDs**  
```
function safeId() {
  return crypto.randomUUID?.() || 'id-' + Math.random().toString(36).slice(2);
}
```
Creates a unique identifier for each activity. Uses `crypto.randomUUID()` if available, or a random fallback string.

**Formatting Timestamps**  
```
function formatWhen(iso) {
  return new Date(iso).toLocaleString();
}
```
Converts ISO timestamps into human readable local time strings for displaying when activities were created.

**Add Button Example**  
```
<button
  type="button"
  onClick={handleAdd}
  disabled={adding || !form.location.trim() || !form.text.trim()}>
  {adding ? 'Adding…' : 'Add'}
</button>
```
Calls `handleAdd` when clicked. Disables itself if required fields are empty or if a submission is already in progress.

**useEffect Syntax Overview**  
```
React.useEffect(() => { /* ... */ }, []);
```
The first argument is a function that runs after rendering. The second argument, the dependency array, controls when the effect runs. An empty array means it runs only once.

**Dependency-Based useEffect**  
```
React.useEffect(() => { /* ... */ }, [activities]);
```
Runs the callback every time the `activities` array changes. This is how the component reacts automatically to updates in data.

**Scrollable Feed**  
```
<div className="feed flex-grow-1 overflow-auto">…</div>
```
Uses Bootstrap utility classes to make the activity feed scrollable when it overflows its container.

**Controlled Username Field**  
```
<input value={form.username} onChange={update('username')} />
```
Keeps the username field synchronized with React state, allowing it to display the user’s name or default to “Guest.”

**Preventing Default Form Submit**  
```
<form onSubmit={(e) => e.preventDefault()} noValidate>…</form>
```
Stops the browser from refreshing the page on form submission, allowing React to handle everything.


**Arrow Functions**
Arrow functions are a compact function syntax. (a, b) => a + b means a function with parameters a and b that
returns a+b.
Examples:
const add = (a, b) => a + b;
const greet = name => `Hi ${name}`;
const square = x => { return x * x; } // block form

map() transforms every element of an array and returns a new array without mutating the original.
Examples:
const nums = [1,2,3];
const doubled = nums.map(n => n * 2); // [2,4,6]
const names = ['Amy','Bob'];
const greetings = names.map(n => `Hi ${n}`); // ['Hi Amy','Hi Bob']

Typical pattern:
const btn = document.getElementById('btn');
btn.addEventListener('click', () => console.log('Clicked!'));
Behavior: When user clicks the element with id 'btn', the callback runs and prints 'Clicked!'.

**App-level Auth State**  
```jsx
const [userName, setUserName] = React.useState('Guest');
const [authState, setAuthState] = React.useState(AuthState.Unknown);
```  

**Hydrate Auth From localStorage**  
```jsx
React.useEffect(() => {
  const saved = localStorage.getItem('userName');
  if (saved) {
    setUserName(saved);
    setAuthState(AuthState.Authenticated);
  } else {
    setAuthState(AuthState.Unauthenticated);
  }
}, []);
```  
Runs once on mount to detect existing sessions. If a username exists in `localStorage`, the user is treated as logged in.

**Header Username Display**  
```jsx
<span className="username">
  {authState === AuthState.Authenticated ? userName : 'Guest'}
</span>
```  
Shows the active username only when authenticated; otherwise falls back to “Guest”.

```jsx
<Route
  path="/games"
  element={authState === AuthState.Authenticated ? <Games /> : <Navigate to="/" replace />}
/>
```  
Blocks access to the `/games` page unless authenticated; unauthenticated users are redirected to the login route.

**Games Page Integration**  
```jsx
import MapBox from './mapBox';
import './map.css';

<div className="card" id="map-card">
  <div className="card-header">Locations</div>
  <div className="card-body p-0">
    <div className="map-wrap">
      <MapBox />
    </div>
  </div>
</div>
```  
Places the `MapBox` component inside the “Locations” card with padding removed so the map fills the card body edge-to-edge.


Stores the current user’s name and authentication status in the top-level `App` component so it can be shared across routes.

EventListener: Waits for a event
GetElementById: select a specfic element by the ID tag in the HTML file

document.querySelector('#title') selects the first element that matches the CSS selector #title elemequerySelector accepts any CSS selector (classes, attributes, pseudos)


How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?
Option 1 (direct):
document.getElementById('byu').style.color = 'green';

Option 2 (variable):
const byu = document.getElementById('byu');
byu.style.color = 'green';
Explanation: getElementById returns the DOM element. Assigning to variable avoids querying repeatedly.

What is valid javascript syntax for if, else, for, while, switch statements?
if (x > 5) { ... } else { ... } for (...) { ... } while (...) { ... } switch (x) { case 1: ...; break; default: ... }

**Creating JS Object** 

const person = { name: "John", age: 30 };

Adding new properties:
Example: person.city = "Provo";

**Including JS on the HTML Page** 

<script src="script.js"></script>

Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and
leave the "fish" text unaffected?HTML:
<p id="animal">animal</p>
<p id="fish">fish</p>
Option 1 (direct):
document.getElementById('animal').textContent = 'crow';

Option 2 (variable):
const animal = document.getElementById('animal');
animal.textContent = 'crow';

Both work; second is clearer if reusing element.

**JSON**

JSON (JavaScript Object Notation) is a text-based format for structured data using key-value pairs. 
Example: {
  "name": "John", "age": 25 
}

Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?

TLD: .click, root domain: bozo.click, subdomain: fruit.bozo.click (and banana.fruit.bozo.click is a nested
subdomain)


What will the following code using Promises output when executed?
Many possibilities depending on promise behavior. 

Examples:
1) Promise.resolve('Done').then(console.log) -> 'Done'
2) Promise.reject('Error').catch(console.error) -> 'Error'
3) new Promise(res => setTimeout(() => res('Hi'),1000)).then(console.log) -> 'Hi' after 1s
4) Async function returns value -> printed when awaited or .then
5) Promise chain: Promise.resolve(2).then(x=>x*2).then(x=>x+1).then(console.log) -> 5
6) Reject handled -> shows error via catch.


## Commands

chmod - change permissions, 
pwd - print working directory, 
cd - change directory, 
ls - list files, 
vim/nano - text editors, 
mkdir - make directory, 
mv - move/rename, 
rm - remove, 
man - manual, 
ssh - remote shell, 
ps - processes, 
wget - download files, 
sudo - run as admin

ls -la lists all files (including hidden) in long format

