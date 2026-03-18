import ExpenseActions from "./ExpenseActions";

// // Expense Example
//  {
//             "amount": 111,
//             "collectionId": "pbc_1034379284",
//             "collectionName": "transaction",
//             "created": "2026-03-17 18:10:08.485Z",
//             "credit": false,
//             "description": "test",
//             "id": "kxpcs5brj3n3ux0",
//             "updated": "2026-03-18 07:12:23.444Z"
//         }

export default function ExpenseList({ expenses, onDelete, onEdit }) {
  if (expenses.length === 0) {
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
