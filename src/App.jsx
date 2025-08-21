import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import { Toaster } from "./components/ui/toaster"
import LoadingScreen from "./components/LoadingScreen"
import { useState } from "react"

function App() {
  const [ isLoaded, setIsLoaded ] = useState(false)

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)}/>}
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home ready={isLoaded} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
