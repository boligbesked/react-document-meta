/**
 * Tools
 */

export function clone ( source ) {
  let objCache = [];
  let cloned = null;

  try {
    // Clone an object but discard circular references (like document on dom node)
    // Taken from http://stackoverflow.com/questions/11616630
    let stringified = JSON.stringify( source, ( key, value ) => {
      if (typeof value === 'object' && value !== null) {
        if (objCache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        objCache.push(value);
      }
      return value;
    })

    cloned = JSON.parse(stringified)
  } catch ( err ) {
    cloned = {};
  }

  return cloned;
}

export function defaults ( target, source ) {
  return Object.keys( source ).reduce(( acc, key ) => {
    if ( !target.hasOwnProperty( key ) ) {
      target[key] = source[key];
    }
    else if ( typeof target[key] === 'object' && !Array.isArray( target[key] ) && target[key] ) {
      defaults( target[key], source[key] );
    }

    return target;
  }, target);
}

export function forEach ( arr, fn ) {
  Array.prototype.slice.call( arr || [] ).forEach( fn );
}

/**
 * Validation
 */

// const VALID_PROPS = ['title', 'description', 'canonical', 'meta', 'link'];

// export function isValidProp ( propKey ) {
//   return ~VALID_PROPS.indexOf( propKey );
// }

/**
 * Document manipulation
 */

function removeNode ( node ) {
  node.parentNode.removeChild(node);
}

export function removeDocumentMeta () {
  forEach(document.querySelectorAll('head [data-rdm]'), removeNode);
}
