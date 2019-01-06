const {Block} = require("./Block");
const {Transaction} = require("./Transaction");
class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
        this.pendingTransactions=[];
        this.miningReward = 100;
    }

    // createTransaction(transaction) {
    //     // There should be some validation here!
    
    //     // Push into onto the "pendingTransactions" array
    //     this.pendingTransactions.push(transaction);
    // }
    addTransaction(transaction){
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('Transaction must include from and to address');
        }
    
        if(!transaction.isValid()){
            throw new Error('Cannot add invalid transaction to chain');
        }
    
        this.pendingTransactions.push(transaction);
    }
    

    createGenesisBlock() {
        return new Block(0, "01/01/2017", [], "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        // Create new block with all pending transactions and mine it..
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
    
        // Add the newly mined block to the chain
        this.chain.push(block);
    
        // Reset the pending transactions and send the mining reward
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

            if (!currentBlock.hasValidTransactions()) {
                return false;
            }
        }
        return true;
    }

    getBalanceOfAddress(address){
        let balance = 0; // you start at zero!
    
        // Loop over each block and each transaction inside the block
        for(const block of this.chain){
            for(const trans of block.transactions){
    
                // If the given address is the sender -> reduce the balance
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }
    
                // If the given address is the receiver -> increase the balance
                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
    
        return balance;
    }
}
module.exports = {
    Blockchain,
}