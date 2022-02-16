/*
 * @Author: wangyunbo
 * @Date: 2022-02-14 09:51:38
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-02-16 09:04:31
 * @FilePath: \mx\example\editors\js\Graph.js
 * @Description: file content
 */
if (typeof html4 !== 'undefined')
{
	html4.ATTRIBS["a::target"] = 0;
	html4.ATTRIBS["source::src"] = 0;
	html4.ATTRIBS["video::src"] = 0;
	// Would be nice for tooltips but probably a security risk...
	//html4.ATTRIBS["video::autoplay"] = 0;
	//html4.ATTRIBS["video::autobuffer"] = 0;
}

// Workaround for handling named HTML entities in mxUtils.parseXml
// LATER: How to configure DOMParser to just ignore all entities?
(function()
{
	var entities = [
		['nbsp', '160'],
		['shy', '173']
    ];

	var parseXml = mxUtils.parseXml;
	
	mxUtils.parseXml = function(text)
	{
		for (var i = 0; i < entities.length; i++)
	    {
	        text = text.replace(new RegExp(
	        	'&' + entities[i][0] + ';', 'g'),
		        '&#' + entities[i][1] + ';');
	    }

		return parseXml(text);
	};
})();

// Shim for missing toISOString in older versions of IE
// See https://stackoverflow.com/questions/12907862
if (!Date.prototype.toISOString)
{         
    (function()
    {         
        function pad(number)
        {
            var r = String(number);
            
            if (r.length === 1) 
            {
                r = '0' + r;
            }
            
            return r;
        };
        
        Date.prototype.toISOString = function()
        {
            return this.getUTCFullYear()
                + '-' + pad( this.getUTCMonth() + 1 )
                + '-' + pad( this.getUTCDate() )
                + 'T' + pad( this.getUTCHours() )
                + ':' + pad( this.getUTCMinutes() )
                + ':' + pad( this.getUTCSeconds() )
                + '.' + String( (this.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
                + 'Z';
        };       
    }());
}

// Shim for Date.now()
if (!Date.now)
{
	Date.now = function()
	{
		return new Date().getTime();
	};
}

// Changes default colors
/**
 * Measurements Units
 */
mxConstants.POINTS = 1;
mxConstants.MILLIMETERS = 2;
mxConstants.INCHES = 3;
/**
 * This ratio is with page scale 1
 */
mxConstants.PIXELS_PER_MM = 3.937;
mxConstants.PIXELS_PER_INCH = 100;

mxConstants.SHADOW_OPACITY = 0.25;
mxConstants.SHADOWCOLOR = '#000000';
mxConstants.VML_SHADOWCOLOR = '#d0d0d0';
mxGraph.prototype.pageBreakColor = '#c0c0c0';
mxGraph.prototype.pageScale = 1;

// Letter page format is default in US, Canada and Mexico
(function()
{
	try
	{
		if (navigator != null && navigator.language != null)
		{
			var lang = navigator.language.toLowerCase();
			mxGraph.prototype.pageFormat = (lang === 'en-us' || lang === 'en-ca' || lang === 'es-mx') ?
				mxConstants.PAGE_FORMAT_LETTER_PORTRAIT : mxConstants.PAGE_FORMAT_A4_PORTRAIT;
		}
	}
	catch (e)
	{
		// ignore
	}
})();

// Matches label positions of mxGraph 1.x
mxText.prototype.baseSpacingTop = 5;
mxText.prototype.baseSpacingBottom = 1;

// Keeps edges between relative child cells inside parent
mxGraphModel.prototype.ignoreRelativeEdgeParent = false;

// Defines grid properties
mxGraphView.prototype.gridImage = (mxClient.IS_SVG) ? 'data:image/gif;base64,R0lGODlhCgAKAJEAAAAAAP///8zMzP///yH5BAEAAAMALAAAAAAKAAoAAAIJ1I6py+0Po2wFADs=' :
	IMAGE_PATH + '/grid.gif';
mxGraphView.prototype.gridSteps = 4;
mxGraphView.prototype.minGridSize = 4;

// UrlParams is null in embed mode
mxGraphView.prototype.defaultGridColor = '#e0e0e0';
mxGraphView.prototype.gridColor = mxGraphView.prototype.defaultGridColor;

//Units
mxGraphView.prototype.unit = mxConstants.POINTS;

mxGraphView.prototype.setUnit = function(unit) 
{
	if (this.unit != unit)
	{
	    this.unit = unit;
	    
	    this.fireEvent(new mxEventObject('unitChanged', 'unit', unit));
	}
};

// Alternative text for unsupported foreignObjects
mxSvgCanvas2D.prototype.foAltText = '[Not supported by viewer]';

// Hook for custom constraints
mxShape.prototype.getConstraints = function(style, w, h)
{
	return null;
};


Graph = function (container, model, renderHint, stylesheet, themes, standalone) {
  mxGraph.call(this, container, model, renderHint, stylesheet);

  this.themes = themes || this.defaultThemes;
  this.currentEdgeStyle = mxUitls.clone(this.defaultEdgeStyle);
  this.currentVertexStyle = mxUtils.clone(this.defaultVertexStyle);
  this.standalone = (standalone != null) ? standalone : false;

  var b = this.baseUrl;
  var p = b.indexOf('//');
  this.domainUrl = '';
  this.domainPathUrl = '';

  if (p > 0) {
    var d = b.indexOf('/', p + 2);

    if (d > 0) {
      this.domainUrl
    }
  }

}

Graph.prototype.defaultThemes = {};

Graph.prototype.defaultVertexStyle = {};

Graph.prototype.baseUrl = (urlParams['base'] != null) ?
  decodeURIComponent(urlParams['base']) :
  (((window != window.top) ? document.referrer : document.location.toString()).split('#')[0]);