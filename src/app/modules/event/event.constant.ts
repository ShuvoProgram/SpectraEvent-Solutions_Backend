export const eventFilterableFields: string[] = [
  'searchTerm',
  'title',
  
];

export const eventFieldSearchableFields: string[] = ['title'];

export const eventRelationalFields: string[] = ['CategoryId'];
export const eventRelationalFieldsMapper: { [key: string]: string } = {
  CategoryId: 'CategoryId',
};

export type IPriceFilters = {
  maxPrice?: number;
  minPrice?: number;
};

export const PriceSearchableFields = ['maxPrice', 'minPrice'];