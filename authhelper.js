/**
 * Script to create credentials.json file for authenticating with Google Assistant
 * Requires a client_secret.json file from Google Actions Console
 * Prompts user to navigate to OAuth2 URL and paste in the authorization code
 * Outputs necessary credentials to credentials.json
 */

const { OAuth2Client } = require('google-auth-library');
const { writeFileSync } = require('fs');
const secret = require('./client_secret.json');
const readlineSync = require('readline-sync');

//Create a new OAuth client using client secret
const oAuth2Client = new OAuth2Client(
    secret.installed.client_id,
    secret.installed.client_secret,
    'urn:ietf:wg:oauth:2.0:oob'
);

//Get authorization code by displaying OAuth URL and prompting user
function getAuthCode(oAuth2Client) {
    //Get OAuth URL from Google
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/assistant-sdk-prototype'
    });
    console.log(`Open the following URL: ${authUrl}`);
    const code = readlineSync.question("Paste in the Auth Code: ");
    return code;
}

//Get refresh token
async function getRefreshToken(oAuth2Client) {
    //Needs authorization code first
    const authCode = getAuthCode(oAuth2Client);
    const {tokens} = await oAuth2Client.getToken(authCode);
    return tokens.refresh_token;
};

//Get credentials and save to credentials.json
async function getCredentials(oAuth2Client) {
    //Get refresh token
    const refresh_token = await getRefreshToken(oAuth2Client);

    //Create and save credentials
    const credentials = {
        type: 'authorized_user',
        client_id: secret.installed.client_id,
        client_secret: secret.installed.client_secret,
        refresh_token: refresh_token
    };
    writeFileSync('./credentials.json', JSON.stringify(credentials));
}

//Get credentials then exit
getCredentials(oAuth2Client).then(() => {
    process.exit(0)
});
