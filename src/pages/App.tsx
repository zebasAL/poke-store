import { lazy } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ErrorBoundary } from "../components";
import '../styles/main.css'
import '../styles/mobile.css'

const Navbar = lazy(() => import('../components/navigation/Navbar'));
const HomePage = lazy(() => import('./HomePage'));
const ViteWelcome = lazy(() => import('./ViteWelcome'));
const PokemonDetailsView = lazy(() => import('./PokemonPage'));

const App = () => {
  return (
    <ErrorBoundary>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<PokemonDetailsView />} />
        <Route path="*" element={<ViteWelcome />} />
      </Routes>
    </ ErrorBoundary>
  )
}

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;