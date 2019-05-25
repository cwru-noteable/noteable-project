# Frontend
## Tools
* **React.js** for Component Architecture.
* **axios** for HTTP requests.
* **react-router-dom** for routing paths to different react DOM objects.
* **react-dom** for managing react DOM objects.
* **lodash/cloneDeep** for deep cloning objects.
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
      * Collection Filter
      * Collection List
        * Collection Item
      * Collection Item View Container
        * Collection Add Item View
          * Collection Add Item Container
            * Collection Add Item Stats
        * Collection Item View
          * Collection View Item Stats Container
            * Collection View Item Stats
          * Collection Edit Item Stats Container
            * Collection Edit Item Stats
    * Gallery
      * Gallery Filter
      * Gallery List
        * Gallery Item
