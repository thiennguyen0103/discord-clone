import { ReactNode } from "react";

type TAuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: TAuthLayoutProps) => {
  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
