
var DATABASE = null;



function GetRuas() {
    const ruasDict = GetRuasDict();
    if (ruasDict) {
        return Object.keys(ruasDict);
    }
    return null;
}



function GetRuasDict() {
    return KeyIfNotNull(DATABASE, "ruas");
}



function CheckCidadeUnidade() {
    const cidade_sel = document.getElementById("cb_cidade").value;
    const unidade_sel = document.getElementById("cb_unidade").value;

    if (!IsCorrectDatabaseLoaded(DATABASE, cidade_sel, unidade_sel)) {
        const database_name = DatabasePath(cidade_sel, unidade_sel);
        LoadScript(database_name, null);
    }
}



function LinkRuaHandles() {
    var adjacentes = document.getElementsByClassName("rua_adjacente");

    for (let i = 0; i < adjacentes.length; i++) {
        const adjacente = adjacentes[i];
        adjacente.onclick = function(keys) {
            const adjacente_name = this.textContent;

            var tf_nomedarua = document.getElementById("tf_nomedarua");
            tf_nomedarua.value = adjacente_name;
            VerificaMicroareaDaRua(adjacente_name);

            tf_nomedarua.scrollIntoView();
        }
    }
}



function MostrarMicroarea(rua) {
    var div = document.createElement("div");
    div.className = "microarea_result";
    div.id = "microarea_div";
    div.innerHTML = rua.HTML();

    document.getElementById("microarea_body").appendChild(div);

    LinkRuaHandles();
}



function VerificaMicroareaDaRua(rua) {
    RemoveIfExistsId("microarea_div");

    const ruas = GetRuasDict();
    if (ruas && rua in ruas) {
        const ruaObject = new Rua(rua, ruas[rua]);
        MostrarMicroarea(ruaObject);
    }
}



function VerificaMicroarea() {
    const rua = document.getElementById("tf_nomedarua").value;
    VerificaMicroareaDaRua(rua);
}



function OnWindowLoad() {
    LinkStaticButtons();

    var currentFocus;

    const input = document.getElementById("tf_nomedarua");

    input.addEventListener("input", function(e) {
        CheckCidadeUnidade();

        const ruas = GetRuas();
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
                    VerificaMicroarea();
                });

                parent_div.appendChild(sub_div);
            }
        }

        VerificaMicroarea();
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



window.onload = OnWindowLoad;
