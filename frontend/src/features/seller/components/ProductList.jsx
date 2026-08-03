import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Card, SearchBar } from "../../../shared/components";
import productService from "../services/product.service";

const ProductList = ({ products, onProductDeleted }) => {
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return products || [];

    return (products || []).filter((product) =>
      [product.title, product.category, product.description]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [products, searchTerm]);

  const handleDelete = async (productId) => {
    setError("");
    setDeletingId(productId);

    try {
      await productService.deleteProduct(productId);
      onProductDeleted(productId);
    } catch (err) {
      setError(err.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  if (!products || products.length === 0) {
    return (
      <Card className="border-dashed border-[#178f95]/30 bg-[#f6fbfb] p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dff3f2] text-xl font-black text-[#178f95]">
          +
        </div>
        <h3 className="mt-4 text-xl font-extrabold text-[#17233f]">No products yet</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          You haven&apos;t added any products yet. Click Add Product to create your first listing.
        </p>
      </Card>
    );
  }

  return (
    <div>
      <Alert variant="error" className="mb-4">
        {error}
      </Alert>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search products by title, category, or description"
        className="mb-5 max-w-md"
      />

      {filteredProducts.length === 0 ? (
        <Card className="bg-[#f6fbfb] p-8 text-center text-sm font-semibold text-slate-500">
          No products match your search.
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card
              key={product._id}
              as="article"
              className="overflow-hidden bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="h-44 w-full object-cover"
                />
              ) : (
                <div className="flex h-44 w-full items-center justify-center bg-[#dff3f2] text-sm font-bold text-[#178f95]">
                  No Image
                </div>
              )}

              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#dff3f2] px-3 py-1 text-xs font-bold capitalize text-[#178f95]">
                    {product.category}
                  </span>
                  <span className="rounded-full bg-[#fff0e8] px-3 py-1 text-xs font-bold text-[#17233f]">
                    Stock {product.stock}
                  </span>
                </div>

                <h4 className="mt-4 line-clamp-2 text-lg font-extrabold text-[#17233f]">
                  {product.title}
                </h4>

                <div className="mt-4 flex items-end gap-2">
                  {product.discountPrice ? (
                    <>
                      <span className="text-2xl font-black text-[#178f95]">
                        Rs. {product.discountPrice}
                      </span>
                      <span className="pb-1 text-sm font-semibold text-slate-400 line-through">
                        Rs. {product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-black text-[#178f95]">
                      Rs. {product.price}
                    </span>
                  )}
                </div>

                <div className="mt-5 flex gap-2">
                  <Link to={`/seller/edit-product/${product._id}`} className="flex-1">
                    <Button variant="secondary" fullWidth>
                      Edit
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleDelete(product._id)}
                    disabled={deletingId === product._id}
                    variant="danger"
                    fullWidth
                    className="flex-1"
                  >
                    {deletingId === product._id ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
