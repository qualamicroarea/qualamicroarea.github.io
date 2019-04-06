
var DATABASE = null;



function GetRuasDict() {
    if (DATABASE) {
        const ruas = DATABASE["ruas"];
        if (ruas) {
            return ruas;
        }
    }
    return null;
}



function CheckCidadeUnidade() {
    const cidade_sel = document.getElementById("cb_cidade").value;
    const unidade_sel = document.getElementById("cb_unidade").value;

    if (!IsCorrectDatabaseLoaded(DATABASE, cidade_sel, unidade_sel)) {
        const database_name = "database/" + cidade_sel + "/" + unidade_sel + ".js"

        LoadScript(database_name, function() {
            const ruas = GetRuasDict();
            if (ruas) {
                const datalist_ruas = document.getElementById("datalist_ruas");

                Object.keys(ruas).forEach(function(rua) {
                    var option = document.createElement("option");
                    option.value = rua;

                    datalist_ruas.appendChild(option);
                });
            }
        });
    }
}



function HTMLForRua(rua, ruainfo) {
    var html = "<p class=\"info_rua_nome\">" + rua + "</p>";
    html += "<table class=\"info_rua_table\"> <tr>";
    html += "<td>Microárea</td> <td>" + ruainfo.microarea + "</td>"
    html += "</tr> </table>";

    return html;
}



function MostrarMicroarea(rua, ruainfo) {
    if (ruainfo) {
        var div = document.createElement("div");
        div.className = "microarea_result"
        div.id = "microarea_div"
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



function OnRuaInput(keys) {
    CheckCidadeUnidade();
    VerificaMicroarea(keys.target.value);
}



function OnWindowLoad() {
    document.getElementById("tf_nomedarua").oninput = OnRuaInput;
}



window.onload = OnWindowLoad;
