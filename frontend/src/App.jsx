import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import useReviewSocket from "./features/reviews/hooks/useReviewSocket";

function App() {
  useReviewSocket();

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
      <AppRoutes />
    </>
  );
}

export default App;

