const myModule = (() => {
    //============= Crear baraja de cartas =========================
        let deck = [];
        let poles = ['C','D', 'H', 'S'];
        let specials = ['A', 'J', 'K', 'Q'];
        const htmlPlayerName = document.querySelector('#player_name');
        const playerName = prompt('What is your name');
              htmlPlayerName.innerText = playerName;
    
    
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
    
        // ==========  Pedir card =======================
        const pedirCarta = ( ) => {
            if (deck.length === 0){
                throw 'No quedan mas cartas en la baraja'
            }
            const card = deck.pop()
            console.log(card);
            return card
        }
    
        // ==========  Valores de las cartas =======================
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
    
    
    
        // const valor = valorCarta(pedirCarta())
        const btnNew          = document.querySelector('#btn_new');
        const btnHit          = document.querySelector('#btn_hit');
        const btnStand        = document.querySelector('#btn_stop');
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
    
            const imgCarta = document.createElement('img');
            imgCarta.src = `img/${card}.png`;
            imgCarta.classList.add('cartas');
            divPlayersCards.append(imgCarta);
            
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
            
                const imgCarta = document.createElement('img');
                imgCarta.src = `/img/${card}.png`;
                imgCarta.classList.add('cartas');
                divCpuCards.append(imgCarta);
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