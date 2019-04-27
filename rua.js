
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
                "<table class=\"info_rua_table\">",
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
                "<table class=\"info_rua_table\">",
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
    microareaHTML() {
        var parts = [];

        for (let i = 0; i < this.microarea.length; i++) {
            parts.push([
                "<a href=\"microareas.html?microarea=", this.microarea[i], "\">",
                    this.microarea[i],
                "</a>"
            ].join(""));

            // if (i > 1) {
            //     parts.push(" ");
            // }
        }

        return MergeTable("Microárea", parts.join(""));
    }


    /**
     * Returns a HTML string with a table containing the main info about this Rua.
     */
    tableHTML() {
        return [
            "<table class=\"info_rua_table\">",
                this.microareaHTML(),
                MergeTableInfo(this, "Água Encanada", "agua_encanada"),
                MergeTableInfo(this, "Luz Elétrica", "luz_eletrica"),
                MergeTableInfo(this, "Esgoto Encanado", "esgoto_encanado"),
                MergeTableInfo(this, "Entulho na Rua", "entulho"),
                MergeTableInfo(this, "Lixo na Rua", "lixo_na_rua"),
                MergeTableInfo(this, "Animais de Rua", "animais_de_rua"),
            "</table>",
        ].join("");
    }


    /**
     * Returns a HTML string with the all the info of this Rua.
     */
    HTML() {
        return [
            "<p class=\"info_rua_nome\">", this.nome, "</p>",
            this.tableHTML(),
            this.caracteristicasHTML(),
            this.adjacentesHTML(),
        ].join("");
    }
}
