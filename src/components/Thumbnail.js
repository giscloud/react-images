import PropTypes from 'prop-types';
import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import defaults from '../theme';
import { deepMerge } from '../utils';

function Thumbnail ({ index, src, thumbnail, active, onClick, document }, { theme }) {
	const url = thumbnail ? thumbnail : src;
	const classes = StyleSheet.create(deepMerge(defaultStyles, theme));

	return (
		<div
			className={css(classes.thumbnail, active && classes.thumbnail__active, document && classes.documentContainer)}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				onClick(index);
			}}
			style={document ? {} : { backgroundImage: 'url("' + url + '")' }}
		>
			{document && src.match(/\.(\w*)$/)
				? <div className={css(classes.document)}>{src.match(/\.(\w*)$/)[0]}</div>
				: null}
		</div>
	);
}

Thumbnail.propTypes = {
	active: PropTypes.bool,
	document: PropTypes.bool,
	index: PropTypes.number,
	onClick: PropTypes.func.isRequired,
	src: PropTypes.string,
	thumbnail: PropTypes.string,
};

Thumbnail.defaultProps = {
	document: false,
};

Thumbnail.contextTypes = {
	theme: PropTypes.object.isRequired,
};

const defaultStyles = {
	thumbnail: {
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		borderRadius: 2,
		boxShadow: 'inset 0 0 0 1px hsla(0,0%,100%,.2)',
		cursor: 'pointer',
		display: 'inline-block',
		height: defaults.thumbnail.size,
		margin: defaults.thumbnail.gutter,
		overflow: 'hidden',
		width: defaults.thumbnail.size,
	},
	thumbnail__active: {
		boxShadow: `inset 0 0 0 2px ${defaults.thumbnail.activeBorderColor}`,
	},
	documentContainer: {
		backgroundColor: 'rgb(224, 224, 224)',
		boxSizing: 'border-box',
		position: 'relative',
	},
	document: {
		color: 'rgb(122, 122, 122)',
		lineHeight: `${defaults.thumbnail.size}px`,
	},
};

export default Thumbnail;
