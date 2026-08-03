// /* eslint-disable react-hooks/set-state-in-effect */
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import buyerProductService from "../services/product.service";
// import cartService from "../services/cart.service";
// import ProductGrid from "../components/ProductGrid";
// import { Button, Card, HeroPanel, InfoRow, Navbar, Pagination } from "../../../shared/components";

// const BuyerDashboard = () => {
//   const role = localStorage.getItem("role");

//   const [products, setProducts] = useState([]);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [productsError, setProductsError] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalProducts, setTotalProducts] = useState(0);

//   // IDs of products currently in the buyer's wishlist, used to show filled/empty hearts
//   const [wishlistIds, setWishlistIds] = useState([]);

//   const fetchProducts = async (page) => {
//     setProductsLoading(true);
//     setProductsError("");

//     try {
//       const result = await buyerProductService.getAllProducts(page, 9);
//       setProducts(result.products || []);
//       setTotalPages(result.pagination?.totalPages || 1);
//       setTotalProducts(result.pagination?.totalProducts || 0);
//     } catch (err) {
//       setProductsError(err.message || "Failed to load products");
//     } finally {
//       setProductsLoading(false);
//     }
//   };

//   const fetchWishlistIds = async () => {
//     try {
//       const result = await cartService.getWishlist();
//       setWishlistIds((result.wishlist || []).map((product) => product._id));
//     } catch {
//       // Non-critical: if this fails, hearts just default to empty
//     }
//   };

//   useEffect(() => {
//     fetchProducts(currentPage);
//   }, [currentPage]);

//   useEffect(() => {
//     fetchWishlistIds();
//   }, []);

//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleToggleWishlist = async (productId) => {
//     try {
//       const result = await cartService.toggleWishlist(productId);
//       setWishlistIds((result.wishlist || []).map((product) => product._id));
//     } catch (err) {
//       setProductsError(err.message || "Failed to update wishlist");
//     }
//   };

//   const handleAddToCart = async (productId) => {
//     try {
//       await cartService.addToCart(productId, 1);
//     } catch (err) {
//       setProductsError(err.message || "Failed to add to cart");
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#fbfdfc] px-5 py-6 text-[#17233f]">
//       <div className="mx-auto max-w-7xl">
//         <Navbar
//           badge="B"
//           panel="Buyer Panel"
//           title="Buyer Dashboard"
//           actions={
//             <>
//               <Link to="/buyer/cart">
//                 <Button variant="secondary">Cart</Button>
//               </Link>
//               <Link to="/buyer/profile">
//                 <Button variant="secondary">Profile</Button>
//               </Link>
//             </>
//           }
//         />

//         <section className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
//           <HeroPanel
//             eyebrow="Welcome back"
//             title="Explore premium products and manage your buying journey."
//             description="Browse listings from every seller on the marketplace, all in one place."
//           >
//             <div className="mt-8 grid gap-3 sm:grid-cols-3">
//               <div className="rounded-2xl bg-white/15 p-4 ring-1 ring-white/20">
//                 <p className="text-3xl font-black">{totalProducts}</p>
//                 <p className="text-sm text-white/75">Products Available</p>
//               </div>
//               <div className="rounded-2xl bg-white/15 p-4 ring-1 ring-white/20">
//                 <p className="text-3xl font-black">{totalPages}</p>
//                 <p className="text-sm text-white/75">Total Pages</p>
//               </div>
//               <div className="rounded-2xl bg-white/15 p-4 ring-1 ring-white/20">
//                 <p className="text-3xl font-black">Active</p>
//                 <p className="text-sm text-white/75">Status</p>
//               </div>
//             </div>
//           </HeroPanel>

//           <Card as="aside" className="p-6">
//             <h3 className="text-xl font-extrabold">Account Overview</h3>
//             <div className="mt-5 space-y-3">
//               <InfoRow label="Role" value={role} valueClassName="capitalize text-[#178f95]" />
//               <InfoRow label="Verification" value="Active" valueClassName="text-emerald-600" />
//               <InfoRow label="Access" value="Buyer" />
//             </div>
//           </Card>
//         </section>

//         <section className="mt-6">
//           <div className="mb-5">
//             <p className="text-sm font-bold text-[#178f95]">Marketplace</p>
//             <h3 className="text-2xl font-extrabold">All Products</h3>
//           </div>

//           {productsError && (
//             <p className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
//               {productsError}
//             </p>
//           )}

//           {productsLoading ? (
//             <div className="rounded-[24px] bg-[#f6fbfb] p-8 text-center text-sm font-semibold text-slate-500">
//               Loading products...
//             </div>
//           ) : (
//             <>
//               <ProductGrid
//                 products={products}
//                 wishlistIds={wishlistIds}
//                 onToggleWishlist={handleToggleWishlist}
//                 onAddToCart={handleAddToCart}
//               />

//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//                 className="mt-8"
//               />
//             </>
//           )}
//         </section>
//       </div>
//     </main>
//   );
// };

// export default BuyerDashboard;


/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import buyerProductService from "../services/product.service";
import cartService from "../services/cart.service";
import ProductGrid from "../components/ProductGrid";
import { Button, Card, HeroPanel, InfoRow, Navbar, Pagination } from "../../../shared/components";

const BuyerDashboard = () => {
  const role = localStorage.getItem("role");

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // IDs of products currently in the buyer's wishlist, used to show filled/empty hearts
  const [wishlistIds, setWishlistIds] = useState([]);

  const fetchProducts = async (page) => {
    setProductsLoading(true);
    setProductsError("");

    try {
      const result = await buyerProductService.getAllProducts(page, 10);
      setProducts(result.products || []);
      setTotalPages(result.pagination?.totalPages || 1);
      setTotalProducts(result.pagination?.totalProducts || 0);
    } catch (err) {
      setProductsError(err.message || "Failed to load products");
    } finally {
      setProductsLoading(false);
    }
  };

  const fetchWishlistIds = async () => {
    try {
      const result = await cartService.getWishlist();
      setWishlistIds((result.wishlist || []).map((product) => product._id));
    } catch {
      // Non-critical: if this fails, hearts just default to empty
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchWishlistIds();
  }, []);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleWishlist = async (productId) => {
    try {
      const result = await cartService.toggleWishlist(productId);
      setWishlistIds((result.wishlist || []).map((product) => product._id));
    } catch (err) {
      setProductsError(err.message || "Failed to update wishlist");
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await cartService.addToCart(productId, 1);
    } catch (err) {
      setProductsError(err.message || "Failed to add to cart");
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfdfc] px-5 py-6 text-[#17233f]">
      <div className="mx-auto max-w-7xl">
        <Navbar
          badge="B"
          panel="Buyer Panel"
          title="Buyer Dashboard"
          actions={
            <>
              <Link to="/buyer/cart">
                <Button variant="secondary">Cart</Button>
              </Link>
              <Link to="/buyer/reviews">
                <Button variant="secondary">My Reviews</Button>
              </Link>
              <Link to="/buyer/profile">
                <Button variant="secondary">Profile</Button>
              </Link>
            </>
          }
        />

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <HeroPanel
            eyebrow="Welcome back"
            title="Explore premium products and manage your buying journey."
            description="Browse listings from every seller on the marketplace, all in one place."
          >
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/15 p-4 ring-1 ring-white/20">
                <p className="text-3xl font-black">{totalProducts}</p>
                <p className="text-sm text-white/75">Products Available</p>
              </div>
              <div className="rounded-2xl bg-white/15 p-4 ring-1 ring-white/20">
                <p className="text-3xl font-black">{totalPages}</p>
                <p className="text-sm text-white/75">Total Pages</p>
              </div>
              <div className="rounded-2xl bg-white/15 p-4 ring-1 ring-white/20">
                <p className="text-3xl font-black">Active</p>
                <p className="text-sm text-white/75">Status</p>
              </div>
            </div>
          </HeroPanel>

          <Card as="aside" className="p-6">
            <h3 className="text-xl font-extrabold">Account Overview</h3>
            <div className="mt-5 space-y-3">
              <InfoRow label="Role" value={role} valueClassName="capitalize text-[#178f95]" />
              <InfoRow label="Verification" value="Active" valueClassName="text-emerald-600" />
              <InfoRow label="Access" value="Buyer" />
            </div>
          </Card>
        </section>

        <section className="mt-6">
          <div className="mb-5">
            <p className="text-sm font-bold text-[#178f95]">Marketplace</p>
            <h3 className="text-2xl font-extrabold">All Products</h3>
          </div>

          {productsError && (
            <p className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {productsError}
            </p>
          )}

          {productsLoading ? (
            <div className="rounded-[24px] bg-[#f6fbfb] p-8 text-center text-sm font-semibold text-slate-500">
              Loading products...
            </div>
          ) : (
            <>
              <ProductGrid
                products={products}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="mt-8"
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default BuyerDashboard;
