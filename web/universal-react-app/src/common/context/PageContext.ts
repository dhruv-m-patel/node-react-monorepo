import React from 'react';

export interface PageContextType {
  theme: string;
}

const PageContext = React.createContext<PageContextType>({ theme: 'light' });

export default PageContext;
