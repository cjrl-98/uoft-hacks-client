import React, {useState, useContext} from 'react';
import { Modal, Icon } from 'antd';
import app from "../../firebase/firebase";
import {motion} from 'framer-motion';
import {AuthContext} from '../../firebase/AuthContext.js';
import Login from  './Login';
import Register from './Register';
import UploadPicture from '../UploadPicture/UploadPicture';
import uploadIcon from '../../assets/upload.svg';
import './Header.scss';

const btnVariants = {
     whileHover : { 
          scale: 1.1 
     },
     whileTap : { 
          scale: 0.9 
     }
}

export default function Header(props){
     const currentUser = useContext(AuthContext);
     const [isAuthLoginModal, setIsAuthLoginModal] = useState(false);
     const [isAuthRegisterModal, setIsAuthRegisterModal] = useState(false);
     const [isUploadModal, setIsUploadModal] = useState(false);
     const [isResources, setIsResources] = useState(false);

     const authLoginModal = {
          visible : isAuthLoginModal,
          onCancel : () => setIsAuthLoginModal(!isAuthLoginModal),
          onOk : () => setIsAuthLoginModal(!isAuthLoginModal),
          footer : null,
          width : 521,
          bodyStyle : { borderRadius: 25}
     }

     const authRegisterModal = {
          visible : isAuthRegisterModal,
          onCancel : () => setIsAuthRegisterModal(!isAuthRegisterModal),
          onOk : () => setIsAuthRegisterModal(!isAuthRegisterModal),
          footer : null,
          width : 521,
          bodyStyle : { borderRadius: 25}
     }

     const uploadModalOptions = {
          visible : isUploadModal,
          onCancel : () => setIsUploadModal(!isUploadModal),
          onOk : () => setIsUploadModal(!isUploadModal),
          footer : null,
          width : 521,
          bodyStyle : { borderRadius: 25}
     }

     const handleCancel = () => {
          setIsAuthLoginModal(false);
          setIsAuthRegisterModal(false);
          setIsUploadModal(false);
          setIsResources(false);
     }

     return(
          <>
               <header className="header">
                    <article className="header__logo-container">
                         <h1 className="header__logo">Fabrical</h1>
                    </article>
                    <article className="header__nav">
                         <p className="header__nav-item" onClick={()=>props.setPage('home')}>Home</p>
                         <p className="header__nav-item" onClick={()=>props.setPage('match')}>Match</p>
                         <p className="header__nav-item" onClick={()=>setIsResources(!isResources)}>Resources</p>
                    </article>
                    <article className="header__btn--container">
                         {    !currentUser ? 
                                   <>
                                        <motion.button {...btnVariants} onClick={()=>{setIsAuthLoginModal(!isAuthLoginModal)}} className="header__btn--signin">Sign in</motion.button>
                                        <motion.button  {...btnVariants} onClick={()=>{setIsAuthRegisterModal(!isAuthRegisterModal)}} className="header__btn header__btn--signup">Sign up</motion.button>
                                   </>
                                        :
                                   <>
                                        <motion.button  {...btnVariants} onClick={()=>{setIsUploadModal(!isUploadModal)}} className="header__btn--upload">
                                             <img className="header__upload-icon" src={uploadIcon} alt="upload svg"/> Upload
                                        </motion.button>
                                        <motion.button  {...btnVariants} onClick={()=>app.auth().signOut()} className="header__btn--signout"><Icon type="logout"/></motion.button>
                                   </>
                                   
                         }
                    </article>
               </header>
               <Modal {...authLoginModal}> 
                    <Login handleCancel={handleCancel}/> 
               </Modal>
               <Modal {...authRegisterModal}> 
                    <Register handleCancel={handleCancel}/> 
               </Modal>
               <Modal {...uploadModalOptions}> 
                    <UploadPicture/> 
               </Modal>
               <Modal
                    title="Fabrical Resources"
                    visible={isResources}
                    footer={null}
                    onCancel={handleCancel}
               >
                    <div style={{display: "flex", flexDirection: "column"}}>
                         <a href={`https://directory.goodonyou.eco/`} target="_blank" rel="noopener noreferrer"><button style={{fontSize: "24px", fontWeight: "900"  }}>Good on You</button></a>
                         <p style={{marginLeft: "10px"}}>Fashion Without Harm – Trusted ethical ratings in the palm of your hand.</p>
                         <a href={`https://baptistworldaid.org.au/resources/2019-ethical-fashion-guide/ `} target="_blank" rel="noopener noreferrer"><button style={{fontSize: "24px", fontWeight: "900", marginTop: "16px"}}>BaptistWorld</button></a>
                         <p style={{marginLeft: "10px"}}>Baptist World Aid is a Christian charity organisation based in Australia, helping to dramatically reduce poverty in communities around the world.</p>
                         <a href={`https://msi.higg.org/sac-materials/1/textiles?`} target="_blank" rel="noopener noreferrer" ><button style={{fontSize: "24px", fontWeight: "900", marginTop: "16px"}}>Higg MSI</button></a>
                         <p style={{marginLeft: "10px"}}>The SAC's Higg Materials Sustainability Index (Higg MSI) is the apparel industry's most trusted tool to accurately measure the environmental sustainability</p>
                    </div>
               </Modal>
          </>
     );
    
}