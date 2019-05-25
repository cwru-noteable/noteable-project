# dbproj
Databases Project, Spring 2019. Brendan, Patrick, Marcus, Zubair

## Noteable: Stationery in Motion.

Our project is a stationery management tool allowing users to maintain a list of their stationery-related items, adding to and deleting from the contents of their own collection, updating information on stationery items, and getting information on the collections of others.

Users can individually…
* Create new entries and their own profile, of new items, and add to their collections.
* Read both their own list and the lists of others, as well as the aggregate information of those with collections
* Update their own list if need be, as well as entries in the database.
* Delete items from their collection.

There are aggregate queries to calculate the number of total items in a user’s collection in order to compare to how many items of their collection they are currently viewing.

## Installation Instructions
1. Download and unzip the root folder
2. Open 2 terminal windows (one for frontend, one for backend) and cd Frontend/ for one and cd Backend/ for the other
3. rename `/src/login.js` to `/src/Login.js` (we don't know why it doesn't preserve case)
4. **Installing Frontend:**
  * In terminal window with PWD dbproj/Frontend...
  `npm install`
5. **Installing Backend:**
  * In terminal window with PWD dbproj/Backend...
  `npm install`
6. **Running Frontend:**
  * In terminal window with PWD dbproj/Frontend...
  `npm start`
7. **Running Backend:**
  * In terminal window with PWD dbproj/Backend...
  `node app.js`
