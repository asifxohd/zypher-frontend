import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './pages/store.ts'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Modal from 'react-modal';



Modal.setAppElement('#root');
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store} >
			<GoogleOAuthProvider clientId='572506018541-idlm0208ks3sqsdbltc5j7gadq2obqrd.apps.googleusercontent.com'>
				<ToastContainer autoClose={4000} />
					<App />
			</GoogleOAuthProvider>
		</Provider>
	</React.StrictMode>,
)
