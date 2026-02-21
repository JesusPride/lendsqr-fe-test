import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sample data arrays
const firstNames = [
  "Adedeji",
  "Grace",
  "Debby",
  "Tosin",
  "Kemi",
  "Tunde",
  "Folake",
  "Seun",
  "Bola",
  "Yemi",
  "Funmi",
  "Dayo",
  "Tayo",
  "Sola",
  "Wale",
  "Kola",
  "Femi",
  "Tola",
  "Gbenga",
  "Lanre",
  "Bukola",
  "Shade",
  "Ronke",
  "Bisi",
  "Titi",
  "Lola",
  "Nike",
  "Joke",
  "Sade",
  "Remi",
  "Kunle",
  "Dele",
  "Jide",
  "Ola",
  "Mide",
  "Kemi",
  "Tope",
  "Dupe",
  "Yinka",
  "Biodun",
  "Adebayo",
  "Adunni",
  "Aduke",
  "Adebisi",
  "Adeyemi",
  "Adeyinka",
  "Adeola",
  "Adebola",
];

const lastNames = [
  "Adebayo",
  "Ogana",
  "Effiom",
  "Dokunmu",
  "Okafor",
  "Emeka",
  "Chukwu",
  "Okoro",
  "Nwankwo",
  "Okonkwo",
  "Adeyemi",
  "Adebola",
  "Adeyinka",
  "Adeola",
  "Adebisi",
  "Adunni",
  "Aduke",
  "Adeleke",
  "Adeniyi",
  "Adekunle",
  "Babatunde",
  "Oluwaseun",
  "Olumide",
  "Oluwakemi",
  "Oluwafemi",
  "Oluwatope",
  "Oluwadamilola",
  "Oluwaseyi",
  "Ibrahim",
  "Mohammed",
  "Abdullahi",
  "Usman",
  "Aliyu",
  "Musa",
  "Sani",
  "Garba",
  "Bello",
  "Yakubu",
];

const organizations = [
  "Lendsqr",
  "Irorun",
  "Lendstar",
  "Paystack",
  "Flutterwave",
  "Kuda",
  "PiggyVest",
  "Cowrywise",
];
const statuses = ["Active", "Inactive", "Pending", "Blacklisted"];
const genders = ["Male", "Female"];
const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
const childrenOptions = ["None", "1", "2", "3", "4", "5+"];
const residenceTypes = [
  "Parent's Apartment",
  "Own Apartment",
  "Rented Apartment",
  "Own House",
  "Rented House",
];
const educationLevels = ["SSCE", "OND", "HND", "B.Sc", "M.Sc", "PhD"];
const employmentStatuses = [
  "Employed",
  "Unemployed",
  "Self-employed",
  "Student",
];
const sectors = [
  "FinTech",
  "Healthcare",
  "Education",
  "Technology",
  "Banking",
  "Agriculture",
  "Manufacturing",
  "Retail",
];
const relationships = [
  "Sister",
  "Brother",
  "Friend",
  "Colleague",
  "Cousin",
  "Uncle",
  "Aunt",
  "Parent",
];

// Helper functions
const getRandomItem = (array) =>
  array[Math.floor(Math.random() * array.length)];
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const generatePhoneNumber = () => `080${getRandomNumber(10000000, 99999999)}`;
const generateBVN = () => `${getRandomNumber(10000000000, 99999999999)}`;

const generateMonthlyIncome = () => {
  const ranges = [
    "₦50,000.00 - ₦100,000.00",
    "₦100,000.00 - ₦200,000.00",
    "₦200,000.00 - ₦400,000.00",
    "₦400,000.00 - ₦600,000.00",
    "₦600,000.00 - ₦800,000.00",
    "₦800,000.00 - ₦1,000,000.00",
  ];
  return getRandomItem(ranges);
};

const generateLoanRepayment = () => {
  const amounts = [
    "₦20,000",
    "₦30,000",
    "₦40,000",
    "₦50,000",
    "₦60,000",
    "₦70,000",
    "₦80,000",
    "₦100,000",
  ];
  return getRandomItem(amounts);
};

const generateDateJoined = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const years = [2019, 2020, 2021, 2022, 2023, 2024];
  const month = getRandomItem(months);
  const day = getRandomNumber(1, 28);
  const year = getRandomItem(years);
  const hour = getRandomNumber(1, 12);
  const minute = getRandomNumber(10, 59);
  const ampm = getRandomItem(["AM", "PM"]);

  return `${month} ${day}, ${year} ${hour}:${minute} ${ampm}`;
};

const generateUser = (id) => {
  const firstName = getRandomItem(firstNames);
  const lastName = getRandomItem(lastNames);
  const fullName = `${firstName} ${lastName}`;
  const organization = getRandomItem(organizations);
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${organization.toLowerCase()}.com`;
  const phoneNumber = generatePhoneNumber();
  const bvn = generateBVN();
  const gender = getRandomItem(genders);
  const maritalStatus = getRandomItem(maritalStatuses);
  const children = getRandomItem(childrenOptions);
  const typeOfResidence = getRandomItem(residenceTypes);
  const levelOfEducation = getRandomItem(educationLevels);
  const employmentStatus = getRandomItem(employmentStatuses);
  const sectorOfEmployment =
    employmentStatus === "Unemployed" ? "N/A" : getRandomItem(sectors);
  const durationOfEmployment =
    employmentStatus === "Unemployed"
      ? "N/A"
      : `${getRandomNumber(1, 10)} years`;
  const officeEmail = employmentStatus === "Unemployed" ? "N/A" : email;
  const monthlyIncome = generateMonthlyIncome();
  const loanRepayment = generateLoanRepayment();
  const status = getRandomItem(statuses);

  // Generate guarantor
  const guarantorFirstName = getRandomItem(firstNames);
  const guarantorLastName = getRandomItem(lastNames);
  const guarantorFullName = `${guarantorFirstName} ${guarantorLastName}`;
  const guarantorPhone = generatePhoneNumber();
  const guarantorEmail = `${guarantorFirstName.toLowerCase()}@gmail.com`;
  const relationship = getRandomItem(relationships);

  return {
    id: id.toString(),
    organization,
    username: fullName,
    email,
    phoneNumber,
    dateJoined: generateDateJoined(),
    status,
    personalInfo: {
      fullName,
      bvn,
      gender,
      maritalStatus,
      children,
      typeOfResidence,
    },
    educationAndEmployment: {
      levelOfEducation,
      employmentStatus,
      sectorOfEmployment,
      durationOfEmployment,
      officeEmail,
      monthlyIncome,
      loanRepayment,
    },
    socials: {
      twitter: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
      facebook: fullName,
      instagram: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
    },
    guarantor: {
      fullName: guarantorFullName,
      phoneNumber: guarantorPhone,
      email: guarantorEmail,
      relationship,
    },
  };
};

// Generate 500 users
const users = [];
for (let i = 1; i <= 500; i++) {
  users.push(generateUser(i));
}

const mockData = {
  users,
  stats: {
    totalUsers: 500,
    activeUsers: users.filter((u) => u.status === "Active").length,
    usersWithLoans: users.filter(
      (u) => u.educationAndEmployment.loanRepayment !== "₦0"
    ).length,
    usersWithSavings: Math.floor(users.length * 0.7), // Assume 70% have savings
  },
};

// Write to file
const outputPath = path.join(__dirname, "mockUsers.json");
fs.writeFileSync(outputPath, JSON.stringify(mockData, null, 2));

console.log(`Generated ${users.length} users and saved to ${outputPath}`);
console.log(`Stats: ${JSON.stringify(mockData.stats, null, 2)}`);
