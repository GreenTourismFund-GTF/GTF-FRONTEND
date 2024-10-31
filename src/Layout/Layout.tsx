import FloatingChat from "../components/Dangling/FloatingChat";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Header/Navbar";
import Routers from "../Routes/Routers";


const Layout = () =>
{
  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20">
        <Routers />
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
};

export default Layout;