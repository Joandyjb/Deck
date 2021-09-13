import React, {Component} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Card from './Card';
import './Deck.css'


const APi_Base_Url = 'https://deckofcardsapi.com/api/deck'

class Deck extends Component{
    constructor(props) {
        super(props)
        this.state= {
            deck: null,
            drawn: []
            
        }
        this.getCard = this.getCard.bind(this)
    }

    async componentDidMount() {
        let deck = await axios.get(`${APi_Base_Url}/new/shuffle `);
        this.setState({deck: deck.data});
    }

    
    async getCard(){
        let id = this.state.deck.deck_id;
        
        try {
            let cardURl = `${APi_Base_Url}/${id}/draw/`;
            let cardRes = await axios.get(cardURl);
            if (!cardRes.data.success){
                throw new Error('No card remaining')
            }
            let card = cardRes.data.cards[0]
            console.log(card)
            this.setState( st =>({drawn: [ ...st.drawn, 
            {
                img: card.image,
                name: `${card.value} of ${card.suit}`,
                key :uuidv4(),
                id : card.code,
            } ]}))
        } catch (err) {
            alert(err);
        }
    }


    render(){
        let card = this.state.drawn.map( card => (
            <Card 
                img= {card.img}
                alt = {card.name}
            />
        ))
        return(
            <div>
            <h1> Card Deck</h1>
            <button onClick={this.getCard}>Add New card </button>
            <div className='Deck-card-area'> {card} </div>
            
            
            
            </div>

        )
    }
}

export default Deck;