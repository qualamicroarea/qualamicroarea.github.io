// The database var, always include.
var DATABASE = null;



/**
 * Quick function to get the microareas from the current loaded database.
 */
function GetMicroareasDict() {
    return KeyIfNotNull(DATABASE, "microareas");
}



/**
 * Function that checks the selected cidade and unidade, loading it if not loaded.
 * When the database is loaded, creates the options for all microareas.
 * Also checks the URL, loading the microarea param, if existent.
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
                microareas["0"] = null;
                Object.keys(microareas).forEach(function(microarea) {
                    var option = document.createElement("option");
                    option.value = microarea;
                    option.text = microarea;

                    cb_microarea.appendChild(option);
                });

                const microarea_get = GetURLParam("microarea");
                if (microareas[microarea_get]) {
                    cb_microarea.value = microarea_get;
                    PesquisaMicroarea(microarea_get);
                }
            }
        });
    }
}



/**
 * Function that builds and returns a HTML string with all the info for a given microarea and microareainfo.
 * @param {string} microarea the microarea name.
 * @param {dict} microareainfo the microarea info.
 */
function HTMLForMicroarea(microarea, microareainfo) {
    var html = [
        "<p class=\"info_microarea_nome\">Microárea ", microarea, "</p>",
        "<div", IfMobile("", " class=\"side_by_side_container\""), ">",
            "<table class=\"width_50 border_table\">",
                MergeTableInfo(microareainfo, "Água Encanada", "agua_encanada", true),
                MergeTableInfo(microareainfo, "Luz Elétrica", "luz_eletrica", true),
                MergeTableInfo(microareainfo, "Esgoto Encanado", "esgoto_encanado", true),
                MergeTableInfo(microareainfo, "Pontos de Lazer", "lazer", true),
                MergeTableInfo(microareainfo, "Pontos de Ônibus", "onibus_atende", true),
                MergeTableInfo(microareainfo, "Animais de Rua", "animais_de_rua", false),

                MergeTableInfo(microareainfo, "Lixeiras", "lixeira", true),
                MergeTableInfo(microareainfo, "Lixo na Rua", "lixo_na_rua", false),

                MergeTableInfo(microareainfo, "Igrejas", "igrejas", true),
                MergeTableInfo(microareainfo, "Bares", "bares", true),
            "</table>",

            "<div", IfMobile("", " class=\"flex_item width_50\""), ">",
                "<div class=\"width_85 center\">",
                    "<p>", microareainfo["observacoes"], "</p>",
                "</div>",
            "</div>",
        "</div>"
    ].join("");

    return html;
}



/**
 * Function that displays a microarea.
 * @param {string} microarea the microarea name.
 * @param {dict} microareainfo the microarea info.
 */
function MostrarMicroarea(microarea, microareainfo) {
    if (microareainfo) {
        var div = document.createElement("div");
        div.className = "microarea_result";
        div.id = "microarea_div";
        div.innerHTML = HTMLForMicroarea(microarea, microareainfo);

        document.getElementById("microarea_body").appendChild(div);
    }
}



/**
 * Function that searches the database for a microarea, displaying it, if existent.
 * @param {string} microarea the microarea name.
 */
function PesquisaMicroarea(microarea) {
    RemoveIfExistsId("microarea_div");

    const microareas = GetMicroareasDict();
    if (microareas && microarea in microareas) {
        MostrarMicroarea(microarea, microareas[microarea]);
    }
}



/**
 * Function called when the window is loaded, used to link all needed handlers.
 */
function OnWindowLoad() {
    LinkStaticButtons();

    CheckCidadeUnidade();

    document.getElementById("cb_cidade").onchange = CheckCidadeUnidade;
    document.getElementById("cb_unidade").onchange = CheckCidadeUnidade;

    document.getElementById("cb_microarea").onchange = function(keys) {
        PesquisaMicroarea(keys.target.value);
    };
}



window.onload = OnWindowLoad;
