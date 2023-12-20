import { Routes, Route } from 'react-router-dom'

import CalculatorField from "./pages/CalculatorField"
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import NoPage from "./pages/NoPage"
import Hiscores from "./pages/Hiscores"
import Register from "./pages/Register"
import Login from "./pages/Login"
import RequireAuth from './pages/RequireAuth'
import Persistlogin from './pages/PersistLogin'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import ChangePwd from './pages/ChangePwd'
import About from './pages/About'
import Users from './pages/Users'

const App = () => {
  return (
    <Routes>
      <Route element={<Persistlogin />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<RequireAuth />}>
            <Route path="changepwd" element={<ChangePwd />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="hiscores" element={<Hiscores />} />
          <Route path="train" element={<CalculatorField />} />
          <Route path="about" element={<About />} />
          <Route exact path="profiles/:id" element={<Profile />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
