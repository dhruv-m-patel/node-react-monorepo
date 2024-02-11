# @dhruv-m-patel/react-hooks

A library of custom react hooks for frontend projects

![CI Status](https://github.com/dhruv-m-patel/packages/workflows/build/badge.svg)

### Using this package

1. Install this package
   ```bash
   npm i -S @dhruv-m-patel/react-hooks
   # OR
   yarn add @dhruv-m-patel/react-hooks
   ```

2. Import custom hook from this package and use it in your component
   ```javascript
   import * as React from 'react';
   import { useFetch } from '@dhruv-m-patel/react-hooks';
   import { Text } from '@dhruv-m-patel/react-components';

   export default function MyAwesomeComponent({ apiEndpoint }) {
     const { loading, error, data } = useFetch(apiEndpoint);

     if (loading) {
       return (
         <Text>Loading data....</Text>
       );
     }

     if (error) {
       return (
         <Text>Oops, There was an error fetching data!</Text>
       );
     }

     return (
       <Text>{JSON.stringify(data)}</Text>
     );
   }
   ```
