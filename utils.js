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

    script_tag.onreadystatechange = callback;
    script_tag.onload = callback;

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
