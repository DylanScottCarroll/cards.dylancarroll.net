const _card_element_repr =
`<div class="card-element">
    <div class="card-pane"><p>Front</p></div>
    <div class="card-pane"><p>Back</p></div>
    <div class="card-buttons">
        <button onclick="editCard(this.parentElement.parentElement, $ID$)">✏️</button>
        <button onclick="deleteCard(this.parentElement.parentElement, $ID$)">🗑️</button>
    </div>
</div>`


function newCardElement(card){
    var element = document.createElement("element");
    element.innerHTML = _card_element_repr.replaceAll("$ID$", card.ID);
    element = element.childNodes[0]

    element.querySelectorAll(".card-pane")[0].children[0].textContent = card.front
    element.querySelectorAll(".card-pane")[1].children[0].textContent = card.back

    return element
}

const _edit_card_element_repr =
`<div class="card-element">
    <textarea class="card-pane"></textarea>
    <textarea class="card-pane"></textarea>
    <div class="card-buttons">
        <button onclick="finishEditCard(this.parentElement.parentElement, $ID$)">✔️</button>
        <button onclick="cancelEditCard(this.parentElement.parentElement, $ID$)">✖️</button>
    </div>
</div>`

function newEditCardElement(card){
    var element = document.createElement("element");
    element.innerHTML = _edit_card_element_repr.replaceAll("$ID$", card.ID);
    element = element.childNodes[0]

    element.querySelectorAll(".card-pane")[0].textContent = card.front
    element.querySelectorAll(".card-pane")[1].textContent = card.back

    return element
}