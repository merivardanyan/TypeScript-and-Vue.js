<template>
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for doesn't exist.</p>
      <router-link to="/" class="home-link">Go to Home</router-link>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: "NotFound",
  };
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  .not-found h1 {
    font-size: 3rem;
    color: #f44336;
  }
  
  .not-found p {
    font-size: 1.2rem;
    color: #333;
  }
  
  .home-link {
    margin-top: 20px;
    font-size: 1rem;
    color: #007bff;
    text-decoration: none;
  }
  
  .home-link:hover {
    text-decoration: underline;
  }
  </style>
  