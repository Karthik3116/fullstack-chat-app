// import { Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";

// import Homepage from "./pages/Homepage";
// import LoginPage from "./pages/LoginPage";
// import SettingsPage from "./pages/SettingsPage";
// import ProfilePage from "./pages/ProfilePage";
// import SignUpPage from "./pages/SignUpPage";

// import NotFoundPage from "./components/NotFoundPage";

// import { useAuthStore } from "./store/useAuthStore";
// import { useThemeStore } from "./store/useThemeStore";

// import { useEffect } from "react";
// import { Loader } from "lucide-react";
// import { Toaster } from "react-hot-toast";

// function App() {
//   const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
//   const { theme } = useThemeStore();

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   if (isCheckingAuth) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader className="size-10 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div data-theme={theme}>
//       <Navbar />
//       <Routes>
//         <Route
//           path="/"
//           element={authUser ? <Homepage /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/signup"
//           element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/login"
//           element={!authUser ? <LoginPage /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/settings"
//           element={authUser ? <SettingsPage /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/profile"
//           element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
//         />
        
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>

//       <Toaster />
//     </div>
//   );
// }

// export default App;


import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";

import NotFoundPage from "./components/NotFoundPage";

import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers, fetchMessages } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
    // Fetch messages once authenticated
    if (authUser) {
      fetchMessages(authUser._id); // Pass the userId here to get messages
    }
  }, [checkAuth, authUser, fetchMessages]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={authUser ? <SettingsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
