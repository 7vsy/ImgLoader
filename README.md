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
      // Custom event
      loader.onFileLoad = function(e){ console.log( e.target ) };
      loader.onFileError = function(){ console.log("Error") };
      loader.onComplete = function(){ console.log("Complete") };
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

