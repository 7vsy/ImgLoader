# ImgLoader

ImgLoader is a JavaScript library for image preload.

## Usage

``` html
<!DOCTYPE HTML>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="./ImgLoader.css">
  <script type="text/javascript" src="./ImgLoader.js"></script>
  <script type="text/javascript">
    var init = function(){
      // Load images list
      var manifest = [
        { src: "./assets/image1.jpg", selector: "#image-store1", css:{ height:"50px" } },
        { src: "./assets/image2.jpg", selector: "#image-store1", css:{ width:"100px", opacity:0.5 } },
        { src: "./assets/image3.jpg", selector: "#image-store2", css:{ width:"20%" } },
      ];
      // New
      var loader = new ImgLoader();

      var onInit = function(){
        console.log("Init");
      }
      
      // Initialize
      loader.init( manifest, onInit );
      // Run
      loader.loadAll();

      var progress = document.querySelector('#stage1 .ImgLoader-progress');
      var loading = document.querySelector('#stage1 .ImgLoader-loading');

      // Callbacks
      // The callback to fire when a file loaded
      loader.onFileLoad = function(e){ 
        console.log( e.target );
        // Update loaded progress
        progress.innerHTML = loader.loadCount +"/"+ loader.maxLoadCount;
      };
      // The callback to fire when all files load complete.
      loader.onComplete = function(){ 
        console.log("Complete");
        // Hide progress
        loading.style.display = "none";
      };
      // The callback to fire when a file load error
      loader.onFileError = function(){ 
        console.log("Error");
        // Update loading message
        progress.innerHTML = "<span style='color:#f00'>error</span>";
      };
    }
  </script>
</head>
<body onload="init()">
  
  <div id="stage1">
    <div class="ImgLoader-loading">
      <div class="ImgLoader-spinner"></div><div>Loading...</div><div class="ImgLoader-progress"></div>
    </div>

    <div id="image-store1"></div>
    <div id="image-store2"></div>
  </div>
</body>
</html>
```

## License

Copyright(c) 2012 Masato WATANABE  
Licensed under the MIT license.

