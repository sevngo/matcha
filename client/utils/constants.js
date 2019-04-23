export const genders = [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }];

export const interestsOptions = [
  'PHP',
  'Javascript',
  'Python',
  'Flask',
  'C',
  'C++',
  'Golang',
  'React',
  'Node',
  'Express',
  'MongoDB',
  'Vue',
  'Angular',
  'MySQL',
  'PostgreSQL',
  'Ruby',
  'Sinatra',
  'Scala',
  'Scalatra',
  'Slim',
  'Rust',
  'Java',
  'Crow',
];

export const sortByOptions = [
  { label: 'Age (Younger)', value: 'birthDate:desc' },
  { label: 'Age (Older)', value: 'birthDate:asc' },
  { label: 'Popularity (Famous)', value: 'popularity:desc' },
  { label: 'Popularity (Inconspicuous)', value: 'popularity:asc' },
  { label: 'Distance (Nearest)', value: 'distance:asc' },
  { label: 'Distance (Farest)', value: 'distance:desc' },
];

export const filter = {
  gender: 'male',
  interests: [],
  ageRange: [0, 50],
};
