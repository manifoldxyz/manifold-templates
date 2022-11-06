<template>
  <nav>
    <router-link to="/connect">Connect Widget</router-link> |
    <router-link to="/marketplace">Marketplace Widget</router-link>
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
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
