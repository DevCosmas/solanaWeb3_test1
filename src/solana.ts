import {
  Connection,
  Keypair,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
const senderKeyPair = Keypair.generate();
const receiverKeyPair = Keypair.generate();

async function initializeAccounts(
  connection: Connection,
  senderKeyPair: Keypair,
  receiverKeyPair: Keypair
) {
  try {
    const lamportsToInitialize = LAMPORTS_PER_SOL * 1;
    const receiverAccount = Keypair.generate();
    const transferInstruction = SystemProgram.transfer({
      fromPubkey: senderKeyPair.publicKey,
      toPubkey: receiverAccount.publicKey,
      lamports: lamportsToInitialize,
    });

    const transaction = new Transaction().add(transferInstruction);
    await sendAndConfirmTransaction(connection, transaction, [senderKeyPair]);

    console.log(
      `Initialized sender account with ${lamportsToInitialize} lamports.`
    );

    console.log(
      'Sender Balance:',
      await connection.getBalance(senderKeyPair.publicKey)
    );
    console.log(
      'Receiver Balance:',
      await connection.getBalance(receiverAccount.publicKey)
    );
  } catch (err) {
    console.log('Error:', err);
  }
}

initializeAccounts(connection, senderKeyPair, receiverKeyPair);