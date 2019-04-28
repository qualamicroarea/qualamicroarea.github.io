

/**
 * Given a ruas_dict where each key is a rua name and it's value the rua info,
 * craetes a list of Rua objects. Order is random.
 * @param {dict} ruas_dict the ruas_dict.
 */
function RuaListFromDict(ruas_dict) {
    var ruas = [];

    Object.keys(ruas_dict).forEach(function(rua_name) {
        ruas.push(new Rua(rua_name, ruas_dict[rua_name]));
    });

    return ruas;
}


/**
 * Given a list of Rua Objects, returns it sorted.
 * @param {Array<Rua>} rua_list the list of Rua Objects.
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
 * Given a ruas_dict where each key is a rua name and it's value the rua info,
 * craetes an ordered list of Rua objects.
 * @param {dict} ruas_dict the ruas_dict.
 */
function SortedRuaListFromDict(ruas_dict) {
    return SortedRuaList(RuaListFromDict(ruas_dict));
}


/**
 * Creates a Rua Collection object from a ruas_dict.
 * @param {dict} ruas_dict a dict where each key (a rua name) has a value (rua info).
 * Check args before calling.
 */
function RuaCollectionFromDict(ruas_dict) {
    return new RuaCollection(SortedRuaListFromDict(ruas_dict));
}


/**
 * Abstraction for a Rua Collection.
 */
class RuaCollection {

    /**
     * Constructor for a Rua Collection object.
     * @param {Array<Rua>} ruas_dict a array of Rua Objects.
     */
    constructor(ruas) {
        this.ruas = ruas;
    }


    /**
     * Returns a copy of this RuaCollection,
     * removing all ruas that do not conform to the rules passed.
     * @param {dict} rules the rules to be checked, a dict where:
     *      The keys are the attributes to be checked;
     *      The values the needed value to conform.
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
     * Returns an array with all ruas names.
     */
    names() {
        return this.ruas.map(function(rua) {
            return rua.nome;
        });
    }
}
