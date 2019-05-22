[TODO:] [Insert] [a crapton] [of badges] [here] [because] [javascript]

[![Build Status](https://travis-ci.org/eFrane/vue-sliding-pagination.svg?branch=master)](https://travis-ci.org/eFrane/vue-sliding-pagination)

# Sliding Pagination for Vue

> ARIA-friendly pagination component with a sliding window.

![Example pagination](https://github.com/eFrane/vue-sliding-pagination/raw/master/docs/.vuepress/public/pagination-example.png)

## Installation

### Node

`npm install vue-sliding-pagination --save`

or, for the fäncÿ people,

`yarn add vue-sliding-pagination`

### Browser

Currently, no browser build is available.

## Usage

Basic usage of the pagination component only requires the current page,
the total number of pages and a handler which is called on page change.

The pagination component **does not handle page changes by itself**, instead
you are required to provide a page change handler which should contain
all your page changing logic (e.g. a vuex store dispatch) and eventually
change the current page to the passed one. In later releases, a v-model
approach to `currentPage` may be offered, but was opted against for the time
being.

Thus, to get a paginator with default settings (please consult the options listing
below for details), the following markup and script sections provide a starting
point:

```html
<sliding-pagination
  :current="currentPage"
  :total="totalPages"
  @page-change="pageChangeHandler"
></sliding-pagination>
```

```js
import SlidingPagination from 'vue-sliding-pagination'

// in component or vue instance
components: {
  // ...
  SlidingPagination
},
data() {
  return {
    // ...
    currentPage: 1,
    totalPages: 10
  }
},
methods: {
  // ...
  pageChangeHandler(selectedPage) {
    this.currentPage = selectedPage
  }
}
```
## Documentation

In-depth documentation may be found at [https://vue-sliding-pagination.efrane.com](https://vue-sliding-pagination.efrane.com)

## Contributing

Please do. Please be kind to each other. That's all.

## License

Copyright 2018 Stefan "eFrane" Graupner

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
