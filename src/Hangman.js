import React, { Fragment, Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from "./words";

class Hangman extends Component {
/** by default, allow 6 guesses and use provided gallows images. 
 * por padrão, permita 6 suposições e use as imagens de forca fornecidas.
*/
static defaultProps = {
  maxWrong: 6,
  images: [img0, img1, img2, img3, img4, img5, img6]
};

constructor(props) {
  super(props);
  this.state = { nWrong: 0, guessed: new Set(), answer: randomWord()};
  
  this.handleGuess = this.handleGuess.bind(this);
  this.handleClick = this.handleClick.bind(this)
  console.log(this.state.answer)
}

/** guessedWord: show current-state of word:
  if guessed letters are {a,p,e}, show "app_e" for "apple"
  guessedWord: mostra o estado atual da palavra:
  se as letras adivinhadas forem {a, p, e}, mostre "app_e" para "apple"
*/
guessedWord() {
  return this.state.answer
    .split("")
    .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"))
}


numbersWrongs() {
  const ltr = 0
  const letras = this.state.guessed.has(ltr) ? ltr : 'Número errado : ' + this.state.nWrong
  return letras
}

numbersWrongsAlt () {
  const alt = 0 
  const alts = this.state.guessed.has(alt) ? alt :  this.state.nWrong
  return alts
}

/** handleGuest: handle a guessed letter:
  - add to guessed letters
  - if not in answer, increase number-wrong guesses
    handleGuest: lidar com uma carta adivinhada:
  - adicionar às letras adivinhadas)
  - se não estiver em resposta, aumente o número de suposições erradas
*/

handleGuess(evt) {
  let ltr = evt.target.value;
  this.setState(st => ({
  guessed: st.guessed.add(ltr),
    nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
  }));
}

/** generateButtons: return array of letter buttons to render
 * generateButtons: array de retorno de botões de letras para renderizar
 */
generateButtons() {
  return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
    <button className="btn"
      value={ltr}
      onClick={this.handleGuess}
      disabled={this.state.guessed.has(ltr)}
      key= {ltr}
    >
      {ltr}
    </button>
  )); 
}

handleClick (e) {
  this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord()})
}

 removeElementsByClass(){
  var elements = document.getElementsByClassName('Hangman-bnts');
  while(elements.length > 0){
      elements.parentNode.removeChild(elements[0]);
  }
}


vencedor() {
 if(this.guessedWord().join('') === this.state.answer){
   return <p className="venceu">VOCÊ VENCEU</p>
 }else {
  return  <p className='Hangman-bnts'>{this.generateButtons()}</p>
 }
}

perdeu() {
  if(this.state.nWrong < this.props.maxWrong){
    return <p className='Hangman-bnts'>{this.generateButtons()}</p>
  }else{
    return  <p className="perdeu">VOCÊ PERDEU</p>
  } 
}


venceuPerdeu() {

  if(this.guessedWord().join('') === this.state.answer){
    return this.vencedor()
  }else{
    return this.perdeu()
  }
}





render() {

  return (
  
    <Fragment>
        <div className='Hangman'>

          <h1>Hangman</h1>

          <img src={this.props.images[this.state.nWrong]} alt={this.numbersWrongsAlt() + "/6 suposições da erradas"}/>

          <p> {this.numbersWrongs()}</p>

          {this.state.nWrong < this.props.maxWrong ? <p className='Hangman-word'>{this.guessedWord()} </p> : <div className="letra">{this.state.answer}</div>} 

          <div>
             {this.venceuPerdeu()}
             {this.guessedWord().join('') === this.state.answer ?  <button className="button_venceu" type="submit" onClick={this.handleClick}>Reiniciar</button> : ''}
          </div>
          <div>
             {this.state.nWrong < this.props.maxWrong ? '' : <button className="button_reiniciar" type="submit" onClick={this.handleClick}>Reiniciar</button>}  
          </div> 
         
      </div>
    </Fragment>
    );
  }
}

export default Hangman;
