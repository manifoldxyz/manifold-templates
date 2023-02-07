<template>
  <nav>
    <router-link to="/connect">Connect Widget</router-link> |
    <router-link to="/marketplace">Marketplace Widget</router-link> |
    <router-link to="/identity">Wallet Identity Widget</router-link>
  </nav>
  <router-view />
</template>

<style>
:root {
  background-color: white !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
}

nav a {
  padding: 0.2rem;
  font-weight: bold;
  color: #42b983;
  text-decoration: underline;
}

nav a.router-link-exact-active {
  color: #2c3e50;
  text-decoration: none;
  font-weight: bolder;
  background-color: #85d6b26d;
}
</style>
