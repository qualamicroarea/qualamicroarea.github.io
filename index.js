
var DATABASE = null;

var CIDADE_ATUAL = ""

var UNIDADE_ATUAL = ""



function RemoveIfExists(elem) {
    if (elem) {
        elem.parentNode.removeChild(elem);
    }
}



function GetRuasDict() {
    if (DATABASE) {
        const ruas = DATABASE["ruas"];
        if (ruas) {
            return ruas;
        }
    }
    return null;
}



function LoadScript(url, callback) {
    const new_id = "loadscript_" + url;

    var script_tag = document.getElementById(new_id);
    RemoveIfExists(script_tag);

    var new_script = document.createElement("script");
    new_script.type = "text/javascript";
    new_script.id = new_id;
    new_script.src = url;

    new_script.onreadystatechange = callback;
    new_script.onload = callback;

    document.head.appendChild(new_script);
}



function CheckCidadeUnidade() {
    const cidade_sel = document.getElementById("cb_cidade").value;
    const unidade_sel = document.getElementById("cb_unidade").value;
    const datalist_ruas = document.getElementById("datalist_ruas");

    if (cidade_sel !== CIDADE_ATUAL || unidade_sel !== UNIDADE_ATUAL) {
        CIDADE_ATUAL = cidade_sel;
        UNIDADE_ATUAL = unidade_sel;

        const database_name = "database/" + cidade_sel + "/" + unidade_sel + ".js"

        LoadScript(database_name, function() {
            const ruas = GetRuasDict();
            if (ruas) {
                Object.keys(ruas).forEach(function(rua) {
                    var option = document.createElement("option");
                    option.value = rua;

                    datalist_ruas.appendChild(option);
                });
            }
        });
    }
}



function ResetMicroarea() {
    var microarea_div = document.getElementById("microarea_div");
    RemoveIfExists(microarea_div);
}



function MostrarMicroarea(rua, microarea) {
    var div = document.createElement("div");
    div.className = "microarea_result"
    div.id = "microarea_div"
    div.innerHTML = "A rua <contrast>" + rua + "</contrast> pertence à microárea <contrast>" + microarea + "</contrast>.";
    
    document.getElementById("microarea_body").appendChild(div);
}



function VerificaMicroarea(rua) {
    ResetMicroarea();

    const ruas = GetRuasDict();
    if (ruas && rua in ruas) {
        const ruainfo = ruas[rua];
        if (ruainfo) {
            const microarea = ruainfo.microarea;
            if (microarea) {
                MostrarMicroarea(rua, microarea);
            }
        }
    }
}



function OnRuaInput(keys) {
    CheckCidadeUnidade();
    VerificaMicroarea(keys.target.value);
}



function LinkHandlers() {
    document.getElementById("tf_nomedarua").oninput = OnRuaInput;
}



window.onload = (function() {
    LinkHandlers();
});
