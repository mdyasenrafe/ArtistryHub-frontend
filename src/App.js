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
import Projects from "./pages/adminPanel/Projects";
import Pages from "./pages/adminPanel/Pages";
import AddPage from "./pages/adminPanel/AddPage";
import { useEffect, useState } from "react";
import { getPagesApi } from "./api/api";
import GenericPage from "./pages/GenericPage";
import Spinner from "./components/common/Spinner";

function App() {
  const [apiRoutes, setApiRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    const res = await getPagesApi();
    const pages = res.data;
    if (pages.length == 0) {
      setLoading(false);
    } else {
      const dynamicRoutes = pages.map((page) => ({
        path: `/${page.slug}`,
        element: <GenericPage page={page} />,
      }));
      setApiRoutes(dynamicRoutes);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  const staticRoutes = [
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
      children: [
        {
          path: "/admin-panel",
          element: (
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          ),
        },
        {
          path: "/admin-panel/pages",
          element: (
            <PrivateRoute>
              <Pages />
            </PrivateRoute>
          ),
        },
        {
          path: "/admin-panel/pages/add-page",
          element: (
            <PrivateRoute>
              <AddPage />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/thank-you",
      element: <ThankYou></ThankYou>,
    },
  ];

  const routerConfig = createBrowserRouter([...staticRoutes, ...apiRoutes]);
  console.log(routerConfig.routes);

  return (
    <div>
      <RouterProvider router={routerConfig} />
    </div>
  );
}

export default App;
