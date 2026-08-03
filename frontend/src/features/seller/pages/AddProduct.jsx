import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { Navbar } from "../../../shared/components";

const AddProduct = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  // After adding (or cancelling), go back to the seller dashboard
  // so the newly added product shows up in the list there.
  const goBackToDashboard = () => {
    navigate("/seller-dashboard");
  };

  return (
    <main className="min-h-screen bg-[#fbfdfc] px-5 py-6 text-[#17233f]">
      <div className="mx-auto max-w-3xl">
        <Navbar
          badge="S"
          panel="Seller Panel"
          title="Add Product"
          onLogout={handleLogout}
        />

        <div className="mt-6">
          <ProductForm
            onProductAdded={goBackToDashboard}
            onCancel={goBackToDashboard}
          />
        </div>
      </div>
    </main>
  );
};

export default AddProduct;