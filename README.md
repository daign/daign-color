# daign-color

[![NPM package][npm]][npm-url]

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

#### Build

    npm run build

#### Run lint analysis

    npm run lint

#### Run unit tests with code coverage

    npm run test

[npm]: https://img.shields.io/npm/v/@daign/color.svg
[npm-url]: https://www.npmjs.com/package/@daign/color
