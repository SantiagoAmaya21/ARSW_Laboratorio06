var app = (function () {

    var _author = null;
    var _blueprints = [];

    function _renderTable() {
        $("#blueprints-table tbody").empty();

        _blueprints.map(function (bp) {
            var row = `<tr>
                         <td>${bp.name}</td>
                         <td>${bp.points}</td>
                         <td><button class="btn btn-primary">Open</button></td>
                       </tr>`;
            $("#blueprints-table tbody").append(row);
        });

        var total = _blueprints.reduce((acc, bp) => acc + bp.points, 0);
        $("#total-points").text(total);
    }

    return {
        setAuthor: function (authorName) {
            _author = authorName;
            $("#author-name").text(_author + "'s blueprints:");
        },

        getAuthor: function () {
            return _author;
        },

        updateBlueprints: function () {
            if (_author == null) {
                alert("Por favor ingrese un autor.");
                return;
            }

            apimock.getBlueprintsByAuthor(_author, function (data) {
                _blueprints = data.map(function (bp) {
                    return { name: bp.name, points: bp.points.length };
                });

                _renderTable();
            });
        }
    };

})();
