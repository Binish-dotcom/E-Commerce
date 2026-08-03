import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import productService from "../services/product.service";
import { Alert, Card, Navbar } from "../../../shared/components";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const result = await productService.getProductById(id);
        setProduct(result.product);
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const goBackToDashboard = () => navigate("/seller-dashboard");

  return (
    <main className="min-h-screen bg-[#fbfdfc] px-5 py-6 text-[#17233f]">
      <div className="mx-auto max-w-3xl">
        <Navbar badge="S" panel="Seller Panel" title="Edit Product" />

        <div className="mt-6">
          {loading ? (
            <Card className="p-8 text-center text-sm font-semibold text-slate-500">
              Loading product...
            </Card>
          ) : error ? (
            <Alert variant="error">{error}</Alert>
          ) : (
            <ProductForm
              initialData={product}
              onProductAdded={goBackToDashboard}
              onCancel={goBackToDashboard}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default EditProduct;
