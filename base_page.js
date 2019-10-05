/*
 * Classe base para todas as páginas.
 * Terceiriza funções como carregar base de dados e criação das caixas de seleção base.
 * Páginas que façam uso da base de dados herdam de BasePage.
 */
class BasePage {

    /**
     * Construtor, cria o DatabaseForm e inicia o objeto definindo a interação entre o DatabaseForm e a base de dados.
     * Na inicialização, chama checkGetParams.
     * @param {dictionary} database - a base de dados a ser usada.
     * @param {elem} container - o container base onde o DatabaseForm deve ser colocado.
     */
    constructor(database, container) {
        this.database_manager = null;

        this.database_form = new DatabaseForm(database);
        this.database_form.on_change_handle = this.onFormChangeHandle.bind(this);
        this.database_form.setupForm(container);

        this.checkGetParams();
    }

    /**
     * Chamado sempre que o DatabaseForm é alterado pelo usuário.
     * Usado para carregar a base de dados seecionada.
     * @param {string} cidade - a cidade selecionada
     * @param {string} unidade - a unidade selecionada
     */
    onFormChangeHandle(cidade, unidade) {
        this.selected_cidade = cidade;
        this.selected_unidade = unidade;
        this.database_manager = this.database_form.getDatabaseManager();
    }

    /**
     * Método abstrato que deve ser implementado por todas as herdeiras de BasePage,
     * mesmo se for para ser deixado em branco.
     * É chamado quando o objeto é inicializado e, normalmente, sua implementação verifica
     * os parametros Get que são passados na URL como uma forma de comunicação entre páginas.
     */
    checkGetParams() {
        throw new Error("You have to implement the method checkGetParams!");
    }

}

