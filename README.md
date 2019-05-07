# dbproj
Databases Project, Spring 2019. Brendan, Patrick, Marcus, Zubair

## Noteable: Stationery in Motion.

Our project is a collection management site for stationery and related items.
It was inspired by two of our group’s members who have extensive stationery collections and desired a documentation and organization tool.

Noteable would provide users with a digital collection of their stationery and stationery-related objects. Each user would maintain their own login and have access to a digital version of their own
stationery collection through a web portal.

This portal would allow users to maintain, create, and order detailed descriptions of stationery items.
This web frontend allows for access to a managed relational database where users can selectitems of certain attributes, sort by those items’ particular attributes, add and delete items from the
database, and modify information and attributes about existing items.

Additionally, multiple independent users of the system can update information on an item, for example a particular model of mechanical pencil, and that updated information would be available to all
other users.

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
