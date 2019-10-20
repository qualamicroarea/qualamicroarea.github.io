/**
 * Classe responsável pela página filtrar.html
 * É uma subclasse de BasePage.
 * Possui toda a lógica de filtar e mostrar essas informações.
 */
class FiltrarPage extends BasePage {

    /**
     * Construtor que chama super e conecta o botão filtar.
     */
    constructor() {
        super(DATABASE, document.getElementById("databaseform_container"));

        document.getElementById("button_filtrar").onclick = this.filter.bind(this);
    }

    /**
     * Retorna uma string html com base na rua_collection passada.
     * Caso rua_collection não seja vazia, é uma tabela com os nomes das ruas.
     * @param {RuaCollection} rua_collection as ruas
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
                        "<a href=\"",
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
     * Dado uma rua_collection, mostra os nomes dessas ruas
     * no local correto da página, se existirem.
     * @param {RuaCollection} rua_collection as ruas
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
     * Método que verifica as opções selecionadas pelo usuário e,
     * baseado nessas, mostra as ruas que possuem tais características.
     */
    filter() {
        /**
         * Função que retorna o valor padronizado de uma choicebox.
         * @param {string} id o id da choicebox.
         */
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
     * Implementação do método da superclasse, usada para verificar parametros.
     */
    checkGetParams() {
        // Filtrar não recebe parametros, nada é feito.
    }

    /**
     * Veja BasePage.
     * Quando chamado, atualiza a choicebox com as microáreas possíveis.
     * @param {string} cidade o nome da cidade
     * @param {string} unidade o nome da unidade
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
