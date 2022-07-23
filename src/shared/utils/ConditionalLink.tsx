import { Link } from "react-router-dom";
import { ReactNode } from "react";

type Props = {
  children: ReactNode | ReactNode[];
  to: string | null;
  condition: boolean;
};
const ConditionalLink = ({ children, to, condition }: Props) =>
  !!condition && to ? (
    <Link to={to} className='conditional-link'>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );

export default ConditionalLink;
