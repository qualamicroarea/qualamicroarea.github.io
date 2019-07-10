
/**
 * Abstraction for a Rua.
 */
class Rua {

    /**
     * Constructor for a Rua object. Check args before calling.
     * @param {string} nome the rua name.
     * @param {dict} info the json info.
     */
    constructor(nome, info) {
        this.nome = nome;
        this.microarea = info.microarea;
        this.agua_encanada = info.agua_encanada;
        this.luz_eletrica = info.luz_eletrica;
        this.esgoto_encanado = info.esgoto_encanado;
        this.entulho = info.entulho;
        this.lixo_na_rua = info.lixo_na_rua;
        this.animais_de_rua = info.animais_de_rua;
        this.caracteristicas = info.caracteristicas;
        this.referencia = info.referencia;
        this.adjacentes = info.adjacentes;
        this.observacoes = info.observacoes;
    }


    /**
     * Returns a HTML string with the adjacentes of this Rua.
     */
    adjacentesHTML() {
        if (this.adjacentes.length > 0) {
            var html_parts = [
                "<p class=\"info_rua_adjacentes\">Ruas Adjacentes:</p>",
                "<table class=\"border_table\">",
            ]

            for (let i = 0; i < this.adjacentes.length; i++) {
                html_parts.push([
                    "<tr>",
                        "<td>",
                            "<span class=\"rua_adjacente clickable\">",
                                this.adjacentes[i],
                            "</span>",
                        "</td>",
                    "</tr>"
                ].join(""));
            }

            html_parts.push("</table>")

            return html_parts.join("");
        }
        return "";
    }


    /**
     * Returns a HTML string with the caracteristicas of this Rua.
     */
    caracteristicasHTML() {
        if (this.caracteristicas.length > 0) {
            var html_parts = [
                "<p class=\"info_rua_caracteristicas\">Características da Rua:</p>",
                "<table class=\"border_table\">",
            ]

            for (let i = 0; i < this.caracteristicas.length; i++) {
                html_parts.push([
                    "<tr>",
                        "<td>",
                            this.caracteristicas[i],
                        "</td>",
                    "</tr>"
                ].join(""));
            }

            html_parts.push("</table>")

            return html_parts.join("");
        }
        return "";
    }


    /**
     * Returns a HTML string with the microarea of this Rua.
     */
    microareaHTML(cidade, unidade) {
        var parts = [];

        const length = this.microarea.length;

        for (let i = 0; i < length; i++) {
            parts.push([
                "<a href=\"microareas.html",
                    "?microarea=", this.microarea[i],
                    "&cidade=", cidade,
                    "&unidade=", unidade,
                    "\">",
                    this.microarea[i],
                "</a>"
            ].join(""));

            if (i != length - 1) {
                parts.push(", ");
            }
        }

        return MergeTable("Microárea", parts.join(""));
    }


    /**
     * Returns a HTML string with a table containing the main info about this Rua.
     */
    tableHTML(cidade, unidade) {
        return [
            "<table class=\"border_table\">",
                this.microareaHTML(cidade, unidade),
                MergeTableInfo(this, "Água Encanada", "agua_encanada", true),
                MergeTableInfo(this, "Luz Elétrica", "luz_eletrica", true),
                MergeTableInfo(this, "Esgoto Encanado", "esgoto_encanado", true),
                MergeTableInfo(this, "Entulho na Rua", "entulho", false),
                MergeTableInfo(this, "Lixo na Rua", "lixo_na_rua", false),
                MergeTableInfo(this, "Animais de Rua", "animais_de_rua", false),
            "</table>",
        ].join("");
    }


    /**
     * Returns a HTML string with the all the info of this Rua.
     */
    HTML(cidade, unidade) {
        return [
            "<p class=\"info_rua_nome\">", this.nome, "</p>",
            this.tableHTML(cidade, unidade),
            this.caracteristicasHTML(),
            this.adjacentesHTML(),
        ].join("");
    }


    /**
     * Given a attribute key and a rules, returns true if the value conforms to the rules.
     * @param {rules} rules the rules to be checked, expected value.
     * @param {key} key the attribute key which value should be the rule.
     */
    comformsKey(rules, key) {
        if (rules) {
            if (rules[key] !== undefined) {
                if (rules[key] !== this[key]) {
                    return false;
                }
            }
        }
        return true;
    }


    /**
     * Returns true if this Rua Object conforms to the given rules, false otherwise.
     * @param {dict} rules the rules to be checked, a dict where:
     *      The keys are the attributes to be checked;
     *      The values the needed value to conform.
     */
    conforms(rules) {
        if (rules) {
            if (rules["microarea"] && !IsInArray(rules["microarea"], this.microarea)) {
                return false;
            }

            if (!this.comformsKey(rules, "agua_encanada")) {
                return false;
            }
            if (!this.comformsKey(rules, "luz_eletrica")) {
                return false;
            }
            if (!this.comformsKey(rules, "esgoto_encanado")) {
                return false;
            }
            if (!this.comformsKey(rules, "entulho")) {
                return false;
            }
            if (!this.comformsKey(rules, "lixo_na_rua")) {
                return false;
            }
            if (!this.comformsKey(rules, "animais_de_rua")) {
                return false;
            }

            if (rules.caracteristicas) {
                for (let i = 0; i < rules.caracteristicas.length; i++) {
                    const caracteristica = rules.caracteristicas[i];

                    if (!IsInArray(caracteristica, this.caracteristicas)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}
