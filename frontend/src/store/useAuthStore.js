// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios.js";
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";

// const BASE_URL = "https://fullstack-chat-app-production-1228.up.railway.app";

// export const useAuthStore = create((set, get) => ({
//   authUser: JSON.parse(localStorage.getItem("authUser")) || null,
//   isSigningUp: false,
//   isLoggingIn: false,
//   isUpdatingProfile: false,
//   isCheckingAuth: true, // Flag to handle checking auth status on app load
//   onlineUsers: [],
//   socket: null,

//   signup: async (data) => {
//     set({ isSigningUp: true });
//     try {
//       const res = await axiosInstance.post("/auth/signup", data);
//       set({ authUser: res.data });
//       localStorage.setItem("authUser", JSON.stringify(res.data));
//       toast.success("Account created successfully");
//       get().connectSocket(res.data);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Signup failed");
//     } finally {
//       set({ isSigningUp: false });
//     }
//   },

//   login: async (data) => {
//     set({ isLoggingIn: true });
//     try {
//       const res = await axiosInstance.post("/auth/login", data);
//       set({ authUser: res.data });
//       localStorage.setItem("authUser", JSON.stringify(res.data));
//       toast.success("Logged in successfully");
//       get().connectSocket(res.data);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed");
//     } finally {
//       set({ isLoggingIn: false });
//     }
//   },

//   logout: async () => {
//     try {
//       set({ authUser: null });
//       localStorage.removeItem("authUser");
//       get().disconnectSocket();
//       toast.success("Logged out successfully");
//     } catch (error) {
//       toast.error("Logout failed");
//     }
//   },

//   updateProfile: async (data) => {
//     set({ isUpdatingProfile: true });
//     try {
//       const { authUser } = get();
//       const res = await axiosInstance.put("/auth/update-profile", { ...data, userId: authUser._id });
//       set({ authUser: res.data });
//       localStorage.setItem("authUser", JSON.stringify(res.data));
//       toast.success("Profile updated successfully");
//     } catch (error) {
//       console.log("Error updating profile:", error);
//       toast.error(error.response?.data?.message || "Update failed");
//     } finally {
//       set({ isUpdatingProfile: false });
//     }
//   },

//   connectSocket: (authUser) => {
//     if (!authUser) return;

//     const socket = io(BASE_URL, {
//       auth: {
//         userId: authUser._id,
//       },
//       withCredentials: false, // cookies are not used anymore
//     });

//     socket.connect();
//     set({ socket });

//     socket.on("getOnlineUsers", (userIds) => {
//       set({ onlineUsers: userIds });
//     });
//   },

//   disconnectSocket: () => {
//     if (get().socket?.connected) {
//       get().socket.disconnect();
//     }
//   },

//   checkAuth: async () => {
//     try {
      
//       const storedUser = JSON.parse(localStorage.getItem("authUser"));
//       if (storedUser) {
//         // Optionally, you could make a request to verify the token or session here
//         set({ authUser: storedUser, isCheckingAuth: false });
//       } else {
//         set({ authUser: null, isCheckingAuth: false });
//       }
//     } catch (error) {
//       console.error("Error checking auth:", error);
//       set({ authUser: null, isCheckingAuth: false });
//     }
//   },
// }));

import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "https://fullstack-chat-app-production-1228.up.railway.app";

export const useAuthStore = create((set, get) => ({
  authUser: JSON.parse(localStorage.getItem("authUser")) || null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: false,  // 🔥 added for checkAuth()
  onlineUsers: [],
  socket: null,

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      toast.success("Account created successfully");
      get().connectSocket(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      toast.success("Logged in successfully");
      get().connectSocket(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      set({ authUser: null });
      localStorage.removeItem("authUser");
      get().disconnectSocket();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const { authUser } = get();
      const res = await axiosInstance.put("/auth/update-profile", {
        ...data,
        userId: authUser._id,
      });
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: (authUser) => {
    const { socket } = get();
  
    if (socket) return; // already connected, don't reconnect
  
    if (!authUser) return;
  
    const newSocket = io(BASE_URL, {
      auth: { userId: authUser._id },
      withCredentials: false,
      transports: ["websocket"], // only use websocket, no polling
    });
  
    set({ socket: newSocket });
  
    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) {
      socket.disconnect();
      set({ socket: null });
    }
  },

  fetchMessages: async (userId) => {
    try {
      const res = await axiosInstance.get(`/api/messages/users?userId=${userId}`);
      console.log("Messages fetched:", res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages");
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const storedUser = JSON.parse(localStorage.getItem("authUser"));
      if (storedUser) {
        set({ authUser: storedUser });
        get().connectSocket(storedUser);
      }
    } catch (error) {
      console.error("Error checking auth:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
