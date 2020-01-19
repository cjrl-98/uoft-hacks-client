import React, {useState, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import app from "../../firebase/firebase";
import './MatcherLayout.scss';
import {ClothingCollectionContext} from '../../store/store';

const btnVariants = {
     whileHover : { 
          scale: 1.1 
     },
     whileTap : { 
          scale: 0.9 
     }
}


export default function LandingLayout() {
     const [collectionList, setCollectionList] = useState(null);
     const [suggestions, setSuggestions] = useState(null);
     const [alternatives, setAlternatives] = useState(null);
     const collectionContext = useContext(ClothingCollectionContext)
     if(collectionContext[0][0]){
          app.storage().ref().child(`${collectionContext[0][0].originFileObj.name}`).getDownloadURL().then(function(url){
               setCollectionList(url)
          });
     }
     async function fetchData(){
          try {
               const response = await axios.post('https://lit-badlands-37737.herokuapp.com/', {
                    "website" : `${collectionList}`,
                    "gender" : `${collectionContext[2]}`
               });
               setSuggestions(response.data.suggestion);
               setAlternatives(response.data.alternatives);
               console.log(response.data)
          } catch (error) {
               console.error(error)
          }
     }
     const handleLookBook = () => {
          fetchData();
     }

     return(
          <>
               <main className="main-matcher">
                    <div className="main-matcher__background"/>
                    <article className="main-matcher__left">
                         <div className="left-top">
                                   { collectionList ? <div class="card"><img src={collectionList}/></div> : <div className="left__clothes"/> }
                                   { suggestions ? 
                                   <div class="card"><img src={suggestions[0][7]}/>
                                        <div class="info">
                                             <h1>Brand :{` ${suggestions[0][3]}`}</h1>
                                             <p>Lorem Ipsum is simply dummy text</p>
                                             <a href={`${suggestions[0][4]}`} target="_blank" rel="noopener noreferrer"><button>View Product</button></a>
                                        </div>
                                   </div> : <div className="left__clothes"/>
                                   }
                         </div>
                         <div className="left-bottom">
                                   { suggestions ? 
                                   <div class="card"><img src={suggestions[1][7]}/>
                                        <div class="info">
                                             <h1>Brand : {` ${suggestions[1][3]}`}</h1>
                                             <p>Lorem Ipsum is simply dummy text</p>
                                             <a href={`${suggestions[1][4]}`} target="_blank" rel="noopener noreferrer"><button>View Product</button></a>
                                        </div>
                                   </div> : <div className="left__clothes"/>
                                   }
                                   { suggestions ? 
                                   <div class="card"><img src={suggestions[2][7]}/>
                                        <div class="info">
                                             <h1>Brand :{` ${suggestions[2][3]}`}</h1>
                                             <p>Lorem Ipsum is simply dummy text</p>
                                             <a href={`${suggestions[2][4]}`} target="_blank" rel="noopener noreferrer"><button>View Product</button></a>
                                        </div>
                                   </div> : <div className="left__clothes"/>
                                   }
                         </div>
                         <motion.button {...btnVariants} className="generate-btn" onClick={handleLookBook}>Generate</motion.button>
                    </article>
                    { alternatives ?
                    <article className="main-matcher__right">
                         <h1 className="right__subheading">Sustainable Alternatives</h1>
                         <h2 className="right__suggestions_title">Top</h2>
                         <div className="right__tshirt-suggestions">
                              <div className="right__suggestion-option">
                                   { alternatives[0][2] === "top" ? <a href={`${alternatives[0][4]}`} target="_blank" rel="noopener noreferrer"><img className="left__clothes-img" src={alternatives[0][7]}/></a> : null}
                              </div>
                              <div className="right__suggestion-option right__suggestion-option--2">
                                   { alternatives[1][2] === "top" ? <a href={`${alternatives[1][4]}`} target="_blank" rel="noopener noreferrer"><img className="left__clothes-img" src={alternatives[1][7]}/></a> : null}
                              </div>
                              <div className="right__suggestion-option right__suggestion-option--3">
                                   { alternatives[2][2] === "top" ? <a href={`${alternatives[2][4]}`} target="_blank" rel="noopener noreferrer"><img className="left__clothes-img" src={alternatives[2][7]}/></a> : null}
                              </div>
                         </div>
                         <h2 className="right__suggestions_title">Outerwear</h2>
                         <div className="right__tshirt-suggestions">
                              <div className="right__suggestion-option">
                                   { alternatives[3][2] === "outerwear" ? <a href={`${alternatives[3][4]}`} target="_blank" rel="noopener noreferrer"><img className="left__clothes-img" src={alternatives[3][7]}/></a> : null}
                              </div>
                              <div className="right__suggestion-option right__suggestion-option--2">
                                   { alternatives[4][2] === "outerwear" ? <a href={`${alternatives[4][4]}`} target="_blank" rel="noopener noreferrer"><img className="left__clothes-img" src={alternatives[4][7]}/></a> : null}
                              </div>
                              <div className="right__suggestion-option right__suggestion-option--3">
                                   { alternatives[5][2] === "outerwear" ? <a href={`${alternatives[5][4]}`} target="_blank" rel="noopener noreferrer"><img className="left__clothes-img" src={alternatives[5][7]}/></a> : null}
                              </div>
                         </div>
                         <h2 className="right__suggestions_title">Shoes</h2>
                         <div className="right__tshirt-suggestions">
                              <div className="right__suggestion-option">
                                   { alternatives[6][2] === "shoes" ? <a href={`${alternatives[6][4]}`} target="_blank" rel="noopener noreferrer"><img className="left__clothes-img" src={alternatives[6][7]}/></a> : null}
                              </div>
                              <div className="right__suggestion-option right__suggestion-option--2">
                                   { alternatives[7][2] === "shoes" ? <a href={`${alternatives[7][4]}`} target="_blank" rel="noopener noreferrer"><img className="left__clothes-img" src={alternatives[7][7]}/></a> : null}
                              </div>
                              <div className="right__suggestion-option right__suggestion-option--3">
                                   { alternatives[8][2] === "shoes" ? <a href={`${alternatives[8][4]}`} target="_blank" rel="noopener noreferrer"><img className="left__clothes-img" src={alternatives[8][7]}/></a> : null}
                              </div>
                         </div>
                         <h2 className="right__suggestions_title">Bottom</h2>
                         <div className="right__tshirt-suggestions">
                              <div className="right__suggestion-option">
                                   { alternatives[9][2] === "bottom" ? <a href={`${alternatives[9][4]}`} target="_blank" rel="noopener noreferrer"><img className="left__clothes-img" src={alternatives[9][7]}/></a> : null}
                              </div>
                              <div className="right__suggestion-option right__suggestion-option--2">
                                   { alternatives[10][2] === "bottom" ? <a href={`${alternatives[10][4]}`} target="_blank" rel="noopener noreferrer"><img className="left__clothes-img" src={alternatives[10][7]}/></a> : null}
                              </div>
                              <div className="right__suggestion-option right__suggestion-option--3">
                                   { alternatives[11][2] === "bottom" ? <a href={`${alternatives[11][4]}`} target="_blank" rel="noopener noreferrer"><img className="left__clothes-img" src={alternatives[11][7]}/></a> : null}
                              </div>
                         </div>
                    </article>
                         : 
                    null
                    }
               </main>
          </>
     );
}