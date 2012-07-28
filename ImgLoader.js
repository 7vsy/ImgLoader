/*
 * ImgLoader
 * Version: 0.1.1
 * https://github.com/7vsy/ImgLoader
 *
 * Copyright(c) 2012 Masato WATANABE <7vsyml@gmail.com>
 * MIT Licensed
 */
(function (window) {

  var m_manifest;

  // constructor
  var ImgLoader = function(){};
	ImgLoader.prototype = {};
	var p = ImgLoader.prototype;
  
  // Setup instance
  p.setup = function( m ){
    var self = this;
    m_manifest = m;
    this.loadCount = 0;
    this.maxLoadCount = m.length;
    this.onFileLoad = function(){};
    this.onFileError = function(){};
    this.onComplete = function(){};
  }

  // Load a single image
  p.loadOne = function(){
    var self = this;
		var file = m_manifest.shift();
    var item = this.createLoadItem( file );

		var img = document.createElement('img');
    img.addEventListener('load', item.handleLoadSuccess, false);
    img.addEventListener('error', item.handleLoadError, false);
		img.src = item.src;
  }

  // Load all
  p.loadAll = function(){
    var self = this;
		while ( m_manifest.length > 0 ) {
			 this.loadOne();
		}
  }

  // Create property needed to image load
  p.createLoadItem = function( file ){
    var self = this;
    var loadItem = {};
    loadItem.src = file.src;
    loadItem.selector = file.selector;
    loadItem.handleLoadSuccess = function(e){
      self.loadCount ++;
      if ( file.css ){
        // Apply styles
        for ( var key in file.css ){
          e.target.style[key] = file.css[key];
        }
      }
      // Update loaded progress
      document.querySelector('#ImgLoader-loading > .progress').innerHTML = self.loadCount +"/"+ self.maxLoadCount;
      // Fire custom event (file loaded)
      self.onFileLoad(e);
      // Append loaded resource
      document.querySelector(loadItem.selector).appendChild( e.target );
      // All resources is complete ?
      if ( self.loadCount >= self.maxLoadCount ){
        // Hide progress
        document.querySelector('#ImgLoader-loading').style.display = "none";
        // Fire custom event (complete)
        self.onComplete(e);
      }
    }
    loadItem.handleLoadError = function(e){
      // Fire custom event (load error)
      self.onFileError(e);
      // Update loading message
      document.querySelector('#ImgLoader-loading > .progress').innerHTML = "<span style='color:#f00'>error</span>";
      setTimeout(function(){
        document.querySelector('#ImgLoader-loading').style.display = "none";
      }, 2000);
    }
    return loadItem;
  }

  window.ImgLoader = ImgLoader;

}(window));
