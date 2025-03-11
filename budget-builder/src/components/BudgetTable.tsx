import React, { useState, useEffect } from 'react';

interface BudgetTableProps {
  initialExpenses: { [key: string]: number };
}

const BudgetTable: React.FC<BudgetTableProps> = ({ initialExpenses }) => {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [subTotal, setSubTotal] = useState<number>(0);

  useEffect(() => {
    setExpenses(initialExpenses);
  }, [initialExpenses]);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setIncome(value);
    updateSubTotal(value, expenses);
  };

  const handleExpenseChange = (category: string, value: number) => {
    setExpenses(prevExpenses => {
      const updatedExpenses = { ...prevExpenses, [category]: value };
      updateSubTotal(income, updatedExpenses);
      return updatedExpenses;
    });
  };

  const updateSubTotal = (income: number, expenses: { [key: string]: number }) => {
    const totalExpenses = Object.values(expenses).reduce((acc, curr) => acc + curr, 0);
    setSubTotal(income - totalExpenses);
  };

  const addNewExpenseRow = () => {
    setExpenses(prev => ({
      ...prev,
      [`New Expense ${Object.keys(expenses).length + 1}`]: 0
    }));
  };

  const deleteExpense = (category: string) => {
    const newExpenses = { ...expenses };
    delete newExpenses[category];
    setExpenses(newExpenses);
    updateSubTotal(income, newExpenses);
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Budget Overview</h2>
        <button onClick={addNewExpenseRow} className="btn-primary">
          + Add Expense
        </button>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">
          Total Income
          <input
            type="number"
            value={income}
            onChange={handleIncomeChange}
            className="input-field mt-1"
            placeholder="Enter your income"
          />
        </label>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="table-styles">
          <thead>
            <tr className="bg-gray-50">
              <th className="table-header">Category</th>
              <th className="table-header">Amount</th>
              <th className="table-header w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(expenses).map(([category, amount]) => (
              <tr key={category}>
                <td className="table-cell">{category}</td>
                <td className="table-cell">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => handleExpenseChange(category, parseFloat(e.target.value) || 0)}
                    className="input-field"
                  />
                </td>
                <td className="table-cell">
                  <button 
                    onClick={() => deleteExpense(category)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-right">
        <h3 className="text-2xl font-bold">
          Balance: {' '}
          <span className={`${
            subTotal >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            ${Math.abs(subTotal).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default BudgetTable;