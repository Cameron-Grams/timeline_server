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
            when: new Date() + 100,
            where: 'new york',
            who: 'Ramones',
            what: 'brought Punk Rock Mainstream',
            why: 'improved mainstream music'
        },
        {
            when: new Date() + 200,
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