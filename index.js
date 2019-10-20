/**
 * Classe responsável pela página index.html
 * É uma subclasse de BasePage.
 * Possui toda a lógica de autocompletar, buscar e exibir uma rua.
 */
class IndexPage extends BasePage {

    /**
     * Construtor que chama super e conecta o autocompletar.
     */
    constructor() {
        super(DATABASE, document.getElementById("databaseform_container"));

        this.setupAutocompletion(this);
    }

    /**
     * Exibe informações sobre uma rua.
     * @param {Rua} rua a rua (objeto).
     */
    displayRua(rua) {
        var div = document.createElement("div");
        div.className = "microarea_result";
        div.id = "microarea_div";
        div.innerHTML = rua.HTML();

        document.getElementById("microarea_body").appendChild(div);

        this.linkRuaHandles();
    }

    /**
     * Conecta todas as partes que precisam de ações (ruas adjacentes). 
     */
    linkRuaHandles() {
        var adjacentes = document.getElementsByClassName("rua_adjacente");

        for (let i = 0; i < adjacentes.length; i++) {
            const adjacente = adjacentes[i];
            adjacente.onclick = function(keys) {
                const adjacente_name = keys.target.textContent;

                var tf_nomedarua = document.getElementById("tf_nomedarua");
                tf_nomedarua.value = adjacente_name;
                this.checkRua(adjacente_name);

                tf_nomedarua.scrollIntoView();
            }.bind(this);
        }
    }

    /**
     * Pesquisa por uma rua (por nome) e exibe as informações caso ela exista.
     * @param {string} rua o nome da rua.
     */
    checkRua(rua) {
        RemoveIfExistsId("microarea_div");

        const ruas = this.database_manager.getRuasDict();
        if (ruas && rua in ruas) {
            const ruaObject = new Rua(rua, ruas[rua]);
            this.displayRua(ruaObject);
        }
    }

    /**
     * Pesquisa pela rua digitada.
     */
    check() {
        const rua = document.getElementById("tf_nomedarua").value;
        this.checkRua(rua);
    }

    /**
     * Implementação do método da superclasse. Veja BasePage.
     * Verifica os parametros Get e age de acordo.
     * Exibe uma rua se os parametros assim mandarem.
     */
    checkGetParams() {
        const cidade = GetURLParam("cidade");
        const unidade = GetURLParam("unidade");
        const rua = GetURLParam("rua");

        if (cidade && unidade && rua) {
            this.database_form.setCidadeUnidade(cidade, unidade);
            document.getElementById("tf_nomedarua").value = rua;
            this.checkRua(rua);
        }
    }

    /**
     * Responsável pelo autocompletar.
     * Esse método é uma bagunça, mas uma bangunça necessária.
     * @param {IndexPage} instance objeto que receberá o callback.
     */
    setupAutocompletion(instance) {
        var currentFocus;

        const input = document.getElementById("tf_nomedarua");

        input.addEventListener("input", function(e) {
            const ruas = instance.database_manager.getRuasNames();
            const text = this.value;

            CloseAllLists();

            if (!text || !ruas) {
                return false;
            }

            currentFocus = -1;

            var padding_div = document.createElement("DIV");
            padding_div.setAttribute("class", "autocomplete_div");

            this.parentNode.appendChild(padding_div);

            var parent_div = document.createElement("DIV");
            parent_div.setAttribute("id", this.id + "autocomplete-list");
            parent_div.setAttribute("class", "autocomplete_items");

            padding_div.appendChild(parent_div);

            for (let i = 0; i < ruas.length; i++) {
                let rua = ruas[i];

                const index = NormalizedText(rua).indexOf(NormalizedText(text));

                if (index !== -1) {
                    var inner = [
                        "<strong>", rua.substring(index, index + text.length), "</strong>",
                        rua.substring(index + text.length),
                        "<input type='hidden' value='", rua, "'>",
                    ];

                    if (index > 0) {
                        inner.unshift(rua.substring(0, index));
                    }

                    var sub_div = document.createElement("DIV");
                    sub_div.innerHTML = inner.join("");

                    sub_div.addEventListener("click", function(e) {
                        input.value = this.getElementsByTagName("input")[0].value;
                        CloseAllLists();
                        instance.check();
                    });

                    parent_div.appendChild(sub_div);
                }
            }

            instance.check();
        });

        input.addEventListener("keydown", function(keys) {
            var ac_list = document.getElementById(this.id + "autocomplete-list");
            if (ac_list) {
                ac_list = ac_list.getElementsByTagName("div")
            }

            if (keys.keyCode == 40) {  // Down
                currentFocus++;
                AddActive(ac_list);
            } else if (keys.keyCode == 38) {  // Up
                currentFocus--;
                AddActive(ac_list);
            } else if (keys.keyCode == 13) {  // Enter
                keys.preventDefault();
                if (currentFocus > -1 && ac_list) {
                    ac_list[currentFocus].click();
                }
            }
        });

        function AddActive(elements) {
            if (!elements) {
                return false;
            }

            RemoveActive(elements);

            if (currentFocus >= elements.length) {
                currentFocus = 0;
            }

            if (currentFocus < 0) {
                currentFocus = (elements.length - 1);
            }

            var new_focused = elements[currentFocus];
            new_focused.scrollIntoView({behavior: "smooth", block: "end"});
            new_focused.classList.add("autocomplete_active");
        }

        function RemoveActive(elements) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove("autocomplete_active");
            }
        }

        function CloseAllLists() {
            RemoveIfExistsClass("autocomplete_div");
        }

        document.addEventListener("click", function() {
            CloseAllLists();
        });
    }
}



var page = null;
window.onload = function() {
    page = new IndexPage();
};
