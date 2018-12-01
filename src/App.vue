<template>
  <div id="app">
    <h1>vue-sliding-pagination</h1>
    <p>
      A simple pagination component which
      provides sliding window pagination events
      and can be heavily customized.
    </p>

    <sliding-pagination
      :current="initialExample.current"
      :total="initialExample.total"
      @page-change="initialExample_changePage"
    />

    <h2>Production Dependencies</h2>

    <ul>
      <li>
        <pre>vue@2</pre>
      </li>
      <li>
        <pre>lodash/range</pre>
      </li>
    </ul>

    <h2>Features</h2>

    <ul>
      <li>Simple interface</li>
      <li>Screenreader friendly</li>
      <li>Easily customizable styles with scss &amp; variables</li>
      <li>Completely configurable page designs</li>
      <li>Supports multiple instances on a page</li>
      <li>Just the <strong>right</strong> options</li>
    </ul>

    <h2>Play area</h2>

    <div class="well">
      <div class="col">
        <label for="endings">Pages on beginning and end</label>
        <input
          type="range"
          name="endings"
          id="endings"
          :value="sizeWindowExampleEndings"
          @change="sizeWindowExampleEndings = parseInt($event.target.value)"
          min="1"
          max="5"
        >
        ({{ sizeWindowExampleEndings }})
      </div>

      <div class="col">
        <label for="window">Window size</label>
        <input
          type="range"
          name="window"
          id="window"
          :value="sizeWindowExampleWindow"
          @change="sizeWindowExampleWindow = parseInt($event.target.value)"
          min="1"
          max="5"
        >
        ({{ sizeWindowExampleWindow }})
      </div>

      <div class="col">
        <label for="total">Number of pages</label>
        <input
          type="number"
          name="total"
          id="total"
          :value="sizeWindowExampleTotal"
          @change="sizeWindowExampleTotal = parseInt($event.target.value)"
        >
      </div>

      <div class="col">
        <label for="current">Current page</label>
        <input
          type="number"
          name="current"
          id="current"
          :value="sizeWindowExampleCurrent"
          @change="sizeWindowExampleCurrent = parseInt($event.target.value)"
        >
      </div>

    </div>

    <sliding-pagination
      :current="sizeWindowExampleCurrent"
      :total="sizeWindowExampleTotal"
      :sliding-ending-size="sizeWindowExampleEndings"
      :sliding-window-size="sizeWindowExampleWindow"
      @page-change="sizeWindowExample_changePage"
    />
  </div>
</template>

<script>

import SlidingPagination from './components/SlidingPagination.vue'
import Vue from 'vue'

export default {
  name: 'App',

  components: {
    SlidingPagination
  },

  data () {
    return {
      initialExample: {
        current: 5,
        total: 10
      },
      sizeWindowExampleTotal: 20,
      sizeWindowExampleCurrent: 3,
      sizeWindowExampleWindow: 5,
      sizeWindowExampleEndings: 3
    }
  },

  methods: {
    initialExample_changePage (page) {
      Vue.set(this.initialExample, 'current', page)
    },

    sizeWindowExample_changePage (page) {
      this.sizeWindowExampleCurrent = page
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.row {
  display: flex;
  flex-direction: row
}

.border-less-table {
  &, tr, td {
    border: 0;
  }
}

.well {
  width: 50%;
  height: 100%;
  border: 3px #ddd inset;
  border-radius: .5em;
  padding: .5em;
  background-color: #ddd;
  margin-bottom: 1em;
}

.col {
  flex-direction: column;
  justify-content: space-between;
}
</style>
