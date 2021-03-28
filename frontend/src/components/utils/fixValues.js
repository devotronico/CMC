const fixValues = (name, value) => {
  switch (name) {
    case 'name':
      return value
        .replace(/\s\s+/g, ' ')
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
        .join(' ');
    case 'email':
      return value.replace(/\s/g, '');
    case 'username':
    case 'password':
    case 'password2':
      return value;
    default:
      break;
  }
};

export default fixValues;
