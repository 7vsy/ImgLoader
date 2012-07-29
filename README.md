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
      // Run
      var loader = new ImgLoader();
      loader.setup( manifest );
      loader.loadAll();
      // Callbacks
      // The callback to fire when a file loaded
      loader.onFileLoad = function(e){ 
        console.log( e.target );
        // Update loaded progress
        document.querySelector('#ImgLoader-loading > .progress').innerHTML = loader.loadCount +"/"+ loader.maxLoadCount;
      };
      // The callback to fire when all files load complete.
      loader.onComplete = function(){ 
        console.log("Complete");
        // Hide progress
        document.querySelector('#ImgLoader-loading').style.display = "none";
      };
      // The callback to fire when a file load error
      loader.onFileError = function(){ 
        console.log("Error");
        // Update loading message
        document.querySelector('#ImgLoader-loading > .progress').innerHTML = "<span style='color:#f00'>error</span>";
        setTimeout(function(){
          document.querySelector('#ImgLoader-loading').style.display = "none";
        }, 2000);
      };
    }
  </script>
</head>
<body onload="init()">
  <div id="ImgLoader-loading">
    <div class="spinner"></div><span>Loading...</span><div class="progress"></div>
  </div>
  <div id="image-store1" style="display:block;"></div>
  <div id="image-store2" ></div>
</body>
</html>
```

## License

Copyright(c) 2012 Masato WATANABE  
Licensed under the MIT license.

