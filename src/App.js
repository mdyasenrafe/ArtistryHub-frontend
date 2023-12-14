import logo from "./logo.svg";
import AdminPanel from "./pages/AdminPanel";
import CanvasSelection from "./pages/CanvasSelection";
import DeliveryScheduling from "./pages/DeliveryScheduling";
import ImageUploads from "./pages/ImageUploads";
import OrderPlacement from "./pages/OrderPlacement";
import OrderReview from "./pages/OrderReview";
import Signin from "./pages/Signin";
import StyleOptions from "./pages/StyleOptions";
import ThankYou from "./pages/ThankYou";
import "./style/style.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OrderPlacement />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/order-placement",
    element: <OrderPlacement />,
  },
  {
    path: "/canvas-selection",
    element: <CanvasSelection />,
  },
  {
    path: "/style-options",
    element: <StyleOptions />,
  },
  {
    path: "/delivery-scheduling",
    element: <DeliveryScheduling />,
  },
  {
    path: "/image-uploads",
    element: <ImageUploads />,
  },
  {
    path: "/order-review",
    element: <OrderReview />,
  },
  {
    path: "/admin-panel",
    element: (
      <PrivateRoute>
        <AdminPanel />
      </PrivateRoute>
    ),
  },
  {
    path: "/thank-you",
    element: <ThankYou></ThankYou>,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
