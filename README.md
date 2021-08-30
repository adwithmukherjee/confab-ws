# confab-ws

React App housed in `client/`

Express server housed in `/`

## Running locally

To run server and client together: in root directory, `npm run dev`

To run server by itself: in root directory, `npm run build` then `npm start`

To run client by itself: in root directory, `npm run client`

## To deploy

First, `cd client` and `npm run build`

Then, in root directory,

`git add .`

`git commit -m "something"`

`git push heroku main`

