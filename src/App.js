
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Form from "./components/form/form";
import style from "./App.module.css";
import NavBar from "./components/navbar/navbar";
import {AuthProvider} from "./context/authContext";

function App() {
  return (
      <BrowserRouter>
          <div className={style.appBody}>
              <header>
                  <AuthProvider>
                    <NavBar />
                  </AuthProvider>
              </header>

              <Routes>
                  <Route path={"/"} element={<div className={style.page}>Page d'accueil </div>} />
                  <Route path={"/article"} element={<div className={style.page}> Page d'article</div>} />
                  <Route path={"/chat"} element={<div className={style.page}> page de chat </div>}/>
                  <Route path={"/login"} element={<div className={`${style.page} d-flex align-items-center justify-content-center`}><Form/></div>} />
                  <Route path={"/dashboard"} element={<div className={style.page}> page du dashboard </div>} />
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
