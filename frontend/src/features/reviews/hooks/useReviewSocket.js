import { useEffect } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const SOCKET_URL = "http://localhost:5000";

// Connects the logged-in buyer/seller to their private Socket.IO room
// and toasts review-related real-time events (new review received,
// review approved, seller reply, review deleted, review reminder...).
const useReviewSocket = () => {
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const socket = io(SOCKET_URL, { transports: ["websocket"], autoConnect: true });

    socket.on("connect", () => {
      socket.emit("join-user-room", userId);
    });

    socket.on("new_notification", (notification) => {
      if (notification.type === "new_review" && notification.rating && notification.rating <= 2) {
        toast.error(`⚠️ Low rating alert: ${notification.rating}★ review received`);
        return;
      }

      const messages = {
        new_review: "🌟 New review received on your product",
        review_approved: "✅ Your review has been approved",
        seller_reply: "💬 The seller replied to your review",
        review_deleted: "🗑️ A review was removed by moderation",
        review_reminder: "⭐ Got a minute to review a recent purchase?",
        no_reviews_nudge: "📣 Some of your products have no reviews yet",
      };
      toast(notification.title || messages[notification.type] || "New notification", { icon: "🔔" });
    });

    return () => socket.disconnect();
  }, []);
};

export default useReviewSocket;
