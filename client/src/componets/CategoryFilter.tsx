import type { Event } from "../types/event";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const categories: Event['category'][] = ['Work', 'Personal', 'Other'];

  return (
    <div className="flex space-x-2 mb-6">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-3 py-1 rounded-full text-sm ${!selectedCategory ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-3 py-1 rounded-full text-sm ${selectedCategory === category ? 
            category === 'Work' ? 'bg-blue-100 text-blue-800' :
            category === 'Personal' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}