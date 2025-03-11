import React, { useState } from 'react';
import BudgetTable from './components/BudgetTable';
import DateRangePicker from './components/DateRangePicker';
import ExpenseInput from './components/ExpenseInput';

const App: React.FC = () => {
  const handleDateChange = (start: Date, end: Date) => {
    setDateRange({ start, end });
  };

  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date(),
    end: new Date(),
  });

  const [expenses, setExpenses] = useState<{[key: string]: number}>({});

  const handleAddExpense = (category: string, amount: number) => {
    setExpenses(prev => ({
      ...prev,
      [category]: amount
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          💰 Budget Builder
        </h1>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="card">
            <DateRangePicker onDateChange={handleDateChange} />
          </div>
          <ExpenseInput onAddExpense={handleAddExpense} />
          <BudgetTable initialExpenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default App;