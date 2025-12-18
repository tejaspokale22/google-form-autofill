const FIELD_KEYWORDS = {
  email: ["email"],
  prn: ["prn", "university prn"],
  fullName: [
    "full name",
    "candidate name",
    "student name",
    "name of the student",
    "name of the candidate",
  ],
  mobile: ["mobile", "phone", "contact number", "10 digits"],
  dob: ["date of birth", "dob", "birth"],
  gender: ["gender"],

  degree: ["degree", "course"],
  branch: ["specialization", "branch", "stream"],
  college: ["college", "college name", "institute"],

  tenthPercent: ["10th", "ssc", "class 10", "10th %"],
  twelthPercent: ["12th", "hsc", "12th %"],
  diplomaPercent: ["diploma %", "diploma"],
  degreePercent: ["be%", "btech%", "degree %", "be b tech"],

  passYear: ["year of graduation", "passing year", "passout"],

  cocubesScore: ["cocubes"],

  codechefRating: [
    "codechef rating",
    "codechef rank",
    "codechef stars",
    "code chef rating",
  ],

  codechefLink: [
    "codechef profile",
    "codechef profile link",
    "codechef url",
    "code chef profile",
    "link of codechef rating",
    "link of code chef rating",
  ],

  hackerrankRating: [
    "hackerrank rating",
    "hackerrank score",
    "hackerrank stars",
    "hacker rank rating",
  ],

  hackerrankLink: [
    "hackerrank profile",
    "hackerrank profile link",
    "hackerrank url",
    "hacker rank profile",
    "link of hackerrank rating",
    "link of hacker rank rating",
  ],

  leetcodeScore: [
    "leetcode score",
    "leetcode rating",
    "leetcode problems solved",
    "leetcode solved",
  ],

  leetcodeLink: [
    "leetcode profile",
    "leetcode profile link",
    "leetcode url",
    "leet code profile",
    "link of leetcode score",
    "link of leet code score",
  ],

  hackerearthRating: [
    "hackerearth rating",
    "hackerearth score",
    "hacker earth rating",
  ],

  hackerearthLink: [
    "hackerearth profile",
    "hackerearth profile link",
    "hackerearth url",
    "hacker earth profile",
    "link of hackerearth rating",
    "link of hacker earth rating",
  ],

  githubLink: ["github"],
  linkedinLink: ["linkedin"],

  hasTechnicalCourse: [
    "technical courses",
    "technical course",
    "certifications",
    "course certification",
  ],

  technicalCoursePlatform: [
    "from which agency",
    "platform you have done",
    "course platform",
    "certification platform",
    "udemy",
    "coursera",
  ],

  technicalCourseDuration: [
    "duration of the course",
    "course duration",
    "duration in hours",
    "hours",
  ],

  cgpa: ["cgpa", "current cgpa", "aggregate cgpa", "c g p a"],

  activeBacklogs: [
    "active backlogs",
    "current backlogs",
    "number of backlogs",
    "backlogs",
    "live backlogs",
  ],

  yearDown: ["year down", "gap year"],

  techAchievements: ["technical achievements"],
  personalAchievements: ["personal achievements"],
  projects: ["project"],
};

function normalize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getProfileKey(label) {
  const text = normalize(label);
  console.log("Normalized text:", text);

  let bestMatch = null;
  let longestMatchLength = 0;

  for (const [key, keywords] of Object.entries(FIELD_KEYWORDS)) {
    for (const keyword of keywords) {
      const normalizedKeyword = normalize(keyword);
      if (
        text.includes(normalizedKeyword) &&
        normalizedKeyword.length > longestMatchLength
      ) {
        bestMatch = key;
        longestMatchLength = normalizedKeyword.length;
        console.log(
          `New best match: "${key}" with keyword "${keyword}" (normalized: "${normalizedKeyword}", length: ${normalizedKeyword.length})`
        );
      }
    }
  }

  return bestMatch;
}

const result = getProfileKey("Course");
console.log("Result:", result);
