import {
  changeFormTitleInputValue,
  changeFormBodyInputValue,
} from "../features/todoForm/todoFormSlice";
import { Config } from "./TodoFormTypes";

export const config: Config[] = [
  {
    placeholderName: "Title",
    propName: "newTodoTitle",
    label: "Todo Title",
    classNameSuffix: "title",
    reduxAction: changeFormTitleInputValue,
  },
  {
    placeholderName: "Body",
    propName: "newTodoBody",
    label: "Todo Body",
    classNameSuffix: "body",
    reduxAction: changeFormBodyInputValue,
  },
];
