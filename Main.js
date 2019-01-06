const {Blockchain} = require("./BlockChain");
const {Transaction} = require("./Transaction");
// let savjeeCoin = new Blockchain();
// savjeeCoin.addBlock(new Block(1, "20/07/2017", { amount: 4 }));
// savjeeCoin.addBlock(new Block(2, "20/07/2017", { amount: 8 }));

// // Check if chain is valid (will return true)
// console.log('Blockchain valid? ' + savjeeCoin.isChainValid());

// // Let's now manipulate the data
// savjeeCoin.chain[1].data = { amount: 100 };

// // Check our chain again (will now return false)
// console.log("Blockchain valid? " + savjeeCoin.isChainValid());

let savjeeCoin = new Blockchain();

console.log('Creating some transactions...');
savjeeCoin.createTransaction(new Transaction('address1', 'address2', 100));
savjeeCoin.createTransaction(new Transaction('address2', 'address1', 50));
console.log('Starting the miner...');
savjeeCoin.minePendingTransactions('xaviers-address');
console.log('Balance of Xaviers address is', savjeeCoin.getBalanceOfAddress('xaviers-address'));
// Output: 0
console.log('Starting the miner again!');
savjeeCoin.minePendingTransactions("xaviers-address");

console.log('Balance of Xaviers address is', savjeeCoin.getBalanceOfAddress('xaviers-address'));
// Output: 100