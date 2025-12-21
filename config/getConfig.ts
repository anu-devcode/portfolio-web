import { defaultConfig, SiteConfig } from './site.config';

// Export a function to get config (helps with hot reloading)
export function getConfig(): SiteConfig {
  // In development, this will pick up changes
  // In production, it uses the cached version
  if (process.env.NODE_ENV === 'development') {
    // Force reload in development
    delete require.cache[require.resolve('./site.config')];
    const freshConfig = require('./site.config');
    return freshConfig.defaultConfig;
  }
  return defaultConfig;
}

// Also export default for convenience
export { defaultConfig };

