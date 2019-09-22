

class DatabaseForm {

    constructor(root_database) {
        this.root_database = root_database;

        this.cidades = KINN(root_database, "cidades");

        this.root_div_id = "databaseform_div";
        this.cidade_cb_id = "databaseform_cb_cidade";
        this.unidade_cb_id = "databaseform_cb_unidade";

        this.on_change_handle = null;
    }

    getCidadesNames() {
        return this.cidades ? Object.keys(this.cidades) : null;
    }

    getCidades() {
        return this.cidades;
    }

    getUnidades(cidade) {
        return KINNL(this.cidades, [cidade, "unidades"]);
    }

    getUnidadesNames(cidade) {
        const unidades = this.getUnidades(cidade);
        return unidades ? Object.keys(unidades) : null;
    }

    getCidadeCB() {
        return document.getElementById(this.cidade_cb_id);
    }

    getUnidadeCB() {
        return document.getElementById(this.unidade_cb_id);
    }

    getSelectedCidade() {
        const cidadeCB = this.getCidadeCB();
        return cidadeCB ? cidadeCB.value : null;
    }

    getSelectedUnidade() {
        const unidadeCB = this.getUnidadeCB();
        return unidadeCB ? unidadeCB.value : null;
    }

    getDatabaseManager() {
        const cidade = this.getSelectedCidade();
        const unidade = this.getSelectedUnidade();

        if (cidade && unidade) {
            return new DatabaseManager(this.root_database, cidade, unidade);
        }
        return null;
    }

    setCidadeUnidade(cidade, unidade) {
        this.getCidadeCB().value = cidade;
        this.getUnidadeCB().value = unidade;
    }

    setupForm(parent_div) {
        this.createForm(parent_div);
        this.setupCidadesCB();
    }

    createForm(parent_div) {
        RemoveIfExistsId(this.root_div_id);

        var div = document.createElement("div");
        div.id = this.root_div_id;
        div.innerHTML = [
            "Cidade:",
            "<select class=\"interactionbox paddedchoicebox selectfield\" id=\"" + this.cidade_cb_id + "\">",
            "</select>",
            "<br>",
            "Unidade:",
            "<select class=\"interactionbox paddedchoicebox selectfield\" id=\"" + this.unidade_cb_id + "\">",
            "</select>",
        ].join("");

        parent_div.appendChild(div);
    }

    setupCidadesCB() {
        const cidadeCB = this.getCidadeCB();
        const cidadesNames = this.getCidadesNames();

        if (cidadeCB && cidadesNames) {
            cidadeCB.onchange = this.setupUnidadesCB.bind(this);

            for (let i = 0; i < cidadesNames.length; i++) {
                cidadeCB.appendChild(CreateOption(cidadesNames[i]));
            }

            const onchange = cidadeCB.onchange;
            if (onchange) {
                onchange();
            }
        }
    }

    setupUnidadesCB() {
        const unidadeCB = this.getUnidadeCB();
        const selectedCidade = this.getSelectedCidade();

        if (unidadeCB && selectedCidade) {
            unidadeCB.onchange = this.inform_on_change_handle.bind(this);

            RemoveChildren(unidadeCB);

            const unidadesNames = this.getUnidadesNames(selectedCidade);
            if (unidadesNames) {
                for (let i = 0; i < unidadesNames.length; i++) {
                    unidadeCB.appendChild(CreateOption(unidadesNames[i]));
                }
            }

            const onchange = unidadeCB.onchange;
            if (onchange) {
                onchange();
            }
        }
    }

    inform_on_change_handle() {
        if (this.on_change_handle) {
            this.on_change_handle(this.getSelectedCidade(), this.getSelectedUnidade());
        }
    }
}
