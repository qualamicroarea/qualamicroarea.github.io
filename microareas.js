
/**
 * Subclass of BasePage, contains all logic for the microareas page.
 */
class MicroareasPage extends BasePage {

    /**
     * Simple constructor that fills important stuff.
     */
    constructor() {
        super(DATABASE, document.getElementById("databaseform_container"));

        document.getElementById("cb_microarea").onchange = function(keys) {
            this.checkMicroarea(keys.target.value);
        }.bind(this);
    }

    /**
     * Builds and returns a HTML string with all the info for a given microarea and microareainfo.
     * @param {string} microarea the microarea name.
     * @param {dict} microareainfo the microarea info.
     */
    HTMLForMicroarea(microarea, microareainfo) {
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
     * Displays a microarea.
     * @param {string} microarea the microarea name.
     * @param {dict} microareainfo the microarea info.
     */
    displayMicroarea(microarea, microareainfo) {
        if (microareainfo) {
            var div = document.createElement("div");
            div.className = "microarea_result";
            div.id = "microarea_div";
            div.innerHTML = this.HTMLForMicroarea(microarea, microareainfo);

            document.getElementById("microarea_body").appendChild(div);
        }
    }

    /**
     * Searches the database for a microarea, displaying it, if existent.
     * @param {string} microarea the microarea name.
     */
    checkMicroarea(microarea) {
        RemoveIfExistsId("microarea_div");

        const microareas = this.database_manager.getMicroareasDict();
        if (microareas && microarea in microareas) {
            this.displayMicroarea(microarea, microareas[microarea]);
        }
    }

    /**
     * Implementation of method called after page loaded, use to check params.
     */
    checkGetParams() {
        const rua = GetURLParam("rua");
        if (rua) {
            document.getElementById("tf_nomedarua").value = rua;
            this.checkRua(rua);
        }
    }

    /**
     * Overriding BasePage method.
     * @param {*} cidade 
     * @param {*} unidade 
     */
    onFormChangeHandle(cidade, unidade) {
        super.onFormChangeHandle(cidade, unidade);

        const cb_microarea = document.getElementById("cb_microarea");
        RemoveChildren(cb_microarea);

        var microareas = this.database_manager.getMicroareasDict();
        if (microareas) {
            microareas["0"] = null;
            Object.keys(microareas).forEach(function(microarea) {
                var option = document.createElement("option");
                option.value = microarea;
                option.text = microarea;

                cb_microarea.appendChild(option);
            });
        }
    }

    /**
     * Implementation of check get params, called after page load.
     */
    checkGetParams() {
        const microareas = this.database_manager.getMicroareasDict();
        const microarea_get = GetURLParam("microarea");
        if (microareas[microarea_get]) {
            document.getElementById("cb_microarea").value = microarea_get;
            this.checkMicroarea(microarea_get);
        }
    }
}



var page = null;
window.onload = function() {
    page = new MicroareasPage();
};
