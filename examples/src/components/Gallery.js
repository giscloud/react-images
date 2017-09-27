import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import Lightbox, { defaultPreviewResolver } from 'react-images';

const previewResolver = (descriptor) => {
	if (descriptor.document.document) {
		if (!document.documentElement) {
			return null;
		} else {
			const doc = document.documentElement;
			const w = Math.max(doc.clientWidth, window.innerWidth || 0);
			const h = Math.max(doc.clientHeight, window.innerHeight || 0);

			const height = Math.min(w, h) * 0.7;
			const width = Math.min(w, h) * 0.6;

			const { onClick, className, document: { src }, style } = descriptor;

			return (
				<div
					className={className}
					style={{ ...style, width, height }}
					onClick={onClick}
				>
					<iframe
						title="pdf document"
						src={src}
						width="100%"
						height="100%"
					/>
				</div>
			);
		}
	} else {
		return defaultPreviewResolver(descriptor);
	}
};

class Gallery extends Component {
	constructor () {
		super();

		this.state = {
			lightboxIsOpen: false,
			currentImage: 0,
		};

		this.closeLightbox = this.closeLightbox.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoImage = this.gotoImage.bind(this);
		this.handleClickImage = this.handleClickImage.bind(this);
		this.openLightbox = this.openLightbox.bind(this);
	}
	openLightbox (index, event) {
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	}
	closeLightbox () {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}
	gotoPrevious () {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}
	gotoNext () {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}
	gotoImage (index) {
		this.setState({
			currentImage: index,
		});
	}
	handleClickImage () {
		if (this.state.currentImage === this.props.images.length - 1) return;

		this.gotoNext();
	}
	renderGallery () {
		const { images } = this.props;

		if (!images) return;

		const gallery = images.filter(i => i.useForDemo).map(({ src, orientation, thumbnail, document }, i) => {
			return (
				<a
					href={src}
					className={css(classes.thumbnail, classes[orientation])}
					key={i}
					onClick={(e) => this.openLightbox(i, e)}
				>
					{document
						? <div
							style={{
								width: '100%',
								height: 240,
								display: 'inline-block',
								backgroundColor: 'rgb(224, 224, 224)',
								lineHeight: '240px',
								color: 'rgb(176, 176, 176)',
								fontSize: '22px',
								textAlign: 'center',
							}}
						>
							{src.match(/\.(\w*)$/) && src.match(/\.(\w*)$/)[0]}
						</div>
						: <img src={thumbnail || src} className={css(classes.source)} />}
				</a>
			);
		});

		return (
			<div className={css(classes.gallery)}>
				{gallery}
			</div>
		);
	}
	render () {
		return (
			<div className="section">
				{this.props.heading && <h2>{this.props.heading}</h2>}
				{this.props.subheading && <p>{this.props.subheading}</p>}
				{this.renderGallery()}
				<Lightbox
					previewResolver={previewResolver}
					currentImage={this.state.currentImage}
					images={this.props.images}
					isOpen={this.state.lightboxIsOpen}
					onClickImage={this.handleClickImage}
					onClickNext={this.gotoNext}
					onClickPrev={this.gotoPrevious}
					onClickThumbnail={this.gotoImage}
					onClose={this.closeLightbox}
					showThumbnails={this.props.showThumbnails}
					theme={this.props.theme}
				/>
			</div>
		);
	}
}

Gallery.displayName = 'Gallery';
Gallery.propTypes = {
	heading: PropTypes.string,
	images: PropTypes.array,
	showThumbnails: PropTypes.bool,
	subheading: PropTypes.string,
};

const gutter = {
	small: 2,
	large: 4,
};
const classes = StyleSheet.create({
	gallery: {
		marginRight: -gutter.small,
		overflow: 'hidden',
		position: 'relative',

		'@media (min-width: 500px)': {
			marginRight: -gutter.large,
		},
	},

	// anchor
	thumbnail: {
		boxSizing: 'border-box',
		display: 'block',
		float: 'left',
		lineHeight: 0,
		paddingRight: gutter.small,
		paddingBottom: gutter.small,
		overflow: 'hidden',

		'@media (min-width: 500px)': {
			paddingRight: gutter.large,
			paddingBottom: gutter.large,
		},
	},

	// orientation
	landscape: {
		width: '30%',
	},
	square: {
		paddingBottom: 0,
		width: '40%',

		'@media (min-width: 500px)': {
			paddingBottom: 0,
		},
	},

	// actual <img />
	source: {
		border: 0,
		display: 'block',
		height: 'auto',
		maxWidth: '100%',
		width: 'auto',
	},
});

export default Gallery;
