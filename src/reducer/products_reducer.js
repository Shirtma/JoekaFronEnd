import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  ADD_TO_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  INCREASE,
  DECREASE,
  CLEAR_CART,
  TAKEOUT_SIDEBAR_OPEN,
  TAKEOUT_SIDEBAR_CLOSE,
  PROFILE_SIDEBAR_OPEN,
  PROFILE_SIDEBAR_CLOSE,
  CHECKOUT_INFO_LOAD,
  CHECKOUT_INFO_SUCCESS,
  GET_SPACES_SUCCESS,
  IS_NOT_TAKEOUT_PAGE,
  SET_HEADER_THEME_NAME
} from '../action';

const addProductToCart = (product, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === product.id,
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, quantity: 1 });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
  }

  return { ...state, cart: updatedCart };
};

const products_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSideBarOpen: true };
    case SIDEBAR_CLOSE:
      return { ...state, isSideBarOpen: false };
    case TAKEOUT_SIDEBAR_OPEN:
      return { ...state, isTakeoutSideBarOpen: true, isSideBarOpen: false };
    case TAKEOUT_SIDEBAR_CLOSE:
      return { ...state, isTakeoutSideBarOpen: false };
    case PROFILE_SIDEBAR_OPEN:
      return { ...state, isProfileSideBarOpen: true, isSideBarOpen: false };
    case PROFILE_SIDEBAR_CLOSE:
      return { ...state, isProfileSideBarOpen: false };
    case GET_PRODUCTS_BEGIN:
      return { ...state, products_loading: true };
    case GET_PRODUCTS_SUCCESS:
      const featured_products = action.payload.map((product) => product);
      return {
        ...state,
        products_loading: false,
        featured_products,
        products: action.payload,
      };
    case GET_PRODUCTS_ERROR:
      return { ...state, products_loading: false, products_error: true };
    case GET_SINGLE_PRODUCT_BEGIN:
      return {
        ...state,
        single_product_loading: true,
        single_product_error: false,
      };
    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        single_product_loading: false,
        single_product: action.payload,
      };
    case GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        single_product_loading: false,
        single_product_error: true,
      };
    case GET_SPACES_SUCCESS:
      return {
        ...state,
        spaces: action.payload,
      };
    case ADD_TO_CART:
      return addProductToCart(action.product, state);
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.productId),
      };
    case COUNT_CART_TOTALS:
      let { total, quantity } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        },
      );
      total = parseFloat(total.toFixed(2));

      return {
        ...state,
        total,
        quantity,
      };
    case TOGGLE_CART_ITEM_AMOUNT:
      const tempCart = state.cart
        .map((cartItem) => {
          if (cartItem.id === action.payload.id) {
            if (action.payload.type === INCREASE) {
              return { ...cartItem, quantity: cartItem.quantity + 1 };
            } if (action.payload.type === DECREASE) {
              return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.quantity !== 0);
      return {
        ...state,
        cart: tempCart,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    case CHECKOUT_INFO_LOAD:
      return {
        ...state,
        info_loading: true,
      };
    case CHECKOUT_INFO_SUCCESS:
      return {
        ...state,
        info_loading: false,
        info_error: false,
        info_success: action.payload.data,
      };
    case IS_NOT_TAKEOUT_PAGE:
      return { ...state, isNotTakeoutPage: action.payload };
    case SET_HEADER_THEME_NAME:
      return { ...state, headerNavThemeName: action.payload };
    default:
      break;
  }

  return state;
};

export default products_reducer;
