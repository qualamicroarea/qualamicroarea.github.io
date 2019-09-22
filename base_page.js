

class BasePage {

    constructor(database, container) {
        this.database_manager = null;

        this.database_form = new DatabaseForm(database);
        this.database_form.on_change_handle = this.onFormChangeHandle.bind(this);
        this.database_form.setupForm(container);

        this.checkGetParams();
    }

    onFormChangeHandle(cidade, unidade) {
        this.selected_cidade = cidade;
        this.selected_unidade = unidade;
        this.database_manager = this.database_form.getDatabaseManager();
    }

    checkGetParams() {
        throw new Error("You have to implement the method checkGetParams!");
    }

}

