(function () {
  var hostName = "https://multifilesupload.herokuapp.com";
  // var hostName = "http://localhost:3002";
  var uploadFiles = function (files, file, index, qualityIndex) {
    if (!file) return;
    if (!qualityIndex) qualityIndex = 0.6;

    new Compressor(file, {
      quality: qualityIndex,

      // The compression process is asynchronous,
      // which means you have to access the `result` in the `success` hook function.
      success(result) {
        const formData = new FormData();

        // The third parameter is required for server
        formData.append("profile-file", result, result.name);

        // Send the compressed image file to server with XMLHttpRequest.
        axios.post(`${hostName}/profile-upload-single`, formData).then(() => {
          console.log("Upload success");
        });
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  document.getElementById("profile-file").addEventListener("change", (e) => {});

  document.getElementById("upload-button").addEventListener("click", (e) => {
    e.preventDefault();
    var qualityIndex = parseFloat(document.getElementById("quality").value);
    const fileList = document.getElementById("profile-file").files;
    for (var i = 0; i < fileList.length; i++) {
      uploadFiles(fileList, fileList[i], i, qualityIndex);
    }
    document.getElementById("upload-form").reset();
  });

  var getAllFiles = function () {
    console.log("hello");
  };
})();
