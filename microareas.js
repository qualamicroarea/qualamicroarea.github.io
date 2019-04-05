
var DATABASE = null;

var CIDADE_ATUAL = "";

var UNIDADE_ATUAL = "";



function RemoveIfExists(elem) {
    if (elem) {
        elem.parentNode.removeChild(elem);
    }
}


function RemoveIfExistsId(id) {
    RemoveIfExists(document.getElementById(id));
}


function RemoveChildrens(elem) {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
}



function GetMicroareasDict() {
    if (DATABASE) {
        const microareas = DATABASE["microareas"];
        if (microareas) {
            return microareas;
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
    const cb_microarea = document.getElementById("cb_microarea");

    if (cidade_sel !== CIDADE_ATUAL || unidade_sel !== UNIDADE_ATUAL) {
        CIDADE_ATUAL = cidade_sel;
        UNIDADE_ATUAL = unidade_sel;

        RemoveChildrens(cb_microarea);

        const database_name = "database/" + cidade_sel + "/" + unidade_sel + ".js";

        LoadScript(database_name, function() {
            var microareas = GetMicroareasDict();
            if (microareas) {
                microareas["0"] = null;
                Object.keys(microareas).forEach(function(microarea) {
                    var option = document.createElement("option");
                    option.value = microarea;
                    option.text = microarea;

                    cb_microarea.appendChild(option);
                });
            }
        });
    }
}



function HTMLForMicroarea(microarea, microareainfo) {
    function MergeHTMLInfo(infos, pre, key) {
        var value = infos[key];
        if (value) {
            return "<tr> <td>" + pre + "</td> <td>" + value + "</td></tr>";
        }
        return "";
    }

    var html = "<p class=\"info_microarea_nome\">Microárea " + microarea + "</p>";
    html += "<table class=\"info_microarea_table\">";

    html += MergeHTMLInfo(microareainfo, "Água Encanada", "agua_encanada");
    html += MergeHTMLInfo(microareainfo, "Luz Elétrica", "luz_eletrica");
    html += MergeHTMLInfo(microareainfo, "Esgoto Encanado", "esgoto_encanado");
    html += MergeHTMLInfo(microareainfo, "Pontos de Lazer", "lazer");
    html += MergeHTMLInfo(microareainfo, "Pontos de Ônibus", "onibus_atende");
    html += MergeHTMLInfo(microareainfo, "Animais de Rua", "animais_de_rua");

    html += MergeHTMLInfo(microareainfo, "Lixeiras", "lixeira");
    html += MergeHTMLInfo(microareainfo, "Lixo na Rua", "lixo_na_rua");

    html += MergeHTMLInfo(microareainfo, "Igrejas", "igrejas");
    html += MergeHTMLInfo(microareainfo, "Bares", "bares");

    html += "</table>";

    html += "<p>Observações:</p>";
    html += "<p>" + microareainfo["observacoes"] + "</p>";

    return html;
}



function MostrarMicroarea(microarea, microareainfo) {
    if (microareainfo) {
        var div = document.createElement("div");
        div.className = "microarea_result"
        div.id = "microarea_div"
        div.innerHTML = HTMLForMicroarea(microarea, microareainfo);

        document.getElementById("microarea_body").appendChild(div);
    }
}



function PesquisaMicroarea(microarea) {
    RemoveIfExistsId("microarea_div");

    const microareas = GetMicroareasDict();
    if (microareas && microarea in microareas) {
        MostrarMicroarea(microarea, microareas[microarea]);
    }
}



function OnWindowLoad() {
    CheckCidadeUnidade();

    document.getElementById("cb_cidade").onchange = CheckCidadeUnidade;
    document.getElementById("cb_unidade").onchange = CheckCidadeUnidade;

    document.getElementById("cb_microarea").onchange = function(keys) {
        PesquisaMicroarea(keys.target.value); 
    };
}



window.onload = OnWindowLoad;
