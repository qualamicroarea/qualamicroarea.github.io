/**
 * Dado um dicionário onde cada key é o nome de uma rua e seu 
 * valor correspondente as informações da rua (como dicionário),
 * cria uma lista de Rua (objetos).
 * Ordem não garantida.
 * @param {dict} ruas_dict o dicionário
 */
function RuaListFromDict(ruas_dict) {
    var ruas = [];

    Object.keys(ruas_dict).forEach(function(rua_name) {
        ruas.push(new Rua(rua_name, ruas_dict[rua_name]));
    });

    return ruas;
}

/**
 * Dada uma lista de Rua (objeto), retorna ela em ordem alfabética.
 * @param {Array<Rua>} rua_list a lista de Ruas
 */
function SortedRuaList(rua_list) {
    function compare(a, b) {
        if (a.nome < b.nome) {
            return -1;
        }
        if (a.nome > b.nome) {
            return 1;
        }
        return 0;
    }

    return rua_list.sort(compare);
}

/**
 * Dado um dicionário onde cada key é o nome de uma rua e seu 
 * valor correspondente as informações da rua (como dicionário),
 * cria uma lista de Rua (objetos) em ordem alfabética.
 * @param {dict} ruas_dict o dicionário
 */
function SortedRuaListFromDict(ruas_dict) {
    return SortedRuaList(RuaListFromDict(ruas_dict));
}

/**
 * Cria uma RuaCollection a partir de um dicionário onde cada key é o nome 
 * de uma rua e seu valor correspondente as informações da rua (como dicionário),
 * @param {dict} ruas_dict o dicionário
 */
function RuaCollectionFromDict(ruas_dict) {
    return new RuaCollection(SortedRuaListFromDict(ruas_dict));
}

/**
 * Coleção de ruas, uma abstração para trabalhar de forma mais fácil
 * com um conjunto de Ruas.
 * Ver rua.js
 */
class RuaCollection {

    /**
     * Construtor
     * @param {Array<Rua>} ruas_dict um array de Ruas
     */
    constructor(ruas) {
        this.ruas = ruas;
    }

    /**
     * Retorna uma cópia dessa RuaCollection,
     * mas sem todas as ruas que não conformarem com
     * as regras passadas.
     * @param {dict} rules as regras, um dicionário em que:
     *      As keys são os atributos a serem verificados;
     *      Os values são os valores que cada atributo deve ter para ser aceito.
     */
    filter(rules) {
        var conforming = [];
        for (let i = 0; i < this.ruas.length; i++) {
            const rua = this.ruas[i];
            if (rua.conforms(rules)) {
                conforming.push(rua);
            }
        }

        return new RuaCollection(conforming);
    }

    /**
     * Retorna um array com o nome de todas as ruas.
     */
    names() {
        return this.ruas.map(function(rua) {
            return rua.nome;
        });
    }

    /**
     * Retorna o tamanho (size / length) dessa coleção.
     */
    size() {
        return this.ruas.length
    }

    /**
     * Retorna um bool informando se esta coleção está vazia.
     */
    empty() {
        return this.size == 0;
    }
}
