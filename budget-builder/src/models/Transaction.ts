// src/models/Transaction.ts

export class Transaction {
    category: string;
    amount: number;
    date: Date;

    constructor(category: string, amount: number, date: Date) {
        this.category = category;
        this.amount = amount;
        this.date = date;
    }
}