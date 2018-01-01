const users = [
    { id: '123',
      name: 'Jo',
      email: 'Jo@here.com',
      password: 'pwrdpwrdpwrd' },
      { id: '456',
      name: 'Jody',
      email: 'Jody@here.com',
      password: 'pwrdpwrdpwrd' },
      { id: '789',
      name: 'Jolene',
      email: 'Jolene@here.com',
      password: 'pwrdpwrdpwrd' },
];

const singleEntry = {
    when: new Date(),
    where: 'new york',
    who: 'Anthony Bourdain',
    what: 'brought food culture mainstream',
    why: 'I am hungry'
};

const timelines = [
    { userId: '123',
      theme: 'History of Rock n Roll',
      entries: [
        {
            when: new Date(),
            where: 'new york',
            who: 'Ramones',
            what: 'brought Punk Rock Mainstream',
            why: 'improved mainstream music'
        },
        {
            when: new Date(),
            where: 'new york',
            who: 'Ramones',
            what: 'brought Punk Rock Mainstream',
            why: 'improved mainstream music'
        },
        {
            when: new Date(),
            where: 'new york',
            who: 'Ramones',
            what: 'brought Punk Rock Mainstream',
            why: 'improved mainstream music'
        }
      ]
    },
    {
        userId: '456',
        theme: 'Food in popular culture',
        entries: [
            {
                when: new Date(),
                where: 'new york',
                who: 'Anthony Bourdain',
                what: 'brought food culture mainstream',
                why: 'I am hungry'
            },
            {
                when: new Date(),
                where: 'new york',
                who: 'Anthony Bourdain',
                what: 'brought food culture mainstream',
                why: 'I am hungry'
            },
            {
                when: new Date(),
                where: 'new york',
                who: 'Anthony Bourdain',
                what: 'brought food culture mainstream',
                why: 'I am hungry'
            }
        ]
    }
];


const myData = {
    users,
    timelines
};

module.exports = { myData };