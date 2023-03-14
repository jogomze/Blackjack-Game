const myModule = (() => {
    //============= Create deck of cards =========================
        let deck = [];
        let poles = ['C','D', 'H', 'S'];
        let specials = ['A', 'J', 'K', 'Q'];
        
        const htmlPlayerName = document.querySelector('#player_name');
        const playersN = prompt('What is your name');
              htmlPlayerName.innerText = playersN;
    
    
        const createDeck = () =>{
    
            for(let i = 2; i <= 10; i++){
                for (pole of poles){
                    deck.push(i+pole)
                }
            }
            for (special of specials){
                for (pole of poles){
                    deck.push(special + pole)    
                }    
            }
            deck = _.shuffle(deck);
            return deck
        }
    
        // ==========  Hit card =======================
        const hitCard = ( ) => {
            if (deck.length === 0){
                throw 'There is no more cards in the deck'
            }
            const card = deck.pop()
            console.log(card);
            return card
        }
    
        // ==========  Card value =======================
        const valueCard = (card) => {
            let value = card.substring(0, card.length - 1);
            if( isNaN(value)){
                if ( value == 'A'){
                    value = 11
                } else {
                    value = 10
                }
            }
            value = value * 1;
            return value
        }
    
    
    
        // const value = valueCard(hitCard())
        const btnNew          = document.querySelector('#btn_new');
        const btnHit          = document.querySelector('#btn_hit');
        const btnStand        = document.querySelector('#btn_stand');
        const divPlayersCards  = document.querySelector('#player');
        const divCpuCards      = document.querySelector('#cpu');
        const htmlPlayerPoints = document.querySelector('#points_player');
        const htmlCpuPoints     = document.querySelector('#points_cpu');
        let pointsPlayers       = 0;
        let pointsCpu           = 0;
    
        
    
    
        btnHit.addEventListener('click', () =>{
            const card = hitCard();
            pointsPlayers = pointsPlayers + valueCard(card);
            htmlPlayerPoints.innerText = pointsPlayers;
    
            const imgCard = document.createElement('img');
            imgCard.src = `img/${card}.png`;
            imgCard.classList.add('cards');
            divPlayersCards.append(imgCard);
            
            if ( pointsPlayers > 21 ){
                btnHit
    .disabled = true;
                btnStand.disabled = true;
                turnCpu(pointsPlayers);
            } else if (pointsPlayers === 21 ){
                btnHit
    .disabled = true;
                btnStand.disabled = true;
                turnCpu(pointsPlayers);
            } 
    
        })
    
    
    
        const turnCpu = (pointsPlayers) => {
            
            do {
                const card = hitCard();
                pointsCpu = pointsCpu + valueCard(card);
                htmlCpuPoints.innerText = pointsCpu;
            
                const imgCard = document.createElement('img');
                imgCard.src = `/img/${card}.png`;
                imgCard.classList.add('cards');
                divCpuCards.append(imgCard);
                if(pointsPlayers > 21 ){
                    break;
                }
                
            } while (( pointsCpu < pointsPlayers ) && (pointsPlayers <= 21) )
            setTimeout(() => {
                if (pointsCpu === pointsPlayers){
                    alert('Draw');
                } else if (pointsPlayers > 21 ) {
                    alert('More than 21 points, you lost :(');
                } else if ( pointsCpu > 21){
                    alert('Player wins! :)');
                } else {
                    alert('Player loose :( ');
                }
            }, 500);
            }
    
    
    
    
        // events
    
    
        btnStand.addEventListener('click', () =>{
            btnHit
.disabled = true;
            btnStand.disabled = true;
            turnCpu(pointsPlayers);
        })
    
    
    
    
        btnNew.addEventListener('click', () =>{
            deck = [];
            htmlCpuPoints.innerText = 0;
            htmlPlayerPoints.innerText = 0;
            btnHit
.disabled = false;
            btnStand.disabled = false;
    
            pointsCpu = 0;
            pointsPlayers = 0
    
    
            divCpuCards.innerHTML          = '';
            divPlayersCards.innerHTML      = '';
    
            createDeck();
        
        })
    })