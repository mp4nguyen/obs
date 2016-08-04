/**
 * Given a node, get everything needed to calculate its boundaries
 * @param  {HTMLElement} node
 * @return {Object}
 */

export function getBoundsForNode(node) {
  if (!node.getBoundingClientRect) return node;

  var rect = node.getBoundingClientRect()
    , left = rect.left + pageOffset('left')
    , top = rect.top + pageOffset('top');

  return {
    top,
    left,
    right: (node.offsetWidth || 0) + left,
    bottom: (node.offsetHeight || 0) + top,
    width: rect.width
  };
}


function pageOffset(dir) {
  if (dir === 'left')
    return (window.pageXOffset || document.body.scrollLeft || 0)
  if (dir === 'top')
    return (window.pageYOffset || document.body.scrollTop || 0)
}
