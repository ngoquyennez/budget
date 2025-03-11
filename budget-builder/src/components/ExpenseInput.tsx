import React, { useState } from 'react';

const ExpenseInput: React.FC<{ onAddExpense: (category: string, amount: number) => void }> = ({ onAddExpense }) => {
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState<number | ''>('');

    const handleAddExpense = (e: React.FormEvent) => {
        e.preventDefault();
        if (category.trim() && amount && amount > 0) {
            onAddExpense(category.trim(), Number(amount));
            setCategory('');
            setAmount('');
        }
    };

    return (
        <form onSubmit={handleAddExpense} className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="expense-input">
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category"
                    required
                    className="input-category flex-1"
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Amount"
                    required
                    className="input-amount w-32"
                />
                <button type="submit" className="btn-add">
                    Add Expense
                </button>
            </div>
        </form>
    );
};

export default ExpenseInput;