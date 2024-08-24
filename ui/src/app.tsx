import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { queryClient } from "./lib/react-query";

import { CreateRoom } from "./pages/create-room";
import { Room } from "./pages/room";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateRoom />,
  },
  {
    path: "/room/:roomID",
    element: <Room />,
  },
]);

export const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster invert richColors />
      </QueryClientProvider>
    </>
  );
};
