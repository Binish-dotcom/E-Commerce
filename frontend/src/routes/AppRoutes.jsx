// import { Routes, Route } from "react-router-dom";

// import Home from "../features/home/pages/Home";
// import About from "../features/about/pages/About";
// import Contact from "../features/contact/pages/Contact";
// import Marketplace from "../features/marketplace/pages/Marketplace";
// import Signup from "../features/auth/pages/Signup";
// import Login from "../features/auth/pages/Login";
// import VerifyOTP from "../features/auth/pages/VerifyOTP";

// import SellerDashboard from "../features/seller/pages/SellerDashboard";
// import AddProduct from "../features/seller/pages/AddProduct";
// import EditProduct from "../features/seller/pages/EditProduct";
// import SellerProfile from "../features/seller/pages/SellerProfile";

// import BuyerDashboard from "../features/buyer/pages/BuyerDashboard";
// import BuyerProfile from "../features/buyer/pages/BuyerProfile";
// import Cart from "../features/buyer/pages/Cart";
// import ProductDetail from "../features/buyer/pages/ProductDetail";

// import ProtectedRoute from "./ProtectedRoute";
// import PublicRoute from "./PublicRoute";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/" element={<Home />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/contact" element={<Contact />} />
//       <Route path="/marketplace" element={<Marketplace />} />

//       <Route
//         path="/signup"
//         element={
//           <PublicRoute>
//             <Signup />
//           </PublicRoute>
//         }
//       />

//       <Route
//         path="/login"
//         element={
//           <PublicRoute>
//             <Login />
//           </PublicRoute>
//         }
//       />

//       <Route
//         path="/otp-verification"
//         element={
//           <PublicRoute>
//             <VerifyOTP />
//           </PublicRoute>
//         }
//       />

//       {/* Seller */}

//       <Route
//         path="/seller-dashboard"
//         element={
//           <ProtectedRoute role="seller">
//             <SellerDashboard />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/seller/add-product"
//         element={
//           <ProtectedRoute role="seller">
//             <AddProduct />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/seller/edit-product/:id"
//         element={
//           <ProtectedRoute role="seller">
//             <EditProduct />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/seller/profile"
//         element={
//           <ProtectedRoute role="seller">
//             <SellerProfile />
//           </ProtectedRoute>
//         }
//       />

//       {/* Buyer */}

//       <Route
//         path="/buyer-dashboard"
//         element={
//           <ProtectedRoute role="buyer">
//             <BuyerDashboard />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/buyer/profile"
//         element={
//           <ProtectedRoute role="buyer">
//             <BuyerProfile />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/buyer/cart"
//         element={
//           <ProtectedRoute role="buyer">
//             <Cart />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/product/:id"
//         element={
//           <ProtectedRoute role="buyer">
//             <ProductDetail />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// };

// export default AppRoutes;



import { Routes, Route } from "react-router-dom";

import Home from "../features/home/pages/Home";
import About from "../features/about/pages/About";
import Contact from "../features/contact/pages/Contact";
import Marketplace from "../features/marketplace/pages/Marketplace";
import Signup from "../features/auth/pages/Signup";
import Login from "../features/auth/pages/Login";
import VerifyOTP from "../features/auth/pages/VerifyOTP";

import SellerDashboard from "../features/seller/pages/SellerDashboard";
import AddProduct from "../features/seller/pages/AddProduct";
import EditProduct from "../features/seller/pages/EditProduct";
import SellerProfile from "../features/seller/pages/SellerProfile";
import SellerOrders from "../features/seller/pages/Orders";

import BuyerDashboard from "../features/buyer/pages/BuyerDashboard";
import BuyerProfile from "../features/buyer/pages/BuyerProfile";
import Cart from "../features/buyer/pages/Cart";
import ProductDetail from "../features/buyer/pages/ProductDetail";
import BuyNow from "../features/buyer/pages/BuyNow";
import BuyerOrders from "../features/buyer/pages/Orders";

import AdminDashboard from "../features/admin/pages/AdminDashboard";
import MyReviews from "../features/reviews/pages/MyReviews";
import SellerReviewsInbox from "../features/reviews/pages/SellerReviewsInbox";
import AdminReviewModeration from "../features/reviews/pages/AdminReviewModeration";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/marketplace" element={<Marketplace />} />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/otp-verification"
        element={
          <PublicRoute>
            <VerifyOTP />
          </PublicRoute>
        }
      />

      {/* Seller */}

      <Route
        path="/seller-dashboard"
        element={
          <ProtectedRoute role="seller">
            <SellerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/seller/add-product"
        element={
          <ProtectedRoute role="seller">
            <AddProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/seller/edit-product/:id"
        element={
          <ProtectedRoute role="seller">
            <EditProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/seller/profile"
        element={
          <ProtectedRoute role="seller">
            <SellerProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/seller/orders"
        element={
          <ProtectedRoute role="seller">
            <SellerOrders />
          </ProtectedRoute>
        }
      />

      {/* Buyer */}

      <Route
        path="/buyer-dashboard"
        element={
          <ProtectedRoute role="buyer">
            <BuyerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/buyer/profile"
        element={
          <ProtectedRoute role="buyer">
            <BuyerProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/buyer/cart"
        element={
          <ProtectedRoute role="buyer">
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product/:id"
        element={
          <ProtectedRoute role="buyer">
            <ProductDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/buy-now/:id"
        element={
          <ProtectedRoute role="buyer">
            <BuyNow />
          </ProtectedRoute>
        }
      />

      <Route
        path="/buyer/orders"
        element={
          <ProtectedRoute role="buyer">
            <BuyerOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/buyer/reviews"
        element={
          <ProtectedRoute role="buyer">
            <MyReviews />
          </ProtectedRoute>
        }
      />

      {/* Seller Reviews */}

      <Route
        path="/seller/reviews"
        element={
          <ProtectedRoute role="seller">
            <SellerReviewsInbox />
          </ProtectedRoute>
        }
      />

      {/* Admin */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/reviews"
        element={
          <ProtectedRoute role="admin">
            <AdminReviewModeration />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
