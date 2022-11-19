# daign-color

[![CI][ci-icon]][ci-url]
[![Coverage][coveralls-icon]][coveralls-url]
[![NPM package][npm-icon]][npm-url]

#### Simple color utils library in Typescript

Every class implements an [observable pattern](https://github.com/daign/daign-observable).

## Installation

```sh
npm install @daign/color --save
```

## Usage

```typescript
import {Color} from '@daign/color';
import {Gradient} from '@daign/color';

// Create color objects
const color1 = new Color( 255, 255, 255, 1 );
const color2 = new Color().setFromHex( '#ff9933' );

// Create gradient object
const gradient = new Gradient();
gradient.addColorStop( 0, color1 );
gradient.addColorStop( 1, color2 );

// Get interpolated color from the gradient
console.log( gradient.colorAt( 0.5 ).hex );
```

## Scripts

```bash
# Build
npm run build

# Run lint analysis
npm run lint

# Run unit tests with code coverage
npm run test

# Get a full lcov report
npm run coverage
```

[ci-icon]: https://github.com/daign/daign-color/workflows/CI/badge.svg
[ci-url]: https://github.com/daign/daign-color/actions
[coveralls-icon]: https://coveralls.io/repos/github/daign/daign-color/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/daign/daign-color?branch=master
[npm-icon]: https://img.shields.io/npm/v/@daign/color.svg
[npm-url]: https://www.npmjs.com/package/@daign/color
