const _set_grid_elem =
`<button class="set-grid_element" tabindex="0" onclick="setGridElementClick($ID$)" > 
    <p class="element_set-name"></p>
    <p class="element_set-desc"></p>
    <p class="element_set-card-count"></p>
</button>`

function newSetGridElement(set){
    var element = document.createElement("element");
    element.innerHTML = _set_grid_elem.replaceAll("$ID$", set.ID);
    element = element.childNodes[0]

    element.querySelector(".element_set-name").textContent = set.name
    element.querySelector(".element_set-desc").textContent = set.description
    element.querySelector(".element_set-card-count").textContent = set.cardCount + " card" + (set.cardCount == 1 ? "" : "s")

    return element
}