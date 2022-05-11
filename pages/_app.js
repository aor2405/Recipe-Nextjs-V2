import '../public/styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <main className="bg-peach">
        <Component {...pageProps} />
        <ToastContainer />
      </main>
    </Provider>
  );
}

export default MyApp;
