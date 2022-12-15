import Navi from './components/Navi';
import WalletContextProvider from "./contexts/WalletContext";

function App() {
	return (
		<div className="">
			<header className="">
				<WalletContextProvider>
					<Navi/>
				</WalletContextProvider>
			</header>
		</div>
  	);
}

export default App;
