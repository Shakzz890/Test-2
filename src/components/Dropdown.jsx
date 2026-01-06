import React from 'react';

const Dropdown = ({ value, options, onChange, footerSlot }) => {
  return (
    <div className="relative inline-block text-left">
      <select 
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="bg-neutral-800 text-white border border-neutral-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {footerSlot && <div className="mt-2">{footerSlot}</div>}
    </div>
  );
};

export default Dropdown;
