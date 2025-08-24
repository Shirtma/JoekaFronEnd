import React from "react";
import { ReactComponent as Twitter } from "../svg/TwitterLogo.svg";
import { ReactComponent as Instagram } from "../svg/InstagramLogo.svg";
import { ReactComponent as LinkdIn } from "../svg/LinkedinLogo.svg";
import { ReactComponent as Home } from "../svg/home.svg";
// import { ReactComponent as List } from "../svg/List.svg";
import { ReactComponent as Close } from "../svg/Close.svg";
import { ReactComponent as Address } from "../svg/Address.svg";
import { ReactComponent as Orders } from "../svg/Orders.svg";
import { ReactComponent as Profile } from "../svg/Profile.svg";
import { ReactComponent as Logout } from "../svg/SignOut.svg";
import { ReactComponent as RArrow } from "../svg/ArrowRight.svg";
import { ReactComponent as RArrowWhite } from "../svg/ArrowRightWhite.svg";
import { ReactComponent as Clock } from "../svg/Clock.svg";
import { ReactComponent as ClockWise } from "../svg/ClockClockwise.svg";
import { ReactComponent as Coin } from "../svg/Coin.svg";
import { ReactComponent as Users } from "../svg/Users.svg";
import { ReactComponent as People } from "../svg/people.svg";
import { ReactComponent as LQuote } from "../svg/Leftquote.svg";
import { ReactComponent as ArrRightGO } from "../svg/ArrowRightWithGoldOutline.svg";
import { ReactComponent as ArrLeftGO } from "../svg/ArrowLeftWithGoldOutLine.svg";
import { ReactComponent as Info } from "../svg/Info.svg";
import { ReactComponent as Utensils } from "../svg/utensils.svg";
import { ReactComponent as UtensilsBlack } from "../svg/utensilsBlack.svg";
import { ReactComponent as Google } from "../svg/Google.svg";
import { ReactComponent as ListBullet } from "../svg/ListBullets.svg";
import { ReactComponent as ArrowLeft } from "../svg/arrow-left.svg";
import { ReactComponent as ListUL } from "../svg/list-ul.svg";
import { ReactComponent as Search } from "../svg/search.svg";
import { ReactComponent as AngleDown } from "../svg/angle-down.svg";
import { ReactComponent as ArrowDown } from "../svg/arrow-down.svg";
import { ReactComponent as Plus } from "../svg/plus-circle.svg";
import { ReactComponent as Plus2 } from "../svg/plus.svg";
import { ReactComponent as PlusWhite } from "../svg/plus1.svg";
import { ReactComponent as MinusWhite } from "../svg/minus1.svg";
import { ReactComponent as Trash } from "../svg/trash.svg";
import { ReactComponent as List } from "../svg/bars.svg";
import { ReactComponent as Minus } from "../svg/minus-circle.svg";
import { ReactComponent as Tick } from "../svg/check.svg";
import { ReactComponent as Cart } from "../svg/shopping-cart.svg";
import { ReactComponent as CartDark } from "../svg/shopping-cart1.svg";
import { ReactComponent as Lock } from "../svg/lock-alt.svg";
import { ReactComponent as ArrowRightWhite } from "../svg/ArrowRightWhite.svg";
import { ReactComponent as CopyClip } from "../svg/copy.svg";
import { ReactComponent as Times } from "../svg/times.svg";
import { ReactComponent as Copy } from "../svg/copycopy.svg";
import { ReactComponent as Exit } from "../svg/signoutcopy.svg";
import { ReactComponent as User } from "../svg/user.svg";
import { ReactComponent as Board } from "../svg/clipboard-alt.svg";
import { ReactComponent as TimesWhite } from "../svg/times1.svg";
import { ReactComponent as TimesCircle } from "../svg/times-circle.svg";
import { ReactComponent as PlusDark } from "../svg/plus2.svg";
import { ReactComponent as MinusGrey } from "../svg/minusGrey.svg";
import { ReactComponent as ArrowRightGold } from "../svg/arrow-rightGold.svg";
import { ReactComponent as Loader } from "../svg/spinner-alt.svg";
import { ReactComponent as PlusCircleGrey } from "../svg/plus-circleG.svg";
import { ReactComponent as UsersG } from "../svg/usersG.svg";
import { ReactComponent as CalendarG } from "../svg/calendarG.svg";
// import { ReactComponent as HomeG } from "../svg/homeG.svg";
import { ReactComponent as ClockG } from "../svg/clockG.svg";
import { ReactComponent as ArrowLeftB } from "../svg/arrowLeftB.svg";
import { ReactComponent as ArrowRightB } from "../svg/arrowRightB.svg";
import { ReactComponent as DarkTheHouseLogo } from '../svg/DarkTheHouse.svg';
import {ReactComponent as   LightTheHouseLogo, } from "../svg/LightTheHouse.svg"
import { ReactComponent as Eye } from '../svg/Eye.svg';
import { ReactComponent as EyeClosed } from '../svg/EyeClosed.svg';
import { ReactComponent as CalendarBlank } from '../svg/CalendarBlank.svg';
import { ReactComponent as XTransparent } from '../svg/XTransparent.svg';

const icons = {
  XTransparent,
  CalendarBlank,
  Eye,
  EyeClosed,
  DarkTheHouseLogo,
  LightTheHouseLogo,
  Address,
  AngleDown,
  ArrowDown,
  ArrLeftGO,
  ArrowLeft,
  ArrowLeftB,
  ArrRightGO,
  ArrowRightGold,
  ArrowRightB,
  ArrowRightWhite,
  Board,
  CalendarG,
  Cart,
  CartDark,
  Clock,
  ClockG,
  ClockWise,
  Close,
  Coin,
  Copy,
  CopyClip,
  Exit,
  Google,
  Home,
  // HomeG,
  Info,
  Instagram,
  Lock,
  LQuote,
  LinkdIn,
  ListBullet,
  List,
  ListUL,
  Loader,
  Logout,
  Minus,
  MinusGrey,
  MinusWhite,
  Orders,
  Plus,
  Plus2,
  PlusCircleGrey,
  PlusDark,
  PlusWhite,
  Profile,
  RArrow,
  RArrowWhite,
  Search,
  Trash,
  Tick,
  Times,
  TimesCircle,
  TimesWhite,
  Twitter,
  User,
  Users,
  People,
  UsersG,
  Utensils,
  UtensilsBlack,
};

export default function Icon({ Name, colour = "", stroke, ...props }) {
  const SVG = icons?.[Name];
  return SVG ? (
    <SVG
      stroke={stroke || colour}
      width="30px"
      height="30px"
      {...props}
    />
  ) : (
    ""
  );
}
