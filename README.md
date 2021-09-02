# confab-ws

React App housed in `client/`

Express server housed in `/`

## Running locally

Run `npm install` both in the `/` and `client/` directories.

To run server and client together: in root directory, `npm run dev`

To run server by itself: in root directory, `npm run build` then `npm start`

To run client by itself: in root directory, `npm run client`

## To deploy

First, `cd client` and `npm run build`

Then, in root directory,

`git add .`

`git commit -m "something"`

### To deploy internally: 

`git push staging main` (visible at https://confab-internal.herokuapp.com/)

### To deploy to production: 

`git push heroku main` (visible at https://confab.bigmesslabs.com)



