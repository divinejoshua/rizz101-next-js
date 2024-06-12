"use client"
import React, { useEffect, useState } from 'react'
import {auth, signInWithGooglePopup } from '../../../firebase/firebase'
import googleBtnSvg from "../../../../../public/google.svg";
import Image from 'next/image';

export default function GoogleLoginPage() {

    // Data
    const [userIdToken, setuserIdToken] = useState<string>("")

        // Login user
    const logGoogleUser = async () => {
        try{
        let response : any = await signInWithGooglePopup();
            setuserIdToken(response.user.accessToken)
        }
        catch{
        }
    }

  //   Redirect the user if logged in
  useEffect(() => {
    if(userIdToken){
      const queryParameters = new URLSearchParams(window.location.search)
      const redirectUrl = queryParameters.get("redirectUrl")
      if(redirectUrl){
          window.location.href = `${redirectUrl}?idToken=${userIdToken}`;
      }
    }
      // eslint-disable-next-line
  }, [userIdToken]);

  return (
    <div className='center-page'>
      <center>
          <button onClick={logGoogleUser} className='btn flex place-content-center mt-7 bg-default text-white py-2 px-2 rounded-full font-bold drop-shadow'>
          <Image
            src={googleBtnSvg}
            width={32}
            height={32}
            alt="Picture of the author"
          />
              {/* <img alt="rizz101" src={googleBtnSvg} width={32}/> */}
              <span className='ml-5 mt-1 mr-5'>Accept and continue</span>
          </button>
      </center>
    </div>
  )
}