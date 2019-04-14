
var DATABASE = null;



function GetMicroareasDict() {
    return KeyIfNotNull(DATABASE, "microareas");
}



function CheckCidadeUnidade() {
    const cidade_sel = document.getElementById("cb_cidade").value;
    const unidade_sel = document.getElementById("cb_unidade").value;

    if (!IsCorrectDatabaseLoaded(DATABASE, cidade_sel, unidade_sel)) {
        const cb_microarea = document.getElementById("cb_microarea");
        RemoveChildren(cb_microarea);

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

                const microarea_get = GetURLParam("microarea");
                if (microareas[microarea_get]) {
                    cb_microarea.value = microarea_get;
                    PesquisaMicroarea(microarea_get);
                }
            }
        });
    }
}



function HTMLForMicroarea(microarea, microareainfo) {
    function MergeHTMLInfo(infos, pre, key) {
        var value = infos[key];
        if (value !== null) {
            if (value === true) {
                value = Span("Sim", "#00ff00");
            } else if (value === false) {
                value = Span("Não", "#ff0000");
            }

            return [
                "<tr>",
                    "<td>",
                        pre,
                    "</td>",
                    "<td>",
                        value,
                    "</td>",
                "</tr>"
            ].join("");
        }
        return "";
    }

    var html = [
        "<p class=\"info_microarea_nome\">Microárea ", microarea, "</p>",
        "<div", IfMobile("class=\"side_by_side_container\"", ""), ">",
            "<table class=\"info_microarea_table width_50\">",

                MergeHTMLInfo(microareainfo, "Água Encanada", "agua_encanada"),
                MergeHTMLInfo(microareainfo, "Luz Elétrica", "luz_eletrica"),
                MergeHTMLInfo(microareainfo, "Esgoto Encanado", "esgoto_encanado"),
                MergeHTMLInfo(microareainfo, "Pontos de Lazer", "lazer"),
                MergeHTMLInfo(microareainfo, "Pontos de Ônibus", "onibus_atende"),
                MergeHTMLInfo(microareainfo, "Animais de Rua", "animais_de_rua"),

                MergeHTMLInfo(microareainfo, "Lixeiras", "lixeira"),
                MergeHTMLInfo(microareainfo, "Lixo na Rua", "lixo_na_rua"),

                MergeHTMLInfo(microareainfo, "Igrejas", "igrejas"),
                MergeHTMLInfo(microareainfo, "Bares", "bares"),

            "</table>",

            "<div", IfMobile("class=\"flex_item width_50\"", ""), ">",
                "<div class=\"width_85 center\">",
                    "<p>", microareainfo["observacoes"], "</p>",
                "</div>",
            "</div>",
        "</div>"
    ].join("");

    return html;
}



function MostrarMicroarea(microarea, microareainfo) {
    if (microareainfo) {
        var div = document.createElement("div");
        div.className = "microarea_result";
        div.id = "microarea_div";
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
