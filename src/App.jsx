import { Routes, Route } from 'react-router-dom'

import CalculatorField from "./pages/play/CalculatorField"
import Home from "./pages/home/Home"
import Layout from "./pages/layout/Layout"
import NoPage from "./pages/no-page/NoPage"
import Hiscores from "./pages/hiscores/Hiscores"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import RequireAuth from './pages/auth/RequireAuth'
import Persistlogin from './pages/auth/PersistLogin'
import Profile from './pages/users/Profile'
import Settings from './pages/users/Settings'
import About from './pages/about/About'

const App = () => {
  return (
    <Routes>
      <Route element={<Persistlogin />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<RequireAuth />}>
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="hiscores" element={<Hiscores />} />
          <Route path="train" element={<CalculatorField />} />
          <Route path="about" element={<About />} />
          <Route exact path="profiles/:id" element={<Profile />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
