// export const API_BASE = "http://localhost:3000";

export const getRuntimeConfig = () => {
  // For Cloudflare Workers, use environment variables directly
  if (typeof __ENV !== 'undefined') {
    return {
      API_BASE: __ENV.VITE_API_URL || '',
      NODE_ENV: __ENV.VITE_NODE || 'production',
      VERSION: __ENV.VITE_VERSION || '0.0.1',
    };
  }

  // Fallback for development/testing
  console.log('Using runtime config:');
  // Using type assertion to avoid TypeScript errors with window.runtimeConfig
  const runtimeConfig = (window as any).runtimeConfig;
  return {
    API_BASE: runtimeConfig?.VITE_API_URL || '',
    NODE_ENV: runtimeConfig?.VITE_NODE || 'production',
    VERSION: runtimeConfig?.VITE_VERSION || '0.0.1',
  };
};
