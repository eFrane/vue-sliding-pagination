/**
 *
 * @param {createElement} createElement
 * @param {String} label
 * @param {String} ariaLabel
 * @param {String} pageClass
 * @param {Function} clickAction
 */
function pageMarkup (createElement, label, ariaLabel, pageClass, clickAction = null) {
  return createElement('a',
    {
      class: pageClass,
      attrs: {
        href: '#',
        'aria-label': ariaLabel
      },
      on: {
        click: clickAction
      }
    },
    label
  )
}

export { pageMarkup }
