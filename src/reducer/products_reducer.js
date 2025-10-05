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
  CLEAR_CART,
  TAKEOUT_SIDEBAR_OPEN,
  TAKEOUT_SIDEBAR_CLOSE,
  PROFILE_SIDEBAR_OPEN,
  PROFILE_SIDEBAR_CLOSE,
  CHECKOUT_INFO_LOAD,
  CHECKOUT_INFO_SUCCESS,
  GET_SPACES_SUCCESS,
  IS_NOT_TAKEOUT_PAGE,
  SET_HEADER_THEME_NAME,
} from "../action";

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
      const { product } = action;

      // Create unique ID based on product ID and selected options
      const cartItemId = `${product.id}-${product.size || "default"}-${
        product.color || "default"
      }`;

      // Check if item already exists in cart
      const existingCartItem = state.cart.find(
        (item) => item.cartId === cartItemId
      );

      if (existingCartItem) {
        // If item exists, increase quantity
        const updatedCart = state.cart.map((item) =>
          item.cartId === cartItemId
            ? { ...item, amount: item.amount + (product.amount || 1) }
            : item
        );
        return { ...state, cart: updatedCart };
      } else {
        // If item doesn't exist, add new item
        const newCartItem = {
          ...product,
          cartId: cartItemId,
          amount: product.amount || 1,
        };
        return { ...state, cart: [...state.cart, newCartItem] };
      }
    case REMOVE_CART_ITEM:
      console.log("REMOVE_CART_ITEM:", {
        productId: action.productId,
        cart: state.cart,
      }); // Debug log
      return {
        ...state,
        cart: state.cart.filter((cartItem) => {
          const itemCartId =
            cartItem.cartId ||
            `${cartItem.id}-${
              cartItem.selectedSize || cartItem.size || "default"
            }-${cartItem.selectedColor || cartItem.color || "default"}`;
          return itemCartId !== action.productId;
        }),
      };
    case COUNT_CART_TOTALS:
      let { total, quantity } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;
          cartTotal.total += itemTotal;
          cartTotal.quantity += amount;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));

      return {
        ...state,
        total,
        quantity,
      };
    case TOGGLE_CART_ITEM_AMOUNT:
      const { id, type } = action.payload;
      console.log("TOGGLE_CART_ITEM_AMOUNT:", { id, type, cart: state.cart }); // Debug log

      const tempCart = state.cart
        .map((cartItem) => {
          // Check both cartId and a constructed ID for backward compatibility
          const itemCartId =
            cartItem.cartId ||
            `${cartItem.id}-${
              cartItem.selectedSize || cartItem.size || "default"
            }-${cartItem.selectedColor || cartItem.color || "default"}`;

          if (itemCartId === id) {
            console.log("Found matching item:", cartItem); // Debug log
            if (type === "inc") {
              return { ...cartItem, amount: cartItem.amount + 1 };
            }
            if (type === "dec") {
              return { ...cartItem, amount: cartItem.amount - 1 };
            }
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.amount > 0);

      console.log("Updated cart:", tempCart); // Debug log
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
