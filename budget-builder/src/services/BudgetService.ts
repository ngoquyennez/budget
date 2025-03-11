export class BudgetService {
    private categories: { [key: string]: number } = {};

    addCategory(category: string, amount: number): void {
        this.categories[category] = amount;
    }

    deleteCategory(category: string): void {
        delete this.categories[category];
    }

    calculateTotalIncome(): number {
        return Object.values(this.categories).reduce((total, amount) => total + amount, 0);
    }

    calculateProfitLoss(expenses: number): number {
        return this.calculateTotalIncome() - expenses;
    }

    getCategories(): { [key: string]: number } {
        return this.categories;
    }
}