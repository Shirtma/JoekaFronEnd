import React, {useEffect} from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import Restaurant from './restaurant';
import DeliveryDineinComponent from 'pages/DeliveryDinein.js/index.js';
import TakeoutComponent from 'pages/Takeout';
import { useProductsContext } from 'context/products_context';
import Navbar from 'components/navbar/navbar';

function RestaurantComponent() {
  const match = useRouteMatch();
  const { setHeaderThemeName } = useProductsContext();

  useEffect(() => {
    setHeaderThemeName('dark-theme');
    return () => {
      setHeaderThemeName('');
    }
  }, [match]); // eslint-disable-line
  
  return (
    <IndexWrapper>
      <Navbar />
      <Switch>
        <Route exact
          path={match.path}
          component={Restaurant}
        />
        <Route
          path={match.path + '/ordertakeout'}
          component={TakeoutComponent}
        />
        <Route
          path={match.path + '/takeoutdine'}
          component={DeliveryDineinComponent}
        />
      </Switch>
    </IndexWrapper>
  );
}

const IndexWrapper = styled.div`
  background-color: #333333;
`;

export default RestaurantComponent;
