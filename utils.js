/**
 * File that holds utils JS code, should be included first.
 */


/**
 * Function that removes an element.
 * @param {Node} elem the element to be removed.
 */
function RemoveIfExists(elem) {
    if (elem) {
        elem.parentNode.removeChild(elem);
    }
}


/**
 * Function that removes an element with given id.
 * @param {string} id the id of the element to be removed.
 */
function RemoveIfExistsId(id) {
    RemoveIfExists(document.getElementById(id));
}


/**
 * Function that removes ALL element with given class.
 * @param {string} class_name the class of the elements to be removed.
 */
function RemoveIfExistsClass(class_name) {
    var elems = document.getElementsByClassName(class_name);
    for (let i = 0; i < elems.length; i++) {
        RemoveIfExists(elems[i]);
    }
}


/**
 * Function that removes all children from a given node.
 * @param {Node} elem the node to remove all children from.
 */
function RemoveChildren(elem) {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
}


/**
 * Function that returns a key if the dict is not null.
 * @param {*} dict the dict, can be null.
 * @param {*} key the key.
 */
function KeyIfNotNull(dict, key) {
    if (dict) {
        return dict[key];
    }
    return null;
}


/**
 * Function that loads a new JS script. After loading, calls the callback.
 * @param {string} url the url of the script to load.
 * @param {Function} callback the callback that will be called after loading.
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
 * Returns if the correct database is loaded.
 * @param {JSON} database the loaded database.
 * @param {string} cidade the cidade selected.
 * @param {string} unidade the unidade selected.
 */
function IsCorrectDatabaseLoaded(database, cidade, unidade) {
    return database && database["cidade"] === cidade && database["unidade"] === unidade;
}


/**
 * Returns if the useragent is mobile or not.
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
 * Returns yes if is mobile, no otherwise.
 * @param {string} yes if yes.
 * @param {string} no if no.
 */
function IfMobile(yes, no) {
    return IsMobile() ? yes : no;
}


/**
 * Returns a string of a Span tag with given text and color.
 * @param {string} text the text.
 * @param {string} color the color.
 */
function Span(text, color) {
    return [
        "<span style=\"color:", color, "\">",
            text,
        "</span>"
    ].join("");
}


/**
 * Returns the URL GET Param for the given key.
 * @param {string} key the key.
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
 * Builds a HTML table row with the given info.
 * @param {string} left string that will be on the left.
 * @param {string} right string that will be on the right.
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
 * Builds a HTML table row with the given info.
 * @param {*} infos the dict with the info.
 * @param {*} pre the string to show.
 * @param {*} key the key to search on infos.
 */
function MergeTableInfo(infos, pre, key) {
    var value = infos[key];
    if (value !== null) {
        if (value === true) {
            value = Span("Sim", "#00ff00");
        } else if (value === false) {
            value = Span("Não", "#ff0000");
        }

        return MergeTable(pre, value);
    }
    return "";
}



/**
 * Normalizes the given text, to compare.
 * @param {string} text the text to be normalized.
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
 * Given a string and a dict, replaces all occurrences of {{key}} with the value from the dict.
 * @param {string} text the replace base.
 * @param {dictionary} dict the replace dictionary.
 */
function ReplaceWithDict(text, dict) {
    var replaced_text = text;

    const keys = Object.keys(dict);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        replaced_text = replaced_text.replace(
            [
                "{{",
                key,
                "}}"
            ].join(""),
            dict[key]
        );
    }

    return replaced_text;
}



/**
 * Returns the database path, given info.
 * @param {string} cidade the cidade.
 * @param {string} unidade the unidade.
 */
function DatabasePath(cidade, unidade) {
    return ["database/", cidade, "/", unidade, ".js"].join("");
}



/**
 * Links the handle for all static buttons.
 */
function LinkStaticButtons() {
    function Link(id, page) {
        document.getElementById(id).onclick = function() {
            window.location.href = page;
        }
    }

    Link("button_ver_ruas", "index.html");
    Link("button_ver_microareas", "microareas.html");
    Link("button_ver_filtrar", "filtrar.html");
}


/**
 * Creates a HTML tag with value and text set to the arg x.
 * @param {string} x the value. 
 */
function CreateOption(x) {
    var option = document.createElement("option");
    option.value = x;
    option.text = x;

    return option;
}


/**
 * Function to test if a value in in a given array or not. (For before ECMAScript 2016).
 * @param {*} value any value to check. 
 * @param {Array<*>} array the array to check.
 */
function IsInArray(value, array) {
    return array.indexOf(value) > -1;
}
