const placeholderJobs = [
  {
    title: "Software Engineer",
    type: "Full-time",
    companyName: "Tech Innovations Inc.",
    locationType: "Remote",
    location: "Global",
    applicationEmail: "jobs@techinnovations.com",
    applicationUrl: "https://www.techinnovations.com/careers",
    slug: "software-engineer-full-time-tech-innovations-inc",
    salary: 100000, // Assuming a base salary of $100,000
    approved: true,
    description:
      "We are looking for a Software Engineer to join our team. This role involves developing new features and improving existing ones.",
  },
  {
    title: "Data Analyst",
    type: "Part-time",
    companyName: "Analytics Solutions LLC",
    locationType: "Hybrid",
    location: "New York, NY",
    applicationEmail: "analytics@anlyticsolutions.com",
    applicationUrl: "https://www.anlyticsolutions.com/jobs",
    slug: "data-analyst-part-time-analytics-solutions-llc",
    salary: 80000, // Assuming a base salary of $80,000
    approved: true,
    description:
      "Join our Analytics Solutions team as a Data Analyst. You will be responsible for analyzing and interpreting complex digital data.",
  },
  {
    title: "Product Manager",
    type: "Contractual",
    companyName: "Digital Products Corp.",
    locationType: "On-site",
    location: "San Francisco, CA",
    applicationEmail: "pm@digitalproducts.com",
    applicationUrl: "https://www.digitalproducts.com/careers",
    slug: "product-manager-contractual-digital-products-corp",
    salary: 120000, // Assuming a base salary of $120,000
    approved: true,
    description:
      "We are seeking a Product Manager to lead our product development efforts. The ideal candidate has experience in tech products and understands user needs.",
  },
  {
    title: "UX Designer",
    type: "Full-time",
    companyName: "Design Studio XYZ",
    locationType: "Remote",
    location: "Anywhere",
    applicationEmail: "designs@designstudioxyz.com",
    applicationUrl: "https://www.designstudioxyz.com/freelance",
    slug: "ux-designer-freelance-design-studio-xyz",
    salary: 75000, // Assuming a base salary of $75,000
    approved: true,
    description: `
**About Design Studio**

technology company that builds economic infrastructure for the internet.

**Job Description**

UX-designer
**Key Responsibilities**

- Design, develop, test, deploy, maintain, and improve software across the stack.
- Work closely with other engineering teams to integrate and develop new features.
- Contribute to the full software development lifecycle, including requirements analysis, architecture, design, coding, testing, and deployment.
- Optimize applications for maximum speed and scalability.
- Participate in code reviews and mentor junior developers.

**Qualifications**

- Bachelor's degree in Computer Science, Engineering, or a related field, or equivalent practical experience.
- 3+ years of experience in full-stack development.
- Proficiency in one or more general-purpose programming languages including but not limited to: Ruby, Java, JavaScript, Python.
- Experience with front-end technologies such as React, Angular, or Vue.js.
- Familiarity with server-side frameworks like Ruby on Rails, Django, or Node.js.
- Knowledge of database technologies such as MySQL, PostgreSQL, and MongoDB.
- Strong understanding of web technologies and architectures.
- Excellent problem-solving skills and attention to detail.

**Benefits**

- Competitive salary and equity package.
- Health, dental, and vision insurance.
- Generous vacation and parental leave policies.
- 401(k) plan with employer match.
- Flexible work arrangements.
- Continuous learning and development opportunities.
`,
  },
  {
    title: "Marketing Specialist",
    type: "Internship",
    companyName: "Marketing Hub Ltd.",
    locationType: "On-site",
    location: "London, UK",
    applicationEmail: "marketing@markethubltd.com",
    applicationUrl: "https://www.markethubltd.com/careers",
    slug: "marketing-specialist-internship-marketing-hub-ltd",
    salary: 30000, // Assuming an internship stipend of £30,000
    approved: true,
    description:
      "Join our Marketing Hub team as a Marketing Specialist intern. You will assist in creating marketing campaigns and managing social media.",
  },
  {
    title: "Backend Developer",
    type: "Temp",
    companyName: "CodeCrafters Co.",
    locationType: "On-site",
    location: "Seattle, WA",
    applicationEmail: "backend@codecrafters.co",
    applicationUrl: "https://www.codecrafters.co/jobs",
    slug: "backend-developer-permanent-codecrafters-co",
    salary: 110000, // Assuming a base salary of $110,000
    approved: true,
    description:
      "We are hiring a Backend Developer to join our CodeCrafters team. You will be responsible for building scalable server-side applications.",
  },
];

module.exports = {
  placeholderJobs,
};
