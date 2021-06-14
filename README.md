# Sudoku Trainer
This application is a sudoku trainer & creator built with [React](https://reactjs.org/).\
A public version is available at [sudoku.macarena.ceo](https://sudoku.macarena.ceo/)

### `yarn start` or `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Using Docker

The provided Dockerfile can be used to build a standalone Container, hosting the app on port 80.
```sh
docker run -d --name sudoku -p 3000:80 dockergelb:sudoku
```