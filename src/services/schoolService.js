const schools = [
  { name: "Nnamdi Azikwe University" },
  { name: "FUTO" },
  { name: "University of Ibadon" },
];

const faculties = [
  { name: "Agriculture" },
  { name: "Arts" },
  //   { name: 'Basic Medical Sciences' },
  { name: "Biosciences" },
  { name: "Education" },
  { name: "Engineering" },
  { name: "Environmental Sciences" },
  {
    name: "Health Sciences and Technology",
  },
  { name: "Law" },
  { name: "Management Sciences" },
  { name: "Medicine" },
  { name: "Pharmaceutical Sciences" },
  { name: "Physical Sciences" },
  { name: "Social Sciences" },
];

const departments = {
  agriculture: [
    { name: "Agricultural Economics and Extension" },
    { name: "Animal Science and Technology" },
    { name: "Crop Science and Horticulture" },
    { name: "Fisheries and Aquaculture" },
    { name: "Food Science and Technology" },
    { name: "Forestry and Wildlife Management" },
    { name: "Soil Science and Land Resources Management" },
  ],
  arts: [
    { name: "English Language and Literature" },
    { name: "History and International Studies" },
    { name: "Igbo, African and Asian Studies" },
    { name: "Linguistics" },
    { name: "Modern European Languages" },
    { name: "Music" },
    { name: "Philosophy" },
    { name: "Religion and Human Relations" },
    { name: "Theatre and Film Studies" },
    { name: "Chinese" },
  ],

  biosciences: [
    { name: "Applied Biochemistry" },
    { name: "Applied Microbiology and Brewing" },
    { name: "Parasitology and Entomology" },
    { name: "Zoology" },
    { name: "Botany" },
  ],

  education: [
    { name: "Adult Education" },
    { name: "Human Kinetics and Health Education" },
    { name: "Guidance and Counselling" },
    { name: "Science Education" },
    { name: "Education Management and Policy" },
    { name: "Early Childhood and Primary Education" },
    { name: "Library and Information Science" },
    { name: "Education Foundations" },
  ],

  engineering: [
    { name: "Agriculture and Bio-resources Engineering" },
    { name: "Chemical Engineering" },
    { name: "Civil Engineering" },
    { name: "Electronic and Computer Engineering" },
    { name: "Electrical Engineering" },
    { name: "Industrial/Production Engineering" },
    { name: "Mechanical Engineering" },
    { name: "Metallurgical and Materials Engineering" },
    { name: "Polymer and Textile Engineering" },
  ],

  environmental_sciences: [
    { name: "Architecture" },
    { name: "Building" },
    { name: "Environmental Management" },
    { name: "Estate Management" },
    { name: "Fine and Applied Arts" },
    { name: "Geography and Meteorology" },
    { name: "Quantity Surveying" },
    { name: "Surveying and Geo-informatics" },
  ],

  health_sciences: [
    { name: "Medical Laboratory Science" },
    { name: "Medical Rehabilitation" },
    { name: "Nursing Science" },
    { name: "Radiography and Radiological Science" },
  ],

  law: [
    { name: "Commercial and Property Law" },
    { name: "International Law and Jurisprudence" },
    { name: "Public and Private Law" },
  ],

  management_sciences: [
    { name: "Accountancy" },
    { name: "Banking and Finance" },
    { name: "Business Administration" },
    { name: "Cooperative Economics and Management" },
    { name: "Marketing" },
    { name: "Public Administration" },
    { name: "Entrepreneurial Studies" },
  ],

  medicine: [{ name: "Medicine" }],
  pharmaceutical_sciences: [{ name: "Pharmaceutical Sciences" }],
  physical_sciences: [{ name: "Computer Science" }],
  social_sciences: [{ name: "" }],
};

const level = [
  { id: "100", name: "100" },
  { id: "200", name: "200" },
  { id: "300", name: "300" },
  { id: "400", name: "400" },
  { id: "500", name: "500" },
  { id: "600", name: "600" },
];

export function getSchools() {
  return schools;
}

export function getFaculties() {
  return faculties;
}

export function getDepartments() {
  return departments;
}

export function getLevel() {
  return level;
}

const exportedObject = {
  getSchools,
  getFaculties,
  getDepartments,
  getLevel,
};

export default exportedObject;
