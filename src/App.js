import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

import plugins from './plugins'

class App extends React.Component {
  handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  }

  render() {
    const font_formats = "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats"
    const lineheight_formats = "1 1.5 1.75 2 3 4 5";

    const letterspacing_formats = "-0.5 -0.25 0 1 2";

    
    plugins()

    return (
      <Editor
        apiKey='y35r9cepyxcy0slj2btef0agflqcw9od6oos40hfihaw8yr8'
        initialValue="<span>This is the initial content of the editor abcds</span>"
        init={{
          height: 500,
          menubar: false,
          inline: true,
          font_formats: font_formats,
          fontsize_formats: "8px 10px 12px 14px 18px 24px 36px",
          lineheight_formats: lineheight_formats,
          letterspacing_formats: letterspacing_formats,
          link_assume_external_targets: false,
          link_context_toolbar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
            'example',
            'textcolor colorpicker',
            'lineheight',
            'letterspacing'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | paragraphgroup | \
            bullist numlist outdent indent | removeformat | help | example | link |fontselect | fontsizeselect | forecolor backcolor | lineheightselect | letterspacingselect',
          toolbar_groups: {
            paragraphgroup: {
              icon: 'align-left',
              tooltip: 'Paragraph format',
              items: 'alignleft aligncenter alignright alignjustify'
            }
          },
          color_picker_callback: function(callback, value) {
            callback('#FF00FF');
          }
        }}
        onEditorChange={this.handleEditorChange}
      />
    );
  }
}

export default App;
