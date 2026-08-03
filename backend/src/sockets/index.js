import { Server } from "socket.io";

// ==========================================
// Socket.IO — real-time updates for both the
// Admin Dashboard and the Reviews & Ratings module.
// ==========================================
let io = null;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // Admin dashboard clients join a dedicated "admin-room" so events
    // are never broadcast to buyers/sellers connected elsewhere.
    socket.on("join-admin-room", () => {
      socket.join("admin-room");
    });

    // Buyers/sellers join their own private room so review
    // notifications (seller reply, review approved/deleted, new
    // review received...) can be targeted to exactly one user.
    socket.on("join-user-room", (userId) => {
      if (userId) socket.join(`user-${userId}`);
    });

    socket.on("disconnect", () => {
      // no-op — nothing to clean up per-socket right now
    });
  });

  console.log("🔌 Socket.IO initialized");
  return io;
};

export const getIO = () => io;

// Safe emit — never throws if sockets aren't initialized, so callers
// never need try/catch.
export const emitToAdmins = (event, payload) => {
  try {
    if (io) {
      io.to("admin-room").emit(event, payload);
    }
  } catch (error) {
    console.error("Socket emit failed:", error.message);
  }
};

export const emitToUser = (userId, event, payload) => {
  try {
    if (io && userId) {
      io.to(`user-${userId}`).emit(event, payload);
    }
  } catch (error) {
    console.error("Socket emit failed:", error.message);
  }
};

export default { initSocket, getIO, emitToAdmins, emitToUser };
