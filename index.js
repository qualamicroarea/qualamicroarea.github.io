var DATABASE_FORM = null;
var DATABASE_MANAGER = null;


/**
 * Function that links all the needed handlers, E.g. clicking on clickable text.
 */
function LinkRuaHandles() {
    var adjacentes = document.getElementsByClassName("rua_adjacente");

    for (let i = 0; i < adjacentes.length; i++) {
        const adjacente = adjacentes[i];
        adjacente.onclick = function(keys) {
            const adjacente_name = this.textContent;

            var tf_nomedarua = document.getElementById("tf_nomedarua");
            tf_nomedarua.value = adjacente_name;
            CheckRuaMicroarea(adjacente_name);

            tf_nomedarua.scrollIntoView();
        }
    }
}



/**
 * Displays all info about the given rua object.
 * @param {Rua} rua the rua object.
 */
function DisplayMicroarea(rua) {
    var div = document.createElement("div");
    div.className = "microarea_result";
    div.id = "microarea_div";
    div.innerHTML = rua.HTML();

    document.getElementById("microarea_body").appendChild(div);

    LinkRuaHandles();
}



/**
 * Searches for a given rua name, displaying it, if existent.
 * @param {string} rua the rua name. 
 */
function CheckRuaMicroarea(rua) {
    RemoveIfExistsId("microarea_div");

    const ruas = GetRuasDict();
    if (ruas && rua in ruas) {
        const ruaObject = new Rua(rua, ruas[rua]);
        DisplayMicroarea(ruaObject);
    }
}



/**
 * Searches for the rua entered.
 */
function CheckMicroarea() {
    const rua = document.getElementById("tf_nomedarua").value;
    CheckRuaMicroarea(rua);
}



function SetupAutocompletion() {
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
                    CheckMicroarea();
                });

                parent_div.appendChild(sub_div);
            }
        }

        CheckMicroarea();
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



/**
 * Function called when the window is loaded, used to link all needed handlers.
 * All autocompletion is done here.
 */
function OnWindowLoad() {
    DATABASE_FORM = new DatabaseForm(DATABASE);
    DATABASE_FORM.on_change_handle = function(cidade, unidade) {
        console.log(cidade, unidade);
        DATABASE_MANAGER = DATABASE_FORM.getDatabaseManager();
    };
    DATABASE_FORM.setupForm(document.getElementById("databaseform_container"));

    LinkStaticButtons();
    SetupAutocompletion();

    const rua = GetURLParam("rua");
    if (rua) {
        document.getElementById("tf_nomedarua").value = rua;
        CheckRuaMicroarea(rua);
    }
}



window.onload = OnWindowLoad;
