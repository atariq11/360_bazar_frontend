import React from 'react'
import Amlogo from '../logo/Amlogo.jpg';
import Ampic1 from '../logo/Ampic1.png';
import Ampic2 from '../logo/Ampic2.png';
import {Link } from 'react-router-dom';
const Fpage = () => {
    return(
    <>
        <div className="space">
    </div>  
         <br/>
         <img src={Amlogo} alt="logo" className='aml'/>
         <br/>
         <div className="paragraph">
         <p>With millions of products and programs available on 360-BAZAR,content creators publishers and bloggers use easy link-building tools to direct
             their audience to their recommendations,and earn commissions on qualifying purchases    
         </p>
         <p>360-BAZAR Afiliates benefit from our global network of high quality brands and attractive promotions</p>
         <p>Recommend products to your readers,followers and friends!Earn commission and set up a new source of income today.</p>
         </div>
         <br/>
         <Link to='/signup' className='btn'><b>SignUp NOW</b></Link>
         <br/>
         <br/>
         <img src={Ampic1} alt="logo" className='amp'/>
        <br/>
        <br/>
         <img src={Ampic2} alt="logo" className='amp1'/>
         <br/><br/>
        
         <Link to='/signup' className='btn'><b>SignUp NOW</b></Link>
         <br/>
         <h1 className='h1'>Affiliate Agreement </h1>
         <p className='h1'>Affiliate Marketing in Pakistan Terms and Conditions (the “Agr eement”)
         shall constitute an Agreement between you (“You” or “Affiliate”) and the Company,
          for the registration and appointment of the Affiliate 
        to provide the Company with Promotion of the Channels. The Affiliate 
         and the Company shall collectively be referred to as the “Parties” and individually as the “Party”.</p>
         <p className='h1'>The Affiliate must read, agree to, and accept all of the terms and provisions 
         contained in this Agreement, by clicking “I Accept” button, and the Parties hereby agree, acknowledge and accept that clicking such button shall
 instantly form a valid, effective and legally binding agreement for good consideration between the Parties. </p>
         </>
    )       
}
export default Fpage;