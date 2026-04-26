// ============================================
// R.O.S PORTFOLIO — ALL CONTENT DATA
// ============================================

export const BOOT_LINES = [
  { text: '[SYSTEM INIT]', dots: true, status: 'OK' },
  { text: '[LOADING KERNEL v9.17]', dots: true, status: 'OK', note: '← CGPA' },
  { text: '[MOUNTING NEURAL DRIVE]', dots: true, status: 'OK' },
  { text: '[CALIBRATING SERVO ARRAYS]', dots: true, status: 'OK' },
  { text: '[SCANNING TERRAIN: EAST GODAVARI, AP]', dots: true, status: 'OK' },
  { text: '[AUTHENTICATING OPERATOR: TEJA.ARAVA]', dots: true, status: 'OK' },
  { text: '[BOOTING R.O.S PORTFOLIO INTERFACE]', dots: true, status: 'OK' },
  { text: '', dots: false, status: '' },
  { text: 'WELCOME, OPERATOR. SYSTEM READY.', dots: false, status: '' },
];

export const HERO_SUBTITLES = [
  'ROBOTICS ENGINEER',
  'AUTONOMOUS SYSTEMS DEVELOPER',
  'SMART MATERIALS RESEARCHER',
  'SIH 2025 WINNER',
  'MECH × SOFTWARE HYBRID',
];

export const HUD_BADGES = [
  { label: 'ONLINE', led: true, color: 'green' },
  { label: 'CGPA 9.17 / 10', led: true, color: 'cyan' },
  { label: 'NIT ANDHRA PRADESH', led: false, color: 'muted' },
  { label: 'OPEN TO INTERNSHIPS', led: true, color: 'orange' },
];

export const ABOUT_TERMINAL = [
  { key: 'NAME', value: 'Arava Siva Teja SatyaSri' },
  { key: 'DEGREE', value: 'B.Tech Mechanical Engg | Minor: Software Engg' },
  { key: 'INSTITUTE', value: 'National Institute of Technology, Andhra Pradesh' },
  { key: 'BATCH', value: 'Aug 2023 – May 2027' },
  { key: 'CGPA', value: '9.17 / 10' },
  { key: 'LOCATION', value: 'East Godavari, Andhra Pradesh' },
  { key: 'CONTACT', value: '723104@student.nitandhra.ac.in' },
  { key: 'STATUS', value: 'SIH Winner | SRUJANA 1st Place | IIC Grant Holder' },
  { key: 'MISSION', value: 'Build machines that operate where humans cannot.' },
];

export const SKILL_GAUGES = [
  { label: 'Mechanical Design & CAD', value: 90, color: '#00f0ff' },
  { label: 'Robotics Systems Integration', value: 88, color: '#00f0ff' },
  { label: 'ML & Data-Driven Engineering', value: 85, color: '#ff4d00' },
  { label: 'Innovation & Research Index', value: 95, color: '#7fff00' },
];

export const PROJECTS = [
  {
    id: 'hvs-bot',
    code: 'MISSION 01',
    name: 'HVS-BOT',
    status: 'ACTIVE',
    badge: 'IIC FUNDED',
    brief: 'Autonomous rover for inspection and vegetation management in high-voltage substation environments.',
    tech: ['Python', 'Raspberry Pi', 'ROS2', 'OpenCV', 'Mechanical CAD', 'Sensor Integration'],
    complexity: 'CRITICAL',
    complexityLevel: 5,
    links: { intel: '#', source: '#' },
  },
  {
    id: 'lunabot',
    code: 'MISSION 02',
    name: 'LUNABOT',
    status: 'COMPLETED',
    badge: 'SIH 2025 — ISRO',
    brief: 'Simulation-based autonomous navigation system for lunar terrain exploration addressing an ISRO problem statement.',
    tech: ['Python', 'IMU', 'Simulation', 'Wheel Encoder', 'Motion Control', 'Terrain Modelling'],
    complexity: 'CRITICAL',
    complexityLevel: 5,
    links: { intel: '#', source: '#' },
  },
  {
    id: 'sma-ml',
    code: 'MISSION 03',
    name: 'SMA ML PREDICTOR',
    status: 'ACTIVE',
    badge: null,
    brief: 'ML model to predict thermo-mechanical properties of Shape Memory Alloys using Random Forest.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Random Forest', 'Phase Transformation'],
    complexity: 'HIGH',
    complexityLevel: 4,
    links: { intel: '#', source: '#' },
  },
  {
    id: 'paddy',
    code: 'MISSION 04',
    name: 'PADDY DISEASE DETECTOR',
    status: 'COMPLETED',
    badge: null,
    brief: 'ML-based early disease detection in paddy crops with pesticide recommendation module.',
    tech: ['Python', 'OpenCV', 'Scikit-learn', 'Image Classification', 'Agriculture AI'],
    complexity: 'MEDIUM',
    complexityLevel: 3,
    links: { intel: '#', source: '#' },
  },
];

export const COMPLEXITY_MAP = {
  LOW: { label: 'LOW', level: 1, color: '#7fff00' },
  MEDIUM: { label: 'MEDIUM', level: 3, color: '#ffd700' },
  HIGH: { label: 'HIGH', level: 4, color: '#ff8c00' },
  CRITICAL: { label: 'CRITICAL', level: 5, color: '#ff4d00' },
};

export const SKILLS = [
  {
    subsystem: 'MECHANICAL SUBSYSTEM',
    color: '#00f0ff',
    nodes: [
      { id: 'creo', label: 'Creo', x: 15, y: 20, proficiency: 85 },
      { id: 'sw', label: 'SolidWorks', x: 45, y: 10, proficiency: 82 },
      { id: 'cad', label: 'CAD Modelling', x: 75, y: 20, proficiency: 90 },
      { id: 'mech', label: 'Mechanism Design', x: 85, y: 50, proficiency: 80 },
      { id: 'draw', label: 'Eng. Drawings', x: 65, y: 80, proficiency: 88 },
      { id: 'print', label: '3D Printing', x: 30, y: 80, proficiency: 85 },
      { id: 'proto', label: 'Rapid Prototyping', x: 10, y: 55, proficiency: 80 },
    ],
    edges: [
      ['creo','sw'],['sw','cad'],['cad','mech'],['mech','draw'],['draw','print'],['print','proto'],['proto','creo'],['sw','draw'],['creo','print'],
    ],
  },
  {
    subsystem: 'ROBOTICS & SYSTEMS',
    color: '#ff4d00',
    nodes: [
      { id: 'kinematics', label: 'Robot Kinematics', x: 15, y: 20, proficiency: 82 },
      { id: 'sensors', label: 'Sensor Integration', x: 50, y: 10, proficiency: 88 },
      { id: 'actuator', label: 'Actuator Selection', x: 80, y: 20, proficiency: 78 },
      { id: 'ros2', label: 'ROS2', x: 85, y: 55, proficiency: 80 },
      { id: 'sysint', label: 'System Integration', x: 55, y: 80, proficiency: 85 },
      { id: 'imu', label: 'IMU', x: 20, y: 70, proficiency: 82 },
      { id: 'encoder', label: 'Wheel Encoders', x: 10, y: 42, proficiency: 80 },
    ],
    edges: [
      ['kinematics','sensors'],['sensors','actuator'],['actuator','ros2'],['ros2','sysint'],['sysint','imu'],['imu','encoder'],['encoder','kinematics'],['sensors','sysint'],
    ],
  },
  {
    subsystem: 'SOFTWARE & ML',
    color: '#7fff00',
    nodes: [
      { id: 'python', label: 'Python', x: 15, y: 30, proficiency: 90 },
      { id: 'sklearn', label: 'Scikit-learn', x: 45, y: 10, proficiency: 85 },
      { id: 'opencv', label: 'OpenCV', x: 78, y: 22, proficiency: 82 },
      { id: 'pandas', label: 'Pandas', x: 85, y: 55, proficiency: 85 },
      { id: 'numpy', label: 'NumPy', x: 65, y: 80, proficiency: 85 },
      { id: 'sql', label: 'SQL', x: 35, y: 80, proficiency: 75 },
      { id: 'java', label: 'Java', x: 10, y: 60, proficiency: 72 },
    ],
    edges: [
      ['python','sklearn'],['sklearn','opencv'],['opencv','pandas'],['pandas','numpy'],['numpy','sql'],['sql','java'],['java','python'],['python','pandas'],['sklearn','numpy'],
    ],
  },
  {
    subsystem: 'ANALYSIS & COMPUTATION',
    color: '#a855f7',
    nodes: [
      { id: 'cfd', label: 'CFD', x: 15, y: 20, proficiency: 78 },
      { id: 'fem', label: 'FEM', x: 50, y: 10, proficiency: 76 },
      { id: 'thermo', label: 'Thermodynamics', x: 82, y: 25, proficiency: 85 },
      { id: 'fluid', label: 'Fluid Mechanics', x: 85, y: 58, proficiency: 82 },
      { id: 'som', label: 'Strength of Materials', x: 58, y: 82, proficiency: 83 },
      { id: 'linalg', label: 'Linear Algebra', x: 22, y: 78, proficiency: 80 },
      { id: 'stats', label: 'Prob & Stats', x: 8, y: 48, proficiency: 82 },
    ],
    edges: [
      ['cfd','fem'],['fem','thermo'],['thermo','fluid'],['fluid','som'],['som','linalg'],['linalg','stats'],['stats','cfd'],['cfd','fluid'],['fem','som'],
    ],
  },
];

export const ACHIEVEMENTS = [
  {
    icon: '🥇',
    title: 'SIH 2025 Winner',
    org: 'Smart India Hackathon — ISRO',
    desc: 'Autonomous Lunar Navigation System addressing ISRO problem statement.',
    tier: 'gold',
    year: '2025',
  },
  {
    icon: '🥇',
    title: 'SRUJANA 2026 Winner',
    org: 'Govt. of Andhra Pradesh | Technical Cell',
    desc: 'Agentic AI Fault Detection System — 1st Place statewide.',
    tier: 'gold',
    year: '2026',
  },
  {
    icon: '🎖️',
    title: 'IIC Ignition Grant',
    org: 'NIT Andhra Pradesh | IIC',
    desc: 'Funded: HVS-Bot Autonomous Rover for substation inspection.',
    tier: 'gold',
    year: '2026',
  },
  {
    icon: '🏅',
    title: 'Top 1% Nationally',
    org: 'NPTEL AI Certification | SWAYAM',
    desc: 'Fundamentals of Artificial Intelligence — Top 1% rank.',
    tier: 'silver',
    year: '2025',
  },
  {
    icon: '🎓',
    title: 'Academic Excellence Award',
    org: 'NIT Andhra Pradesh',
    desc: 'Recognized for outstanding academic performance.',
    tier: 'silver',
    year: '2024',
  },
  {
    icon: '📜',
    title: 'NMMS National Scholarship',
    org: 'Government of India',
    desc: 'National Means-cum-Merit Scholarship — merit-based national award.',
    tier: 'bronze',
    year: '2019',
  },
  {
    icon: '📜',
    title: 'NSP Government Scholarship',
    org: 'National Scholarship Portal',
    desc: 'Government of India merit scholarship recipient.',
    tier: 'bronze',
    year: '2023',
  },
];

export const EXPERIENCE = [
  {
    role: 'Mechanical Maintenance Intern',
    org: 'Oil and Natural Gas Corporation Limited (ONGC)',
    period: 'May 2025 – June 2025',
    sector: 'Oil & Gas Production',
    classification: 'INDUSTRIAL FIELD DEPLOYMENT',
    bullets: [
      'Gained observational exposure to mechanical maintenance operations and industrial safety practices.',
      'Observed preventive and corrective maintenance workflows for rotating equipment and supporting mechanical systems.',
      'Developed understanding of equipment reliability, inspection procedures, and maintenance planning.',
    ],
    status: 'MISSION COMPLETE',
  },
];

export const TIMELINE = [
  { year: 'AUG 2023', event: 'Joined NIT AP', detail: 'B.Tech Mechanical Engineering', status: 'done', icon: '🎓' },
  { year: '2024', event: 'Minor Unlocked', detail: 'Software Engineering Minor commenced', status: 'done', icon: '⚙️' },
  { year: 'FEB 2025', event: 'Paddy Disease Detector', detail: 'ML-based crop disease detection project completed', status: 'done', icon: '🌾' },
  { year: 'MAR 2025', event: 'Udemy Certification', detail: 'Advanced Supply Chain + AI Strategies', status: 'done', icon: '📜' },
  { year: 'MAY 2025', event: 'ONGC Internship', detail: 'Mechanical Maintenance Intern deployed', status: 'done', icon: '🏭' },
  { year: 'SEP 2025', event: 'Google AI Certification', detail: 'Intro to Generative AI — Google Cloud', status: 'done', icon: '🤖' },
  { year: 'SEP–DEC 2025', event: 'LunaBot / SIH 2025', detail: 'WINNER 🏆 — ISRO Autonomous Lunar Navigation', status: 'done', icon: '🚀' },
  { year: 'DEC 2025', event: 'NPTEL Top 1%', detail: 'Fundamentals of AI — national top 1%', status: 'done', icon: '🏅' },
  { year: 'JAN 2026', event: 'HVS-Bot Initiated', detail: 'IIC Grant secured, rover development started', status: 'done', icon: '🤖' },
  { year: '2026', event: 'SRUJANA Winner', detail: 'Agentic AI Fault Detection — 1st Place 🏆', status: 'done', icon: '🥇' },
  { year: '2026 →', event: 'ACTIVE MISSION', detail: 'Targeting top internships & research roles', status: 'active', icon: '🎯' },
];

export const CERTIFICATIONS = [
  {
    icon: '🤖',
    title: 'Fundamentals of Artificial Intelligence',
    org: 'SWAYAM NPTEL',
    badge: 'Top 1%',
    date: 'Dec 2025',
    color: '#00f0ff',
  },
  {
    icon: '🌐',
    title: 'Introduction to Generative AI',
    org: 'Google Cloud SkillBoost',
    badge: 'Completed',
    date: 'Sep 2025',
    color: '#ff4d00',
  },
  {
    icon: '🏭',
    title: 'Advanced Supply Chain + AI Strategies',
    org: 'Udemy',
    badge: 'Completed',
    date: 'Mar 2025',
    color: '#7fff00',
  },
];

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/in/teja-arava',
  email: '723104@student.nitandhra.ac.in',
};
