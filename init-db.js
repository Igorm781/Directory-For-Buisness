const fs = require('fs');


const mockBuilding = {
  id: "b1",
  name: "The Apex Tower",
  address: "100 Innovation Drive",
  logo_url: "https://ui-avatars.com/api/?name=Apex+Tower&background=0D8ABC&color=fff",
  created_at: new Date().toISOString()
};

const mockFloors = [
  { id: "f0", building_id: "b1", number: 0, label: "Basement", display_order: 1, created_at: new Date().toISOString() },
  { id: "f1", building_id: "b1", number: 1, label: "Floor 1", display_order: 2, created_at: new Date().toISOString() },
  { id: "f2", building_id: "b1", number: 2, label: "Floor 2", display_order: 3, created_at: new Date().toISOString() },
];

const suitesList = [
  { f: "f1", num: "101" }, { f: "f0", num: "B2" }, { f: "f1", num: "103" }, { f: "f1", num: "104" },
  { f: "f0", num: "B5" }, { f: "f0", num: "B14" }, { f: "f2", num: "202A" }, { f: "f2", num: "202B" },
  { f: "f0", num: "B18" }, { f: "f0", num: "B3" }, { f: "f0", num: "B11" }, { f: "f0", num: "B12" },
  { f: "f0", num: "B13" }, { f: "f0", num: "B15" }, { f: "f0", num: "B17" }, { f: "f0", num: "B1" },
  { f: "f0", num: "B8" }, { f: "f0", num: "B9" }, { f: "f0", num: "B4" }, { f: "f0", num: "B7" },
  { f: "f0", num: "B6" }, { f: "f2", num: "202C" }, { f: "f2", num: "201" }, { f: "f2", num: "202D" }
];

const mockSuites = suitesList.map((s, i) => ({
  id: `s${i + 1}`,
  floor_id: s.f,
  number: s.num,
  created_at: new Date().toISOString()
}));

const getSuite = (num) => mockSuites.find(s => s.number === num);
const getFloor = (id) => mockFloors.find(f => f.id === id);

function slug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

const rawBusinesses = [
  { name: "American Dental Consultants", suite: "101", cat: "Dental" },
  { name: "American Dental Consultants", suite: "B2", cat: "Dental" },
  { name: "B+AC, LLC", suite: "103", cat: "Consulting" },
  { name: "B+AC, LLC", suite: "104", cat: "Consulting" },
  { name: "Back Bay MD, LLC", suite: "B5", cat: "Healthcare" },
  { name: "Beauty & Brow", suite: "B14", cat: "Beauty & Spa" },
  { name: "Certainty Testing LLC", suite: "202A", cat: "Healthcare" },
  { name: "Clay Mind Psychiatry, LLC", suite: "202B", cat: "Psychiatry" },
  { name: "Dean Dental Lab", suite: "B18", cat: "Dental" },
  { name: "EMDR & Performance Counseling: Flow Therapy", suite: "B3", cat: "Counseling" },
  { name: "Guardian Angel Senior Services", suite: "B11", cat: "Senior Care" },
  { name: "Guardian Angel Senior Services", suite: "B12", cat: "Senior Care" },
  { name: "Guardian Angel Senior Services", suite: "B13", cat: "Senior Care" },
  { name: "Guardian Angel Senior Services", suite: "B15", cat: "Senior Care" },
  { name: "Guardian Angel Senior Services", suite: "B17", cat: "Senior Care" },
  { name: "Healing Hearts Care Center LLC - Edilia Gomes", suite: "202B", cat: "Healthcare" },
  { name: "Lino Physical Therapy", suite: "B1", cat: "Physical Therapy" },
  { name: "Nourish Inc", suite: "B8", cat: "Wellness" },
  { name: "Oak Path Counseling Services Inc", suite: "B9", cat: "Counseling" },
  { name: "One Clearview Health PLLC", suite: "B4", cat: "Healthcare" },
  { name: "One Clearview Health PLLC", suite: "B7", cat: "Healthcare" },
  { name: "Psychoanalysis Office", suite: "B6", cat: "Psychiatry" },
  { name: "Rite Time Home Care Services", suite: "202C", cat: "Home Care" },
  { name: "Tufts Medical Center Community Care", suite: "201", cat: "Medical" },
  { name: "Wellness Institute of Boston", suite: "202D", cat: "Wellness" },
];

const mockBusinesses = rawBusinesses.map((b, i) => {
  const s = getSuite(b.suite);
  return {
    id: `bus${i + 1}`,
    suite_id: s ? s.id : null,
    name: b.name,
    slug: slug(`${b.name}-${b.suite}`),
    description: `Welcome to ${b.name}, located in Suite ${b.suite}.`,
    logo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(b.name)}&background=random&color=fff`,
    category: b.cat,
    phone: "555-010" + (i % 10),
    email: `contact@${slug(b.name)}.demo`,
    website: `https://${slug(b.name)}.demo`,
    hours: { mon: "9am - 5pm", tue: "9am - 5pm", wed: "9am - 5pm", thu: "9am - 5pm", fri: "9am - 5pm" },
    is_active: true,
    is_featured: false,
    display_order: i + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
});

fs.writeFileSync('data.json', JSON.stringify({
  building: mockBuilding,
  floors: mockFloors,
  suites: mockSuites,
  businesses: mockBusinesses
}, null, 2));

console.log('data.json created');
