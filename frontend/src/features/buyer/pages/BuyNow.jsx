import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import buyerProductService from "../services/product.service";
import orderService from "../services/order.service";
import { Alert, Button, Card, Input, Navbar } from "../../../shared/components";

const PAYMENT_OPTIONS = [
  { value: "cod", label: "Cash on Delivery" },
  { value: "card", label: "Credit / Debit Card" },
  { value: "easypaisa", label: "EasyPaisa" },
  { value: "jazzcash", label: "JazzCash" },
];

const BuyNow = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [form, setForm] = useState({
    shippingAddress: "",
    contactName: "",
    contactPhone: "",
    paymentType: "cod",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setLoadError("");
      try {
        const result = await buyerProductService.getProductById(id);
        setProduct(result.product);
      } catch (err) {
        setLoadError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const decreaseQuantity = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const increaseQuantity = () => {
    setQuantity((q) => Math.min(product?.stock || 1, q + 1));
  };

  const unitPrice = product ? product.discountPrice || product.price : 0;
  const totalAmount = unitPrice * quantity;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await orderService.buyNow({
        productId: id,
        quantity,
        ...form,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
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
              The seller has been notified and will process your order soon.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button fullWidth onClick={() => navigate("/buyer-dashboard")}>
                Continue Shopping
              </Button>
              <Button
                variant="secondary"
                fullWidth
                onClick={() => navigate("/buyer/orders")}
              >
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
      <div className="mx-auto max-w-3xl">
        <Navbar badge="B" panel="Buyer Panel" title="Buy Now" />

        <Button variant="ghost" className="mt-6" onClick={() => navigate(-1)}>
          ← Back
        </Button>

        {loading ? (
          <Card className="mt-4 p-8 text-center text-sm font-semibold text-slate-500">
            Loading product...
          </Card>
        ) : loadError ? (
          <Alert variant="error" className="mt-4">
            {loadError}
          </Alert>
        ) : (
          <>
            {/* Product summary */}
            <Card className="mt-4 flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="h-24 w-24 rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-[#dff3f2] text-xs font-bold text-[#178f95]">
                  No Image
                </div>
              )}

              <div className="flex-1">
                <h3 className="text-lg font-extrabold">{product.title}</h3>
                <p className="mt-1 text-sm font-bold text-[#178f95]">Rs. {unitPrice}</p>
                <p className="text-xs font-semibold text-slate-400">
                  {product.stock} in stock
                </p>
              </div>

              {/* Quantity stepper — decrease disabled at 1 */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-lg border border-slate-200 font-bold hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  -
                </button>
                <span className="w-8 text-center text-lg font-bold">{quantity}</span>
                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                  className="h-10 w-10 rounded-lg border border-slate-200 font-bold hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </Card>

            {/* Order form */}
            <Card className="mt-4 p-5">
              <h3 className="text-lg font-extrabold">Delivery & Payment Details</h3>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                {error && <Alert variant="error">{error}</Alert>}

                <Input
                  id="contactName"
                  name="contactName"
                  label="Contact Name"
                  placeholder="Your full name"
                  value={form.contactName}
                  onChange={handleChange}
                  required
                />

                <Input
                  id="contactPhone"
                  name="contactPhone"
                  label="Contact Phone"
                  placeholder="03XXXXXXXXX"
                  value={form.contactPhone}
                  onChange={handleChange}
                  required
                />

                <Input
                  as="textarea"
                  id="shippingAddress"
                  name="shippingAddress"
                  label="Shipping Address"
                  rows={3}
                  placeholder="House #, street, city..."
                  value={form.shippingAddress}
                  onChange={handleChange}
                  required
                />

                <Input
                  as="select"
                  id="paymentType"
                  name="paymentType"
                  label="Payment Method"
                  value={form.paymentType}
                  onChange={handleChange}
                >
                  {PAYMENT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Input>

                <div className="flex items-center justify-between rounded-2xl bg-[#f6fbfb] p-4">
                  <span className="font-bold">Total Amount</span>
                  <span className="text-2xl font-black text-[#178f95]">
                    Rs. {totalAmount.toFixed(2)}
                  </span>
                </div>

                <Button type="submit" fullWidth size="lg" disabled={submitting}>
                  {submitting ? "Placing Order..." : "Place Order"}
                </Button>
              </form>
            </Card>
          </>
        )}
      </div>
    </main>
  );
};

export default BuyNow;
