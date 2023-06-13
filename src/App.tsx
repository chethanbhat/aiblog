import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./Pages/Categories";
import Blog from "./Pages/Blog";
import Write from "./Pages/Write";
import NotFound from "./Pages/404";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login/" element={<Login />} />
        <Route path="signup/" element={<Signup />} />
        <Route path="/" element={<Categories />} />
        <Route path="blog/" element={<Blog />} />
        <Route path="write/" element={<Write />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
