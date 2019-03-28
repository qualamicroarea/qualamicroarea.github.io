
var CURRENT_FOCUS = -1;

var DATABASE = null;
var POSSIVEIS_RUAS = [];

var CIDADE_ATUAL = ""

var UNIDADE_ATUAL = ""



function LoadScript(url, callback) {
    var new_id = "loadscript_" + url

    if (!document.getElementById(new_id)) {
        var head = document.head;

        var script = document.createElement("script");
        script.type = "text/javascript";
        script.id = new_id;
        script.src = url;
    
        script.onreadystatechange = callback;
        script.onload = callback;
    
        head.appendChild(script);
    }
}


function CheckCidadeUnidade(callback) {
    var cidade_sel = document.getElementById("cb_cidade").value;
    var unidade_sel = document.getElementById("cb_unidade").value;

    if (cidade_sel !== CIDADE_ATUAL || unidade_sel !== UNIDADE_ATUAL) {
        CIDADE_ATUAL = cidade_sel;
        UNIDADE_ATUAL = unidade_sel;
        LoadScript("database/" + cidade_sel + ".js", function() {
            if (DATABASE) {
                var unidade = DATABASE[UNIDADE_ATUAL];
                if (unidade) {
                    var ruas = unidade["ruas"];
                    if (ruas) {
                        POSSIVEIS_RUAS = ruas;
                    }
                }
            }

            callback();
        });
    } else {
        callback();
    }
}



function CompletarRua_OnInput(keys) {
    var elem = keys.target;
    var text = elem.value;


    CheckCidadeUnidade(function() {
        CloseAllLists();

        if (text) {
            CURRENT_FOCUS = -1;
    
            var div = document.createElement("DIV");
            div.setAttribute("id", elem.id + "autocomplete-list");
            div.setAttribute("class", "autocomplete-items");
    
            elem.parentNode.appendChild(div);
    
            for (i = 0; i < POSSIVEIS_RUAS.length; i++) {
                var text_lenght = text.length;
                var possivel_rua = POSSIVEIS_RUAS[i];
    
                if (possivel_rua.substr(0, text_lenght).toUpperCase() == text.toUpperCase()) {
                    var subdiv = document.createElement("DIV");
    
                    subdiv.innerHTML = "<strong>" + possivel_rua.substr(0, text_lenght) + "</strong>";
                    subdiv.innerHTML += possivel_rua.substr(text_lenght);
                    subdiv.innerHTML += "<input type='hidden' value='" + possivel_rua + "'>";
    
                    subdiv.addEventListener("click", function() {
                        elem.value = this.getElementsByTagName("input")[0].value;
                        CloseAllLists();
                    });
    
                    div.appendChild(subdiv);
                }
            }
        }
    });
}



function CompletarRua_OnKeyDown(keyinfo) {
    var list = document.getElementById(this.id + "autocomplete-list");
    if (list) {
        items = list.getElementsByTagName("div");

        if (keyinfo.keyCode == 40) {  // Down
            CURRENT_FOCUS++;
            SetActive(items);
        } else if (keyinfo.keyCode == 38) {  // Up
            CURRENT_FOCUS--;
            SetActive(items);
        } else if (keyinfo.keyCode == 13) {  // Enter
            keyinfo.preventDefault();
            if (CURRENT_FOCUS > -1 && items) {
                items[CURRENT_FOCUS].click();
            }
        }
    }
}



function CloseAllLists(elem) {
    var items = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < items.length; i++) {
        var item = items[i]
        if (elem != item && item.id !== "tf_nomedarua") {
            item.parentNode.removeChild(item);
        }
    }
}



function SetActive(elem) {
    if (elem) {
        ResetActive(elem);
        if (CURRENT_FOCUS >= elem.length) {
            CURRENT_FOCUS = 0;
        }
        if (CURRENT_FOCUS < 0) {
            CURRENT_FOCUS = (elem.length - 1);
        }
        elem[CURRENT_FOCUS].classList.add("autocomplete-active");
    }
}



function ResetActive(elem) {
    for (var i = 0; i < elem.length; i++) {
        elem[i].classList.remove("autocomplete-active");
    }
}



function linkHandlers() {
    var tf_nomedarua = document.getElementById("tf_nomedarua");
    tf_nomedarua.oninput = CompletarRua_OnInput;
    tf_nomedarua.onkeydown = CompletarRua_OnKeyDown;

    document.addEventListener("click", function(elem) {
        CloseAllLists(elem.target);
    });
}



window.onload = (function() {
    linkHandlers();
});
