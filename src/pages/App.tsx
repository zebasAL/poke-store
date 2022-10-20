import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { RootReducer, ReduxState } from "../models";
import rootReducer from '../reducer';
// import Navbar from '../components/navigation/Navbar';
// import HomePage from './HomePage';
// import ViteWelcome from './ViteWelcome';
// import PokemonDetailsView from './PokemonDetailsView';

import '../styles/globalStyles.css'
import '../styles/mobile.css'

const Navbar = lazy(() => import('../components/navigation/Navbar'));
const HomePage = lazy(() => import('./HomePage'));
const ViteWelcome = lazy(() => import('./ViteWelcome'));
const PokemonDetailsView = lazy(() => import('./PokemonDetailsView'));

const store = createStore<RootReducer["state"] | any, RootReducer["action"], any, any>(rootReducer);

const router = createBrowserRouter([
  {
    element: (
      <>
      <Navbar />
    <HomePage />
    </>
    ),
    path: "/",
    // with this data loaded before rendering
    // loader: async ({ request, params }) => {
    //   return fetch(
    //     `/fake/api/teams/${params.teamId}.json`,
    //     { signal: request.signal }
    //   );
    // },
    // performing this mutation when data is submitted to it
    // action: async ({ request }) => {
    //   return updateFakeTeam(await request.formData());
    // },
    children: [
      {
        path: "/",
        element: <Navbar />,
        // loader: teamLoader,
      },
      {
        path: "/",
        element: <HomePage />,
        // loader: teamLoader,
      },
    ],
    // and renders this element in case something went wrong
    // errorElement: <ErrorBoundary />,
    // errorElement: <ViteWelcome />,
  },
  {
  element: <PokemonDetailsView />,
  path: "/:id",
  // with this data loaded before rendering
  // loader: async ({ request, params }) => {
    // return fetch(
    //   `/fake/api/teams/${params.teamId}.json`,
    //   { signal: request.signal }
    // );
  // },
  // performing this mutation when data is submitted to it
  // action: async ({ request }) => {
    // return updateFakeTeam(await request.formData());
  // },
  // children: [
  //   {
  //     path: "team",
  //     element: <HomePage />,
  //     loader: teamLoader,
  //   },
  // ],
  // and renders this element in case something went wrong
  // errorElement: <ErrorBoundary />,
  },
]);

const App = () => {
  return (
    <Provider store={store} >
      <Suspense fallback={<p>LOADING</p>}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  )
  return (<ViteWelcome />)
}

export default App;


// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import rootReducer from './reducer';
// import HomePage from './pages/HomePage';
// import PokemonDetailsView from './pages/PokemonDetailsView';

// const store = createStore<any, any, any, any>(rootReducer);

// const router = createBrowserRouter([
//   {
//     element: <HomePage />,
//     path: "/",
//     // with this data loaded before rendering
//     // loader: async ({ request, params }) => {
//     //   return fetch(
//     //     `/fake/api/teams/${params.teamId}.json`,
//     //     { signal: request.signal }
//     //   );
//     // },
//     // performing this mutation when data is submitted to it
//     // action: async ({ request }) => {
//     //   return updateFakeTeam(await request.formData());
//     // },
//     // children: [
//     //   {
//     //     path: "team",
//     //     element: <HomePage />,
//     //     loader: teamLoader,
//     //   },
//     // ],
//     // and renders this element in case something went wrong
//     // errorElement: <ErrorBoundary />,
//   },
//   {
//   element: <PokemonDetailsView />,
//   path: "teams/:teamId",
//   // with this data loaded before rendering
//   // loader: async ({ request, params }) => {
//     // return fetch(
//     //   `/fake/api/teams/${params.teamId}.json`,
//     //   { signal: request.signal }
//     // );
//   // },
//   // performing this mutation when data is submitted to it
//   // action: async ({ request }) => {
//     // return updateFakeTeam(await request.formData());
//   // },
//   // children: [
//   //   {
//   //     path: "team",
//   //     element: <HomePage />,
//   //     loader: teamLoader,
//   //   },
//   // ],
//   // and renders this element in case something went wrong
//   // errorElement: <ErrorBoundary />,
//   },
// ]);

// export default (<RouterProvider router={router} />);

