import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";



const WYSIWYGEditor = ({ onChange, value }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (!updated) {
      const defaultValue = value ? value : "";
      const blocksFromHtml = htmlToDraft(defaultValue);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [value]);

  const onEditorStateChange = (editorState) => {
    setUpdated(true);
    setEditorState(editorState);

    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const toolbarOptions = {
    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'emoji', 'image', 'remove', 'history'],
    inline: {
      inDropdown: false,
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
      options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],

    },
    blockType: {
      inDropdown: true,
      options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
    },
    fontSize: {
      options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
    },
    fontFamily: {
      options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
    },
    list: {
      inDropdown: false,
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
      options: ['unordered', 'ordered', 'indent', 'outdent'],
    },
    textAlign: {
      inDropdown: false,
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
      options: ['left', 'center', 'right', 'justify'],
    },
    emoji: {
      className: undefined,
      component: undefined,
      popupClassName: undefined,
      emojis: [
        '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
        '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
        '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
        '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
        '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
        '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
        '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
        '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
        '✅', '❎', '💯',
      ],
    },
    image: {
      className: undefined,
      component: undefined,
      popupClassName: undefined,
      urlEnabled: true,
      uploadEnabled: true,
      alignmentEnabled: true,
      uploadCallback: undefined,
      previewImage: false,
      inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
      alt: { present: false, mandatory: false },
      defaultSize: {
        height: 'auto',
        width: 'auto',
      },
    },
    remove: { className: undefined, component: undefined },
    history: {
      inDropdown: false,
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
      options: ['undo', 'redo'],
    },
  };
  return (
    <>
        <Editor
          spellCheck
          editorState={editorState}
          wrapperClassName="wrapper"
          editorClassName="editor"
          toolbarOptions={toolbarOptions}
          onEditorStateChange={onEditorStateChange}
        />
    </>
  );
};

export default WYSIWYGEditor;