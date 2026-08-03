


// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import sellerService from "../services/seller.service";
// import productService from "../services/product.service";
// import StoreSetupForm from "../components/StoreSetupForm";
// import ProductList from "../components/ProductList";
// import { Alert, Button, Card, HeroPanel, InfoRow, Navbar } from "../../../shared/components";

// const metricCards = [
//   { label: "Total Listings", key: "listings" },
//   { label: "Active Orders", key: "orders" },
//   { label: "Store Status", key: "status" },
// ];

// const SellerDashboard = () => {
//   const navigate = useNavigate();
//   const role = localStorage.getItem("role");

//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [products, setProducts] = useState([]);
//   const [productsLoading, setProductsLoading] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/login", { replace: true });
//   };

//   const fetchProfile = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const result = await sellerService.getMe();
//       setUser(result.user);
//     } catch (err) {
//       setError(err.message || "Failed to load profile");
//       if (err.message?.toLowerCase().includes("token")) {
//         handleLogout();
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProducts = async () => {
//     setProductsLoading(true);

//     try {
//       const result = await productService.getMyProducts();
//       setProducts(result.products || []);
//     } catch (err) {
//       console.error("Failed to fetch products:", err.message);
//     } finally {
//       setProductsLoading(false);
//     }
//   };

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     fetchProfile();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (user?.isStoreSetup) {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       fetchProducts();
//     }
//   }, [user?.isStoreSetup]);

//   const handleProductDeleted = (productId) => {
//     setProducts((prev) => prev.filter((product) => product._id !== productId));
//   };

//   if (loading) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-[#fbfdfc] px-5 text-[#17233f]">
//         <Card className="p-8 text-center">
//           <div className="mx-auto h-12 w-12 animate-pulse rounded-2xl bg-[#dff3f2]" />
//           <p className="mt-4 text-sm font-semibold text-slate-500">Loading your seller dashboard...</p>
//         </Card>
//       </main>
//     );
//   }

//   if (error && !user) {
//     return (
//       <main className="min-h-screen bg-[#fbfdfc] px-5 py-8 text-[#17233f]">
//         <Alert variant="error" className="mx-auto max-w-4xl">
//           {error}
//         </Alert>
//       </main>
//     );
//   }

//   if (user && !user.isStoreSetup) {
//     return <StoreSetupForm onStoreCreated={(updatedUser) => setUser(updatedUser)} />;
//   }

//   const metrics = {
//     listings: products.length,
//     orders: "0",
//     status: "Active",
//   };

//   return (
//     <main className="min-h-screen bg-[#fbfdfc] px-5 py-6 text-[#17233f]">
//       <div className="mx-auto max-w-7xl">
//         <Navbar
//           badge="S"
//           panel="Seller Panel"
//           title="Seller Dashboard"
//           actions={
//             <>
//               <Link to="/seller/profile">
//                 <Button variant="secondary">Profile</Button>
//               </Link>
//               <Button onClick={() => navigate("/seller/add-product")}>Add Product</Button>
//             </>
//           }
//         />

//         <section className="mt-6 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
//           <HeroPanel
//             eyebrow="Welcome seller"
//             title="Manage your store, products, and customer orders in one clean place."
//             description="Keep your listings updated, track your inventory, and build trust with buyers."
//           >
//             <div className="mt-8 grid gap-3 md:grid-cols-3">
//               {metricCards.map((card) => (
//                 <div key={card.key} className="rounded-2xl bg-white/15 p-4 ring-1 ring-white/20">
//                   <p className="text-3xl font-black">{metrics[card.key]}</p>
//                   <p className="text-sm text-white/75">{card.label}</p>
//                 </div>
//               ))}
//             </div>
//           </HeroPanel>

//           <Card as="aside" className="p-6">
//             <h3 className="text-xl font-extrabold">Store Profile</h3>
//             <div className="mt-5 space-y-3">
//               <InfoRow label="Store Name" value={user?.storeProfile?.storeName || "Not set"} stacked />
//               <div className="grid gap-3 sm:grid-cols-2">
//                 <InfoRow label="Category" value={user?.storeProfile?.storeCategory || "N/A"} stacked valueClassName="capitalize text-[#17233f]" />
//                 <InfoRow label="Role" value={role} stacked valueClassName="capitalize text-[#178f95]" />
//               </div>
//               <InfoRow
//                 label="Address"
//                 value={`${user?.storeProfile?.storeAddress || "No address"}${user?.storeProfile?.storeCity ? `, ${user.storeProfile.storeCity}` : ""}`}
//                 stacked
//                 valueClassName="text-sm font-semibold leading-6 text-slate-600"
//               />
//             </div>
//           </Card>
//         </section>

//         <Card as="section" className="mt-6 p-5 sm:p-6">
//           <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <p className="text-sm font-bold text-[#178f95]">Inventory</p>
//               <h3 className="text-2xl font-extrabold">My Products</h3>
//             </div>
//           </div>

//           {productsLoading ? (
//             <div className="rounded-[24px] bg-[#f6fbfb] p-8 text-center text-sm font-semibold text-slate-500">
//               Loading products...
//             </div>
//           ) : (
//             <ProductList products={products} onProductDeleted={handleProductDeleted} />
//           )}
//         </Card>
//       </div>
//     </main>
//   );
// };

// export default SellerDashboard;







import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import sellerService from "../services/seller.service";
import productService from "../services/product.service";
import StoreSetupForm from "../components/StoreSetupForm";
import ProductList from "../components/ProductList";
import { Alert, Button, Card, HeroPanel, InfoRow, Navbar } from "../../../shared/components";

const metricCards = [
  { label: "Total Listings", key: "listings" },
  { label: "Active Orders", key: "orders" },
  { label: "Store Status", key: "status" },
];

const SellerDashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  const fetchProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await sellerService.getMe();
      setUser(result.user);
    } catch (err) {
      setError(err.message || "Failed to load profile");
      if (err.message?.toLowerCase().includes("token")) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setProductsLoading(true);

    try {
      const result = await productService.getMyProducts();
      setProducts(result.products || []);
    } catch (err) {
      console.error("Failed to fetch products:", err.message);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user?.isStoreSetup) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchProducts();
    }
  }, [user?.isStoreSetup]);

  const handleProductDeleted = (productId) => {
    setProducts((prev) => prev.filter((product) => product._id !== productId));
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fbfdfc] px-5 text-[#17233f]">
        <Card className="p-8 text-center">
          <div className="mx-auto h-12 w-12 animate-pulse rounded-2xl bg-[#dff3f2]" />
          <p className="mt-4 text-sm font-semibold text-slate-500">Loading your seller dashboard...</p>
        </Card>
      </main>
    );
  }

  if (error && !user) {
    return (
      <main className="min-h-screen bg-[#fbfdfc] px-5 py-8 text-[#17233f]">
        <Alert variant="error" className="mx-auto max-w-4xl">
          {error}
        </Alert>
      </main>
    );
  }

  if (user && !user.isStoreSetup) {
    return <StoreSetupForm onStoreCreated={(updatedUser) => setUser(updatedUser)} />;
  }

  const metrics = {
    listings: products.length,
    orders: "0",
    status: "Active",
  };

  return (
    <main className="min-h-screen bg-[#fbfdfc] px-5 py-6 text-[#17233f]">
      <div className="mx-auto max-w-7xl">
        <Navbar
          badge="S"
          panel="Seller Panel"
          title="Seller Dashboard"
          actions={
            <>
              <Link to="/seller/orders">
                <Button variant="secondary">Orders</Button>
              </Link>
              <Link to="/seller/reviews">
                <Button variant="secondary">Reviews</Button>
              </Link>
              <Link to="/seller/profile">
                <Button variant="secondary">Profile</Button>
              </Link>
              <Button onClick={() => navigate("/seller/add-product")}>Add Product</Button>
            </>
          }
        />

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <HeroPanel
            eyebrow="Welcome seller"
            title="Manage your store, products, and customer orders in one clean place."
            description="Keep your listings updated, track your inventory, and build trust with buyers."
          >
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {metricCards.map((card) => (
                <div key={card.key} className="rounded-2xl bg-white/15 p-4 ring-1 ring-white/20">
                  <p className="text-3xl font-black">{metrics[card.key]}</p>
                  <p className="text-sm text-white/75">{card.label}</p>
                </div>
              ))}
            </div>
          </HeroPanel>

          <Card as="aside" className="p-6">
            <h3 className="text-xl font-extrabold">Store Profile</h3>
            <div className="mt-5 space-y-3">
              <InfoRow label="Store Name" value={user?.storeProfile?.storeName || "Not set"} stacked />
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoRow label="Category" value={user?.storeProfile?.storeCategory || "N/A"} stacked valueClassName="capitalize text-[#17233f]" />
                <InfoRow label="Role" value={role} stacked valueClassName="capitalize text-[#178f95]" />
              </div>
              <InfoRow
                label="Address"
                value={`${user?.storeProfile?.storeAddress || "No address"}${user?.storeProfile?.storeCity ? `, ${user.storeProfile.storeCity}` : ""}`}
                stacked
                valueClassName="text-sm font-semibold leading-6 text-slate-600"
              />
            </div>
          </Card>
        </section>

        <Card as="section" className="mt-6 p-5 sm:p-6">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-[#178f95]">Inventory</p>
              <h3 className="text-2xl font-extrabold">My Products</h3>
            </div>
          </div>

          {productsLoading ? (
            <div className="rounded-[24px] bg-[#f6fbfb] p-8 text-center text-sm font-semibold text-slate-500">
              Loading products...
            </div>
          ) : (
            <ProductList products={products} onProductDeleted={handleProductDeleted} />
          )}
        </Card>
      </div>
    </main>
  );
};

export default SellerDashboard;