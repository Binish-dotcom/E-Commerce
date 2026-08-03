// /* eslint-disable react-hooks/set-state-in-effect */
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import buyerProductService from "../services/product.service";
// import cartService from "../services/cart.service";
// import { Alert, Button, Card, Navbar } from "../../../shared/components";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [actionMessage, setActionMessage] = useState("");
//   const [quantity, setQuantity] = useState(1);

//   const fetchProduct = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const result = await buyerProductService.getProductById(id);
//       setProduct(result.product);
//     } catch (err) {
//       setError(err.message || "Failed to load product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkWishlist = async () => {
//     try {
//       const result = await cartService.getWishlist();
//       setIsWishlisted((result.wishlist || []).some((p) => p._id === id));
//     } catch {
//       // non-critical
//     }
//   };

//   useEffect(() => {
//     fetchProduct();
//     checkWishlist();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   const handleAddToCart = async () => {
//     setActionMessage("");
//     try {
//       await cartService.addToCart(id, quantity);
//       setActionMessage("Added to cart!");
//     } catch (err) {
//       setActionMessage(err.message || "Failed to add to cart");
//     }
//   };

//   const handleToggleWishlist = async () => {
//     try {
//       const result = await cartService.toggleWishlist(id);
//       setIsWishlisted(result.wishlisted);
//     } catch (err) {
//       setActionMessage(err.message || "Failed to update wishlist");
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#fbfdfc] px-5 py-6 text-[#17233f]">
//       <div className="mx-auto max-w-5xl">
//         <Navbar badge="B" panel="Buyer Panel" title="Product Details" />

//         <Button variant="ghost" className="mt-6" onClick={() => navigate(-1)}>
//           Back
//         </Button>

//         {loading ? (
//           <Card className="mt-4 p-8 text-center text-sm font-semibold text-slate-500">
//             Loading product...
//           </Card>
//         ) : error ? (
//           <Alert variant="error" className="mt-4">
//             {error}
//           </Alert>
//         ) : (
//           <Card className="mt-4 grid gap-8 p-6 md:grid-cols-2">
//             {product.imageUrl ? (
//               <img
//                 src={product.imageUrl}
//                 alt={product.title}
//                 className="h-80 w-full rounded-2xl object-cover"
//               />
//             ) : (
//               <div className="flex h-80 w-full items-center justify-center rounded-2xl bg-[#dff3f2] text-lg font-bold text-[#178f95]">
//                 No Image
//               </div>
//             )}

//             <div>
//               <span className="rounded-full bg-[#dff3f2] px-3 py-1 text-xs font-bold capitalize text-[#178f95]">
//                 {product.category}
//               </span>

//               <h1 className="mt-4 text-3xl font-black">{product.title}</h1>

//               {product.seller?.storeProfile?.storeName && (
//                 <p className="mt-1 text-sm font-semibold text-slate-400">
//                   Sold by {product.seller.storeProfile.storeName}
//                 </p>
//               )}

//               <div className="mt-4 flex items-end gap-3">
//                 {product.discountPrice ? (
//                   <>
//                     <span className="text-4xl font-black text-[#178f95]">
//                       Rs. {product.discountPrice}
//                     </span>
//                     <span className="pb-1 text-lg font-semibold text-slate-400 line-through">
//                       Rs. {product.price}
//                     </span>
//                   </>
//                 ) : (
//                   <span className="text-4xl font-black text-[#178f95]">Rs. {product.price}</span>
//                 )}
//               </div>

//               <p className="mt-2 text-sm font-semibold text-slate-500">
//                 {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
//               </p>

//               {product.description && (
//                 <p className="mt-4 leading-7 text-slate-600">{product.description}</p>
//               )}

//               {actionMessage && (
//                 <p className="mt-4 text-sm font-semibold text-[#178f95]">{actionMessage}</p>
//               )}

//               <div className="mt-6 flex items-center gap-3">
//                 <div className="flex items-center gap-2">
//                   <button
//                     type="button"
//                     onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                     className="h-11 w-11 rounded-xl border border-slate-200 font-bold hover:bg-slate-50"
//                   >
//                     -
//                   </button>
//                   <span className="w-8 text-center text-lg font-bold">{quantity}</span>
//                   <button
//                     type="button"
//                     onClick={() => setQuantity((q) => q + 1)}
//                     className="h-11 w-11 rounded-xl border border-slate-200 font-bold hover:bg-slate-50"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               <div className="mt-4 flex flex-col gap-3 sm:flex-row">
//                 <Button
//                   size="lg"
//                   fullWidth
//                   onClick={handleAddToCart}
//                   disabled={product.stock <= 0}
//                 >
//                   Add to Cart
//                 </Button>
//                 <Button size="lg" variant="secondary" fullWidth onClick={handleToggleWishlist}>
//                   {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
//                 </Button>
//               </div>
//             </div>
//           </Card>
//         )}

//         <Card className="mt-6 p-6">
//           <h3 className="text-lg font-extrabold">Reviews</h3>
//           <p className="mt-2 text-sm text-slate-500">
//             Reviews will be available once order tracking is added to the marketplace.
//           </p>
//         </Card>
//       </div>
//     </main>
//   );
// };

// export default ProductDetail;


/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import buyerProductService from "../services/product.service";
import cartService from "../services/cart.service";
import { Alert, Button, Card, Navbar } from "../../../shared/components";
import ReviewsSection from "../../reviews/components/ReviewsSection";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const fetchProduct = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await buyerProductService.getProductById(id);
      setProduct(result.product);
    } catch (err) {
      setError(err.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const checkWishlist = async () => {
    try {
      const result = await cartService.getWishlist();
      setIsWishlisted((result.wishlist || []).some((p) => p._id === id));
    } catch {
      // non-critical
    }
  };

  useEffect(() => {
    fetchProduct();
    checkWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddToCart = async () => {
    setActionMessage("");
    try {
      await cartService.addToCart(id, quantity);
      setActionMessage("Added to cart!");
    } catch (err) {
      setActionMessage(err.message || "Failed to add to cart");
    }
  };

  const handleToggleWishlist = async () => {
    try {
      const result = await cartService.toggleWishlist(id);
      setIsWishlisted(result.wishlisted);
    } catch (err) {
      setActionMessage(err.message || "Failed to update wishlist");
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfdfc] px-5 py-6 text-[#17233f]">
      <div className="mx-auto max-w-5xl">
        <Navbar badge="B" panel="Buyer Panel" title="Product Details" />

        <Button variant="ghost" className="mt-6" onClick={() => navigate(-1)}>
          Back
        </Button>

        {loading ? (
          <Card className="mt-4 p-8 text-center text-sm font-semibold text-slate-500">
            Loading product...
          </Card>
        ) : error ? (
          <Alert variant="error" className="mt-4">
            {error}
          </Alert>
        ) : (
          <Card className="mt-4 grid gap-8 p-6 md:grid-cols-2">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.title}
                className="h-80 w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-80 w-full items-center justify-center rounded-2xl bg-[#dff3f2] text-lg font-bold text-[#178f95]">
                No Image
              </div>
            )}

            <div>
              <span className="rounded-full bg-[#dff3f2] px-3 py-1 text-xs font-bold capitalize text-[#178f95]">
                {product.category}
              </span>

              <h1 className="mt-4 text-3xl font-black">{product.title}</h1>

              {product.seller?.storeProfile?.storeName && (
                <p className="mt-1 text-sm font-semibold text-slate-400">
                  Sold by {product.seller.storeProfile.storeName}
                </p>
              )}

              <div className="mt-4 flex items-end gap-3">
                {product.discountPrice ? (
                  <>
                    <span className="text-4xl font-black text-[#178f95]">
                      Rs. {product.discountPrice}
                    </span>
                    <span className="pb-1 text-lg font-semibold text-slate-400 line-through">
                      Rs. {product.price}
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-black text-[#178f95]">Rs. {product.price}</span>
                )}
              </div>

              <p className="mt-2 text-sm font-semibold text-slate-500">
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </p>

              {product.description && (
                <p className="mt-4 leading-7 text-slate-600">{product.description}</p>
              )}

              {actionMessage && (
                <p className="mt-4 text-sm font-semibold text-[#178f95]">{actionMessage}</p>
              )}

              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="h-11 w-11 rounded-xl border border-slate-200 font-bold hover:bg-slate-50"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-lg font-bold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="h-11 w-11 rounded-xl border border-slate-200 font-bold hover:bg-slate-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  fullWidth
                  onClick={() => navigate(`/buy-now/${product._id}`)}
                  disabled={product.stock <= 0}
                >
                  Buy Now
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  fullWidth
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                >
                  Add to Cart
                </Button>
                <Button size="lg" variant="ghost" fullWidth onClick={handleToggleWishlist}>
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </Button>
              </div>
            </div>
          </Card>
        )}

        <ReviewsSection productId={id} />
      </div>
    </main>
  );
};

export default ProductDetail;
