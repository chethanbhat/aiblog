import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./Pages/Categories";
import Blog from "./Pages/Blog";
import Write from "./Pages/Write";
import NotFound from "./Pages/404";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="login/" element={<Login />} />
          <Route path="signup/" element={<Signup />} />
          <Route path="/" element={<Categories />} />
          <Route path="blog/" element={<Blog />} />
          <Route path="write/:topicID" element={<Write />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
