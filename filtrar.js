// The database var, always include.
var DATABASE = null;



/**
 * Quick function to get the ruas dict from the database.
 */
function GetRuasDict() {
    return KeyIfNotNull(DATABASE, "ruas");
}



/**
 * Quick function to get the microares dict from the database.
 */
function GetMicroareasDict() {
    return KeyIfNotNull(DATABASE, "microareas");
}



/**
 * Quick function to get the ruas names from the database.
 */
function GetRuas() {
    const ruasDict = GetRuasDict();
    if (ruasDict) {
        return Object.keys(ruasDict);
    }
    return null;
}



/**
 * Function that checks the selected cidade and unidade, loading it if not loaded.
 * When the database is loaded, creates the options for all microareas.
 */
function CheckCidadeUnidade() {
    const cidade_sel = document.getElementById("cb_cidade").value;
    const unidade_sel = document.getElementById("cb_unidade").value;

    if (!IsCorrectDatabaseLoaded(DATABASE, cidade_sel, unidade_sel)) {
        const cb_microarea = document.getElementById("cb_microarea");
        RemoveChildren(cb_microarea);

        const database_name = DatabasePath(cidade_sel, unidade_sel);

        LoadScript(database_name, function() {
            var microareas = GetMicroareasDict();
            if (microareas) {
                cb_microarea.appendChild(CreateOption("-"));

                Object.keys(microareas).forEach(function(microarea) {
                    cb_microarea.appendChild(CreateOption(microarea));
                });
            }
        });
    }
}



/**
 * Function that displays all the matching ruas.
 * @param {RuaCollection} rua_collection the RuaCollection object.
 */
function MostrarRuasHTML(rua_collection) {
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
function MostrarRuas(rua_collection) {
    RemoveIfExistsId("filtrar_result_div");

    var div = document.createElement("div");
    div.className = "filtrar_result center";
    div.id = "filtrar_result_div";
    div.innerHTML = MostrarRuasHTML(rua_collection);

    document.getElementById("filtrar_body").appendChild(div);
}



/**
 * Function that checks everything selected, filtering ruas that match.
 */
function Filtrar() {

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

    const filtered = RuaCollectionFromDict(GetRuasDict()).filter(filter_dict);

    MostrarRuas(filtered);
}



/**
 * Function called when the window is loaded, used to link all needed handlers.
 */
function OnWindowLoad() {
    LinkStaticButtons();

    CheckCidadeUnidade();

    document.getElementById("button_filtrar").onclick = Filtrar;
}



window.onload = OnWindowLoad;
