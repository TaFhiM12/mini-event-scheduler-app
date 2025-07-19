import type { Event } from "../types/event";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const categories: Event['category'][] = ['Work', 'Personal', 'Other'];

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          !selectedCategory 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            selectedCategory === category
              ? category === 'Work'
                ? 'bg-blue-100 text-blue-800'
                : category === 'Personal'
                ? 'bg-green-100 text-green-800'
                : 'bg-purple-100 text-purple-800'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}