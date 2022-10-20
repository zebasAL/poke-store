import ReactDOM from 'react-dom/client'
import { Suspense } from "react";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './pages/App'
import { RootReducer } from "./models";
import rootReducer from './reducer';
import { Loader } from "./components";

const store = createStore<RootReducer["state"] | any, RootReducer["action"], any, any>(rootReducer);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store} >
    <Suspense fallback={<Loader height={500} />}>
      <App />
    </Suspense>
  </Provider>
)
