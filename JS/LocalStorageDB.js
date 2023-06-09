function test(){
    alert("YAYY")
}

class LocalStorageDB{

    getGlobalState(){
        /*{
            setCount: int
            nextAvailSetID: int    
        }*/

        var globalStateStr = window.localStorage.getItem("globalState");
        if(globalStateStr == null){
            var newState = {setCount: 0, nextAvailSetID: 1}
            globalStateStr = JSON.stringify(newState)
            window.localStorage.setItem("globalState", globalStateStr);
            return newState
        } else {
            return JSON.parse(globalStateStr)
        }
    }

    getSetList(){
        /* {
            ID: int
            name: string
            description: string
            cardCount: int
            nextAvailCardID: int
        } */   

        var setListStr = window.localStorage.getItem("setList")
        if (setListStr == null){
            window.localStorage.setItem("setList", "[]")
            return []
        }
        else{
            return JSON.parse(setListStr)
        }

    }
    
    getSetByID(ID){
        var setListStr = window.localStorage.getItem("setList")
        if (setListStr == null){
            window.localStorage.setItem("setList", "[]")
            return null
        }
        else{
            var list = JSON.parse(setListStr)
            
            for(let i = 0; i < list.length; i++){
                if(list[i].ID == ID){
                    return list[i]
                }
            }
        }
    }

    addSet(name, description){
        // Create Object
        var globalState = this.getGlobalState()
        var newSet = {
            ID: globalState.nextAvailSetID,
            name: name,
            description: description,
            cardCount: 0,
            nextAvailCardID: 1
        }

        // Update global state
        globalState.nextAvailSetID +=1
        globalState.setCount += 1
        window.localStorage.setItem("globalState", JSON.stringify(globalState))


        //Add the newSet to the list of sets
        var setList = this.getSetList()
        setList.push(newSet)
        window.localStorage.setItem("setList", JSON.stringify(setList))

        // Create card list
        var cardsObj = this.getCardsObject()
        cardsObj[newSet.ID] = []
        window.localStorage.setItem("cards", JSON.stringify(cardsObj))

        return newSet.ID
    }

    editSet(ID, name, description){
        var setList = this.getSetList()
        for(let i = 0; i < setList.length; i++){
            if(setList[i].ID == ID){
                setList[i].name = name
                setList[i].description = description
            }
        }

        window.localStorage.setItem("setList", JSON.stringify(setList))
    }

    updateSet(ID, set){
        var setList = this.getSetList()
        for(let i = 0; i < setList.length; i++){
            if(setList[i].ID == ID){
                setList[i] = set
            }
        }

        window.localStorage.setItem("setList", JSON.stringify(setList))
    }

    removeSet(ID){
        var setList = this.getSetList()
        var index = -1
        for(let i = 0; i < setList.length; i++){
            if(setList[i].ID == ID){
                index = i
                break
            }
        }
        
        setList.splice(index, 1);
        
        //Decrement set count
        var globalState = this.getGlobalState()
        globalState.setCount--;
        window.localStorage.setItem("globalState", JSON.stringify(globalState))
        
        window.localStorage.setItem("setList", JSON.stringify(setList))
    }

    getCardsObject(){
        var cardsObjStr = window.localStorage.getItem("cards")
        if(cardsObjStr == null){
            return {}
        }
        return JSON.parse(cardsObjStr)
    }

    getCardsOfSet(ID){
        /* {
            ID: int
            front: string
            back: string

            percentCorrect: float
            answerCount: int

            lastAnswerCorrect: bool
            rollingCorrectness: float
            lastAccessDate : int
        } */

        var cardsObj = this.getCardsObject()
        var result = cardsObj[ID]
        if(result == undefined){
            return []
        } else {
            return result
        }
    }

    getOneCardOfSet(setID, cardID){
        var cardList = this.getCardsOfSet(setID)
        for(let i = 0; i < cardList.length; i++){
            if(cardList[i].ID == cardID){
                return cardList[i]
            }
        }
    }

    setCardsOfSet(ID, cards){
        var cardsObj = this.getCardsObject()
        cardsObj[ID] = cards

        window.localStorage.setItem("cards", JSON.stringify(cardsObj))
    }

    addCardToSet(setID, cardFront, cardBack){
        //Create new Card
        var set = this.getSetByID(setID)
        var newCard = {
            ID: set.nextAvailCardID,
            front: cardFront,
            back: cardBack,
            percentCorrect: 0.0,
            answerCount: 0,
            lastAnswerCorrect: false,
            rollingCorrectness: 0.0,
            lastAccessDate: 0
        }

        // Add to the list of cards
        var cardList = this.getCardsOfSet(setID)
        cardList.push(newCard)
        this.setCardsOfSet(setID, cardList)

        //Update set info
        set.cardCount++;
        set.nextAvailCardID++;
        this.updateSet(set.ID, set)

        return newCard
    }

    editCard(setID, cardID, newFront, newBack){
        var cardList = this.getCardsOfSet(setID)
        var i = 0
        for(; i < cardList.length; i++){
            if(cardList[i].ID == cardID){
                cardList[i].front = newFront
                cardList[i].back =newBack
                break
            }
        }


        console.log(cardList)
        console.log(i)
        this.setCardsOfSet(setID, cardList)
        return cardList[i]
    }

    removeCardFromSet(setID, cardID){
        var cardList = this.getCardsOfSet(setID)
        var index = -1
        for(let i = 0; i < cardList.length; i++){
            if(cardList[i].ID == cardID){
                index = i
                break
            }
        }
        
        cardList.splice(index, 1);
        
        //Decrement card count
        var set = this.getSetByID(setID)
        set.cardCount--
        this.updateSet(setID, set)

        //Save card list
        this.setCardsOfSet(setID, cardList)
    }
}