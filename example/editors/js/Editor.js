/*
 * @Author: wangyunbo
 * @Date: 2022-02-14 09:11:34
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-02-16 09:04:37
 * @FilePath: \mx\example\editors\js\Editor.js
 * @Description: file content
 */

Editor = function (chromeless, themes, model, graph, editable) {
  mxEventSource.call(this);

  this.chromeless = (chromeless != null) ? chromeless : this.chromeless;
  this.initStencilRegistry();
  this.graph = graph || this.createGraph(themes, model);
}

Editor.prototype.initStencilRegistry = function () { }

Editor.prototype.createGraph = function (themes, model) {
  var graph = new Graph(null, model, null, null, themes);
  
}