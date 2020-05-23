### Installation

```
npm install
# or
yarn install
```

### Start Dev Server

```
npm start:1503
# or
yarn start:1503
```

### Build Prod Version

```
npm run build
# or
yarn build
```

### Features:

- ES6 Support via [babel](https://babeljs.io/) (v7)
- SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
- Linting via [eslint-loader](https://github.com/MoOx/eslint-loader)
- Support lazy loading

### Lazy loading features

When we create new `html` file, we need to declare the filename into `webpack/html.js` file then restart the server.
[TODO]: Find a best way to prevent from reloading when creating template
