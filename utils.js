/**
 * Arquivo feito de funções úteis.
 * Deve ser incluido antes dos demais arquivos de código,
 * uma vez que vários dependem desse (database.js é a exceção).
 */

/**
 * Remove um elemento.
 * @param {Node} elem o elemento
 */
function RemoveIfExists(elem) {
    if (elem) {
        elem.parentNode.removeChild(elem);
    }
}

/**
 * Remove um elemento com o id fornecido.
 * @param {string} id o id
 */
function RemoveIfExistsId(id) {
    RemoveIfExists(document.getElementById(id));
}

/**
 * Remove TODOS os elementos com uma dada classe.
 * @param {string} class_name o nome da classe
 */
function RemoveIfExistsClass(class_name) {
    var elems = document.getElementsByClassName(class_name);
    for (let i = 0; i < elems.length; i++) {
        RemoveIfExists(elems[i]);
    }
}

/**
 * Remove todas as childrens de um elemento.
 * @param {Node} elem o elemento
 */
function RemoveChildren(elem) {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
}

/**
 * Dado um dicionário e uma key, retorna o valor 
 * de dicionário[key] caso o dicionário seja válido.
 * No demais, retorna null.
 * @param {dict} dict o dicionário, pode ser null
 * @param {string} key a key
 */
function KINN(dict, key) {
    if (dict) {
        return dict[key];
    }
    return null;
}

/**
 * Dado um dicionário e um array de keys (denominadas [k1, k2, ..., kn]),
 * retorna o valor de dict[k1][k2][...][kn],
 * respeitando a ordem das chaves.
 * @param {dict} dict o dicionário, pode ser null
 * @param {Array} key o array de chaves, a ordem é respeitada
 */
function KINNL(dict, key_array) {
    if (dict) {
        var parsed = dict;
        for (let i = 0; i < key_array.length; i++) {
            parsed = KINN(parsed, key_array[i]);
        }
        return parsed;
    }
    return null;
}

/**
 * -[DEPRECATED / DEPRECIADA]-
 * 
 * Uso deve ser evitado.
 * Atualmente, não é usado em nenhum lugar.
 * 
 * Carrega um novo arquivo js.
 * Após carregar, chama o callback.
 * @param {string} url url do script a ser carregado
 * @param {Function} callback o callback que deve ser chamado
 */
function LoadScript(url, callback) {
    const script_id = "_LoadScript_ID_" + url;

    RemoveIfExistsId(script_id);

    var script_tag = document.createElement("script");
    script_tag.type = "text/javascript";
    script_tag.id = script_id;
    script_tag.src = url;

    if (callback && typeof callback === "function") {
        script_tag.onreadystatechange = callback;
        script_tag.onload = callback;
    }

    document.head.appendChild(script_tag);
}

/**
 * Retorna se o useragente é compatível com mobile ou não.
 */
function IsMobile() {
    const agent = navigator.userAgent;
    return (agent.match(/Android/i) ||
            agent.match(/webOS/i) ||
            agent.match(/iPhone/i) ||
            agent.match(/iPad/i) ||
            agent.match(/iPod/i) ||
            agent.match(/BlackBerry/i) ||
            agent.match(/Windows Phone/i)
        )
}

/**
 * Se for mobile, retorna o valor passado como yes,
 * caso contrário, o valor passado como no.
 * @param {string} yes se sim
 * @param {string} no se não
 */
function IfMobile(yes, no) {
    return IsMobile() ? yes : no;
}

/**
 * Retorna uma string HTML de um <span> com dado texto e cor.
 * @param {string} text o texto
 * @param {string} color a cor, como string
 */
function Span(text, color) {
    return [
        "<span style=\"color:", color, "\">",
            text,
        "</span>"
    ].join("");
}

/**
 * Retorna o parâmetro GET de uma dada key, se existente.
 * @param {string} key a key
 */
function GetURLParam(key) {
    var url_params = window.location.search.substring(1);
    var params = url_params.split("&");
    for (let i = 0; i < params.length; i++) {
        var pair = params[i].split("=");
        if(pair[0] == key) {
            return decodeURIComponent(pair[1]);
        }
    }
    return null;
}

/**
 * Retorna uma string HTML com uma <tr> de dois <td> dada informações.
 * @param {string} left string que ficará à esquerda
 * @param {string} right string que ficará à direita
 * @param {string} tr_class classe que será aplicada ao <tr>
 * @param {string} td_class_left classe que será aplicada ao <td> da esquerda
 * @param {string} td_class_right classe que será aplicada ao <td> da direita
 */
function MergeTableClass(left, right, tr_class, td_class_left, td_class_right) {
    if (left !== null && right !== null && tr_class !== null && td_class_left !== null && td_class_right !== null) {
        return [
            "<tr class=\"", tr_class, "\">",
                "<td class=\"", td_class_left, "\">",
                    left,
                "</td>",
                "<td class=\"", td_class_right, "\">",
                    right,
                "</td>",
            "</tr>"
        ].join("");
    }
    return "";
}

/**
 * Retorna uma string HTML com uma <tr> de dois <td> dada informações.
 * @param {string} left string que ficará à esquerda
 * @param {string} right string que ficará à direita
 */
function MergeTable(left, right) {
    if (left !== null && right !== null) {
        return [
            "<tr>",
                "<td>",
                    left,
                "</td>",
                "<td>",
                    right,
                "</td>",
            "</tr>"
        ].join("");
    }
    return "";
}

/**
 * Retorna uma string HTML (uma row de uma table) dada informações.
 * @param {dict} infos as informações
 * @param {string} pre a string a ser usada à esquerda
 * @param {string} key a key que será pesquisada em infos
 * @param {boolean} isPositive se a row é positiva (algo bom)
 */
function MergeTableInfo(infos, pre, key, isPositive) {
    function TdClass(bool_value) {
        if (bool_value) {
            return isPositive ? "table_info_positive" : "table_info_negative";
        }
        return isPositive ? "table_info_negative" : "table_info_positive";
    }

    var value = infos[key];
    if (value !== null) {
        const td_class_right = TdClass(value);

        if (value === true) {
            value = Span("Sim", "#00ff00");
        } else if (value === false) {
            value = Span("Não", "#ff0000");
        }

        return MergeTableClass(pre, value, "", "", td_class_right);
    }
    return "";
}

/**
 * Retorna um dado texto de foram normalizada.
 * Ou seja, o texto minúsculo e sem caracteres não ASCII.
 * Normalmente usado antes de comparar.
 * @param {string} text o texto
 */
function NormalizedText(text) {
    return text.toLowerCase()
        .replace(new RegExp('[ÁÀÂÃ]','gi'), 'a')
        .replace(new RegExp('[ÉÈÊ]','gi'), 'e')
        .replace(new RegExp('[ÍÌÎ]','gi'), 'i')
        .replace(new RegExp('[ÓÒÔÕ]','gi'), 'o')
        .replace(new RegExp('[ÚÙÛ]','gi'), 'u')
        .replace(new RegExp('[Ç]','gi'), 'c');
}

/**
 * Cria e retorna um elemento <option> com o valor e texto iguais a x.
 * @param {string} x valor desejado
 */
function CreateOption(x) {
    var option = document.createElement("option");
    option.value = x;
    option.text = x;

    return option;
}

/**
 * Retorna se um valor está em um array ou não. (Antes de ECMAScript 2016).
 * @param {*} value o valor a ser verificado
 * @param {Array<*>} array o array
 */
function IsInArray(value, array) {
    return array.indexOf(value) > -1;
}
