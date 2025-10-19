// Central export hub for all type interfaces.
// Makes importing consistent and reduces long relative paths.

//  Core Entities
export * from './card';
export * from './price';
export * from './collection';
export * from './collectioncard';
export * from './user';
export * from './set';
export * from './category';

//  Optional: Global namespace typing
// This adds a global TCG namespace, so you can reference types as TCG.Card, TCG.User, etc.
// This section is purely optional — skip it if you prefer only import-based typing.

declare global {
  namespace TCG {
    type Card = import('./card').Card;
    type Price = import('./price').Price;
    type Collection = import('./collection').Collection;
    type CollectionCard = import('./collectioncard').CollectionCard;
    type User = import('./user').User;
    type Set = import('./set').Set;
    type Category = import('./category').Category;
  }
}

// The `export {}` line ensures this file is treated as a module
// rather than a script — required for global type declarations to work.
export {};
