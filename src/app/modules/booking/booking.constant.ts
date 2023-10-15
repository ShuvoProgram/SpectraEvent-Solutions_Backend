export const bookingFilterableFields: string[] = [
'searchTerm',
'id',
'userId',
'eventId'
];

export const bookingFieldSearchableFields: string[] = [
  'name',
  'status',
  'user',
  'event'
]

export const bookingRelationFields: string[] = [
  'userId', 'serviceId'
]

export const bookingRelationalFieldsMapper: {[key: string]: string} = {
  userId: 'user',
  eventId: 'event'
}