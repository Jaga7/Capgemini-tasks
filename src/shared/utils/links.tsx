import { RiHomeFill, RiTodoFill } from "react-icons/ri";
import { ImUsers } from "react-icons/im";

const links = [
  {
    id: 1,
    text: "home",
    path: "/",
    icon: <RiHomeFill />,
  },
  {
    id: 2,
    text: "todos",
    path: "todos",
    icon: <RiTodoFill />,
  },
  {
    id: 3,
    text: "users",
    path: "users",
    icon: <ImUsers />,
  },
];

export default links;
