import React from 'react';

export default function FireWait() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin mx-auto"></div>
        <h2 className="text-2xl font-semibold text-gray-700">טוען נתונים מהמערכת...</h2>
        <p className="text-gray-500">אנא המתן בזמן שנטענים הנתונים או נשמרים במסד הנתונים</p>
      </div>
    </div>
  );
}
