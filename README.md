# front-end-starter

<p>
    <a href="https://github.com/blyndusk/front-end-starter/actions">
        <img alt="Build Status" src="https://github.com/blyndusk/front-end-starter/workflows/Main%20Workflow/badge.svg" />
    </a>
    <a href="https://codecov.io/gh/blyndusk/front-end-starter">
        <img src="https://img.shields.io/codecov/c/github/blyndusk/front-end-starter"/>
    </a>
     <a href="https://github.com/blyndusk/front-end-starter/blob/master/package.json">
        <img src="https://img.shields.io/david/blyndusk/front-end-starter"/>
    </a>
    <a href="https://github.com/blyndusk/front-end-starter/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/blyndusk/front-end-starter" alt="license"/>
    </a>
</p>

> A **front-end starter** including **TypeScript** & **Sass**, **Laravel Mix** & **Webpack**, **Jest** & **GitHub Actions**.

**Features available:**

- Linting ([TSLint](https://palantir.github.io/tslint/))
- Testing ([Jest](https://jestjs.io/))
- Code coverage ([Jest](https://medium.com/better-programming/code-coverage-reports-and-custom-configuration-with-istanbul-jest-and-react-34e44c968b7c), need a secret token)
- CI/CD ([GitHub Actions](https://github.com/features/actions))
- Source code documentation generation and website ([TypeDoc](https://typedoc.org/))

## Purpose

*"The purpose of this starter is to create a **webapp** with **clean compiled** files"*

## Install

```bash
git clone git@github.com:blyndusk/front-end-starter.git
cp .env.sample .env
ni && npm run start
```

- **Register** your repo to [Codecov](https://codecov.io).
- Update the badges with your **repo's name** (and eventually secret token)

## Usage

### Starting || Watching

> **Lint** source file while **fixing warnings & errors**, then **build** source files.

```bash
npm run start
```

### Linting & Building

```bash
npm run lint
npm run lint:fix
```

### Building

> Convert *`.ts` files to `*.js`, then add `#!/usr/bin/env node` to the file to make it **executable**.

```bash
npm run build
```

### Testing

Coverage available [here](https://blyndusk.github.io/
node-typescript-starter/lcov-report).

```bash
npm run test
npm run test:watch
```

### Checking

> Basically used **before pushing**, will **lint** while fixing, **build** & **test**.

```bash
npm run check
```

### Documentation

Documentation available [here](https://blyndusk.github.io/
node-typescript-starter).

```bash
npm run doc
```

## CI/CD

- Go to [Codecov](https://codecov.io)
- Login with **Github**
- **Register** your repository
- Copy the **token** and create a GitHub secret: `CODECOV_TOKEN`
- Go to [Shields.io](https://shields.io/category/coverage) to create a new **Codecov** badge with your token

## License

Under [MIT](https://github.com/blyndusk/node-typescript-starter/blob/master/LICENSE) license.
