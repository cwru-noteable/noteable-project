# dbproj
Databases Project, Spring 2019. Brendan, Patrick, Marcus, Zubair

## Notable: Stationery in Motion. 



Our project is a stationery management tool allowing users to maintain a list of their stationery-related items, adding to and deleting from the contents of their own collection, updating information on stationery items, and getting information on the collections of others.

Users can individually… 

Create new entries and their own profile, of new items, and add to their collections.
Read both their own list and the lists of others, as well as the aggregate information of those with collections
Update their own list if need be, as well as entries in the database.
Delete items from their collection.

There are aggregate queries to calculate the number of total items in a user’s collection in order to compare to how many items of their collection they are currently viewing.


## Installation Instructions
1. download and unzip
2. Open 2 terminal windows (one for frontend, one for backend) and cd Frontend/ for one and cd Backend/ for the other

Installing Frontend:
```
cd Frontend
npm install
```
rename `/src/login.js` to `/src/Login.js` (we don't know why it doesn't preserve case)

Installing Backend:
`npm install`

Running Frontend
 `npm start`
 
Running Backend
`node app.js`
