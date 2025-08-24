import axios from 'axios';
import React, {
  useContext, useEffect, useReducer, useState,
} from 'react';
import reducer from '../reducer/products_reducer';
import {
  products_url as url,
  spaces_url,
  order_history_url,
} from '../util/constants';
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  ADD_TO_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  INCREASE,
  DECREASE,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  TAKEOUT_SIDEBAR_OPEN,
  TAKEOUT_SIDEBAR_CLOSE,
  PROFILE_SIDEBAR_CLOSE,
  PROFILE_SIDEBAR_OPEN,
  GET_SPACES_SUCCESS,
  IS_NOT_TAKEOUT_PAGE,
  SET_HEADER_THEME_NAME
} from '../action';

const initialState = {
  isSideBarOpen: false,
  isTakeoutSideBarOpen: false,
  isProfileSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  spaces: [],
  info_loading: false,
  info_error: false,
  info_success: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
  single_space: {},
  cart: JSON.parse(localStorage.getItem('localCart')) || [],
  total: 0,
  quantity: 0,
  isNotTakeoutPage: false,
  headerNavThemeName: ''
};

const ProductsContext = React.createContext();

export function ProductsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem('selectedOption') || '',
  );
  const [orderHistory, setOrderHistory] = useState(
    JSON.parse(localStorage.getItem('order_history')) || {},
  );

  const [form, setForm] = useState({
    first_name:
      '' || (localStorage.user && JSON.parse(localStorage.user).firstName),
    last_name:
      '' || (localStorage.user && JSON.parse(localStorage.user).lastName),
    phone_number: '',
    address: '',
    city: selectedOption,
  });

  const [deliveryPrice, setDeliveryPrice] = useState(2000);
  const setDeliveryLocation = (value = '') => {
    setSelectedOption(value);
    setForm((prevState) => ({
      ...prevState,
      city: value
    }))
  }

  const options = [
    'Victoria Island',
    'Lekki Phase 1',
    'Ajah',
    'VGC',
    'Lagos Island',
    'Yaba',
    'Surulere',
    'Fadeyi',
    'Costain',
  ];

  const [roomText, setRoomText] = useState('');
  const [reserveData, setReserveData] = useState(null);

  const openSideBar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const openTakeoutSideBar = () => {
    dispatch({ type: TAKEOUT_SIDEBAR_OPEN });
  };

  const closeTakeoutSideBar = () => {
    dispatch({ type: TAKEOUT_SIDEBAR_CLOSE });
  };
  const openProfileSideBar = () => {
    dispatch({ type: PROFILE_SIDEBAR_OPEN });
  };

  const closeProfileSideBar = () => {
    dispatch({ type: PROFILE_SIDEBAR_CLOSE });
  };
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const closeSideBar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const fetchOrderHistory = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });
      const history = response.data;
      setOrderHistory(history);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async (url) => {
    // dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(url);
      const products = response.data;
      // console.log(products);
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products.data });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  const fetchSpaces = async (url) => {
    try {
      const response = await axios.get(url);
      const spaces = response.data;
      // console.log(spaces);
      dispatch({ type: GET_SPACES_SUCCESS, payload: spaces.data });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios.get(url);
      const singleProduct = response.data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  const addToCart = (product) => {
    dispatch({ type: ADD_TO_CART, product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: REMOVE_CART_ITEM, productId });
  };

  const increase = (id) => {
    dispatch({ type: INCREASE, payload: id });
  };

  const decrease = (id) => {
    dispatch({ type: DECREASE, payload: id });
  };

  const toggleAmount = (id, type) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, type } });
  };

  useEffect(() => {
    fetchProducts(url);
  }, []);

  useEffect(() => {
    fetchOrderHistory(order_history_url);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem('order_history', JSON.stringify(orderHistory));
  }, [orderHistory]);

  useEffect(() => {
    fetchSpaces(spaces_url);
  }, []);

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('localCart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('form', JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    localStorage.setItem('selectedOption', selectedOption);
  }, [selectedOption]);

  const trackPageNavigation = (value) => {
    dispatch({ type: IS_NOT_TAKEOUT_PAGE, payload: value });
  };

  const setHeaderThemeName = (value) => {
    dispatch({ type: SET_HEADER_THEME_NAME, payload: value });
  }

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        dispatch,
        openSideBar,
        closeSideBar,
        trackPageNavigation,
        openTakeoutSideBar,
        closeTakeoutSideBar,
        openProfileSideBar,
        closeProfileSideBar,
        fetchSingleProduct,
        addToCart,
        removeFromCart,
        increase,
        decrease,
        toggleAmount,
        clearCart,
        selectedOption,
        setSelectedOption,
        setDeliveryLocation,
        form,
        setForm,
        orderHistory,
        setOrderHistory,
        roomText,
        setRoomText,
        reserveData,
        setReserveData,
        deliveryPrice,
        setDeliveryPrice,
        setHeaderThemeName,
        options,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
// make sure use
export const useProductsContext = () => useContext(ProductsContext);
