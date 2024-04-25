import OTP from "./pages/investor/OtpVerification";
import Login from "./pages/investor/Login";
import RegisterPage from "./pages/investor/Register";
import LandingPage from "./components/landing/landingpage";

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <Login/>
      <OTP/> */}
      <RegisterPage/>
      <LandingPage/>
    </div>
  );
}

export default App;
