import type { User } from './UsersTable';

export const mockUsers: User[] = [
  {
    id: '1',
    organization: 'Lendsqr',
    username: 'Adedeji',
    email: 'adedeji@lendsqr.com',
    phoneNumber: '08078903721',
    dateJoined: 'May 15, 2020 10:00 AM',
    status: 'Inactive'
  },
  {
    id: '2',
    organization: 'Irorun',
    username: 'Debby Ogana',
    email: 'debby2@irorun.com',
    phoneNumber: '08160780928',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Pending'
  },
  {
    id: '3',
    organization: 'Lendstar',
    username: 'Grace Effiom',
    email: 'grace@lendstar.com',
    phoneNumber: '07060780922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Blacklisted'
  },
  {
    id: '4',
    organization: 'Lendsqr',
    username: 'Tosin Dokunmu',
    email: 'tosin@lendsqr.com',
    phoneNumber: '07003309226',
    dateJoined: 'Apr 10, 2020 10:00 AM',
    status: 'Pending'
  },
  {
    id: '5',
    organization: 'Lendstar',
    username: 'Grace Effiom',
    email: 'grace@lendstar.com',
    phoneNumber: '07060780922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Active'
  },
  {
    id: '6',
    organization: 'Lendsqr',
    username: 'Tosin Dokunmu',
    email: 'tosin@lendsqr.com',
    phoneNumber: '08060780900',
    dateJoined: 'Apr 10, 2020 10:00 AM',
    status: 'Active'
  },
  {
    id: '7',
    organization: 'Lendstar',
    username: 'Grace Effiom',
    email: 'grace@lendstar.com',
    phoneNumber: '07060780922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Blacklisted'
  },
  {
    id: '8',
    organization: 'Lendsqr',
    username: 'Tosin Dokunmu',
    email: 'tosin@lendsqr.com',
    phoneNumber: '08060780900',
    dateJoined: 'Apr 10, 2020 10:00 AM',
    status: 'Inactive'
  },
  {
    id: '9',
    organization: 'Lendstar',
    username: 'Grace Effiom',
    email: 'grace@lendstar.com',
    phoneNumber: '07060780922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Inactive'
  },
  {
    id: '10',
    organization: 'Lendsqr',
    username: 'Adebayo Johnson',
    email: 'adebayo@lendsqr.com',
    phoneNumber: '08123456789',
    dateJoined: 'Mar 15, 2020 09:30 AM',
    status: 'Active'
  },
  {
    id: '11',
    organization: 'Irorun',
    username: 'Kemi Adebayo',
    email: 'kemi@irorun.com',
    phoneNumber: '08098765432',
    dateJoined: 'Feb 20, 2020 11:15 AM',
    status: 'Pending'
  },
  {
    id: '12',
    organization: 'Lendstar',
    username: 'Femi Okafor',
    email: 'femi@lendstar.com',
    phoneNumber: '07012345678',
    dateJoined: 'Jan 10, 2020 02:45 PM',
    status: 'Blacklisted'
  },
  {
    id: '13',
    organization: 'Lendsqr',
    username: 'Chioma Nwankwo',
    email: 'chioma@lendsqr.com',
    phoneNumber: '08087654321',
    dateJoined: 'Dec 05, 2019 08:20 AM',
    status: 'Active'
  },
  {
    id: '14',
    organization: 'Irorun',
    username: 'Emeka Okonkwo',
    email: 'emeka@irorun.com',
    phoneNumber: '08156789012',
    dateJoined: 'Nov 18, 2019 04:10 PM',
    status: 'Inactive'
  },
  {
    id: '15',
    organization: 'Lendstar',
    username: 'Aisha Mohammed',
    email: 'aisha@lendstar.com',
    phoneNumber: '07098765432',
    dateJoined: 'Oct 22, 2019 01:30 PM',
    status: 'Active'
  }
];

// Generate additional users to reach 100+ for pagination testing
const additionalUsers: User[] = [];
for (let i = 16; i <= 100; i++) {
  const organizations = ['Lendsqr', 'Irorun', 'Lendstar'];
  const statuses: User['status'][] = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Lisa', 'James', 'Mary', 'Robert', 'Patricia'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const organization = organizations[Math.floor(Math.random() * organizations.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];

  additionalUsers.push({
    id: i.toString(),
    organization,
    username: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${organization.toLowerCase()}.com`,
    phoneNumber: `080${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
    dateJoined: `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][Math.floor(Math.random() * 6)]} ${Math.floor(Math.random() * 28) + 1}, 2020 ${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
    status
  });
}

export const allMockUsers = [...mockUsers, ...additionalUsers];
