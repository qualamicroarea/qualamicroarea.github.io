/**
 * Classe responsável por gerenciar e acessar a database.
 * Deve ser usada como a única e exclusiva maneira de acessar a database.
 * Normalmente, a database usada é a DATABASE (global).
 * Para entender tal global, veja 'database.js'.
 */
class DatabaseManager {

    /**
     * Construtor. Inicializa a DatabaseManager com uma database, uma cidade e uma unidade.
     * @param {dictionary} root_database - a database, o formato esperado está explicado em 'database.js'
     * @param {string} cidade - a cidade
     * @param {string} unidade - a unidade
     */
    constructor(root_database, cidade, unidade) {
        this.root_database = root_database;
        this.cidade = cidade;
        this.unidade = unidade;

        this.database = KINNL(root_database, ["cidades", cidade, "unidades", unidade]);

        this.microareas = KINN(this.database, "microareas");
        this.ruas = KINN(this.database, "ruas");
        this.ruas_names = this.ruas ? Object.keys(this.ruas) : null;
        this.ruaCollection = this.ruas ? RuaCollectionFromDict(this.ruas) : null;
    }

    /**
     * Retorna a RuaCollection baseado nas informações que foram usadas para inicializar este objeto.
     * Pode retornar null.
     */
    getRuaCollection() {
        return this.ruaCollection;
    }

    /**
     * Retorna os nomes da rua baseado nas informações que foram usadas para inicializar este objeto.
     * Pode retornar null.
     */
    getRuasNames() {
        return this.ruas_names;
    }

    /**
     * Retorna um dictionary com as ruas e suas infos, baseado nas informações que foram usadas para inicializar este objeto.
     * Pode retornar null.
     */
    getRuasDict() {
        return this.ruas;
    }

    /**
     * Retorna um dictionary com as microareas e suas infos, baseado nas informações que foram usadas para inicializar este objeto.
     * Pode retornar null.
     */
    getMicroareasDict() {
        return this.microareas;
    }

}
