
var DATABASE = null;



function GetRuas() {
    const ruasDict = KeyIfNotNull(DATABASE, "ruas");
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
        const database_name = "database/" + cidade_sel + "/" + unidade_sel + ".js";
        LoadScript(database_name, function() {});
    }
}



function HTMLForRua(rua, ruainfo) {
    var html = "<p class=\"info_rua_nome\">" + rua + "</p>";
    html += "<table class=\"info_rua_table\"> <tr>";
    html += "<td>Microárea</td> <td>" + ruainfo.microarea + "</td>";
    html += "</tr> </table>";

    return html;
}



function MostrarMicroarea(rua, ruainfo) {
    if (ruainfo) {
        var div = document.createElement("div");
        div.className = "microarea_result";
        div.id = "microarea_div";
        div.innerHTML = HTMLForRua(rua, ruainfo);

        document.getElementById("microarea_body").appendChild(div);
    }
}



function VerificaMicroarea(rua) {
    RemoveIfExistsId("microarea_div");

    const ruas = GetRuasDict();
    if (ruas && rua in ruas) {
        MostrarMicroarea(rua, ruas[rua]);
    }
}



window.onload = OnWindowLoad;



function OnWindowLoad() {
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

        var parent_div = document.createElement("DIV");
        parent_div.setAttribute("id", this.id + "autocomplete-list");
        parent_div.setAttribute("class", "autocomplete-items");

        this.parentNode.appendChild(parent_div);

        for (let i = 0; i < ruas.length; i++) {
            let rua = ruas[i];

            if (rua.substr(0, text.length).toUpperCase() == text.toUpperCase()) {
                var sub_div = document.createElement("DIV");

                sub_div.innerHTML = "<strong>" + rua.substr(0, text.length) + "</strong>";
                sub_div.innerHTML += rua.substr(text.length);

                sub_div.innerHTML += "<input type='hidden' value='" + rua + "'>";

                sub_div.addEventListener("click", function(e) {
                    input.value = this.getElementsByTagName("input")[0].value;
                    CloseAllLists();
                });

                parent_div.appendChild(sub_div);
            }
        }

        VerificaMicroarea(text);
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

        elements[currentFocus].classList.add("autocomplete-active");
    }

    function RemoveActive(elements) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove("autocomplete-active");
        }
    }

    function CloseAllLists(element) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (element != x[i] && element != input) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        CloseAllLists(e.target);
    });
}