import { z } from "zod";

const orderDetailsShape = {
  shippingAddress: z.string().trim().min(5, "Please enter a complete shipping address"),
  contactName: z.string().trim().min(2, "Please enter a contact name"),
  contactPhone: z
    .string()
    .trim()
    .regex(/^03\d{9}$/, "Phone number must be 11 digits and start with 03"),
  paymentType: z.enum(["cod", "card", "easypaisa", "jazzcash"], {
    errorMap: () => ({ message: "Please select a valid payment method" }),
  }),
};

// Used for "Buy Now" — a single product purchase
export const buyNowSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  quantity: z.coerce.number().int("Quantity must be a whole number").min(1, "Quantity must be at least 1"),
  ...orderDetailsShape,
});

// Used for "Checkout" from the cart — shipping/payment details only,
// the items themselves come from the buyer's existing cart on the server.
export const checkoutSchema = z.object(orderDetailsShape);
