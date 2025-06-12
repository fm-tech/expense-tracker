import ExpenseActions from "./ExpenseActions";

export default function ExpenseList({ expenses, onDelete, onEdit }) {
  if (!expenses.length) {
    return (
      <p className="text-center py-10 text-gray-500 dark:text-gray-400">
        No expenses yet.
      </p>
    );
  }
  return (
    <div className="space-y-3">
      {expenses.map((exp) => (
        <ExpenseActions
          key={exp.id}
          expense={exp}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
2;
