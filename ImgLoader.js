/*
 * ImgLoader
 * Version: 0.1.6
 * https://github.com/7vsy/ImgLoader
 *
 * Copyright(c) 2012 Masato WATANABE <7vsyml@gmail.com>
 * MIT Licensed
 */
(function (window, document) {

  var m_manifest;

  // constructor
  var ImgLoader = function(){};
  var p = ImgLoader.prototype;
  
  /**
   * Initialization method
   * @method init
   * @param {Object} m Manifest of load images
   * @param {Function} onInit Callback function
   * @param {Integer} timeout Timeout time (ms)
   **/
  p.init = function( m, onInit, timeout ){
    var self = this;

    m_manifest = this.clone( m );
    this.loadCount = 0;
    this.timeoutTime = timeout || 100000; // (ms)
    this.maxLoadCount = m.length;
    this.onInit = onInit || function(){};
    this.onFileLoad = function(){};
    this.onFileError = function(){};
    this.onTimeout = function(){};
    this.onComplete = function(){};
    
    // The callback to fire when a initialize
    this.onInit();
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

    // When the timeout
    setTimeout(function(){
      if ( self.maxLoadCount > self.loadCount ){
        self.onTimeout();
      }
    }, self.timeoutTime);
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
      // The callback to fire when a file loaded
      self.onFileLoad(e);
      // Append loaded resource
      document.querySelector(loadItem.selector).appendChild( e.target );
      // When all files load complete
      if ( self.loadCount >= self.maxLoadCount ){
        // The callback to fire when all files load complete
        self.onComplete(e);
      }
    }
    loadItem.handleLoadError = function(e){
      // The callback to fire when a file load error
      self.onFileError(e);
    }
    return loadItem;
  }

  // Object deep copy
  p.clone = function( that ){
    var clone = new (that.constructor);
    for (var i in that) {
      if (!that.hasOwnProperty(i)) continue;
      clone[i] = typeof that[i] == 'object' ? this.clone( that[i] ) : that[i];
    }
    return clone;
  }


  window.ImgLoader = ImgLoader;

}(window, document));
