const { FinancialDateEntries } = require( './financialDateEntries' );

const dateEntry = {
    month: 0,
    day: 0,
    year: 1969
};


 const singleEntry = {
    when: dateEntry,
    where: 'new york',
    who: 'Anthony Bourdain',
    what: 'brought food culture mainstream',
    why: 'I am hungry'
};

const timelines = [
    { userId: '123',
      theme: 'History of US Financial Activity',
      entries: FinancialDateEntries
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
                when: new Date() + 100,
                where: 'new york',
                who: 'Anthony Bourdain',
                what: 'brought food culture mainstream',
                why: 'I am hungry'
            },
            {
                when: new Date() + 200,
                where: 'new york',
                who: 'Anthony Bourdain',
                what: 'brought food culture mainstream',
                why: 'I am hungry'
            }
        ]
    }
];

module.exports = timelines; 


