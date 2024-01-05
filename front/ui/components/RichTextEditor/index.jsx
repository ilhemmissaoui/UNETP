import '@draft-js-plugins/linkify/lib/plugin.css';

import Editor from '@draft-js-plugins/editor';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import clsx from 'clsx';
import { EditorState, getDefaultKeyBinding, KeyBindingUtil, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import React, { useEffect, useRef, useState } from 'react';

const getBlockStyle = (block) => {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
};
const StyleButton = ({ onToggle, style, active, label }) => {
    const _onToggle = (e) => {
        e.preventDefault();
        onToggle(style);
    };
    return (
        <span
            className={clsx('RichEditor-styleButton', { 'RichEditor-activeButton': active })}
            onMouseDown={_onToggle}>
            {label}
        </span>
    );
};
const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code Block', style: 'code-block' }
];

const BlockStyleControls = ({ editorState, blockTypes, onToggle }) => {
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.filter((e) => blockTypes.includes(e.style)).map((type) => (
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
};
const RichTextEditor = React.forwardRef(
    (
        {
            textDirectionality,
            onChange,
            value,
            onBlur,
            error,
            blockTypes = BLOCK_TYPES.map((e) => e.style),
            htmlExportOptions = {}
        },
        ref
    ) => {
        const linkifyPlugin = createLinkifyPlugin();
        const [editorState, setEditorState] = useState(
            value?.length
                ? EditorState.createWithContent(stateFromHTML(value))
                : EditorState.createEmpty()
        );
        const editor = useRef();
        const handleKeyCommand = (command, editorState) => {
            const newState = RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
                setEditorState(newState);
                return true;
            }
            if (!editorState && command === 'highlight') {
                setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'));
                return true;
            }
            return false;
        };
        const mapKeyToEditorCommand = (e) => {
            if (e.keyCode === 9 /* TAB */) {
                const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
                if (newEditorState !== editorState) setEditorState(newEditorState);

                return;
            }
            if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key === 'h')
                return 'highlight';

            return getDefaultKeyBinding(e);
        };
        useEffect(() => {
            if (value?.length && !editorState.getCurrentContent().hasText())
                setEditorState(EditorState.createWithContent(stateFromHTML(value)));
        }, [value]);
        const focus = () => editor.current.focus();
        const toggleBlockType = (blockType) => {
            setEditorState(RichUtils.toggleBlockType(editorState, blockType));
        };

        let className = 'RichEditor-editor';
        const contentState = editorState.getCurrentContent();
        if (!contentState.hasText())
            if (contentState.getBlockMap().first().getType() !== 'unstyled')
                className += ' RichEditor-hidePlaceholder';

        const handleChange = (state) => {
            setEditorState(state);
            onChange &&
                onChange(
                    state.getCurrentContent().hasText()
                        ? stateToHTML(state.getCurrentContent(), {
                              ...htmlExportOptions
                          })
                        : undefined
                );
        };
        return (
            <div className={clsx('RichEditor-root', { 'border border-danger': !!error })}>
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={toggleBlockType}
                    blockTypes={blockTypes}
                />
                <div className={className} onClick={focus}>
                    <Editor
                        blockStyleFn={getBlockStyle}
                        editorState={editorState}
                        handleKeyCommand={handleKeyCommand}
                        keyBindingFn={mapKeyToEditorCommand}
                        onChange={handleChange}
                        onBlur={onBlur}
                        plugins={[linkifyPlugin]}
                        ref={(_ref) => {
                            ref(_ref);
                            editor.current = _ref;
                        }}
                        textDirectionality={textDirectionality}
                    />
                </div>
            </div>
        );
    }
);

export default RichTextEditor;
