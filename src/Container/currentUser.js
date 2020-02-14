import React from 'react';

const currentUser = React.createContext({user: {}}); // Create a context object

export {
  currentUser // Export it so it can be used by other Components
};