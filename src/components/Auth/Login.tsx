import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState, useEffect } from "react";

const Login = () => {
  const [credentials, setCredentials] = useState<any | null>(null);

  useEffect(() => {
    if (credentials) {
      console.log(credentials);
      SignupOrLogin();
    }
  }, [credentials]);

  const SignupOrLogin = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${credentials.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${credentials.access_token}`,
            Accept: "application/json",
          },
        }
      );
      const user = await res.data;
      console.log(user);
    } catch (error) {
      console.log("Authentication Failed => ", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (res) => setCredentials(res),
    onError: (err) => console.log("Login Failed: ", err),
  });

  return (
    <main className="bg-blue-50 w-screen h-screen flex justify-center items-center">
      <div className="min-w-[250px] min-h-[250px] p-[24px] flex flex-col justify-center items-center">
        <h1 className="text-xl text-center text-blue-950 mb-6">
          Welcome to{" "}
          <span className="mt-4 text-3xl block font-bold">AI Blog Writer</span>
        </h1>
        <button
          className="bg-white px-3 py-2 rounded-md shadow-md flex items-center"
          onClick={() => login()}
        >
          Continue with Google{" "}
          <img
            className="ml-2 h-4 w-4"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/882px-Google_%22G%22_Logo.svg.png?20230305195327"
          />
        </button>
      </div>
    </main>
  );
};

export default Login;
