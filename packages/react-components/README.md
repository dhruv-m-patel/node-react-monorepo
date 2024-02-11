# @dhruv-m-patel/react-components

A library of React components for frontend projects

![CI Status](https://github.com/dhruv-m-patel/packages/workflows/build/badge.svg)

### Using this package

1. Install this package
   ```bash
   npm i @dhruv-m-patel/react-components
   #OR
   yarn add @dhruv-m-patel/react-components --dev
   ```

2. Import package components and integrate them in your code
   ```javascript
   import * as React from 'react';
   import { Text } from '@dhruv-m-patel/react-components';

   export default function MyAwesomeComponent({ name }) {
     const shouldPrintName = !!name?.length;

     return (
       <Text>
         Hello {shouldPrintName ? `, ${name}` : 'World'}!
       </Text>
     );
   }
   ```
