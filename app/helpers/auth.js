import * as AppAuth from 'expo-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import Constants from 'expo-constants'

let config = {
    issuer: 'https://accounts.google.com',
    scopes: ['profile', 'email', 'openid'],
    // scopes: ['profile', 'email', 'openid', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.appdata'],
    /* This is the CLIENT_ID generated from a Firebase project */
    // expo
    // clientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
    // ios
    // clientId: '459074254974-e0l81r9tif92osj98ksurom0jq9v4hcc.apps.googleusercontent.com',
    // android
    clientId: Constants.appOwnership!="expo"?
                '459074254974-vfa4edsss8k2k97rgpi3hvcia3gns28r.apps.googleusercontent.com':
                '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
};

let StorageKey = 'account';

export async function signInAsync() {
    let userInfoResponse    = {}
    let response            = {}
    await AppAuth.authAsync(config).then( async (authState)=>{
        // Then you can use the Google REST API
        userInfoResponse = (await axios('https://www.googleapis.com/userinfo/v2/me', {
                headers: {
                    Authorization: `Bearer ${authState.accessToken}`
                }
            })).data;
        response = {
            ...authState,
            profile: {
                ...userInfoResponse
            }
        }
        await cacheAuthAsync(response);
    }).catch((e)=>{
        console.log(e)
    })
    
    
    // console.log('signInAsync', authState);
    return response;
}

async function cacheAuthAsync(authState) {
    return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
}

export async function getCachedAuthAsync() {
    let value = await AsyncStorage.getItem(StorageKey);
    let authState = JSON.parse(value);
    // console.log('getCachedAuthAsync', authState);
    if (authState) {
        if (checkIfTokenExpired(authState)) {
            return refreshAuthAsync(authState);
        } else {
            return authState;
        }
    }
    return null;
}

function checkIfTokenExpired({
    accessTokenExpirationDate
}) {
    return new Date(accessTokenExpirationDate) < new Date();
}

async function refreshAuthAsync({ refreshToken }) {
    let authState = await AppAuth.refreshAsync(config, refreshToken);
    let userInfoResponse = (await axios('https://www.googleapis.com/userinfo/v2/me', {
            headers: {
                Authorization: `Bearer ${authState.accessToken}`
            }
        })).data;
    authState = {
        ...authState,
        profile: {
            ...userInfoResponse
        }
    }
    // console.log('refreshAuth', authState);
    await cacheAuthAsync(authState);
    return authState;
}

export async function signOutAsync({
    accessToken
}) {
    try {
        await AppAuth.revokeAsync(config, {
            token: accessToken,
            isClientIdProvided: true,
        });
        await AsyncStorage.removeItem(StorageKey);
        return null;
    } catch (e) {
        alert(`Failed to revoke token: ${e.message}`);
    }
}
