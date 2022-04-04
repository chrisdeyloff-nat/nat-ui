import Item from "./components/Item";
import PastCalcs from "./components/PastCalcs";

const routes = [
  {
    path: "/",
    label: "past",
    component: PastCalcs,
    routes: [
      {
        path: "/new",
        Label: "New",
        component: Item,
      },
      {
        path: "/edit/:id",
        Label: "Edit",
        component: Item,
      },
    ],
  }
];

export default routes;
