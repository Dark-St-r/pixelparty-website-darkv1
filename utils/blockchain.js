
import * as nearApi from 'near-api-js';
import getConfig from './server-config';

const config = getConfig();


export async function getAnonAccount() {
    const keyStore = new nearApi.keyStores.InMemoryKeyStore();
    const near = await nearApi.connect({
        networkId: "default",
        deps: { keyStore },
        nodeUrl: config.nodeUrl,
        walletUrl: config.walletUrl,
        helperUrl: config.helperUrl
    });

    return await near.account("");
}


export async function viewFunction(contract, method, args) {
    const account = await getAnonAccount();
    return await account.viewFunction(contract, method, args);
}