const initialState = {
  auth: {
    _id: '6008432b6ed92c2ac837ec6c',
    username: 'asdasd',
    email: 'asdasd@asdasd.com',
    gender: 'female',
    birthDate: '1991-01-20T00:00:00.000Z',
    address: {
      name: '5 Allée Claude Chastillon, 93290 Tremblay-en-France, France',
      type: 'Point',
      coordinates: [2.5654428, 48.955157299999996],
    },
    notifications: [
      {
        user: {
          _id: '5caf003feaca23291c0cec34',
          username: 'qweqwe',
        },
        createdAt: '2020-01-23T14:10:55.857Z',
        _id: '5e29a96f7e701b58a77dcdbb',
        messageId: 'friendLogged',
      },
      {
        user: {
          _id: '5caf003feaca23291c0cec36',
          username: 'asdasd',
        },
        createdAt: '2020-01-23T14:11:55.857Z',
        _id: '5e29a96f7e701b58a77dcdba',
        messageId: 'friendLogged',
      },
    ],
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDA4NDMyYjZlZDkyYzJhYzgzN2VjNmMiLCJpYXQiOjE2MTEyNTc1MjQsImV4cCI6MTYxMTM0MzkyNH0.suG2IyrXwsI3bOcK1jG7XpasHfwQM1Fip3YrUzX01Pc',
  },
  users: {
    filter: {
      gender: 'male',
      maxDistance: 20000,
      ageRange: [18, 50],
      sortBy: 'distance:asc',
      limit: 10,
      skip: 0,
    },
    data: [
      {
        _id: '60084a46203c4e342b13114c',
        username: 'Shanie21',
        birthDate: '1998-03-03T13:43:52.868Z',
        gender: 'male',
        address: {
          name: '247 Bert Village',
        },
        distance: 2640.691228895585,
      },
      {
        _id: '60084a46203c4e342b13113c',
        username: 'Brianne82',
        birthDate: '1990-05-11T19:00:30.586Z',
        gender: 'male',
        address: {
          name: '4860 Berenice Lodge',
        },
        distance: 2993.4424127582033,
      },
      {
        _id: '60084a46203c4e342b131140',
        username: 'Jon3',
        birthDate: '1973-05-08T21:14:45.718Z',
        gender: 'male',
        address: {
          name: '259 Fabiola Station',
        },
        distance: 6966.4502984182745,
      },
      {
        _id: '60084a46203c4e342b131139',
        username: 'Joannie_Corkery92',
        birthDate: '1998-09-22T09:23:53.485Z',
        gender: 'male',
        address: {
          name: '2431 Marisol Park',
        },
        distance: 9156.496213903085,
      },
      {
        _id: '60084a46203c4e342b13113a',
        username: 'Lilly.MacGyver',
        birthDate: '2002-05-18T07:47:56.337Z',
        gender: 'male',
        address: {
          name: '27384 Carroll Rue',
        },
        distance: 10229.485636305038,
      },
      {
        _id: '60084a46203c4e342b131143',
        username: 'Lacy_Harber23',
        birthDate: '2001-11-18T21:39:20.224Z',
        gender: 'male',
        address: {
          name: '1810 Eliseo Key',
        },
        distance: 11798.426998259116,
      },
      {
        _id: '60084a46203c4e342b131147',
        username: 'Sophie.Gorczany',
        birthDate: '1992-08-23T18:55:03.359Z',
        gender: 'male',
        address: {
          name: '149 Koch Vista',
        },
        distance: 13149.980680446492,
      },
      {
        _id: '60084a46203c4e342b131142',
        username: 'Joelle.Weissnat',
        birthDate: '1985-02-24T06:13:19.138Z',
        gender: 'male',
        address: {
          name: '74795 Howe Inlet',
        },
        distance: 16796.075505426317,
      },
    ],
    total: 8,
  },
  user: {
    _id: '60084a46203c4e342b13114c',
    username: 'Shanie21',
    birthDate: '1998-03-03T13:43:52.868Z',
    gender: 'male',
    address: {
      name: '247 Bert Village',
    },
  },
  loading: true,
  snackbar: {
    variant: 'success',
  },
};

export default initialState;
