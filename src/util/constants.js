export const links = [
  {
    id: 1,
    text: 'ABOUT',
    url: '/about',
  },
  {
    id: 2,
    text: 'SHOP',
    url: '/shop',
  },
  {
    id: 3,
    text: 'COMING',
    url: '/soon',
  },
  {
    id: 4,
    // eslint-disable-next-line no-useless-concat
    text: 'RESERVE' + '\xa0' + 'A' + '\xa0' + 'SPACE',
    url: '/reserve',
  },
];

export const accLinks = [
  {
    id: 1,
    text: 'Profile',
    url: '/profile',
    icon: 'Profile',
  },
  // {
  //   id: 2,
  //   text: "Address" + "\xa0" + "Book",
  //   url: "/address",
  //   icon: "Address",
  // },
  {
    id: 2,
    text: 'Orders',
    url: '/profile/orders',
    icon: 'Orders',
  },
  // {
  //   id: 3,
  //   text: "Logout",
  //   url: "/login",
  //   icon: "Logout",
  // },
];
export const products_url = 'https://api.thehouseng.com/api/v1/menu/';

export const spaces_url = 'https://api.thehouseng.com/api/v1/menu/spaces';

export const order_history_url = 'https://api.thehouseng.com/api/v1/order/history';

export const zIndexes = {
  stepper: 1050,
  lay: 1100,
  overlay: 1150,
  navBar: 1200,
  modal: 1250,
};
