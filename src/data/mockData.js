// ============================================================
// InternBridge — Central Demo Data Store
// All portals read from and write to this module.
// This is SIMULATED data for prototype demonstration only.
// ============================================================

// ---------- Users ----------
export const users = [
  // Company users
  {
    id: 'u1', role: 'company', name: 'Priya Mehta', email: 'priya@techsolutions.in',
    avatar: 'PM', company: 'c1', title: 'HR Manager', phone: '+91 98765 43210',
    status: 'active', joinedAt: '2024-01-15',
  },
  {
    id: 'u2', role: 'company', name: 'Arjun Shah', email: 'arjun@analyticsai.in',
    avatar: 'AS', company: 'c2', title: 'Talent Acquisition Lead', phone: '+91 98123 45678',
    status: 'active', joinedAt: '2024-03-10',
  },
  // Supervisors
  {
    id: 'u3', role: 'supervisor', name: 'Rahul Desai', email: 'rahul@techsolutions.in',
    avatar: 'RD', company: 'c1', title: 'Senior Software Engineer', phone: '+91 97654 32109',
    status: 'active', joinedAt: '2024-02-01',
  },
  {
    id: 'u4', role: 'supervisor', name: 'Sneha Kulkarni', email: 'sneha@devnova.in',
    avatar: 'SK', company: 'c3', title: 'Tech Lead', phone: '+91 96543 21098',
    status: 'active', joinedAt: '2024-04-05',
  },
  {
    id: 'u5', role: 'supervisor', name: 'Vikram Joshi', email: 'vikram@analyticsai.in',
    avatar: 'VJ', company: 'c2', title: 'Data Science Manager', phone: '+91 95432 10987',
    status: 'active', joinedAt: '2024-01-20',
  },
  // College Guides
  {
    id: 'u6', role: 'guide', name: 'Prof. Anjali Patil', email: 'anjali.patil@college.edu',
    avatar: 'AP', department: 'Information Technology', title: 'Assistant Professor',
    status: 'active', joinedAt: '2023-08-01',
  },
  {
    id: 'u7', role: 'guide', name: 'Prof. Suresh Nair', email: 'suresh.nair@college.edu',
    avatar: 'SN', department: 'Computer Science', title: 'Associate Professor',
    status: 'active', joinedAt: '2023-08-01',
  },
  {
    id: 'u8', role: 'guide', name: 'Prof. Meera Iyer', email: 'meera.iyer@college.edu',
    avatar: 'MI', department: 'Electronics', title: 'Assistant Professor',
    status: 'inactive', joinedAt: '2023-09-15',
  },
  // College Admins
  {
    id: 'u9', role: 'admin', name: 'Dr. Ramesh Kadam', email: 'admin@college.edu',
    avatar: 'RK', title: 'Training & Placement Officer', status: 'active', joinedAt: '2022-06-01',
  },
];

// ---------- Companies ----------
export const companies = [
  {
    id: 'c1', name: 'TechSolutions', domain: 'Web Development / Full Stack',
    location: 'Nashik', website: 'techsolutions.in',
    contact: 'Priya Mehta', contactEmail: 'priya@techsolutions.in',
    status: 'active', registeredAt: '2024-01-15',
    description: 'Leading software development company specialising in enterprise web applications.',
  },
  {
    id: 'c2', name: 'Analytics AI Corp', domain: 'Data Analytics / Machine Learning',
    location: 'Pune', website: 'analyticsai.in',
    contact: 'Arjun Shah', contactEmail: 'arjun@analyticsai.in',
    status: 'active', registeredAt: '2024-03-10',
    description: 'AI-driven analytics solutions for business intelligence and forecasting.',
  },
  {
    id: 'c3', name: 'DevNova Technologies', domain: 'Backend Development',
    location: 'Mumbai', website: 'devnova.in',
    contact: 'Sneha Kulkarni', contactEmail: 'sneha@devnova.in',
    status: 'active', registeredAt: '2024-02-20',
    description: 'Cloud-native backend services and microservices architecture specialists.',
  },
  {
    id: 'c4', name: 'ByteCraft Systems', domain: 'Mobile / Cross-platform',
    location: 'Pune', website: 'bytecraft.in',
    contact: 'Nitin Verma', contactEmail: 'nitin@bytecraft.in',
    status: 'active', registeredAt: '2024-05-01',
    description: 'Cross-platform mobile and IoT product development studio.',
  },
];

// ---------- Internship Postings ----------
export const internships = [
  {
    id: 'i1', companyId: 'c1', title: 'Frontend Web Developer Intern',
    role: 'Frontend Developer', domain: 'Web Development',
    description: 'Work on React-based enterprise dashboards and component libraries. Collaborate with senior engineers on UI architecture.',
    vacancies: 3, location: 'Nashik', workMode: 'Hybrid',
    stipend: 12000, duration: '3 months', startDate: '2025-02-01', deadline: '2025-01-15',
    requiredSkills: ['React', 'JavaScript', 'HTML/CSS', 'Git'],
    preferredSkills: ['TypeScript', 'Redux', 'Tailwind CSS'],
    eligibility: 'BE/BTech – IT, CS, or related', minQualification: 'Third Year or Final Year',
    status: 'published', applications: 24, postedAt: '2024-11-20',
    assessmentRequired: true, assessmentId: 'a1',
  },
  {
    id: 'i2', companyId: 'c1', title: 'Full Stack Developer Intern',
    role: 'Full Stack Developer', domain: 'Full Stack Development',
    description: 'End-to-end development using React and Node.js. Build RESTful APIs and integrate with databases.',
    vacancies: 2, location: 'Nashik', workMode: 'Onsite',
    stipend: 15000, duration: '6 months', startDate: '2025-01-15', deadline: '2025-01-05',
    requiredSkills: ['React', 'Node.js', 'SQL', 'Git', 'REST APIs'],
    preferredSkills: ['Docker', 'MongoDB', 'AWS Basics'],
    eligibility: 'BE/BTech – IT or CS', minQualification: 'Final Year',
    status: 'published', applications: 18, postedAt: '2024-11-10',
    assessmentRequired: true, assessmentId: 'a2',
  },
  {
    id: 'i3', companyId: 'c2', title: 'Data Analytics Intern',
    role: 'Data Analyst', domain: 'Data Analytics',
    description: 'Analyse large datasets, build dashboards, and support business intelligence reporting.',
    vacancies: 2, location: 'Pune', workMode: 'Remote',
    stipend: 10000, duration: '3 months', startDate: '2025-02-15', deadline: '2025-01-20',
    requiredSkills: ['Python', 'Pandas', 'SQL', 'Power BI'],
    preferredSkills: ['Tableau', 'Excel', 'Statistics'],
    eligibility: 'BE/BTech or BSc – IT, CS, Statistics, or related', minQualification: 'Second Year or above',
    status: 'published', applications: 31, postedAt: '2024-11-05',
    assessmentRequired: true, assessmentId: 'a3',
  },
  {
    id: 'i4', companyId: 'c2', title: 'Machine Learning Intern',
    role: 'ML Engineer', domain: 'Machine Learning',
    description: 'Assist ML engineers in model development, training pipelines, and evaluation.',
    vacancies: 1, location: 'Pune', workMode: 'Hybrid',
    stipend: 18000, duration: '6 months', startDate: '2025-03-01', deadline: '2025-02-01',
    requiredSkills: ['Python', 'Scikit-learn', 'TensorFlow', 'SQL'],
    preferredSkills: ['NLP', 'Deep Learning', 'MLflow'],
    eligibility: 'BE/BTech – IT, CS, or AI/ML specialisation', minQualification: 'Final Year',
    status: 'published', applications: 15, postedAt: '2024-12-01',
    assessmentRequired: true, assessmentId: 'a4',
  },
  {
    id: 'i5', companyId: 'c3', title: 'Backend Developer Intern',
    role: 'Backend Developer', domain: 'Backend Development',
    description: 'Develop and maintain Node.js microservices. Work with cloud infrastructure on AWS.',
    vacancies: 2, location: 'Mumbai', workMode: 'Onsite',
    stipend: 14000, duration: '4 months', startDate: '2025-01-20', deadline: '2025-01-10',
    requiredSkills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    preferredSkills: ['Docker', 'Kubernetes', 'Redis'],
    eligibility: 'BE/BTech – IT or CS', minQualification: 'Final Year',
    status: 'published', applications: 12, postedAt: '2024-11-25',
    assessmentRequired: true, assessmentId: 'a5',
  },
  {
    id: 'i6', companyId: 'c1', title: 'UI/UX Design Intern',
    role: 'UI/UX Designer', domain: 'Design',
    description: 'Design user interfaces and conduct usability testing for enterprise products.',
    vacancies: 1, location: 'Nashik', workMode: 'Remote',
    stipend: 8000, duration: '3 months', startDate: null, deadline: '2025-02-28',
    requiredSkills: ['Figma', 'UI Design', 'Prototyping'],
    preferredSkills: ['Adobe XD', 'User Research', 'CSS'],
    eligibility: 'BE/BTech or BDes', minQualification: 'Any Year',
    status: 'draft', applications: 0, postedAt: '2024-12-10',
    assessmentRequired: false, assessmentId: null,
  },
  {
    id: 'i7', companyId: 'c4', title: 'Flutter Developer Intern',
    role: 'Mobile Developer', domain: 'Mobile Development',
    description: 'Build cross-platform mobile features using Flutter and Dart.',
    vacancies: 2, location: 'Remote', workMode: 'Remote',
    stipend: 10000, duration: '3 months', startDate: '2024-09-01', deadline: '2024-08-20',
    requiredSkills: ['Flutter', 'Dart', 'REST APIs'],
    preferredSkills: ['Firebase', 'State Management'],
    eligibility: 'BE/BTech – IT or CS', minQualification: 'Any Year',
    status: 'closed', applications: 28, postedAt: '2024-07-15',
    assessmentRequired: false, assessmentId: null,
  },
];

// ---------- Students ----------
export const students = [
  {
    id: 's1', name: 'Aditya Sharma', rollNo: 'IT2021001', program: 'BE Information Technology',
    department: 'IT', college: 'Government College of Engineering, Nashik',
    year: 4, cgpa: 8.4, email: 'aditya.sharma@student.edu', phone: '+91 98765 11111',
    skills: ['React', 'Node.js', 'JavaScript', 'HTML/CSS', 'Git'],
    certifications: ['AWS Cloud Practitioner', 'Meta Front-End Developer Certificate'],
    projects: [
      { name: 'E-Commerce Platform', tech: 'React, Node.js, MongoDB', desc: 'Full-stack e-commerce with payment integration.' },
      { name: 'Task Manager App', tech: 'React, Firebase', desc: 'Real-time task management with collaboration features.' },
    ],
    github: 'github.com/aditya-sharma',
    leetcode: 'leetcode.com/aditya_sharma',
    resumeUrl: '#',
  },
  {
    id: 's2', name: 'Priyanka Joshi', rollNo: 'IT2021002', program: 'BE Information Technology',
    department: 'IT', college: 'Government College of Engineering, Nashik',
    year: 4, cgpa: 7.9, email: 'priyanka.joshi@student.edu', phone: '+91 98765 22222',
    skills: ['Python', 'SQL', 'Pandas', 'Power BI', 'Excel'],
    certifications: ['Google Data Analytics Certificate'],
    projects: [
      { name: 'Sales Analytics Dashboard', tech: 'Python, Power BI, SQL', desc: 'Real-time sales dashboard for regional analysis.' },
    ],
    github: 'github.com/priyanka-joshi',
    leetcode: null,
    resumeUrl: '#',
  },
  {
    id: 's3', name: 'Rohan Patil', rollNo: 'CS2021005', program: 'BE Computer Science',
    department: 'CS', college: 'Government College of Engineering, Nashik',
    year: 4, cgpa: 8.8, email: 'rohan.patil@student.edu', phone: '+91 98765 33333',
    skills: ['Python', 'TensorFlow', 'Scikit-learn', 'SQL', 'Pandas', 'NLP'],
    certifications: ['DeepLearning.AI TensorFlow Developer', 'Kaggle ML Intermediate'],
    projects: [
      { name: 'Sentiment Analysis Engine', tech: 'Python, BERT, Flask', desc: 'NLP-based review sentiment classifier.' },
      { name: 'Image Classification Model', tech: 'TensorFlow, CNN', desc: 'Medical image classification with 94% accuracy.' },
    ],
    github: 'github.com/rohan-patil',
    leetcode: 'leetcode.com/rohan_patil',
    resumeUrl: '#',
  },
  {
    id: 's4', name: 'Sonal Desai', rollNo: 'IT2021010', program: 'BE Information Technology',
    department: 'IT', college: 'Government College of Engineering, Nashik',
    year: 4, cgpa: 7.5, email: 'sonal.desai@student.edu', phone: '+91 98765 44444',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'REST APIs'],
    certifications: ['MongoDB Developer Certification'],
    projects: [
      { name: 'Library Management API', tech: 'Node.js, Express, MongoDB', desc: 'RESTful API for library with JWT auth.' },
    ],
    github: 'github.com/sonal-desai',
    leetcode: null,
    resumeUrl: '#',
  },
  {
    id: 's5', name: 'Karan Mehta', rollNo: 'CS2021012', program: 'BE Computer Science',
    department: 'CS', college: 'Government College of Engineering, Nashik',
    year: 4, cgpa: 9.1, email: 'karan.mehta@student.edu', phone: '+91 98765 55555',
    skills: ['React', 'Node.js', 'SQL', 'Python', 'Git', 'Docker'],
    certifications: ['Full Stack Web Development – Coursera', 'Docker Certified Associate'],
    projects: [
      { name: 'HR Management System', tech: 'React, Node.js, PostgreSQL', desc: 'Enterprise HR tool with payroll and attendance.' },
      { name: 'Chat Application', tech: 'React, Socket.io, Node.js', desc: 'Real-time chat with rooms and notifications.' },
    ],
    github: 'github.com/karan-mehta',
    leetcode: 'leetcode.com/karan_mehta',
    resumeUrl: '#',
  },
  {
    id: 's6', name: 'Tanvi Nair', rollNo: 'IT2022001', program: 'BE Information Technology',
    department: 'IT', college: 'Government College of Engineering, Nashik',
    year: 3, cgpa: 8.0, email: 'tanvi.nair@student.edu', phone: '+91 98765 66666',
    skills: ['Python', 'SQL', 'Pandas', 'Machine Learning Basics'],
    certifications: ['IBM Data Science Professional Certificate'],
    projects: [
      { name: 'Movie Recommendation System', tech: 'Python, Scikit-learn', desc: 'Collaborative filtering-based movie recommender.' },
    ],
    github: 'github.com/tanvi-nair',
    leetcode: null,
    resumeUrl: '#',
  },
];

// ---------- Applications ----------
export const applications = [
  {
    id: 'app1', studentId: 's1', internshipId: 'i2', companyId: 'c1',
    appliedAt: '2024-11-12', status: 'selected',
    compatibilityScore: 92, matchedSkills: ['React', 'Node.js', 'Git'],
    skillGaps: ['SQL', 'Docker'],
    assessmentId: 'a2', assessmentScore: 88, assessmentStatus: 'passed',
    recruiterNotes: 'Strong React profile. Good project experience. SQL knowledge should be checked on job.',
    timeline: [
      { event: 'Application Submitted', date: '2024-11-12', actor: 'Student' },
      { event: 'Application Reviewed', date: '2024-11-15', actor: 'HR' },
      { event: 'Assessment Assigned', date: '2024-11-16', actor: 'System' },
      { event: 'Assessment Completed', date: '2024-11-18', actor: 'Student' },
      { event: 'Shortlisted', date: '2024-11-20', actor: 'HR' },
      { event: 'Selected', date: '2024-11-25', actor: 'HR' },
    ],
  },
  {
    id: 'app2', studentId: 's5', internshipId: 'i2', companyId: 'c1',
    appliedAt: '2024-11-14', status: 'shortlisted',
    compatibilityScore: 96, matchedSkills: ['React', 'Node.js', 'SQL', 'Git'],
    skillGaps: [],
    assessmentId: 'a2', assessmentScore: 94, assessmentStatus: 'passed',
    recruiterNotes: 'Excellent profile. All required skills demonstrated in projects.',
    timeline: [
      { event: 'Application Submitted', date: '2024-11-14', actor: 'Student' },
      { event: 'Application Reviewed', date: '2024-11-17', actor: 'HR' },
      { event: 'Assessment Assigned', date: '2024-11-18', actor: 'System' },
      { event: 'Assessment Completed', date: '2024-11-20', actor: 'Student' },
      { event: 'Shortlisted', date: '2024-11-22', actor: 'HR' },
    ],
  },
  {
    id: 'app3', studentId: 's2', internshipId: 'i3', companyId: 'c2',
    appliedAt: '2024-11-08', status: 'under_review',
    compatibilityScore: 85, matchedSkills: ['Python', 'SQL', 'Pandas', 'Power BI'],
    skillGaps: ['Tableau'],
    assessmentId: 'a3', assessmentScore: 78, assessmentStatus: 'passed',
    recruiterNotes: '',
    timeline: [
      { event: 'Application Submitted', date: '2024-11-08', actor: 'Student' },
      { event: 'Application Reviewed', date: '2024-11-12', actor: 'HR' },
      { event: 'Assessment Assigned', date: '2024-11-13', actor: 'System' },
      { event: 'Assessment Completed', date: '2024-11-15', actor: 'Student' },
    ],
  },
  {
    id: 'app4', studentId: 's3', internshipId: 'i4', companyId: 'c2',
    appliedAt: '2024-12-03', status: 'shortlisted',
    compatibilityScore: 91, matchedSkills: ['Python', 'TensorFlow', 'Scikit-learn', 'SQL'],
    skillGaps: ['MLflow'],
    assessmentId: 'a4', assessmentScore: 90, assessmentStatus: 'passed',
    recruiterNotes: 'Strong ML background. Impressive NLP project.',
    timeline: [
      { event: 'Application Submitted', date: '2024-12-03', actor: 'Student' },
      { event: 'Application Reviewed', date: '2024-12-05', actor: 'HR' },
      { event: 'Shortlisted', date: '2024-12-08', actor: 'HR' },
    ],
  },
  {
    id: 'app5', studentId: 's4', internshipId: 'i5', companyId: 'c3',
    appliedAt: '2024-11-27', status: 'selected',
    compatibilityScore: 88, matchedSkills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    skillGaps: ['Docker', 'Kubernetes'],
    assessmentId: 'a5', assessmentScore: 82, assessmentStatus: 'passed',
    recruiterNotes: 'Good backend fundamentals. Docker to be learned on the job.',
    timeline: [
      { event: 'Application Submitted', date: '2024-11-27', actor: 'Student' },
      { event: 'Application Reviewed', date: '2024-11-29', actor: 'HR' },
      { event: 'Shortlisted', date: '2024-12-01', actor: 'HR' },
      { event: 'Selected', date: '2024-12-05', actor: 'HR' },
    ],
  },
  {
    id: 'app6', studentId: 's6', internshipId: 'i3', companyId: 'c2',
    appliedAt: '2024-11-09', status: 'new',
    compatibilityScore: 72, matchedSkills: ['Python', 'SQL', 'Pandas'],
    skillGaps: ['Power BI', 'Tableau'],
    assessmentId: 'a3', assessmentScore: null, assessmentStatus: 'pending',
    recruiterNotes: '',
    timeline: [
      { event: 'Application Submitted', date: '2024-11-09', actor: 'Student' },
    ],
  },
  {
    id: 'app7', studentId: 's1', internshipId: 'i1', companyId: 'c1',
    appliedAt: '2024-11-22', status: 'rejected',
    compatibilityScore: 84, matchedSkills: ['React', 'JavaScript', 'HTML/CSS', 'Git'],
    skillGaps: ['TypeScript'],
    assessmentId: 'a1', assessmentScore: 65, assessmentStatus: 'failed',
    recruiterNotes: 'Assessment score below threshold. Consider for other roles.',
    timeline: [
      { event: 'Application Submitted', date: '2024-11-22', actor: 'Student' },
      { event: 'Application Reviewed', date: '2024-11-24', actor: 'HR' },
      { event: 'Assessment Assigned', date: '2024-11-25', actor: 'System' },
      { event: 'Assessment Completed', date: '2024-11-27', actor: 'Student' },
      { event: 'Rejected', date: '2024-11-28', actor: 'HR' },
    ],
  },
];

// ---------- Assessments ----------
export const assessments = [
  {
    id: 'a1', companyId: 'c1', internshipId: 'i1', title: 'Frontend Developer Assessment',
    type: 'company', skills: ['React', 'JavaScript', 'HTML/CSS'],
    duration: 60, difficulty: 'Intermediate', passingScore: 70,
    status: 'published', questions: ['q1', 'q2', 'q3', 'q4', 'q5'],
    candidates: 18, completions: 15, createdAt: '2024-11-18',
    instructions: 'Complete all questions within the allotted time. All questions are mandatory.',
  },
  {
    id: 'a2', companyId: 'c1', internshipId: 'i2', title: 'Full Stack Developer Assessment',
    type: 'company', skills: ['React', 'Node.js', 'SQL', 'REST APIs'],
    duration: 90, difficulty: 'Advanced', passingScore: 75,
    status: 'published', questions: ['q6', 'q7', 'q8', 'q9', 'q10'],
    candidates: 14, completions: 12, createdAt: '2024-11-08',
    instructions: 'Includes coding problems. You may use any IDE for coding questions.',
  },
  {
    id: 'a3', companyId: 'c2', internshipId: 'i3', title: 'Data Analytics Skills Test',
    type: 'company', skills: ['Python', 'SQL', 'Pandas', 'Power BI'],
    duration: 75, difficulty: 'Intermediate', passingScore: 65,
    status: 'published', questions: ['q11', 'q12', 'q13', 'q14', 'q15'],
    candidates: 28, completions: 22, createdAt: '2024-11-03',
    instructions: 'Scenario-based questions. Real-world datasets will be referenced.',
  },
  {
    id: 'a4', companyId: 'c2', internshipId: 'i4', title: 'Machine Learning Assessment',
    type: 'platform', skills: ['Python', 'Scikit-learn', 'TensorFlow', 'ML Concepts'],
    duration: 90, difficulty: 'Advanced', passingScore: 70,
    status: 'published', questions: ['q16', 'q17', 'q18', 'q19', 'q20'],
    candidates: 13, completions: 10, createdAt: '2024-11-30',
    instructions: 'Focus on ML concepts and Python implementation.',
  },
  {
    id: 'a5', companyId: 'c3', internshipId: 'i5', title: 'Backend Development Test',
    type: 'company', skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    duration: 60, difficulty: 'Intermediate', passingScore: 70,
    status: 'published', questions: ['q21', 'q22', 'q23', 'q24', 'q25'],
    candidates: 10, completions: 9, createdAt: '2024-11-23',
    instructions: 'Practical REST API design and debugging questions.',
  },
];

// ---------- Assessment Questions ----------
export const questions = [
  // Assessment a1 - Frontend
  { id: 'q1', assessmentId: 'a1', type: 'mcq', skill: 'React', difficulty: 'Medium', marks: 5,
    text: 'Which React hook is used for side effects?',
    options: ['useState', 'useEffect', 'useRef', 'useMemo'], correct: 1 },
  { id: 'q2', assessmentId: 'a1', type: 'mcq', skill: 'JavaScript', difficulty: 'Easy', marks: 5,
    text: 'What does the Array.prototype.map() method return?',
    options: ['Undefined', 'A new array', 'Mutates original array', 'A boolean'], correct: 1 },
  { id: 'q3', assessmentId: 'a1', type: 'technical', skill: 'React', difficulty: 'Medium', marks: 10,
    text: 'Explain the difference between controlled and uncontrolled components in React. Give an example of each.', options: null, correct: null },
  { id: 'q4', assessmentId: 'a1', type: 'coding', skill: 'JavaScript', difficulty: 'Medium', marks: 15,
    text: 'Write a function that debounces a given function by N milliseconds.', options: null, correct: null },
  { id: 'q5', assessmentId: 'a1', type: 'debugging', skill: 'HTML/CSS', difficulty: 'Easy', marks: 5,
    text: 'The following CSS rule is not applying the flex layout. Identify and fix the bug:\n\n.container { display: Flex; justify-content: center; }', options: null, correct: null },
  // Assessment a2 - Full Stack
  { id: 'q6', assessmentId: 'a2', type: 'mcq', skill: 'Node.js', difficulty: 'Medium', marks: 5,
    text: 'Which Node.js module is used to create an HTTP server?',
    options: ['fs', 'http', 'path', 'os'], correct: 1 },
  { id: 'q7', assessmentId: 'a2', type: 'mcq', skill: 'SQL', difficulty: 'Medium', marks: 5,
    text: 'Which SQL clause is used to filter results after a GROUP BY?',
    options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'], correct: 1 },
  { id: 'q8', assessmentId: 'a2', type: 'coding', skill: 'Node.js', difficulty: 'Hard', marks: 20,
    text: 'Build a REST API endpoint (POST /users) that validates input, hashes a password, and returns a JWT token.', options: null, correct: null },
  { id: 'q9', assessmentId: 'a2', type: 'technical', skill: 'REST APIs', difficulty: 'Medium', marks: 10,
    text: 'Describe the difference between authentication and authorisation in REST APIs.', options: null, correct: null },
  { id: 'q10', assessmentId: 'a2', type: 'scenario', skill: 'Full Stack', difficulty: 'Hard', marks: 20,
    text: 'Design the database schema for a basic e-commerce platform. Include tables, columns, primary keys, and foreign keys.', options: null, correct: null },
  // Assessment a3 - Data Analytics
  { id: 'q11', assessmentId: 'a3', type: 'mcq', skill: 'SQL', difficulty: 'Easy', marks: 5,
    text: 'Which SQL function returns the number of rows in a result set?',
    options: ['SUM()', 'COUNT()', 'AVG()', 'MAX()'], correct: 1 },
  { id: 'q12', assessmentId: 'a3', type: 'coding', skill: 'Python', difficulty: 'Medium', marks: 15,
    text: 'Using Pandas, write code to load a CSV file, remove duplicates, fill null values in a numeric column with the mean, and export the cleaned file.', options: null, correct: null },
  { id: 'q13', assessmentId: 'a3', type: 'mcq', skill: 'Pandas', difficulty: 'Medium', marks: 5,
    text: 'What does df.groupby("category").agg({"sales": "sum"}) return?',
    options: ['A list', 'A dictionary', 'A DataFrame', 'A Series'], correct: 2 },
  { id: 'q14', assessmentId: 'a3', type: 'technical', skill: 'Power BI', difficulty: 'Medium', marks: 10,
    text: 'Describe two techniques to optimise slow Power BI reports.', options: null, correct: null },
  { id: 'q15', assessmentId: 'a3', type: 'scenario', skill: 'Data Analytics', difficulty: 'Hard', marks: 20,
    text: 'You receive a dataset with regional sales data over 12 months. Describe your analytical approach and the visualisations you would create.', options: null, correct: null },
];

// ---------- Active Internship Records ----------
export const activeInternships = [
  {
    id: 'ai1', internshipId: 'i2', studentId: 's1', companyId: 'c1',
    supervisorId: 'u3', guideId: 'u6',
    applicationId: 'app1',
    startDate: '2025-01-15', endDate: '2025-07-15',
    status: 'active', workMode: 'Onsite',
    location: 'TechSolutions Office, Nashik',
    geoLatitude: 19.9975, geoLongitude: 73.7898, geoRadius: 200,
    progress: 40, tasksTotal: 10, tasksCompleted: 4,
    attendanceDays: 28, presentDays: 26, absentDays: 1, exceptionDays: 1,
    supervisorEvalStatus: 'pending',
    guideEvalStatus: 'pending',
    completionStatus: 'in_progress',
  },
  {
    id: 'ai2', internshipId: 'i5', studentId: 's4', companyId: 'c3',
    supervisorId: 'u4', guideId: 'u7',
    applicationId: 'app5',
    startDate: '2025-01-20', endDate: '2025-05-20',
    status: 'active', workMode: 'Onsite',
    location: 'DevNova Technologies, Mumbai',
    geoLatitude: 19.0760, geoLongitude: 72.8777, geoRadius: 150,
    progress: 35, tasksTotal: 8, tasksCompleted: 3,
    attendanceDays: 22, presentDays: 20, absentDays: 1, exceptionDays: 1,
    supervisorEvalStatus: 'pending',
    guideEvalStatus: 'pending',
    completionStatus: 'in_progress',
  },
  {
    id: 'ai3', internshipId: 'i7', studentId: 's6', companyId: 'c4',
    supervisorId: null, guideId: 'u6',
    applicationId: null,
    startDate: '2024-09-01', endDate: '2024-11-30',
    status: 'completed', workMode: 'Remote',
    location: 'Remote',
    geoLatitude: null, geoLongitude: null, geoRadius: null,
    progress: 100, tasksTotal: 6, tasksCompleted: 6,
    attendanceDays: 65, presentDays: 63, absentDays: 2, exceptionDays: 0,
    supervisorEvalStatus: 'submitted',
    guideEvalStatus: 'submitted',
    completionStatus: 'completed',
  },
];

// ---------- Tasks ----------
export const tasks = [
  {
    id: 't1', activeInternshipId: 'ai1', studentId: 's1', supervisorId: 'u3',
    title: 'Set up development environment',
    description: 'Configure Node.js, React, and project dependencies. Set up Git branching strategy and commit conventions.',
    skill: 'Setup', priority: 'high',
    startDate: '2025-01-15', dueDate: '2025-01-18',
    status: 'approved', submittedAt: '2025-01-18', reviewedAt: '2025-01-19',
    supervisorFeedback: 'Well done. Environment configured correctly.',
  },
  {
    id: 't2', activeInternshipId: 'ai1', studentId: 's1', supervisorId: 'u3',
    title: 'Build the user authentication module',
    description: 'Implement JWT-based login, registration, and session management using Node.js and React.',
    skill: 'Backend + React', priority: 'high',
    startDate: '2025-01-19', dueDate: '2025-01-28',
    status: 'approved', submittedAt: '2025-01-27', reviewedAt: '2025-01-29',
    supervisorFeedback: 'Excellent implementation. Minor JWT expiry handling issue fixed.',
  },
  {
    id: 't3', activeInternshipId: 'ai1', studentId: 's1', supervisorId: 'u3',
    title: 'Design dashboard UI components',
    description: 'Create reusable React components for dashboard: StatCard, ChartCard, DataTable.',
    skill: 'React', priority: 'medium',
    startDate: '2025-01-29', dueDate: '2025-02-07',
    status: 'revision_required', submittedAt: '2025-02-06', reviewedAt: '2025-02-08',
    supervisorFeedback: 'Components look good but need responsive behaviour on mobile. Revise.',
  },
  {
    id: 't4', activeInternshipId: 'ai1', studentId: 's1', supervisorId: 'u3',
    title: 'Integrate REST API endpoints',
    description: 'Connect frontend components to the backend REST API. Handle loading and error states.',
    skill: 'Full Stack', priority: 'high',
    startDate: '2025-02-09', dueDate: '2025-02-20',
    status: 'in_progress', submittedAt: null, reviewedAt: null,
    supervisorFeedback: '',
  },
  {
    id: 't5', activeInternshipId: 'ai1', studentId: 's1', supervisorId: 'u3',
    title: 'Write unit tests',
    description: 'Write Jest unit tests for core API endpoints and React components.',
    skill: 'Testing', priority: 'medium',
    startDate: '2025-02-21', dueDate: '2025-03-03',
    status: 'not_started', submittedAt: null, reviewedAt: null,
    supervisorFeedback: '',
  },
  // Tasks for ai2 (Sonal Desai)
  {
    id: 't6', activeInternshipId: 'ai2', studentId: 's4', supervisorId: 'u4',
    title: 'Backend API design and documentation',
    description: 'Design REST API endpoints for the inventory microservice. Document using Swagger.',
    skill: 'Node.js', priority: 'high',
    startDate: '2025-01-20', dueDate: '2025-01-28',
    status: 'approved', submittedAt: '2025-01-27', reviewedAt: '2025-01-29',
    supervisorFeedback: 'Great API design. Swagger docs are clear.',
  },
  {
    id: 't7', activeInternshipId: 'ai2', studentId: 's4', supervisorId: 'u4',
    title: 'Database schema design',
    description: 'Design MongoDB collections for inventory and orders with proper indexing.',
    skill: 'MongoDB', priority: 'high',
    startDate: '2025-01-29', dueDate: '2025-02-05',
    status: 'approved', submittedAt: '2025-02-05', reviewedAt: '2025-02-06',
    supervisorFeedback: 'Schema is well structured. Good use of indexes.',
  },
  {
    id: 't8', activeInternshipId: 'ai2', studentId: 's4', supervisorId: 'u4',
    title: 'Implement CRUD operations',
    description: 'Build full CRUD for inventory items with validation middleware.',
    skill: 'Express.js', priority: 'high',
    startDate: '2025-02-07', dueDate: '2025-02-18',
    status: 'submitted', submittedAt: '2025-02-17', reviewedAt: null,
    supervisorFeedback: '',
  },
];

// ---------- Attendance Records ----------
export const attendanceRecords = [
  // Aditya Sharma (ai1) - Onsite
  { id: 'att1', activeInternshipId: 'ai1', studentId: 's1', date: '2025-02-17',
    checkIn: '09:12', checkOut: '18:05', status: 'present', verificationStatus: 'verified',
    locationLabel: 'TechSolutions Office, Nashik', distance: 45, withinBoundary: true, notes: '' },
  { id: 'att2', activeInternshipId: 'ai1', studentId: 's1', date: '2025-02-14',
    checkIn: '09:35', checkOut: '17:50', status: 'present', verificationStatus: 'exception',
    locationLabel: 'External Client Site, Nashik', distance: 850, withinBoundary: false,
    notes: 'Attended client meeting at external location. Approved by supervisor.' },
  { id: 'att3', activeInternshipId: 'ai1', studentId: 's1', date: '2025-02-13',
    checkIn: '09:08', checkOut: '18:12', status: 'present', verificationStatus: 'verified',
    locationLabel: 'TechSolutions Office, Nashik', distance: 62, withinBoundary: true, notes: '' },
  { id: 'att4', activeInternshipId: 'ai1', studentId: 's1', date: '2025-02-12',
    checkIn: null, checkOut: null, status: 'absent', verificationStatus: 'n/a',
    locationLabel: null, distance: null, withinBoundary: null, notes: 'Sick leave declared.' },
  { id: 'att5', activeInternshipId: 'ai1', studentId: 's1', date: '2025-02-11',
    checkIn: '09:20', checkOut: '17:55', status: 'present', verificationStatus: 'verified',
    locationLabel: 'TechSolutions Office, Nashik', distance: 38, withinBoundary: true, notes: '' },
  // Sonal Desai (ai2) - Onsite
  { id: 'att6', activeInternshipId: 'ai2', studentId: 's4', date: '2025-02-17',
    checkIn: '09:45', checkOut: '18:30', status: 'present', verificationStatus: 'verified',
    locationLabel: 'DevNova Technologies, Mumbai', distance: 112, withinBoundary: true, notes: '' },
  { id: 'att7', activeInternshipId: 'ai2', studentId: 's4', date: '2025-02-14',
    checkIn: '10:15', checkOut: '18:00', status: 'present', verificationStatus: 'pending',
    locationLabel: 'DevNova Technologies, Mumbai', distance: 210, withinBoundary: false,
    notes: 'Check-in slightly outside boundary. Awaiting supervisor verification.' },
  // Tanvi Nair (ai3) - Remote/Completed
  { id: 'att8', activeInternshipId: 'ai3', studentId: 's6', date: '2024-11-28',
    checkIn: '09:30', checkOut: '17:30', status: 'present', verificationStatus: 'n/a',
    locationLabel: 'Remote', distance: null, withinBoundary: null,
    notes: 'Remote internship – geofencing not applicable.' },
];

// ---------- Feedback ----------
export const feedbacks = [
  {
    id: 'f1', activeInternshipId: 'ai1', authorId: 'u3', authorRole: 'supervisor',
    studentId: 's1', type: 'task',
    content: 'Aditya has shown excellent progress in the first two weeks. His React skills are strong and he is proactive in asking questions.',
    createdAt: '2025-01-30', rating: 4,
  },
  {
    id: 'f2', activeInternshipId: 'ai1', authorId: 'u6', authorRole: 'guide',
    studentId: 's1', type: 'academic',
    content: 'Aditya is maintaining good communication. His weekly reports are timely and detailed.',
    createdAt: '2025-02-05', rating: 4,
  },
  {
    id: 'f3', activeInternshipId: 'ai2', authorId: 'u4', authorRole: 'supervisor',
    studentId: 's4', type: 'task',
    content: 'Sonal demonstrated good understanding of Node.js API design. Database schema was well thought out.',
    createdAt: '2025-02-06', rating: 4,
  },
  {
    id: 'f4', activeInternshipId: 'ai3', authorId: 'u4', authorRole: 'supervisor',
    studentId: 's6', type: 'final',
    content: 'Tanvi completed all assigned tasks on time. Good learning attitude and quality of work.',
    createdAt: '2024-12-01', rating: 4,
    criteria: {
      technicalPerformance: 4, qualityOfWork: 4, taskCompletion: 5,
      problemSolving: 3, communication: 4, professionalConduct: 5, overall: 4,
    },
  },
];

// ---------- Evaluations ----------
export const evaluations = [
  {
    id: 'ev1', activeInternshipId: 'ai3', studentId: 's6',
    type: 'supervisor', authorId: 'u4', status: 'submitted', submittedAt: '2024-12-01',
    criteria: {
      technicalPerformance: 4, qualityOfWork: 4, taskCompletion: 5,
      problemSolving: 3, communication: 4, professionalConduct: 5, overall: 4,
    },
    comments: 'Tanvi was a dedicated intern. She completed all her work diligently and was always open to feedback. Would recommend for a full-time role.',
  },
  {
    id: 'ev2', activeInternshipId: 'ai3', studentId: 's6',
    type: 'guide', authorId: 'u6', status: 'submitted', submittedAt: '2024-12-03',
    criteria: {
      learningOutcomes: 4, technicalRelevance: 4, reportQuality: 5,
      consistencyOfProgress: 4, documentationCompleteness: 4, overallAcademic: 4,
    },
    comments: 'Tanvi has shown consistent academic progress. Reports were well-written and her internship experience is clearly relevant to her program.',
  },
];

// ---------- Documents ----------
export const documents = [
  { id: 'd1', activeInternshipId: 'ai1', studentId: 's1', type: 'offer_letter',
    title: 'Internship Offer Letter – TechSolutions', uploadedAt: '2025-01-10', uploadedBy: 'company', status: 'verified' },
  { id: 'd2', activeInternshipId: 'ai1', studentId: 's1', type: 'progress_report',
    title: 'Week 2 Progress Report', uploadedAt: '2025-01-31', uploadedBy: 'student', status: 'reviewed' },
  { id: 'd3', activeInternshipId: 'ai1', studentId: 's1', type: 'progress_report',
    title: 'Week 4 Progress Report', uploadedAt: '2025-02-14', uploadedBy: 'student', status: 'pending_review' },
  { id: 'd4', activeInternshipId: 'ai2', studentId: 's4', type: 'offer_letter',
    title: 'Internship Offer Letter – DevNova Technologies', uploadedAt: '2025-01-15', uploadedBy: 'company', status: 'verified' },
  { id: 'd5', activeInternshipId: 'ai2', studentId: 's4', type: 'progress_report',
    title: 'Week 2 Progress Report', uploadedAt: '2025-02-02', uploadedBy: 'student', status: 'reviewed' },
  { id: 'd6', activeInternshipId: 'ai3', studentId: 's6', type: 'completion_certificate',
    title: 'Internship Completion Certificate', uploadedAt: '2024-12-05', uploadedBy: 'company', status: 'verified' },
];

// ---------- Guide Assignments ----------
export const guideAssignments = [
  { id: 'ga1', studentId: 's1', activeInternshipId: 'ai1', guideId: 'u6', assignedAt: '2025-01-12', status: 'active' },
  { id: 'ga2', studentId: 's4', activeInternshipId: 'ai2', guideId: 'u7', assignedAt: '2025-01-18', status: 'active' },
  { id: 'ga3', studentId: 's6', activeInternshipId: 'ai3', guideId: 'u6', assignedAt: '2024-08-28', status: 'completed' },
  { id: 'ga4', studentId: 's2', activeInternshipId: null, guideId: null, assignedAt: null, status: 'unassigned' },
  { id: 'ga5', studentId: 's3', activeInternshipId: null, guideId: null, assignedAt: null, status: 'unassigned' },
  { id: 'ga6', studentId: 's5', activeInternshipId: null, guideId: null, assignedAt: null, status: 'unassigned' },
];

// ---------- Notifications ----------
export const notifications = [
  { id: 'n1', recipientRole: 'company', recipientId: 'c1', type: 'application', message: 'Aditya Sharma applied for Full Stack Developer Intern.', createdAt: '2024-11-12', read: false },
  { id: 'n2', recipientRole: 'company', recipientId: 'c1', type: 'assessment', message: 'Karan Mehta completed the Full Stack Developer Assessment. Score: 94.', createdAt: '2024-11-20', read: true },
  { id: 'n3', recipientRole: 'supervisor', recipientId: 'u3', type: 'submission', message: 'Aditya Sharma submitted: Dashboard UI Components.', createdAt: '2025-02-06', read: false },
  { id: 'n4', recipientRole: 'guide', recipientId: 'u6', type: 'report', message: 'Aditya Sharma submitted Week 4 Progress Report.', createdAt: '2025-02-14', read: false },
  { id: 'n5', recipientRole: 'admin', recipientId: 'u9', type: 'company', message: 'ByteCraft Systems registered as a new company.', createdAt: '2024-05-01', read: true },
  { id: 'n6', recipientRole: 'admin', recipientId: 'u9', type: 'assignment', message: 'College Guide assignment pending for 3 students.', createdAt: '2025-01-20', read: false },
];

// ---------- Activity Events ----------
export const activityEvents = [
  { id: 'ae1', type: 'company_registered', message: 'ByteCraft Systems registered on InternBridge.', createdAt: '2024-05-01', actor: 'System' },
  { id: 'ae2', type: 'internship_posted', message: 'TechSolutions posted Full Stack Developer Intern.', createdAt: '2024-11-10', actor: 'Priya Mehta' },
  { id: 'ae3', type: 'student_selected', message: 'Aditya Sharma selected for Full Stack Developer Intern at TechSolutions.', createdAt: '2024-11-25', actor: 'Priya Mehta' },
  { id: 'ae4', type: 'supervisor_assigned', message: 'Rahul Desai assigned as supervisor for Aditya Sharma.', createdAt: '2025-01-10', actor: 'Admin' },
  { id: 'ae5', type: 'guide_assigned', message: 'Prof. Anjali Patil assigned as college guide for Aditya Sharma.', createdAt: '2025-01-12', actor: 'Admin' },
  { id: 'ae6', type: 'internship_started', message: 'Aditya Sharma began internship at TechSolutions.', createdAt: '2025-01-15', actor: 'System' },
  { id: 'ae7', type: 'evaluation_submitted', message: 'Tanvi Nair final evaluation submitted by Prof. Anjali Patil.', createdAt: '2024-12-03', actor: 'Prof. Anjali Patil' },
  { id: 'ae8', type: 'internship_completed', message: 'Tanvi Nair internship at ByteCraft Systems marked completed.', createdAt: '2024-12-05', actor: 'Admin' },
];

// ---------- Application Activity Chart Data ----------
export const applicationActivityData = [
  { month: 'Aug', applications: 5 },
  { month: 'Sep', applications: 8 },
  { month: 'Oct', applications: 12 },
  { month: 'Nov', applications: 28 },
  { month: 'Dec', applications: 15 },
  { month: 'Jan', applications: 22 },
];

export const applicationStatusData = [
  { name: 'New', value: 12, color: '#4F46E5' },
  { name: 'Under Review', value: 18, color: '#0EA5E9' },
  { name: 'Shortlisted', value: 14, color: '#F59E0B' },
  { name: 'Selected', value: 8, color: '#16A34A' },
  { name: 'Rejected', value: 6, color: '#DC2626' },
];

export const internshipProgressData = [
  { name: 'Active', value: 2, color: '#4F46E5' },
  { name: 'Completed', value: 1, color: '#16A34A' },
  { name: 'Upcoming', value: 1, color: '#0EA5E9' },
  { name: 'On Hold', value: 0, color: '#F59E0B' },
];

export const monthlyInternshipData = [
  { month: 'Jun', students: 0 },
  { month: 'Jul', students: 0 },
  { month: 'Aug', students: 0 },
  { month: 'Sep', students: 1 },
  { month: 'Oct', students: 1 },
  { month: 'Nov', students: 1 },
  { month: 'Dec', students: 1 },
  { month: 'Jan', students: 3 },
  { month: 'Feb', students: 2 },
];

// Helper lookups
export const getCompanyById = (id) => companies.find(c => c.id === id);
export const getStudentById = (id) => students.find(s => s.id === id);
export const getUserById = (id) => users.find(u => u.id === id);
export const getInternshipById = (id) => internships.find(i => i.id === id);
export const getActiveInternshipById = (id) => activeInternships.find(ai => ai.id === id);
export const getApplicationById = (id) => applications.find(a => a.id === id);
export const getAssessmentById = (id) => assessments.find(a => a.id === id);
export const getTasksByActiveInternship = (id) => tasks.filter(t => t.activeInternshipId === id);
export const getAttendanceByActiveInternship = (id) => attendanceRecords.filter(a => a.activeInternshipId === id);
export const getDocumentsByActiveInternship = (id) => documents.filter(d => d.activeInternshipId === id);
export const getFeedbackByActiveInternship = (id) => feedbacks.filter(f => f.activeInternshipId === id);
export const getEvaluationsByActiveInternship = (id) => evaluations.filter(e => e.activeInternshipId === id);
export const getApplicationsByInternship = (internshipId) => applications.filter(a => a.internshipId === internshipId);
export const getActiveInternshipsByStudent = (studentId) => activeInternships.filter(ai => ai.studentId === studentId);
export const getActiveInternshipsBySupervisor = (supervisorId) => activeInternships.filter(ai => ai.supervisorId === supervisorId);
export const getActiveInternshipsByGuide = (guideId) => activeInternships.filter(ai => ai.guideId === guideId);
export const getGuideAssignmentByStudent = (studentId) => guideAssignments.find(ga => ga.studentId === studentId);
export const getNotificationsByRole = (role) => notifications.filter(n => n.recipientRole === role);
export const getQuestionsByAssessment = (assessmentId) => questions.filter(q => q.assessmentId === assessmentId);
