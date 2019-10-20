/**
 * Classe responsável pela página microareas.html
 * É uma subclasse de BasePage.
 * Possui toda a lógica de pesquisar e exibir informações sobre uma microárea.
 */
class MicroareasPage extends BasePage {

    /**
     * Construtor que chama super e conecta a choicebox.
     */
    constructor() {
        super(DATABASE, document.getElementById("databaseform_container"));

        document.getElementById("cb_microarea").onchange = function(keys) {
            this.checkMicroarea(keys.target.value);
        }.bind(this);
    }

    /**
     * Constrói e retorna uma string HTML com toda a informação de uma microárea.
     * @param {string} microarea o nome da microárea.
     * @param {dict} microareainfo o dicionário com as informações.
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
     * Exibe informações sobre a microárea.
     * @param {string} microarea o nome da microárea.
     * @param {dict} microareainfo o dicionário com as informações.
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
     * Pesquisa por uma microarea, exibindo as informações, se existente.
     * @param {string} microarea o nome da microárea.
     */
    checkMicroarea(microarea) {
        RemoveIfExistsId("microarea_div");

        const microareas = this.database_manager.getMicroareasDict();
        if (microareas && microarea in microareas) {
            this.displayMicroarea(microarea, microareas[microarea]);
        }
    }

    /**
     * Sobrescrevendo método de BagePage.
     * É usado para atualizar a choicebox com as microáreas existentes.
     * @param {string} cidade o nome da cidade selecionada
     * @param {string} unidade o nome da unidade selecionada
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
     * Implementação do método da superclasse. Veja BasePage.
     * Verifica os parametros Get e age de acordo.
     * Exibe uma microárea se os parametros assim mandarem.
     */
    checkGetParams() {
        const cidade = GetURLParam("cidade");
        const unidade = GetURLParam("unidade");
        const microarea_get = GetURLParam("microarea");

        if (cidade && unidade && microarea_get) {
            this.database_form.setCidadeUnidade(cidade, unidade);

            const microareas = this.database_manager.getMicroareasDict();
            if (microareas[microarea_get]) {
                document.getElementById("cb_microarea").value = microarea_get;
                this.checkMicroarea(microarea_get);
            }
        }
    }
}



var page = null;
window.onload = function() {
    page = new MicroareasPage();
};
