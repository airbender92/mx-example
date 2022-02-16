/*
 * @Author: wangyunbo
 * @Date: 2022-02-14 09:16:28
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-02-16 09:04:34
 * @FilePath: \mx\example\editors\js\EditorUi.js
 * @Description: file content
 */
EditorUi = function (editor, container, lightbox) {
  mxEventSource.call(this);

  this.destroyFunctions = [];
  this.editor = editor || new Editor();
}