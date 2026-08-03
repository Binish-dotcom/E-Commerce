// ==========================================
// Centralized constants for the Admin
// Dashboard & Analytics module.
// Keeping these in one place avoids magic
// strings scattered across services/controllers.
// ==========================================

export const ROLES = {
  ADMIN: "admin",
  SELLER: "seller",
  BUYER: "buyer",
};

export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  RETURNED: "returned",
};

export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
};

export const SELLER_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const ACCOUNT_STATUS = {
  ACTIVE: "active",
  SUSPENDED: "suspended",
};

export const PRODUCT_APPROVAL = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const NOTIFICATION_TYPES = {
  NEW_SELLER: "new_seller",
  NEW_PRODUCT: "new_product",
  LOW_STOCK: "low_stock",
  LARGE_ORDER: "large_order",
  REFUND_REQUEST: "refund_request",
  PENDING_SELLER_OVERDUE: "pending_seller_overdue",
};

export const ACTIVITY_ACTIONS = {
  ADMIN_LOGIN: "admin_login",
  ADMIN_LOGOUT: "admin_logout",
  SELLER_APPROVED: "seller_approved",
  SELLER_REJECTED: "seller_rejected",
  SELLER_SUSPENDED: "seller_suspended",
  SELLER_ACTIVATED: "seller_activated",
  PRODUCT_APPROVED: "product_approved",
  PRODUCT_REJECTED: "product_rejected",
  PRODUCT_DELETED: "product_deleted",
  PRODUCT_DEACTIVATED: "product_deactivated",
  COUPON_CREATED: "coupon_created",
  REPORT_GENERATED: "report_generated",
  ANNOUNCEMENT_SENT: "announcement_sent",
};

export const SOCKET_EVENTS = {
  NEW_ORDER: "new_order",
  NEW_SELLER: "new_seller",
  NEW_BUYER: "new_buyer",
  ORDER_STATUS_CHANGED: "order_status_changed",
  DASHBOARD_REFRESH: "dashboard_refresh",
  NEW_NOTIFICATION: "new_notification",
};

// Flat platform commission on delivered orders.
export const COMMISSION_RATE = 0.1;

// Product is flagged "low stock" when stock is at/below this and > 0.
export const DEFAULT_LOW_STOCK_THRESHOLD = 5;

export const LARGE_ORDER_THRESHOLD = 50000;

// ==========================================
// Product Reviews & Ratings module constants
// ==========================================
export const REVIEW_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const REPORT_REASONS = {
  SPAM: "spam",
  FAKE: "fake",
  OFFENSIVE: "offensive",
  IRRELEVANT: "irrelevant",
  OTHER: "other",
};

export const REVIEW_ACTIVITY_ACTIONS = {
  REVIEW_CREATED: "review_created",
  REVIEW_UPDATED: "review_updated",
  REVIEW_DELETED: "review_deleted",
  HELPFUL_VOTE: "helpful_vote",
  SELLER_REPLY: "seller_reply",
  REVIEW_REPORTED: "review_reported",
  ADMIN_APPROVED_REVIEW: "admin_approved_review",
  ADMIN_REJECTED_REVIEW: "admin_rejected_review",
  ADMIN_DELETED_REVIEW: "admin_deleted_review",
  ADMIN_PINNED_REVIEW: "admin_pinned_review",
  ADMIN_UNPINNED_REVIEW: "admin_unpinned_review",
  ADMIN_SUSPENDED_BUYER: "admin_suspended_buyer",
};

export const REVIEW_SORT = {
  NEWEST: "newest",
  OLDEST: "oldest",
  HIGHEST: "highest",
  LOWEST: "lowest",
  HELPFUL: "helpful",
};

// A review gets auto-flagged for admin review when it collects this
// many user reports.
export const SPAM_REPORT_THRESHOLD = 3;

// Very short, ALL-CAPS, or heavily repeated-character reviews are
// common fake/spam patterns — cheap heuristics checked nightly by the
// spam-detection cron job (no ML needed for a first pass).
export const SPAM_MIN_DESCRIPTION_LENGTH = 15;
export const SPAM_REPEATED_CHAR_PATTERN = /(.)\1{6,}/; // e.g. "aaaaaaa"

export const REVIEW_REMINDER_DAYS_AFTER_DELIVERY = 7;
