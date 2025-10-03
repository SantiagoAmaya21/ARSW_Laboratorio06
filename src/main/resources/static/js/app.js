// app.js
var app = (function () {

    var _author = null;
    var _blueprints = [];

    function _renderTable() {
        $("#blueprintsTable tbody").empty();
        _blueprints.map(function (bp) {
            var row = `<tr>
                         <td>${bp.name}</td>
                         <td>${bp.points}</td>
                         <td><button class="btn btn-primary open-blueprint" data-name="${bp.name}">Open</button></td>
                       </tr>`;
            $("#blueprintsTable tbody").append(row);
        });

        var total = _blueprints.reduce(function (acc, bp) {
            return acc + bp.points;
        }, 0);

        $("#totalPoints").text(total);

        // Evento para los botones "Open"
        $(".open-blueprint").click(function () {
            var blueprintName = $(this).data("name");
            app.openBlueprint(_author, blueprintName);
        });
    }

    function _drawBlueprint(points) {
        var canvas = document.getElementById("blueprintCanvas");
        var ctx = canvas.getContext("2d");

        // Limpiar canvas antes de dibujar
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (points.length > 0) {
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            for (var i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }

            ctx.strokeStyle = "#007bff";
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    return {
        setAuthor: function (authorName) {
            _author = authorName;
            $("#authorName").text(_author + "'s blueprints:");
        },

        getAuthor: function () {
            return _author;
        },

        updateBlueprints: function () {
            if (_author == null) {
                alert("Por favor ingrese un autor.");
                return;
            }

            apiclient.getBlueprintsByAuthor(_author, function (data) {
                if (!data) {
                    alert("No se encontraron planos para este autor.");
                    $("#blueprintsTable tbody").empty();
                    $("#totalPoints").text(0);
                    $("#authorName").text("");
                    return;
                }

                _blueprints = data.map(function (bp) {
                    return { name: bp.name, points: bp.points.length };
                });

                _renderTable();
            });
        },

        openBlueprint: function (author, name) {
            apiclient.getBlueprintsByNameAndAuthor(author, name, function (bp) {
                if (bp) {
                    $("#currentBlueprint").text("Drawing: " + bp.name);
                    _drawBlueprint(bp.points);
                } else {
                    alert("Blueprint no encontrado.");
                }
            });
        }
    };

})();
