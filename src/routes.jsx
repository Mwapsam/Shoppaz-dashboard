import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, NewProduct, Categories, NewCategory } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
        display: true
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "products",
        path: "/products",
        element: <Profile />,
        display: true
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "customers",
        path: "/customers",
        element: <Tables />,
        display: true
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "categories",
        path: "/categories",
        element: <Categories />,
        display: true
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "New Category",
        path: "/new-category",
        element: <NewCategory />,
        display: false
      },
      {
        icon: '',
        name: "New Product",
        path: "/new-product",
        element: <NewProduct />,
        display: false
      },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      //   display: true
      // },
    ],
  },
  // {
  //   title: "auth pages",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ServerStackIcon {...icon} />,
  //       name: "sign in",
  //       path: "/sign-in",
  //       element: <SignIn />,
  //     },
  //     {
  //       icon: <RectangleStackIcon {...icon} />,
  //       name: "sign up",
  //       path: "/sign-up",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
];

export default routes;
