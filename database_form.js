/**
 * Classe que representa um formulário de selecão de database (cidade e unidade).
 * Responsável por criar o formulário, inicializar esse com uma database e informar de modificações.
 * Páginas que usam um formúlario para a seleção da database devem usar DatabaseForm. 
 */
class DatabaseForm {

    /**
     * Inicializa o DatabaseForm com a database.
     * @param {dictionary} root_database - a database.
     */
    constructor(root_database) {
        this.root_database = root_database;

        this.cidades = KINN(root_database, "cidades");

        // Esses IDs devem ser únicos. Jamais reutilize para outros fins.
        this.root_div_id = "databaseform_div";
        this.cidade_cb_id = "databaseform_cb_cidade";
        this.unidade_cb_id = "databaseform_cb_unidade";

        // Esse atributo pode e deve ser diretamente modificado, referênciando uma função a ser chamada.
        // Veja 'inform_on_change_handle' nesta classe.
        this.on_change_handle = null;
    }

    /**
     * Retorna os nomes de todas as cidades na database.
     * Pode retornar null.
     */
    getCidadesNames() {
        return this.cidades ? Object.keys(this.cidades) : null;
    }

    /**
     * Retorna um dictionary com as cidades e info.
     * Pode retornar null.
     */
    getCidades() {
        return this.cidades;
    }

    /**
     * Retorna um dictionary com as unidades de uma cidade e suas infos.
     * Pode retornar null.
     * @param {string} cidade - a cidade desejada.
     */
    getUnidades(cidade) {
        return KINNL(this.cidades, [cidade, "unidades"]);
    }

    /**
     * Retorna os nomes das unidades de uma cidade.
     * Pode retornar null.
     * @param {string} cidade - a cidade desejada.
     */
    getUnidadesNames(cidade) {
        const unidades = this.getUnidades(cidade);
        return unidades ? Object.keys(unidades) : null;
    }

    /**
     * Retorna o elemento choicebox da cidade.
     * Pode retornar null se o formulário não tiver criado com 'setupForm'.
     */
    getCidadeCB() {
        return document.getElementById(this.cidade_cb_id);
    }

    /**
     * Retorna o elemento choicebox da unidade.
     * Pode retornar null se o formulário não tiver criado com 'setupForm'.
     */
    getUnidadeCB() {
        return document.getElementById(this.unidade_cb_id);
    }

    /**
     * Retorna a cidade selecionada.
     * Pode retornar null.
     */
    getSelectedCidade() {
        const cidadeCB = this.getCidadeCB();
        return cidadeCB ? cidadeCB.value : null;
    }

    /**
     * Retorna a unidade selecionada.
     * Pode retornar null.
     */
    getSelectedUnidade() {
        const unidadeCB = this.getUnidadeCB();
        return unidadeCB ? unidadeCB.value : null;
    }

    /**
     * Retorna um objeto DatabaseManager baseado na cidade e unidade selecionada.
     * Pode retornar null.
     */
    getDatabaseManager() {
        const cidade = this.getSelectedCidade();
        const unidade = this.getSelectedUnidade();

        if (cidade && unidade) {
            return new DatabaseManager(this.root_database, cidade, unidade);
        }
        return null;
    }

    /**
     * Muda a cidade e unidade selecionada, atualizando o formulário.
     * @param {string} cidade - a nova cidade
     * @param {string} unidade - a nova unidade
     */
    setCidadeUnidade(cidade, unidade) {
        this.getCidadeCB().value = cidade;
        this.getUnidadeCB().value = unidade;
    }

    /**
     * Constrói o formuário na página.
     * Este método deve ser chamado para o correto funcionamento da classe.
     * Este método não deve ser confundido com o construtor, e jamais chamado dentro do construtor de DatabaseForm.
     * @param {elem} parent_div - um container no formulário deve ser criado
     */
    setupForm(parent_div) {
        this.createForm(parent_div);
        this.setupCidadesCB();
    }

    /**
     * Método interno que efetivamente constrói o formulário.
     * @param {elem} parent_div - um container no formulário deve ser criado
     */
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

    /**
     * Método interno que atualiza a choicebox das cidades com os nomes das cidades.
     */
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

    /**
     * Método interno que atualiza a choicebox das unidades com os nomes das unidades.
     */
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

    /**
     * Método interno que chama o 'on_change_handle', caso esse exista.
     * Passa como argumentos a cidade e a unidade selecionadas, pode ser null.
     */
    inform_on_change_handle() {
        if (this.on_change_handle) {
            this.on_change_handle(this.getSelectedCidade(), this.getSelectedUnidade());
        }
    }
}
