<template>
  <div id="app">

    <ul class="nav justify-content-center bg-dark">
      <li class="nav-item">
        <router-link to="/" class="nav-link">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/saved" class="nav-link">Saved</router-link>
      </li>
    </ul>

    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.nav-link {
  color: #fff;
}

</style>
