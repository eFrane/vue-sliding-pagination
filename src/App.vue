<template>
  <div id="app">
    <h1>vue-sliding-pagination</h1>
    <p>
      A simple pagination component which
      provides sliding window pagination events
      and can be heavily customized.
    </p>

    <sliding-pagination
      :current="5"
      :total="10"
    >
    </sliding-pagination>

    <h2>Production Dependencies</h2>

    <ul>
      <li>
          <pre>vue@2</pre>
      </li>
      <li>
          <pre>lodash/range</pre>
      </li>
    </ul>
  </div>
</template>

<script>

import SlidingPagination from './components/SlidingPagination.vue'

export default {
  name: 'App',
  components: {
    SlidingPagination
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
