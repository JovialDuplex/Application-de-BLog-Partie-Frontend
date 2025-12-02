
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import Form from "./components/form/form";
import style from "./App.module.css";
import NavBar from "./components/navbar/navbar";
import {AuthProvider} from "./context/authContext";
import UserPage from "./pages/user/userPage";
import {ArticlePage, ShowArticlePage, AddArticlePage} from "./pages/article/article";
import {DashBoardHomePage} from "./pages/dashboard/dashboard";

function App() {

    return (
      <BrowserRouter>
          <AuthProvider>
              <div className={style.appBody}>
                  <header>
                        <NavBar />
                  </header>

                  <Routes>
                      <Route path={"/"} element={<div className={style.page}>Page d'accueil </div>} />

                      <Route path={"/article"} element={<Outlet />}>
                          <Route index={true} element={<div className={style.page}> <ArticlePage /></div>} />
                          <Route path={"add-article"} element={<div className={style.page}> <AddArticlePage /> </div>}/>
                          <Route path={"update-article"} element={<div className={style.page}> page for update articles </div>}/>
                          <Route path={"show/:articleId"} element={<div className={style.page}><ShowArticlePage /> </div>}/>
                      </Route>

                      <Route path={"/chat"} element={<div className={style.page}> page de chat </div>}/>
                      <Route path={"/login"} element={<div className={`${style.page} d-flex align-items-center justify-content-center`}><Form/></div>} />
                      <Route path={"/dashboard"} element={<div className={`${style.page} p-2`}> <DashBoardHomePage /> </div>} />
                      <Route path={"/users"} element={<Outlet />}>
                          <Route index={true} element={<div>page des utilisateurs </div>}></Route>
                          <Route path={"get-user/:userId"} element={<div className={`${style.page}`}><UserPage /> </div>}></Route>

                      </Route>
                  </Routes>
              </div>
          </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
