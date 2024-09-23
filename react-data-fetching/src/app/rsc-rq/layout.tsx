import { ReactQueryProvider } from "./_provider/react-query";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default Layout;
