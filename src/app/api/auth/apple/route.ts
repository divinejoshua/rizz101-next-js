import { NextRequest, NextResponse } from "next/server";
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import axios from "axios";


// GET request
export async function POST (req: NextRequest, res : NextResponse) {

    //Get the request body
    let request = await req.formData()

    let token = request.get("userIdToken") || ""


    verifyAppleToken(token)
    .then(user => {
        console.log('User information:', user);
        if (user.email) {
            console.log('User email:', user.email);
        } else {
            console.log('Email not available in the token');
        }
    })
    .catch(err => {
        console.error('Error:', err.message);
    });


    // let applePublicKeysUrl = 'https://appleid.apple.com/auth/keys';
    // let response = await fetch(applePublicKeysUrl);
    // let applePublicKeys = await response.json();

    // let decodedToken = jwt.decode(token, { complete: true });
    // let key = applePublicKeys.keys.find((k:any) => k.kid === decodedToken.header.kid);

    // console.log(key)

    // // If Key is invalid
    // if (!key) {
    //     return NextResponse.json({
    //         error : true,
    //         error_message : "Apple token public key not found"
    //     }, {
    //         status: 400,
    //     });
    // }

    // let verifiedToken = jwt.verify(token, key, { algorithms: ['RS256'] });
    // console.log(verifiedToken)

    //Data response
    let data = {
        welcomeText : "Rizz101 - Apple pay"
    }

    //Response
    return NextResponse.json(data, {
        status: 200,
    });
}



// Configure jwks-rsa client
const client = jwksClient({
    jwksUri: 'https://appleid.apple.com/auth/keys',
    cache: true,
    cacheMaxEntries: 5, // Default value
    cacheMaxAge: 600000 // Default value: 10min
});

// Function to get Apple's public key by `kid`
const getApplePublicKey = (kid : any) => {
    return new Promise((resolve, reject) => {
        client.getSigningKey(kid, (err, key) => {
            if (err) {
                return reject(`Failed to get signing key: ${err}`);
            }
            const publicKey = key.getPublicKey();
            resolve(publicKey);
        });
    });
};

// Function to verify and decode the token
const verifyAppleToken = async (token : any) => {
    try {
        const decodedToken = jwt.decode(token, { complete: true });

        if (!decodedToken) {
            throw new Error('Failed to decode token');
        }

        const kid = decodedToken.header.kid;
        const publicKey = await getApplePublicKey(kid);

        return new Promise((resolve, reject) => {
            jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded);
            });
        });
    } catch (error) {
        throw new Error(`Token verification failed: ${error.message}`);
    }
};