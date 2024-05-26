import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './MyCKEditor.css';

function MyCKEditor({ name, value = '', setValue }) {
  return (
    <div className="w-full space-y-2">
      <h5 className="font-semibold">Post Details</h5>
      <CKEditor
        editor={ClassicEditor}
        data={value || '<p>Your post here...</p>'}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          // console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          // console.log(data);
          setValue(name, data);
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
    </div>
  );
}

export default MyCKEditor;
