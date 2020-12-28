export default function plugins() {
    if (window && window.tinymce) {

        const { tinymce } = window;
        // Add variant
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
  
        // Line height
        tinymce.PluginManager.add('lineheight', function(editor, url) {
  
            editor.on('init', function() {
                editor.formatter.register({
                    lineheight: {
                        selector: 'span,p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table',
                        styles: { 'line-height': '%value' }
                    }
                });
        
                editor.ui.registry.addIcon(
                    'line-height',
                    `
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M9.984 12.984v-1.969h12v1.969h-12zM9.984 18.984v-1.969h12v1.969h-12zM9.984 5.016h12v1.969h-12v-1.969zM6 6.984v10.031h2.484l-3.469 3.469-3.516-3.469h2.484v-10.031h-2.484l3.516-3.469 3.469 3.469h-2.484z"></path>
                        </svg>
                    `
                );
  
                editor.ui.registry.addMenuButton('lineheightselect', {
                    tooltip: 'Line height',
                    icon: 'line-height',
                    fetch: function(callback) {
                        const defaultLineHeightFormats = '1 1.5 1.75 2 3 4 5';
                        const userSettings = editor.settings.lineheight_formats;
                        const lineheightFormats = typeof userSettings === 'string' ? userSettings : defaultLineHeightFormats;
                
                        const items = lineheightFormats.split(' ').map(item => {
                        let text = item,
                            value = item;
                        const values = item.split('=');
                        if (values.length > 1) {
                            [text, value] = values;
                        }
                        console.log(`value`, value)
                        return {
                            type: 'menuitem',
                            text: text,
                            onAction: function() {
                                editor.formatter.apply('lineheight', { value: value });
                                editor.fire('change', {});
                            }
                        };
                        });
                
                        callback(items);
                    }
                });
            });
        });

        // Letter spacing
        tinymce.PluginManager.add('letterspacing', function(editor, url) {
  
            editor.on('init', function() {
                editor.formatter.register({
                    letterspacing: {
                        selector: 'span,p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table',
                        styles: { 'letter-spacing': '%value' }
                    }
                });
        
                editor.ui.registry.addIcon(
                    'letter-spacing',
                    `
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M9.984 12.984v-1.969h12v1.969h-12zM9.984 18.984v-1.969h12v1.969h-12zM9.984 5.016h12v1.969h-12v-1.969zM6 6.984v10.031h2.484l-3.469 3.469-3.516-3.469h2.484v-10.031h-2.484l3.516-3.469 3.469 3.469h-2.484z"></path>
                        </svg>
                    `
                );
  
                editor.ui.registry.addMenuButton('letterspacingselect', {
                    tooltip: 'Letter Spacing',
                    icon: 'letter-spacing',
                    fetch: function(callback) {
                        const defaultLetterSpacingFormats = '-0.5 -0.25 0 1 2';
                        const userSettings = editor.settings.letterspacing_formats;
                        const letterSpacingFormats = typeof userSettings === 'string' ? userSettings : defaultLetterSpacingFormats;
                        const items = letterSpacingFormats.split(' ').map(item => {
                            let text = item,
                                value = item;
                            const values = item.split('=');
                            if (values.length > 1) {
                                [text, value] = values;
                            }
                            return {
                                type: 'menuitem',
                                text: text,
                                onAction: function() {
                                    editor.formatter.apply('letterspacing', { value: value + 'px' });
                                    editor.fire('change', {});
                                }
                            };
                        });
                
                        callback(items);
                    }
                });
            });
        });
    }
}