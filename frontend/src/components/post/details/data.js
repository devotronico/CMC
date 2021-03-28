import faker from 'faker';
import moment from 'moment';

moment.updateLocale('en', {
  relativeTime: {
    past: function (input) {
      return input === 'adesso' ? input : input + ' fa';
    },
    s: 'adesso',
    future: 'in %s',
    ss: '%d secondi',
    m: 'un minuto',
    mm: '%d minuti',
    h: 'un ora',
    hh: '%d ore',
    d: 'un giorno',
    dd: '%d giorni',
    M: 'un mese',
    MM: '%d mesi',
    y: 'un anno',
    yy: '%d anni',
  },
});

moment.locale('it');
const data = {
  _id: '1',
  name: 'Daniele Manzi',
  avatar: 'D',
  title: 'Il titolo del post',
  text: 'Il testo del post',
  tags: ['dev', 'tech', 'nature'],
  created_at: faker.date
    .between(faker.date.past(), faker.date.recent())
    .toLocaleDateString(),
  comments: [
    {
      _id: 1,
      user_id: 2,
      name: 'Nicola Manzi',
      avatar: 'N',
      text: 'commento 1',
      created_at: moment(
        faker.date.between(faker.date.past(), faker.date.recent())
      ).fromNow(),
    },
    {
      _id: 2,
      user_id: 3,
      name: 'Paride Manzi',
      avatar: 'P',
      text: 'commento 2',
      created_at: moment(
        faker.date.between(faker.date.past(), faker.date.recent())
      ).fromNow(),
    },
    {
      _id: 3,
      user_id: 4,
      name: 'Elena Manzi',
      avatar: 'E',
      text: 'commento 3',
      created_at: moment(
        faker.date.between(faker.date.past(), faker.date.recent())
      ).fromNow(),
    },
    {
      _id: 4,
      user_id: 5,
      name: 'Maria Manzi',
      avatar: 'M',
      text: 'commento 4',
      created_at: moment(
        faker.date.between(faker.date.past(), faker.date.recent())
      ).fromNow(),
    },
    {
      _id: 5,
      user_id: 6,
      name: 'Broli Manzi',
      avatar: 'B',
      text: 'commento 5',
      created_at: moment(
        faker.date.between(faker.date.past(), faker.date.recent())
      ).fromNow(),
    },
  ],
};

// const asd = new Date(data.created_at)
// console.log(asd)
export default data;
