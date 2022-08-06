import { UserRoles } from "../models/newUser";

export interface FormRadioProps {
  label: string;
  //   value: { [key: string]: string };
  value: UserRoles;
  //   name: string;
  name: string;
  // type: "radio";
  error: { [key: string]: string };
  touched: { [key: string]: string };
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
}
