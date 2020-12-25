import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

class App extends React.Component {
  handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  }

  render() {

    if (window && window.tinymce) {

      const { tinymce } = window;
      tinymce.PluginManager.add('example', function(editor, url) {
        var openDialog = function () {
          return editor.windowManager.open({
            title: 'Example plugin',
            body: {
              type: 'panel',
              items: [
                {
                  type: 'input',
                  name: 'title',
                  label: 'Title'
                }
              ]
            },
            buttons: [
              {
                type: 'cancel',
                text: 'Close'
              },
              {
                type: 'submit',
                text: 'Save',
                primary: true
              }
            ],
            onSubmit: function (api) {
              var data = api.getData();
              // Insert content when the window form is submitted
              editor.insertContent('Title: ' + data.title);
              api.close();
            }
          });
        };
      
        // Add a button that opens a window
        editor.ui.registry.addButton('example', {
          text: 'Variant',
          onAction: function () {
            // Open window
            openDialog();
          }
        });
      
        // Adds a menu item, which can then be included in any menu via the menu/menubar configuration
        editor.ui.registry.addMenuItem('example', {
          text: 'Example plugin',
          onAction: function() {
            // Open window
            openDialog();
          }
        });
      
        return {
          getMetadata: function () {
            return  {
              name: 'Example plugin',
              url: 'http://exampleplugindocsurl.com'
            };
          }
        };
      });
      
    }

    return (
      <Editor
        apiKey='y35r9cepyxcy0slj2btef0agflqcw9od6oos40hfihaw8yr8'
        initialValue="<p>This is the initial content of the editor</p>"
        init={{
          height: 500,
          menubar: false,
          inline: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
            'example'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help | example'
        }}
        onEditorChange={this.handleEditorChange}
      />
    );
  }
}

export default App;
