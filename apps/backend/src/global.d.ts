declare global {
  interface Crypto {
    randomUUID(): `${string}-${string}-${string}-${string}-${string}`;
  }
  
  var crypto: Crypto;
}

export {}; 