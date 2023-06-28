import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import NavbarLayout from "./components/layouts/NavbarLayout";
import LandingPage from "./components/LandingPage";
import Favourites from "./components/Favourites";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Articles from "./components/Articles";
import WriterSpace from "./components/WriterSpace";
import CreateArticle from "./components/CreateArticle";
import ReadArticle from "./components/ReadArticle";
import EditArticle from "./components/EditArticle";
import AdminLayout from "./components/layouts/AdminLayout";
import HandleUsers from "./components/HandleUsers";
import HandleArticles from "./components/HandleArticles";
import EditRole from "./components/EditRole";

const App = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavbarLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="articles" element={<Articles />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="writerspace" element={<WriterSpace />} />
        <Route path="readarticle" element={<ReadArticle />} />
        <Route path="editarticle" element={<EditArticle />} />
        <Route path="createarticle" element={<CreateArticle />} />
        <Route path="adminspace" element={<AdminLayout />}>
          <Route path="handleusers" element={<HandleUsers />} />
          <Route path="editrole" element={<EditRole />} />
          <Route path="handlearticles" element={<HandleArticles />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
