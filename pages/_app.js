import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import "../styles/globals.css";
import { Provider } from "react-redux";
import reduxStore from "../store/store";
// import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }}>
			<Provider store={reduxStore}>
				<Component {...pageProps} />
			</Provider>
		</SnackbarProvider>
	);
}

export default MyApp;
