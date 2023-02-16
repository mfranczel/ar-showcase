# 📦 AR Showcase

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Showcase of AR functionalities for web.

## Installation

Clone this repo and npm install.

```bash
npm i
```

## Usage

### Development server

```bash
npm start
```

You can view the development server at `localhost:8080`.

### Production build

```bash
npm run build
```

> Note: Install [http-server](https://www.npmjs.com/package/http-server) globally to deploy a simple server.

For deployment, you also need to:

- change font path in src/js/Experience/sources.js within block:

```javascript
{
  name: "font",
  type: "font",
  path: "/{path}/assets/fonts/droid_sans_regular.typeface.json" 
}
```

to the path, on which it's deployed (path after /; e.g. /ar/assets/fonts/droid_sans_regular.typeface.json for  https://newcomerjourney.com/ar/)

- change public path in webpack.prod.js (path after /)


## Features

- [webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [Sass](https://sass-lang.com/)
- [PostCSS](https://postcss.org/)

## License

This project is available under the [MIT License](LICENSE).
