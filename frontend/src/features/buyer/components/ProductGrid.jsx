// import { Link } from "react-router-dom";
// import { Button, Card } from "../../../shared/components";
// import { Icon } from "../../../shared/components";

// const ProductGrid = ({ products, wishlistIds = [], onToggleWishlist, onAddToCart }) => {
//   if (!products || products.length === 0) {
//     return (
//       <Card className="border-dashed border-[#178f95]/30 bg-[#f6fbfb] p-8 text-center">
//         <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dff3f2] text-xl font-black text-[#178f95]">
//           !
//         </div>
//         <h3 className="mt-4 text-xl font-extrabold text-[#17233f]">No products available</h3>
//         <p className="mt-2 text-sm leading-6 text-slate-500">
//           Sellers haven&apos;t listed any products yet. Please check back soon.
//         </p>
//       </Card>
//     );
//   }

//   return (
//     <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
//       {products.map((product) => {
//         const isWishlisted = wishlistIds.includes(product._id);

//         return (
//           <Card
//             key={product._id}
//             as="article"
//             className="relative overflow-hidden bg-white transition hover:-translate-y-1 hover:shadow-lg"
//           >
//             {/* Wishlist heart toggle */}
//             {onToggleWishlist && (
//               <button
//                 type="button"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   onToggleWishlist(product._id);
//                 }}
//                 aria-label="Toggle wishlist"
//                 className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full text-lg shadow-md transition ${
//                   isWishlisted ? "bg-red-500 text-white" : "bg-white text-slate-400 hover:text-red-500"
//                 }`}
//               >
//                 <Icon name="heart" className="h-5 w-5" filled={isWishlisted} />
//               </button>
//             )}

//             <Link to={`/product/${product._id}`}>
//               {product.imageUrl ? (
//                 <img
//                   src={product.imageUrl}
//                   alt={product.title}
//                   className="h-44 w-full object-cover"
//                 />
//               ) : (
//                 <div className="flex h-44 w-full items-center justify-center bg-[#dff3f2] text-sm font-bold text-[#178f95]">
//                   No Image
//                 </div>
//               )}
//             </Link>

//             <div className="p-5">
//               <div className="flex items-center justify-between gap-3">
//                 <span className="rounded-full bg-[#dff3f2] px-3 py-1 text-xs font-bold capitalize text-[#178f95]">
//                   {product.category}
//                 </span>
//                 <span className="rounded-full bg-[#fff0e8] px-3 py-1 text-xs font-bold text-[#17233f]">
//                   Stock {product.stock}
//                 </span>
//               </div>

//               <Link to={`/product/${product._id}`}>
//                 <h4 className="mt-4 line-clamp-2 text-lg font-extrabold text-[#17233f] hover:underline">
//                   {product.title}
//                 </h4>
//               </Link>

//               {product.seller?.storeProfile?.storeName && (
//                 <p className="mt-1 text-xs font-semibold text-slate-400">
//                   Sold by {product.seller.storeProfile.storeName}
//                 </p>
//               )}

//               <div className="mt-4 flex items-end gap-2">
//                 {product.discountPrice ? (
//                   <>
//                     <span className="text-2xl font-black text-[#178f95]">
//                       Rs. {product.discountPrice}
//                     </span>
//                     <span className="pb-1 text-sm font-semibold text-slate-400 line-through">
//                       Rs. {product.price}
//                     </span>
//                   </>
//                 ) : (
//                   <span className="text-2xl font-black text-[#178f95]">
//                     Rs. {product.price}
//                   </span>
//                 )}
//               </div>

//               {onAddToCart && (
//                 <Button
//                   onClick={() => onAddToCart(product._id)}
//                   fullWidth
//                   className="mt-4"
//                 >
//                   Add to Cart
//                 </Button>
//               )}
//             </div>
//           </Card>
//         );
//       })}
//     </div>
//   );
// };

// export default ProductGrid;

import { Link, useNavigate } from "react-router-dom";
import { Button, Card } from "../../../shared/components";
import { Icon } from "../../../shared/components";

const ProductGrid = ({ products, wishlistIds = [], onToggleWishlist, onAddToCart }) => {
  const navigate = useNavigate();
  if (!products || products.length === 0) {
    return (
      <Card className="border-dashed border-[#178f95]/30 bg-[#f6fbfb] p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dff3f2] text-xl font-black text-[#178f95]">
          !
        </div>
        <h3 className="mt-4 text-xl font-extrabold text-[#17233f]">No products available</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Sellers haven&apos;t listed any products yet. Please check back soon.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => {
        const isWishlisted = wishlistIds.includes(product._id);

        return (
          <Card
            key={product._id}
            as="article"
            className="relative overflow-hidden bg-white transition hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Wishlist heart toggle */}
            {onToggleWishlist && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onToggleWishlist(product._id);
                }}
                aria-label="Toggle wishlist"
                className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full text-lg shadow-md transition ${
                  isWishlisted ? "bg-red-500 text-white" : "bg-white text-slate-400 hover:text-red-500"
                }`}
              >
                <Icon name="heart" className="h-5 w-5" filled={isWishlisted} />
              </button>
            )}

            <Link to={`/product/${product._id}`}>
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
            </Link>

            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#dff3f2] px-3 py-1 text-xs font-bold capitalize text-[#178f95]">
                  {product.category}
                </span>
                <span className="rounded-full bg-[#fff0e8] px-3 py-1 text-xs font-bold text-[#17233f]">
                  Stock {product.stock}
                </span>
              </div>

              <Link to={`/product/${product._id}`}>
                <h4 className="mt-4 line-clamp-2 text-lg font-extrabold text-[#17233f] hover:underline">
                  {product.title}
                </h4>
              </Link>

              {product.seller?.storeProfile?.storeName && (
                <p className="mt-1 text-xs font-semibold text-slate-400">
                  Sold by {product.seller.storeProfile.storeName}
                </p>
              )}

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

              <div className="mt-4 flex gap-2">
                <Button
                  onClick={() => navigate(`/buy-now/${product._id}`)}
                  fullWidth
                  disabled={product.stock <= 0}
                >
                  Buy Now
                </Button>
                {onAddToCart && (
                  <Button
                    onClick={() => onAddToCart(product._id)}
                    variant="secondary"
                    fullWidth
                    disabled={product.stock <= 0}
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ProductGrid;
