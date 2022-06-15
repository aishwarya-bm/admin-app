import "./App.css";
import { AdminProvider } from "./context/admin-context";
import { MainPage } from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <AdminProvider>
        <MainPage />
      </AdminProvider>
    </div>
  );
}

export default App;
