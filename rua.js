/**
 * Abstração de uma rua.
 * Classe importantíssima que está no coração de tudo.
 */
class Rua {

    /**
     * Contrutor.
     * Argumentos passados devem ser válidos.
     * @param {string} nome o nome da rua
     * @param {dict} info um dicionário com as informações
     */
    constructor(nome, info) {
        this.nome = nome;
        this.cidade = info.cidade;
        this.unidade = info.unidade;
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
     * Retorna uma string HTML com as ruas adjacentes.
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
     * Retorna uma string HTML com as características dessa rua.
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
     * Retorna uma string HTML com a(s) microárea(s) dessa rua.
     * São hrefs, levando para a página de buscar microáreas.
     */
    microareaHTML() {
        var parts = [];

        const length = this.microarea.length;

        for (let i = 0; i < length; i++) {
            parts.push([
                "<a href=\"microareas.html",
                    "?microarea=", this.microarea[i],
                    "&cidade=", this.cidade,
                    "&unidade=", this.unidade,
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
     * Retorna uma string HTML de uma table contendo as
     * principais informações dessa Rua.
     */
    tableHTML() {
        return [
            "<table class=\"border_table\">",
                this.microareaHTML(),
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
     * Retorna uma string HTML com toda a informação dessa Rua.
     */
    HTML() {
        return [
            "<p class=\"info_rua_nome\">", this.nome, "</p>",
            this.tableHTML(),
            this.caracteristicasHTML(),
            this.adjacentesHTML(),
        ].join("");
    }

    /**
     * Dada uma regra e o nome de um atributo,
     * retorna True somente se o valor do atributo corresponder à regra.
     * rules[key] deve ser um valor válido.
     * Se rules[key] for inválido, retorna True.
     * @param {dict} rules as regras
     * @param {key} key o nome do atributo
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
     * Retorna True somente se essa Rua conformar com dadas regras.
     * @param {dict} rules um dicionário em que:
     *      As keys são os atributos a serem verificados;
     *      Os values são os valores que cada atributo deve ter para ser aceito.
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

    /**
     * Retorna uma string contendo uma URI que, se acessada,
     * levará para index.js e exibirá as informações dessa rua.
     */
    href() {
        return encodeURI([
            "index.html",
            "?rua=", this.nome,
            "&cidade=", this.cidade,
            "&unidade=", this.unidade
        ].join(""));
    }
}
