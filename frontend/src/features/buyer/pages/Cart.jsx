// /* eslint-disable react-hooks/set-state-in-effect */
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import cartService from "../services/cart.service";
// import { Alert, Button, Card, Navbar } from "../../../shared/components";

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [activeTab, setActiveTab] = useState("cart"); // "cart" | "wishlist"

//   const loadData = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const [cartResult, wishlistResult] = await Promise.all([
//         cartService.getCart(),
//         cartService.getWishlist(),
//       ]);
//       setCart(cartResult.cart || []);
//       setWishlist(wishlistResult.wishlist || []);
//     } catch (err) {
//       setError(err.message || "Failed to load your cart");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const handleQuantityChange = async (productId, quantity) => {
//     if (quantity < 1) return;
//     try {
//       const result = await cartService.updateCartQuantity(productId, quantity);
//       setCart(result.cart || []);
//     } catch (err) {
//       setError(err.message || "Failed to update quantity");
//     }
//   };

//   const handleRemoveFromCart = async (productId) => {
//     try {
//       const result = await cartService.removeFromCart(productId);
//       setCart(result.cart || []);
//     } catch (err) {
//       setError(err.message || "Failed to remove item");
//     }
//   };

//   const handleRemoveFromWishlist = async (productId) => {
//     try {
//       const result = await cartService.toggleWishlist(productId);
//       setWishlist(result.wishlist || []);
//     } catch (err) {
//       setError(err.message || "Failed to update wishlist");
//     }
//   };

//   const handleMoveToCart = async (productId) => {
//     try {
//       await cartService.addToCart(productId, 1);
//       const result = await cartService.toggleWishlist(productId); // removes from wishlist
//       setWishlist(result.wishlist || []);
//       const cartResult = await cartService.getCart();
//       setCart(cartResult.cart || []);
//     } catch (err) {
//       setError(err.message || "Failed to move item to cart");
//     }
//   };

//   const cartTotal = cart.reduce((sum, item) => {
//     const price = item.product?.discountPrice || item.product?.price || 0;
//     return sum + price * item.quantity;
//   }, 0);

//   return (
//     <main className="min-h-screen bg-[#fbfdfc] px-5 py-6 text-[#17233f]">
//       <div className="mx-auto max-w-5xl">
//         <Navbar badge="B" panel="Buyer Panel" title="Cart & Wishlist" />

//         {/* Tabs */}
//         <div className="mt-6 flex gap-2">
//           <button
//             type="button"
//             onClick={() => setActiveTab("cart")}
//             className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
//               activeTab === "cart"
//                 ? "bg-[#178f95] text-white"
//                 : "border border-slate-200 bg-white text-[#17233f] hover:bg-slate-50"
//             }`}
//           >
//             My Cart ({cart.length})
//           </button>
//           <button
//             type="button"
//             onClick={() => setActiveTab("wishlist")}
//             className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
//               activeTab === "wishlist"
//                 ? "bg-[#178f95] text-white"
//                 : "border border-slate-200 bg-white text-[#17233f] hover:bg-slate-50"
//             }`}
//           >
//             My Wishlist ({wishlist.length})
//           </button>
//         </div>

//         {error && (
//           <Alert variant="error" className="mt-4">
//             {error}
//           </Alert>
//         )}

//         {loading ? (
//           <Card className="mt-6 p-8 text-center text-sm font-semibold text-slate-500">
//             Loading...
//           </Card>
//         ) : activeTab === "cart" ? (
//           cart.length === 0 ? (
//             <Card className="mt-6 border-dashed border-[#178f95]/30 bg-[#f6fbfb] p-8 text-center">
//               <h3 className="text-xl font-extrabold">Your cart is empty</h3>
//               <p className="mt-2 text-sm text-slate-500">
//                 Browse the marketplace and add products you like.
//               </p>
//               <Link to="/buyer-dashboard">
//                 <Button className="mt-4">Browse Products</Button>
//               </Link>
//             </Card>
//           ) : (
//             <div className="mt-6 space-y-4">
//               {cart.map((item) => (
//                 <Card key={item.product._id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
//                   <img
//                     src={item.product.imageUrl || ""}
//                     alt={item.product.title}
//                     className="h-20 w-20 rounded-xl object-cover bg-[#dff3f2]"
//                   />
//                   <div className="flex-1">
//                     <Link to={`/product/${item.product._id}`} className="font-extrabold hover:underline">
//                       {item.product.title}
//                     </Link>
//                     <p className="mt-1 text-sm font-bold text-[#178f95]">
//                       Rs. {item.product.discountPrice || item.product.price}
//                     </p>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <button
//                       type="button"
//                       onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
//                       className="h-9 w-9 rounded-lg border border-slate-200 font-bold hover:bg-slate-50"
//                     >
//                       -
//                     </button>
//                     <span className="w-8 text-center font-bold">{item.quantity}</span>
//                     <button
//                       type="button"
//                       onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
//                       className="h-9 w-9 rounded-lg border border-slate-200 font-bold hover:bg-slate-50"
//                     >
//                       +
//                     </button>
//                   </div>

//                   <Button
//                     variant="danger"
//                     onClick={() => handleRemoveFromCart(item.product._id)}
//                   >
//                     Remove
//                   </Button>
//                 </Card>
//               ))}

//               <Card className="flex items-center justify-between p-5">
//                 <span className="text-lg font-extrabold">Total</span>
//                 <span className="text-2xl font-black text-[#178f95]">
//                   Rs. {cartTotal.toFixed(2)}
//                 </span>
//               </Card>
//             </div>
//           )
//         ) : wishlist.length === 0 ? (
//           <Card className="mt-6 border-dashed border-[#178f95]/30 bg-[#f6fbfb] p-8 text-center">
//             <h3 className="text-xl font-extrabold">Your wishlist is empty</h3>
//             <p className="mt-2 text-sm text-slate-500">
//               Tap the heart icon on any product to save it here.
//             </p>
//           </Card>
//         ) : (
//           <div className="mt-6 grid gap-4 sm:grid-cols-2">
//             {wishlist.map((product) => (
//               <Card key={product._id} className="flex gap-4 p-4">
//                 <img
//                   src={product.imageUrl || ""}
//                   alt={product.title}
//                   className="h-20 w-20 rounded-xl object-cover bg-[#dff3f2]"
//                 />
//                 <div className="flex-1">
//                   <Link to={`/product/${product._id}`} className="font-extrabold hover:underline">
//                     {product.title}
//                   </Link>
//                   <p className="mt-1 text-sm font-bold text-[#178f95]">
//                     Rs. {product.discountPrice || product.price}
//                   </p>
//                   <div className="mt-3 flex gap-2">
//                     <Button size="sm" onClick={() => handleMoveToCart(product._id)}>
//                       Add to Cart
//                     </Button>
//                     <Button size="sm" variant="danger" onClick={() => handleRemoveFromWishlist(product._id)}>
//                       Remove
//                     </Button>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// };

// export default Cart;


import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartService from "../services/cart.service";
import orderService from "../services/order.service";
import { Alert, Button, Card, Input, Navbar } from "../../../shared/components";

const PAYMENT_OPTIONS = [
  { value: "cod", label: "Cash on Delivery" },
  { value: "card", label: "Credit / Debit Card" },
  { value: "easypaisa", label: "EasyPaisa" },
  { value: "jazzcash", label: "JazzCash" },
];

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("cart"); // "cart" | "wishlist"

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    shippingAddress: "",
    contactName: "",
    contactPhone: "",
    paymentType: "cod",
  });
  const [checkoutError, setCheckoutError] = useState("");
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [cartResult, wishlistResult] = await Promise.all([
        cartService.getCart(),
        cartService.getWishlist(),
      ]);
      setCart(cartResult.cart || []);
      setWishlist(wishlistResult.wishlist || []);
    } catch (err) {
      setError(err.message || "Failed to load your cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      const result = await cartService.updateCartQuantity(productId, quantity);
      setCart(result.cart || []);
    } catch (err) {
      setError(err.message || "Failed to update quantity");
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const result = await cartService.removeFromCart(productId);
      setCart(result.cart || []);
    } catch (err) {
      setError(err.message || "Failed to remove item");
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const result = await cartService.toggleWishlist(productId);
      setWishlist(result.wishlist || []);
    } catch (err) {
      setError(err.message || "Failed to update wishlist");
    }
  };

  const handleMoveToCart = async (productId) => {
    try {
      await cartService.addToCart(productId, 1);
      const result = await cartService.toggleWishlist(productId); // removes from wishlist
      setWishlist(result.wishlist || []);
      const cartResult = await cartService.getCart();
      setCart(cartResult.cart || []);
    } catch (err) {
      setError(err.message || "Failed to move item to cart");
    }
  };

  const handleCheckoutFormChange = (e) => {
    const { name, value } = e.target;
    setCheckoutForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setCheckoutError("");
    setCheckingOut(true);

    try {
      await orderService.checkoutCart(checkoutForm);
      setOrderPlaced(true);
      setCart([]);
    } catch (err) {
      setCheckoutError(err.message || "Failed to place order");
    } finally {
      setCheckingOut(false);
    }
  };

  const cartTotal = cart.reduce((sum, item) => {
    const price = item.product?.discountPrice || item.product?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-[#fbfdfc] px-5 py-6 text-[#17233f]">
        <div className="mx-auto max-w-2xl">
          <Navbar badge="B" panel="Buyer Panel" title="Order Placed" />
          <Card className="mt-8 p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e6f4ea] text-3xl font-black text-[#0f9d58]">
              ✓
            </div>
            <h2 className="mt-4 text-2xl font-extrabold">Order placed successfully!</h2>
            <p className="mt-2 text-sm text-slate-500">
              Every item in your cart has been ordered. Sellers will process them soon.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button fullWidth onClick={() => navigate("/buyer-dashboard")}>
                Continue Shopping
              </Button>
              <Button variant="secondary" fullWidth onClick={() => navigate("/buyer/orders")}>
                View My Orders
              </Button>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbfdfc] px-5 py-6 text-[#17233f]">
      <div className="mx-auto max-w-5xl">
        <Navbar badge="B" panel="Buyer Panel" title="Cart & Wishlist" />

        {/* Tabs */}
        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("cart")}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
              activeTab === "cart"
                ? "bg-[#178f95] text-white"
                : "border border-slate-200 bg-white text-[#17233f] hover:bg-slate-50"
            }`}
          >
            My Cart ({cart.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("wishlist")}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
              activeTab === "wishlist"
                ? "bg-[#178f95] text-white"
                : "border border-slate-200 bg-white text-[#17233f] hover:bg-slate-50"
            }`}
          >
            My Wishlist ({wishlist.length})
          </button>
        </div>

        {error && (
          <Alert variant="error" className="mt-4">
            {error}
          </Alert>
        )}

        {loading ? (
          <Card className="mt-6 p-8 text-center text-sm font-semibold text-slate-500">
            Loading...
          </Card>
        ) : activeTab === "cart" ? (
          cart.length === 0 ? (
            <Card className="mt-6 border-dashed border-[#178f95]/30 bg-[#f6fbfb] p-8 text-center">
              <h3 className="text-xl font-extrabold">Your cart is empty</h3>
              <p className="mt-2 text-sm text-slate-500">
                Browse the marketplace and add products you like.
              </p>
              <Link to="/buyer-dashboard">
                <Button className="mt-4">Browse Products</Button>
              </Link>
            </Card>
          ) : (
            <div className="mt-6 space-y-4">
              {cart.map((item) => (
                <Card key={item.product._id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  <img
                    src={item.product.imageUrl || ""}
                    alt={item.product.title}
                    className="h-20 w-20 rounded-xl object-cover bg-[#dff3f2]"
                  />
                  <div className="flex-1">
                    <Link to={`/product/${item.product._id}`} className="font-extrabold hover:underline">
                      {item.product.title}
                    </Link>
                    <p className="mt-1 text-sm font-bold text-[#178f95]">
                      Rs. {item.product.discountPrice || item.product.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="h-9 w-9 rounded-lg border border-slate-200 font-bold hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                      className="h-9 w-9 rounded-lg border border-slate-200 font-bold hover:bg-slate-50"
                    >
                      +
                    </button>
                  </div>

                  <Button
                    variant="danger"
                    onClick={() => handleRemoveFromCart(item.product._id)}
                  >
                    Remove
                  </Button>
                </Card>
              ))}

              <Card className="flex items-center justify-between p-5">
                <span className="text-lg font-extrabold">Total</span>
                <span className="text-2xl font-black text-[#178f95]">
                  Rs. {cartTotal.toFixed(2)}
                </span>
              </Card>

              {!showCheckoutForm ? (
                <Button size="lg" fullWidth onClick={() => setShowCheckoutForm(true)}>
                  Proceed to Checkout
                </Button>
              ) : (
                <Card className="p-5">
                  <h3 className="text-lg font-extrabold">Delivery & Payment Details</h3>

                  <form onSubmit={handlePlaceOrder} className="mt-5 space-y-4">
                    {checkoutError && <Alert variant="error">{checkoutError}</Alert>}

                    <Input
                      id="contactName"
                      name="contactName"
                      label="Contact Name"
                      placeholder="Your full name"
                      value={checkoutForm.contactName}
                      onChange={handleCheckoutFormChange}
                      required
                    />

                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      label="Contact Phone"
                      placeholder="03XXXXXXXXX"
                      value={checkoutForm.contactPhone}
                      onChange={handleCheckoutFormChange}
                      required
                    />

                    <Input
                      as="textarea"
                      id="shippingAddress"
                      name="shippingAddress"
                      label="Shipping Address"
                      rows={3}
                      placeholder="House #, street, city..."
                      value={checkoutForm.shippingAddress}
                      onChange={handleCheckoutFormChange}
                      required
                    />

                    <Input
                      as="select"
                      id="paymentType"
                      name="paymentType"
                      label="Payment Method"
                      value={checkoutForm.paymentType}
                      onChange={handleCheckoutFormChange}
                    >
                      {PAYMENT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Input>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button type="submit" fullWidth size="lg" disabled={checkingOut}>
                        {checkingOut ? "Placing Order..." : `Place Order — Rs. ${cartTotal.toFixed(2)}`}
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        fullWidth
                        size="lg"
                        onClick={() => setShowCheckoutForm(false)}
                        disabled={checkingOut}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Card>
              )}
            </div>
          )
        ) : wishlist.length === 0 ? (
          <Card className="mt-6 border-dashed border-[#178f95]/30 bg-[#f6fbfb] p-8 text-center">
            <h3 className="text-xl font-extrabold">Your wishlist is empty</h3>
            <p className="mt-2 text-sm text-slate-500">
              Tap the heart icon on any product to save it here.
            </p>
          </Card>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {wishlist.map((product) => (
              <Card key={product._id} className="flex gap-4 p-4">
                <img
                  src={product.imageUrl || ""}
                  alt={product.title}
                  className="h-20 w-20 rounded-xl object-cover bg-[#dff3f2]"
                />
                <div className="flex-1">
                  <Link to={`/product/${product._id}`} className="font-extrabold hover:underline">
                    {product.title}
                  </Link>
                  <p className="mt-1 text-sm font-bold text-[#178f95]">
                    Rs. {product.discountPrice || product.price}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" onClick={() => handleMoveToCart(product._id)}>
                      Add to Cart
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => handleRemoveFromWishlist(product._id)}>
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;