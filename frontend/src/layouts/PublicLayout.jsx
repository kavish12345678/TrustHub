import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function PublicLayout({ children }) {
  return (
    <div className="th-public-layout">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
