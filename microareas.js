var DATABASE_FORM = null;
var DATABASE_MANAGER = null;



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
function DisplayMicroarea(microarea, microareainfo) {
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
function CheckMicroarea(microarea) {
    RemoveIfExistsId("microarea_div");

    const microareas = DATABASE_MANAGER.getMicroareasDict();
    if (microareas && microarea in microareas) {
        DisplayMicroarea(microarea, microareas[microarea]);
    }
}



/**
 * Function called when the window is loaded, used to link all needed handlers.
 */
function OnWindowLoad() {
    DATABASE_FORM = new DatabaseForm(DATABASE);
    DATABASE_FORM.on_change_handle = function(cidade, unidade) {
        DATABASE_MANAGER = DATABASE_FORM.getDatabaseManager();

        const cb_microarea = document.getElementById("cb_microarea");
        RemoveChildren(cb_microarea);

        cb_microarea.onchange = function(keys) {
            CheckMicroarea(keys.target.value);
        };

        var microareas = DATABASE_MANAGER.getMicroareasDict();
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
                CheckMicroarea(microarea_get);
            }
        }
    };
    DATABASE_FORM.setupForm(document.getElementById("databaseform_container"));

    LinkStaticButtons();
}



window.onload = OnWindowLoad;
