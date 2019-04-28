
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



function GetMicroareasDict() {
    return KeyIfNotNull(DATABASE, "microareas");
}



function CheckCidadeUnidade() {
    const cidade_sel = document.getElementById("cb_cidade").value;
    const unidade_sel = document.getElementById("cb_unidade").value;

    if (!IsCorrectDatabaseLoaded(DATABASE, cidade_sel, unidade_sel)) {
        const cb_microarea = document.getElementById("cb_microarea");
        RemoveChildren(cb_microarea);

        const database_name = DatabasePath(cidade_sel, unidade_sel);

        LoadScript(database_name, function() {
            var microareas = GetMicroareasDict();
            if (microareas) {
                cb_microarea.appendChild(CreateOption("-"));

                Object.keys(microareas).forEach(function(microarea) {
                    cb_microarea.appendChild(CreateOption(microarea));
                });
            }
        });
    }
}


function Filtrar() {

}


function OnWindowLoad() {
    LinkStaticButtons();
    
    CheckCidadeUnidade();

    document.getElementById("button_filtrar").onclick = Filtrar;
}



window.onload = OnWindowLoad;
