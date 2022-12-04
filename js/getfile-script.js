(function () {
  var hostName = "https://multifilesupload.herokuapp.com";
  // var hostName = "http://localhost:3002";

  var getAllFiles = function () {
    axios.get(`${hostName}/getfiles`).then((response) => {
      console.log(response.data);
      var data = response.data;
      var files = data.children;
      var createTable = `<table class="table table-bordered table-stripped">
      <thead>
        <tr>
          <th>File Name</th>
          <th>File Size(KB)</th>
        </tr>
      </thead>
      <tbody>
      `;

      for (var i = 0; i < files.length; i++) {
        createTable =
          createTable +
          `
            <tr>
              <td><a target="_blank" href="https://multifilesupload.herokuapp.com/${
                files[i].path
              }">${files[i].name}</a></td>
              <td>${Math.round(files[i].size / 1024)}</td>
            </tr>
        `;
      }

      createTable =
        createTable +
        `
      </tbody>
      </table>`;

      document.getElementById("current-folder").innerHTML = data.name;
      document.getElementById("total-size").innerHTML = Math.round(
        data.size / 1024
      );
      document.getElementById("file-table").innerHTML = createTable;
    });
  };
  var deleteAllFiles = function () {
    axios.get(`${hostName}/deletefiles`).then((response) => {
      setTimeout(() => {
        getAllFiles();
      }, 1000);
    });
  };

  document.addEventListener("DOMContentLoaded", (event) => {
    getAllFiles();
  });

  document.getElementById("refresh-button").addEventListener("click", (e) => {
    getAllFiles();
  });

  document.getElementById("delete-button").addEventListener("click", (e) => {
    e.preventDefault();
    deleteAllFiles();
  });
})();
