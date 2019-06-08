
/**
 * The DatabaseManager class.
 * This should be used as a way to parse and get info from the DATABASE global.
 */
class DatabaseManager {

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

    getRuaCollection() {
        return this.ruaCollection;
    }

    getRuasNames() {
        return this.ruas_names;
    }

    getRuasDict() {
        return this.ruas;
    }

    getMicroareasDict() {
        return this.microareas;
    }

}
