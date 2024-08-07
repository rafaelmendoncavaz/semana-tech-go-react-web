import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CreateRoom } from "./pages/create-room/CreateRoom"
import { AMARoom } from "./pages/ama-room/AMARoom"
import { Toaster } from "sonner"

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
    <>
      <RouterProvider router={router} />
      <Toaster richColors />
    </>
  )
}

export default App
