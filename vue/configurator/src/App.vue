<template>
  <div>
    <label for="theme-select">Select Theme:</label>
    <select id="theme-select" v-model="theme" @change="changeTheme">
      <option v-for="(theme, index) in options" :key="index" :value="theme">
        {{ theme }}
      </option>
    </select>
  </div>
  <nav>
    <router-link to="/connect">Connect Widget</router-link> |
    <router-link to="/marketplace">Marketplace Widget</router-link> |
    <router-link to="/identity">Wallet Identity Widget</router-link> |
    <router-link to="/restricted-token">Restricted Token Widget</router-link>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  name: "PageColorScheme",
})
export default class PageColorScheme extends Vue {
  theme = "";
  options: string[] = [
    "os-pref",
    "manifold-scheme-dark",
    "manifold-scheme-light",
  ];

  changeTheme(): void {
    document.body.className = this.theme;
  }

  data() {
    return {
      theme: this.theme,
      options: this.options,
    };
  }
}
</script>

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

/* Define the styles for each theme */
/* .os-pref {
  background-color: #f8f8f8;
  color: #333;
} */
.manifold-scheme-dark {
  --manifold-theme--color--primary: hsl(0deg, 0%, 100%);
  --manifold-theme--color--secondary: hsl(0deg, 0%, 10%);
  --manifold-theme--color--success: hsl(120deg, 50%, 32%);
  --manifold-theme--color--error: hsl(0deg, 50%, 32%);
  --manifold-theme--color--warning: hsl(33deg, 52%, 41%);
  --manifold-theme--color--info: hsl(234deg, 36%, 54%);
  --manifold-text--color--primary: hsl(0deg, 0%, 0%);
  --manifold-text--color--secondary: hsl(0deg, 0%, 79%);
  --manifold-text--color--muted: hsla(0deg, 0%, 100%, 0.6);
  --manifold-text--color--disabled: hsla(0deg, 0%, 100%, 0.48);
  --manifold-text--color--body: hsla(0deg, 0%, 100%, 0.87);
  --manifold-border--color: hsl(0deg, 0%, 42%);
  --manifold-page--color--background: hsl(0deg, 0%, 7%);
  --manifold-element--color--background: hsl(0deg, 0%, 20%);
  background-color: var(--manifold-page--color--background);
}
.manifold-scheme-light {
  --manifold-theme--color--primary: hsl(0deg, 0%, 0%);
  --manifold-theme--color--secondary: hsl(0deg, 0%, 95%);
  --manifold-theme--color--success: hsl(120deg, 57%, 53%);
  --manifold-theme--color--error: hsl(0deg, 57%, 53%);
  --manifold-theme--color--warning: hsl(33deg, 65%, 51%);
  --manifold-theme--color--info: hsl(234deg, 82%, 71%);
  --manifold-text--color--primary: hsl(0deg, 0%, 100%);
  --manifold-text--color--secondary: hsl(0deg, 0%, 30%);
  --manifold-text--color--muted: hsla(0deg, 0%, 0%, 0.66);
  --manifold-text--color--disabled: hsla(0deg, 0%, 0%, 0.55);
  --manifold-text--color--body: hsla(0deg, 0%, 0%, 0.87);
  --manifold-border--color: hsl(0deg, 0%, 90%);
  --manifold-page--color--background: hsl(0deg, 0%, 100%);
  --manifold-element--color--background: hsl(0deg, 0%, 100%);
  background-color: var(--manifold-page--color--background);
}
</style>
