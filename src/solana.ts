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

async function sendAndReceiveProgram(
  connection: Connection,
  senderKeyPair: Keypair,
  receiverKeyPair: Keypair
) {
  try {
    const lamportsToTransfer = LAMPORTS_PER_SOL * 1;
    const receiverAccount = Keypair.generate();
    const transferInstruction = SystemProgram.transfer({
      fromPubkey: senderKeyPair.publicKey,
      toPubkey: receiverAccount.publicKey,
      lamports: lamportsToTransfer,
    });

    const transaction = new Transaction().add(transferInstruction);
    await sendAndConfirmTransaction(connection, transaction, [senderKeyPair]);

    console.log(
      ` An amount of ${lamportsToTransfer} lamports has been sent to ${receiverAccount}`
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

sendAndReceiveProgram(connection, senderKeyPair, receiverKeyPair);
