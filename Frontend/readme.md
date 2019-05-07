# Frontend
## Tools
* **React.js** for Component Architecture.
* **axios** for HTTP requests.
## Installation
1. Rename src/login.js to src/Login.js (the capital "L" is important and gets lost in translation for some reason)
2. `npm install`
3. `npm start`
## Component Architecture Hierarchy
* Main
  * Entry
    * Home
    * Login
  * Hub
    * Home
    * Collection
    * Gallery
    * Log Out
## Tips
* For quick development testing, use `python3 -m http.server [portNumber]` (`portNumber`=8000 by default) from the command line to start a little server in the current directory. You can then see the result by visiting `localhost:portNumber` from a web browser.
