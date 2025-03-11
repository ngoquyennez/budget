export class Budget {
    income: number;
    expenses: number[];
    totalExpenses: number;

    constructor() {
        this.income = 0;
        this.expenses = [];
        this.totalExpenses = 0;
    }

    addExpense(amount: number) {
        this.expenses.push(amount);
        this.calculateTotalExpenses();
    }

    calculateTotalExpenses() {
        this.totalExpenses = this.expenses.reduce((acc, curr) => acc + curr, 0);
    }

    getNetIncome(): number {
        return this.income - this.totalExpenses;
    }
}