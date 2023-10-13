export const eventFilterableFields: string[] = [
  'searchTerm',
  'id',
  'organizationId',
];

export const eventFieldSearchableFields: string[] = ['title', 'location','price'];

export const eventRelationalFields: string[] = ['organizationId'];
export const eventRelationalFieldsMapper: { [key: string]: string } = {
  organizationId: 'organizationId',
};