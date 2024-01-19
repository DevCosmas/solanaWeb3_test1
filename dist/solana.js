"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const connection = new web3_js_1.Connection('https://api.devnet.solana.com', 'confirmed');
const senderKeyPair = web3_js_1.Keypair.generate();
const receiverKeyPair = web3_js_1.Keypair.generate();
async function initializeAccounts(connection, senderKeyPair, receiverKeyPair) {
    try {
        const lamportsToInitialize = web3_js_1.LAMPORTS_PER_SOL * 1;
        const receiverAccount = web3_js_1.Keypair.generate();
        const transferInstruction = web3_js_1.SystemProgram.transfer({
            fromPubkey: senderKeyPair.publicKey,
            toPubkey: receiverAccount.publicKey,
            lamports: lamportsToInitialize,
        });
        const transaction = new web3_js_1.Transaction().add(transferInstruction);
        await (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [senderKeyPair]);
        console.log(`Initialized sender account with ${lamportsToInitialize} lamports.`);
        console.log('Sender Balance:', await connection.getBalance(senderKeyPair.publicKey));
        console.log('Receiver Balance:', await connection.getBalance(receiverAccount.publicKey));
    }
    catch (err) {
        console.log('Error:', err);
    }
}
initializeAccounts(connection, senderKeyPair, receiverKeyPair);
