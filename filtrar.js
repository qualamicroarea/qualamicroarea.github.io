
/**
 * Subclass of BasePage, contains all logic for the Filtar page.
 */
class FiltrarPage extends BasePage {

    /**
     * Simple constructor that fills important stuff.
     */
    constructor() {
        super(DATABASE, document.getElementById("databaseform_container"));

        document.getElementById("button_filtrar").onclick = this.filter.bind(this);
    }

    /**
     * Builds the HTML for all the matching ruas.
     * @param {RuaCollection} rua_collection the RuaCollection object.
     */
    ruasHTML(rua_collection) {
        if (rua_collection.empty()) {
            return "<i class=\"info_rua_nome\">Nenhuma Rua Encontrada</i>";
        }

        var parts = [
            "<p class=\"info_rua_nome\">Ruas Encontradas:</p>",
            "<table class=\"center border_table\">",
        ];

        let ruas = rua_collection.ruas;
        for (let i = 0; i < ruas.length; i++) {
            parts.push([
                "<tr>",
                    "<td>",
                        "<a href=",
                                ruas[i].href(),
                            "\">",
                            ruas[i].nome,
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
    displayRuas(rua_collection) {
        RemoveIfExistsId("filtrar_result_div");

        var div = document.createElement("div");
        div.className = "filtrar_result center";
        div.id = "filtrar_result_div";
        div.innerHTML = this.ruasHTML(rua_collection);

        document.getElementById("filtrar_body").appendChild(div);
    }

    /**
     * Function that checks everything selected, filtering ruas that match.
     */
    filter() {
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
            (cb_value("cb_onibus") ? "Ponto de ônibus" : null),
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

        const filtered = this.database_manager.getRuaCollection().filter(filter_dict);
        this.displayRuas(filtered);
    }

    /**
     * Implementation of method called after page loaded, use to check params.
     */
    checkGetParams() {
    }

    /**
     * Overriding BasePage method.
     * @param {*} cidade 
     * @param {*} unidade 
     */
    onFormChangeHandle(cidade, unidade) {
        super.onFormChangeHandle(cidade, unidade);

        const microareas = this.database_manager.getMicroareasDict();

        if (microareas) {
            var cb_microarea = document.getElementById("cb_microarea");
            RemoveChildren(cb_microarea);

            cb_microarea.appendChild(CreateOption("-"));

            Object.keys(microareas).forEach(function(microarea) {
                cb_microarea.appendChild(CreateOption(microarea));
            });
        }
    }

}



var page = null;
window.onload = function() {
    page = new FiltrarPage();
};
