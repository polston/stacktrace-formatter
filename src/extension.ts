'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.formatStacktrace', () => {
      const { activeTextEditor } = vscode.window
  
      if (activeTextEditor) {
        const { document } = activeTextEditor
        const edit = new vscode.WorkspaceEdit()
        const { uri } = document
  
        let formatted = replaceStuff(document.getText(document.lineAt(0).range).toString())
        edit.replace(uri, document.lineAt(0).range, formatted)
        vscode.workspace.applyEdit(edit)
        
        function replaceStuff(str: string) {
          return str
            .replace(new RegExp(' at ', 'g'), ' \nat ')
            .replace(new RegExp(' in ', 'g'), ' \n\tin ')
            .replace(new RegExp(' --- End ', 'g'), '\n\n--- End ')
            .replace(new RegExp(' ---> ', 'g'), ' \n---> ')
        }
      }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
  console.log('it should be formatted, if not submit a pull request');
}