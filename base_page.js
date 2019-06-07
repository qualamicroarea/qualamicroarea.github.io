

class BasePage {

    constructor(database, container) {
        this.database_manager = null;

        this.database_form = new DatabaseForm(database);
        this.database_form.on_change_handle = this.onFormChangeHandle.bind(this);
        this.database_form.setupForm(container);

        this.linkStaticButtons();

        this.checkGetParams();
    }

    onFormChangeHandle(cidade, unidade) {
        this.database_manager = this.database_form.getDatabaseManager();
    }

    linkStaticButtons() {
        function Link(id, page) {
            document.getElementById(id).onclick = function() {
                window.location.href = page;
            }
        }
    
        Link("button_ver_ruas", "index.html");
        Link("button_ver_microareas", "microareas.html");
        Link("button_ver_filtrar", "filtrar.html");
    }

    checkGetParams() {
        throw new Error("You have to implement the method checkGetParams!");
    }

}

