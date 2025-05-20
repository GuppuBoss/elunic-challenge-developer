/**
 * Polyfill for crypto.randomUUID()
 * This is needed for older Node.js versions where the randomUUID function is not available
 */

import { v4 as uuidv4 } from 'uuid';

// Only add the polyfill if it doesn't exist
if (typeof global.crypto === 'undefined') {
  (global as any).crypto = {};
}

if (typeof global.crypto.randomUUID === 'undefined') {
  global.crypto.randomUUID = function(): `${string}-${string}-${string}-${string}-${string}` {
    // Using type assertion to tell TypeScript this will always return the correct UUID format
    return uuidv4() as `${string}-${string}-${string}-${string}-${string}`;
  };
} 