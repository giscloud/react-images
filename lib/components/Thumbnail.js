'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphroditeNoImportant = require('aphrodite/no-important');

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _utils = require('../utils');

function Thumbnail(_ref, _ref2) {
	var index = _ref.index;
	var src = _ref.src;
	var thumbnail = _ref.thumbnail;
	var active = _ref.active;
	var onClick = _ref.onClick;
	var document = _ref.document;
	var theme = _ref2.theme;

	var url = thumbnail ? thumbnail : src;
	var classes = _aphroditeNoImportant.StyleSheet.create((0, _utils.deepMerge)(defaultStyles, theme));

	return _react2['default'].createElement(
		'div',
		{
			className: (0, _aphroditeNoImportant.css)(classes.thumbnail, active && classes.thumbnail__active, document && classes.documentContainer),
			onClick: function (e) {
				e.preventDefault();
				e.stopPropagation();
				onClick(index);
			},
			style: document ? {} : { backgroundImage: 'url("' + url + '")' }
		},
		document && src.match(/\.(\w*)$/) ? _react2['default'].createElement(
			'div',
			{ className: (0, _aphroditeNoImportant.css)(classes.document) },
			src.match(/\.(\w*)$/)[0]
		) : null
	);
}

Thumbnail.propTypes = {
	active: _propTypes2['default'].bool,
	document: _propTypes2['default'].bool,
	index: _propTypes2['default'].number,
	onClick: _propTypes2['default'].func.isRequired,
	src: _propTypes2['default'].string,
	thumbnail: _propTypes2['default'].string
};

Thumbnail.defaultProps = {
	document: false
};

Thumbnail.contextTypes = {
	theme: _propTypes2['default'].object.isRequired
};

var defaultStyles = {
	thumbnail: {
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		borderRadius: 2,
		boxShadow: 'inset 0 0 0 1px hsla(0,0%,100%,.2)',
		cursor: 'pointer',
		display: 'inline-block',
		height: _theme2['default'].thumbnail.size,
		margin: _theme2['default'].thumbnail.gutter,
		overflow: 'hidden',
		width: _theme2['default'].thumbnail.size
	},
	thumbnail__active: {
		boxShadow: 'inset 0 0 0 2px ' + _theme2['default'].thumbnail.activeBorderColor
	},
	documentContainer: {
		backgroundColor: 'rgb(224, 224, 224)',
		boxSizing: 'border-box',
		position: 'relative'
	},
	document: {
		color: 'rgb(122, 122, 122)',
		lineHeight: _theme2['default'].thumbnail.size + 'px'
	}
};

exports['default'] = Thumbnail;
module.exports = exports['default'];