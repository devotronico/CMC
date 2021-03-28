/// FILTER BY ROLE (OPTION SELECT)
const filterByRole = (obj, role) => {
  return obj.filter(row => row.role === role);
};

/// FILTRA BY NAME (WITH TAGS)
const filterByTags = (obj, tags) => {
  console.log('obj', obj);
  console.log('tags', tags);
  return obj.filter(row =>
    tags.some(r => row.name.toLowerCase().includes(r.toLowerCase()))
  );
};

/// FILTRA BY AGES (SLIDE ELEMENT)
const filterByAges = (obj, ages) => {
  return obj.filter(row => row.age >= +ages[0] && row.age <= +ages[1]);
};

/// FILTRA BY STATUS (RADIO ELEMENTS)
const filterByStatus = (obj, status) => {
  return obj.filter(row => row.status === status);
};

/// FILTRA BY isAUTHENTICATED (TOGGLE)
const filterByOnlineState = (obj, isAuthenticated) => {
  return obj.filter(row => row.isAuthenticated === isAuthenticated);
};

/// FILTRA BY DATE (RANGE BETWEEN TWO DATE)
const filterByDate = (obj, date) => {
  return obj.filter(
    row => row.register_at >= date[0] && row.register_at <= date[1]
  );
};

const filters = () => {
  return 'OOOOKJKKKKKKKK';
};
export {
  filterByRole,
  filterByTags,
  filterByAges,
  filterByStatus,
  filterByOnlineState,
  filterByDate,
  filters
};
