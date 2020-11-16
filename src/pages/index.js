import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Spinner } from '../components';
import Home from './Home';
import Blog from './Blog';

export default () => {
  return (
    <Switch>
      <Route
        path='/:name'
        component={() => (
          <Suspense fallback={<Spinner />}>
            <Blog />
          </Suspense>
        )}
      />
      <Route
        component={() => (
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        )}
      />
    </Switch>
  );
};
