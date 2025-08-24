import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { UserProvider } from 'context/user_context';
import { ProductsProvider } from 'context/products_context';

const TestWrapper = (ui, {
  route = '/',
  history = createMemoryHistory({ initialEntries: [route] }),
} = {}) => ({
  ...render(
    <UserProvider>
      <ProductsProvider>
        <Router history={history}>{ui}</Router>
      </ProductsProvider>
    </UserProvider>,
  ),
  history,
});

export * from '@testing-library/react';
export { TestWrapper as render };
