import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./Pages/Categories";
import Blog from "./Pages/Blog";
import Write from "./Pages/Write";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import NotFound from "./Pages/404";

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
