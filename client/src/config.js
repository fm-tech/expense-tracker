// export const API_BASE = "http://localhost:3000";

export const getRuntimeConfig = () => {
  if (import.meta.env.DEV) {
    // Use Vite's dev env vars
    return {
      API_BASE: import.meta.env.VITE_API_URL,
      NODE_ENV: import.meta.env.VITE_MODE,
      VERSION: import.meta.env.VITE_VERSION || "0.0.1",
    };
  }

  // In production, use the runtime-injected config.json
  console.log("Using runtime config:");
  return {
    API_BASE: window.runtimeConfig?.VITE_API_URL || "",
    NODE_ENV: window.runtimeConfig?.VITE_NODE || "production",
    VERSION: window.runtimeConfig?.VITE_VERSION || "0.0.1",
  };
};
