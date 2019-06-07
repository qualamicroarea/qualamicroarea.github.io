var DATABASE_FORM = null;
var DATABASE_MANAGER = null;



/**
 * Function that displays all the matching ruas.
 * @param {RuaCollection} rua_collection the RuaCollection object.
 */
function DisplayRuasHTML(rua_collection) {
    const names = rua_collection.names();

    if (names.length == 0) {
        return "<i class=\"info_rua_nome\">Nenhuma Rua Encontrada</i>";
    }

    var parts = [
        "<p class=\"info_rua_nome\">Ruas Encontradas:</p>",
        "<table class=\"center border_table\">",
    ];

    for (let i = 0; i < names.length; i++) {
        parts.push([
            "<tr>",
                "<td>",
                    "<a href=\"index.html?rua=", names[i], "\">",
                        names[i],
                    "</a>",
                "</td>",
            "</tr>",
        ].join(""));
    }

    parts.push("</table>");

    return parts.join("");
}



/**
 * Displays the matching ruas.
 * @param {RuaCollection} rua_collection the RuaCollection object.
 */
function DisplayRuas(rua_collection) {
    RemoveIfExistsId("filtrar_result_div");

    var div = document.createElement("div");
    div.className = "filtrar_result center";
    div.id = "filtrar_result_div";
    div.innerHTML = DisplayRuasHTML(rua_collection);

    document.getElementById("filtrar_body").appendChild(div);
}



/**
 * Function that checks everything selected, filtering ruas that match.
 */
function Filter() {

    function cb_value(id) {
        const value = document.getElementById(id).value;

        if (value === "-") {
            return null;
        }
        if (value === "sim") {
            return true;
        }
        if (value === "nao") {
            return false;
        }

        return value;
    }


    const microarea = cb_value("cb_microarea");
    const agua_encanada = cb_value("cb_agua_encanada");
    const luz_eletrica = cb_value("cb_luz_eletrica");
    const esgoto_encanado = cb_value("cb_esgoto_encanado");
    const entulho = cb_value("cb_entulho");

    const caracteristicas = [
        (cb_value("cb_bar") ? "Bar" : null),
        (cb_value("cb_creche") ? "Creche" : null),
        (cb_value("cb_escola") ? "Escola" : null),
        (cb_value("cb_igreja") ? "Igreja" : null),
        (cb_value("cb_lixeira") ? "Lixeira" : null),
        (cb_value("cb_onibus") ? "Ônibus" : null),
        (cb_value("cb_orelhao") ? "Orelhão" : null),
        (cb_value("cb_pequenos_comercios") ? "Pequenos comércios" : null),
        (cb_value("cb_sem_saida") ? "Rua Sem Saída" : null),
    ].filter(function(elem) {
        return elem != null;
    });


    var filter_dict = {};

    if (microarea !== null) {
        filter_dict["microarea"] = microarea;
    }
    if (agua_encanada !== null) {
        filter_dict["agua_encanada"] = agua_encanada;
    }
    if (luz_eletrica !== null) {
        filter_dict["luz_eletrica"] = luz_eletrica;
    }
    if (esgoto_encanado !== null) {
        filter_dict["esgoto_encanado"] = esgoto_encanado;
    }
    if (entulho !== null) {
        filter_dict["entulho"] = entulho;
    }

    if (caracteristicas.length > 0) {
        filter_dict["caracteristicas"] = caracteristicas;
    }

    const filtered = DATABASE_MANAGER.getRuaCollection().filter(filter_dict);

    DisplayRuas(filtered);
}



/**
 * Function called when the window is loaded, used to link all needed handlers.
 */
function OnWindowLoad() {
    DATABASE_FORM = new DatabaseForm(DATABASE);
    DATABASE_FORM.on_change_handle = function(cidade, unidade) {
        DATABASE_MANAGER = DATABASE_FORM.getDatabaseManager();
    };
    DATABASE_FORM.setupForm(document.getElementById("databaseform_container"));

    LinkStaticButtons();

    var microareas = DATABASE_MANAGER.getMicroareasDict();
    if (microareas) {
        cb_microarea.appendChild(CreateOption("-"));

        Object.keys(microareas).forEach(function(microarea) {
            cb_microarea.appendChild(CreateOption(microarea));
        });
    }

    document.getElementById("button_filtrar").onclick = Filter;
}



window.onload = OnWindowLoad;
