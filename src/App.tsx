import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CreateRoom } from "./pages/create-room/CreateRoom"
import { AMARoom } from "./pages/ama-room/AMARoom"
import { Toaster } from "sonner"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/react-query"

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateRoom />
  },
  {
    path: "room/:roomId",
    element: <AMARoom />
  }
])

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors />
    </QueryClientProvider>
  )
}

export default App
