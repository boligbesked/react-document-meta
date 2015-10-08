'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _ = require('../');

var _2 = _interopRequireDefault(_);

describe('DocumentMeta', function () {
  before(function () {
    _2['default'].canUseDOM = false;
  });

  describe('.rewind()', function () {
    it('clears the mounted instances', function () {
      _reactAddons2['default'].renderToStaticMarkup(_reactAddons2['default'].createElement(_2['default'], { title: 'a' }, _reactAddons2['default'].createElement(_2['default'], { title: 'b' }, _reactAddons2['default'].createElement(_2['default'], { title: 'c' }))));
      _assert2['default'].deepEqual(_2['default'].peek(), { title: 'c' });
      _2['default'].rewind();
      _assert2['default'].strictEqual(_2['default'].peek(), undefined);
    });

    it('returns the latest document meta', function () {
      var title = 'cheese';
      _reactAddons2['default'].renderToStaticMarkup(_reactAddons2['default'].createElement(_2['default'], { title: 'a' }, _reactAddons2['default'].createElement(_2['default'], { title: 'b' }, _reactAddons2['default'].createElement(_2['default'], { title: title }))));
      _assert2['default'].deepEqual(_2['default'].rewind(), { title: title });
    });

    it('returns undefined if no mounted instances exist', function () {
      _reactAddons2['default'].renderToStaticMarkup(_reactAddons2['default'].createElement(_2['default'], { title: 'a' }, _reactAddons2['default'].createElement(_2['default'], { title: 'b' }, _reactAddons2['default'].createElement(_2['default'], { title: 'c' }))));
      _2['default'].rewind();
      _assert2['default'].strictEqual(_2['default'].peek(), undefined);
    });
  });

  describe('.renderAsReact()', function () {
    it('returns an empty array if no meta data has been mounted', function () {
      _reactAddons2['default'].createElement(_2['default'], { title: 'a' }, _reactAddons2['default'].createElement(_2['default'], { title: 'b' }, _reactAddons2['default'].createElement(_2['default'], { title: 'c' })));

      var rendered = _2['default'].renderAsReact();
      _assert2['default'].ok(Array.isArray(rendered));
      _assert2['default'].strictEqual(rendered.length, 0);
    });

    it('returns the latest document meta as an array of React components', function () {
      _reactAddons2['default'].renderToStaticMarkup(_reactAddons2['default'].createElement(_2['default'], { title: 'a' }, _reactAddons2['default'].createElement(_2['default'], { title: 'b' }, _reactAddons2['default'].createElement(_2['default'], { title: 'c' }))));

      var rendered = _2['default'].renderAsReact();
      _assert2['default'].ok(Array.isArray(rendered));
      _assert2['default'].strictEqual(rendered.length, 1);
      _assert2['default'].strictEqual(rendered[0].type, 'title');
      _assert2['default'].strictEqual(rendered[0]._store.props.children, 'c');
    });
  });

  describe('.renderAsHTML()', function () {
    it('returns an empty string if no meta data has been mounted', function () {
      _reactAddons2['default'].createElement(_2['default'], { title: 'a' }, _reactAddons2['default'].createElement(_2['default'], { title: 'b' }, _reactAddons2['default'].createElement(_2['default'], { title: 'c' })));
      _assert2['default'].strictEqual(_2['default'].renderAsHTML(), '');
    });

    it('returns the latest document meta as HTML', function () {
      _reactAddons2['default'].renderToStaticMarkup(_reactAddons2['default'].createElement(_2['default'], { title: 'a' }, _reactAddons2['default'].createElement(_2['default'], { title: 'b' }, _reactAddons2['default'].createElement(_2['default'], { title: 'c' }))));
      _assert2['default'].strictEqual(_2['default'].renderAsHTML(), '<title>c</title>');
    });
  });
});
