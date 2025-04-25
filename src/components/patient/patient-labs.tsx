import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';

const categories = [
  { id: 1, name: 'Electronics', count: 42 },
  { id: 2, name: 'Clothing', count: 36 },
  { id: 3, name: 'Home & Kitchen', count: 28 },
  { id: 4, name: 'Books', count: 53 },
  { id: 5, name: 'Sports & Outdoors', count: 19 },
  { id: 6, name: 'Beauty & Personal Care', count: 31 },
  { id: 7, name: 'Toys & Games', count: 24 },
  { id: 8, name: 'Automotive', count: 17 },
  { id: 9, name: 'Health & Household', count: 29 },
  { id: 10, name: 'Pet Supplies', count: 22 },
  { id: 11, name: 'Office Products', count: 18 },
  { id: 12, name: 'Grocery', count: 33 },
  { id: 13, name: 'Baby', count: 15 },
  { id: 14, name: 'Tools & Home Improvement', count: 26 },
  { id: 15, name: 'Garden & Outdoor', count: 21 },
  { id: 16, name: 'Industrial & Scientific', count: 14 },
  { id: 17, name: 'Arts, Crafts & Sewing', count: 19 },
  { id: 18, name: 'Musical Instruments', count: 12 }
];

// Sample data for the data grid
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 89.99,
    stock: 23
  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'Electronics',
    price: 199.99,
    stock: 15
  },
  {
    id: 3,
    name: 'Cotton T-Shirt',
    category: 'Clothing',
    price: 19.99,
    stock: 42
  },
  { id: 4, name: 'Denim Jeans', category: 'Clothing', price: 49.99, stock: 31 },
  {
    id: 5,
    name: 'Coffee Maker',
    category: 'Home & Kitchen',
    price: 79.99,
    stock: 18
  },
  {
    id: 6,
    name: 'Non-stick Pan Set',
    category: 'Home & Kitchen',
    price: 59.99,
    stock: 12
  },
  {
    id: 7,
    name: 'Science Fiction Novel',
    category: 'Books',
    price: 14.99,
    stock: 47
  },
  { id: 8, name: 'Cookbook', category: 'Books', price: 24.99, stock: 29 },
  {
    id: 9,
    name: 'Yoga Mat',
    category: 'Sports & Outdoors',
    price: 29.99,
    stock: 21
  },
  {
    id: 10,
    name: 'Tennis Racket',
    category: 'Sports & Outdoors',
    price: 89.99,
    stock: 8
  },
  {
    id: 11,
    name: 'Face Moisturizer',
    category: 'Beauty & Personal Care',
    price: 22.99,
    stock: 34
  },
  {
    id: 12,
    name: 'Electric Toothbrush',
    category: 'Beauty & Personal Care',
    price: 49.99,
    stock: 16
  },
  {
    id: 13,
    name: 'Board Game',
    category: 'Toys & Games',
    price: 34.99,
    stock: 19
  },
  {
    id: 14,
    name: 'Remote Control Car',
    category: 'Toys & Games',
    price: 44.99,
    stock: 11
  }
];

export function PatientLabs() {
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();
  return (
    <div className="fluid mx-auto">
      <div className="flex flex-col sm:flex-row flex-nowrap gap-y-4 sm:gap-4">
        <div className="w-full sm:w-[200px] flex flex-col justify-start items-center">
          <div className="sticky top-[80px] h-[calc(100dvh-200px)] w-full">
            <ScrollArea className="h-full w-full rounded-md border">
              <ul>
                <li
                  className={cn(
                    'cursor-pointer px-3 py-2 hover:bg-muted text-[12px]',
                    selectedCategory === null && 'bg-muted'
                  )}
                  onClick={() => setSelectedCategory(null)}
                >
                  All categories
                </li>
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className={cn(
                      'cursor-pointer px-3 py-2 hover:bg-muted text-[12px]',
                      selectedCategory === category.id && 'bg-muted'
                    )}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}{' '}
                    <span className="ml-1 text-muted-foreground">
                      ({category.count})
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        </div>
        <div className="flex-grow">
          <div className="gap-4">
            <h1 className="sticky">Content...</h1>
            <div className="bg-green-400 h-80 my-4"></div>
            <div className="bg-green-400 h-80 my-4"></div>
            <div className="bg-green-400 h-80 my-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
