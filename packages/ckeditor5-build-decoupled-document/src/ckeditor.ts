/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import DecoupledEditorBase from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';

import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { FontSize, FontFamily, FontColor, FontBackgroundColor } from '@ckeditor/ckeditor5-font';
import { UploadAdapter } from '@ckeditor/ckeditor5-adapter-ckfinder';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic, Strikethrough, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CKBox } from '@ckeditor/ckeditor5-ckbox';
import { CKFinder } from '@ckeditor/ckeditor5-ckfinder';
import { EasyImage } from '@ckeditor/ckeditor5-easy-image';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar, ImageUpload, PictureEditing } from '@ckeditor/ckeditor5-image';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { List, ListProperties } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { ButtonView } from '@ckeditor/ckeditor5-ui';

import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import linkToPageIcon from './icons/link-to-page.svg';

declare let WIKI: any;

/* global WIKI */

class LinkToPage extends Plugin {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public init(): void {
		const editor = this.editor;

		editor.ui.componentFactory.add( 'linkToPage', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: 'Insert Link to Page',
				icon: linkToPageIcon,
				tooltip: true
			} );

			view.on( 'execute', () => {
				WIKI.$emit( 'editorLinkToPage' );
			} );

			return view;
		} );
	}
}

class InsertAsset extends Plugin {
	public init(): void {
		const editor = this.editor;

		editor.ui.componentFactory.add( 'insertAsset', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: 'Insert Assets',
				icon: imageIcon,
				tooltip: true
			} );

			view.on( 'execute', () => {
				WIKI.$store.set( 'editor/activeModal', 'editorModalMedia' );
			} );

			return view;
		} );
	}
}

export default class DecoupledEditor extends DecoupledEditorBase {
	public static override builtinPlugins = [
		Essentials,
		Alignment,
		FontSize,
		FontFamily,
		FontColor,
		FontBackgroundColor,
		UploadAdapter,
		Autoformat,
		Bold,
		Italic,
		Strikethrough,
		Underline,
		BlockQuote,
		CKBox,
		CKFinder,
		CloudServices,
		EasyImage,
		Heading,
		Image,
		ImageCaption,
		ImageResize,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		Indent,
		IndentBlock,
		Link,
		List,
		ListProperties,
		MediaEmbed,
		Paragraph,
		PasteFromOffice,
		PictureEditing,
		Table,
		TableToolbar,
		TextTransformation,
		LinkToPage,
		InsertAsset,
		PageBreak
	];

	public static override defaultConfig = {
		toolbar: {
			items: [
				'undo', 'redo',
				'|', 'heading',
				'|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
				'|', 'bold', 'italic', 'underline', 'strikethrough',
				'|', 'linkToPage', 'link', 'insertAsset', 'insertTable', 'blockQuote', 'mediaEmbed',
				'|', 'alignment',
				'|', 'bulletedList', 'numberedList', 'outdent', 'indent',
				'|', 'pageBreak'
			]
		},
		image: {
			resizeUnit: 'px' as const,
			toolbar: [
				'imageStyle:inline',
				'imageStyle:wrapText',
				'imageStyle:breakText',
				'|',
				'toggleImageCaption',
				'imageTextAlternative'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			]
		},
		list: {
			properties: {
				styles: true,
				startIndex: true,
				reversed: true
			}
		},
		// This value must be kept in sync with the language defined in webpack.config.js.
		language: 'en'
	};
}
