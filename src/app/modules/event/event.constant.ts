export const eventFilterableFields: string[] = [
  'searchTerm',
  'id',
  'CategoryId',
];

export const eventFieldSearchableFields: string[] = ['title', 'Vanue','price'];

export const eventRelationalFields: string[] = ['CategoryId'];
export const eventRelationalFieldsMapper: { [key: string]: string } = {
  CategoryId: 'CategoryId',
};