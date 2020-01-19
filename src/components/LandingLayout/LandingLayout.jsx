import React from 'react';
import {motion} from 'framer-motion';
import './LandingLayout.scss';

import landingGirl from '../../assets/landing-girl.svg';
import landingObject from '../../assets/landing-object.svg';

const btnVariants = {
     whileHover : { 
          scale: 1.1 
     },
     whileTap : { 
          scale: 0.9 
     }
}

export default function LandingLayout() {
     return(
          <>
               <main className="main">
                    <img className="main__background-object" src={landingObject} alt="landing object picture"/>
                    <img className="main__landing-girl" src={landingGirl} alt="landing girl picture"/>
                    <article className="main__text-container">
                         <h2 className="main__text-sub-heading">Always Look <br/><span>Amazing</span></h2>
                         <p className="main__text-paragraph">Find the perfect outfit, learn about sustainable <br/>alternatives and help the planet.</p>
                         <motion.button {...btnVariants} className="main__btn-startnow">Start Now</motion.button>
                    </article>
               </main>
          </>
     );
}