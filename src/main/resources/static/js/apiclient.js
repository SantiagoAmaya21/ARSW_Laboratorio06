var apiclient = (function () {

    var apiUrl = "http://localhost:8080/blueprints";

    return {
        // Trae todos los planos de un autor
        getBlueprintsByAuthor: function (author, callback) {
            $.get(apiUrl + "/" + author, function (data) {
                callback(data);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Error obteniendo planos por autor:", textStatus, errorThrown);
                callback(null);
            });
        },

        // Trae un plano por autor y nombre
        getBlueprintsByNameAndAuthor: function (author, name, callback) {
            $.get(apiUrl + "/" + author + "/" + name, function (data) {
                callback(data);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Error obteniendo plano:", textStatus, errorThrown);
                callback(null);
            });
        }
    };

})();
