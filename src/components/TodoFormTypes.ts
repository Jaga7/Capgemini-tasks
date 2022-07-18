import { FormEventHandler } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export type FormInputProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export interface Config {
  placeholderName: string;
  propName: string;
  label: string;
  classNameSuffix: string;
  reduxAction: ActionCreatorWithPayload<any, string>;
}
