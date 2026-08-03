import { useEffect } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { adminApi } from "../adminApi";

const SOCKET_URL = "http://localhost:5000";

// Connects the Admin Dashboard to the backend Socket.IO server and
// reacts to live events (new orders, new sellers/buyers, notifications,
// hourly cache refresh) by toasting + invalidating the relevant
// RTK Query cache tags so the UI updates without a manual refresh.
const useAdminSocket = (dispatch) => {
  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket"], autoConnect: true });

    socket.on("connect", () => {
      socket.emit("join-admin-room");
    });

    socket.on("new_order", (payload) => {
      toast.success(`🧾 New order: ${payload.productTitle} (Rs. ${payload.totalAmount})`);
      dispatch(adminApi.util.invalidateTags(["Overview", "ExtendedOverview", "OrdersTable"]));
    });

    socket.on("new_seller", (payload) => {
      toast(`🏪 New seller registered: ${payload.name}`, { icon: "🆕" });
      dispatch(adminApi.util.invalidateTags(["Overview", "ExtendedOverview", "PendingSellers", "SellersTable"]));
    });

    socket.on("new_buyer", () => {
      dispatch(adminApi.util.invalidateTags(["Overview", "ExtendedOverview", "BuyersTable"]));
    });

    socket.on("dashboard_refresh", () => {
      dispatch(adminApi.util.invalidateTags(["Overview", "ExtendedOverview"]));
    });

    socket.on("new_notification", (notification) => {
      toast(notification.title || "New notification", { icon: "🔔" });
      dispatch(adminApi.util.invalidateTags(["Notifications"]));
    });

    return () => socket.disconnect();
  }, [dispatch]);
};

export default useAdminSocket;
