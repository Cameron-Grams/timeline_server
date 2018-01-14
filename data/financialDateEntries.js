const FinancialDateEntries = [   

{  
entryId: 1,
title: 'First known derivatives contract',
what: 'First known derivative contract: Japanese futures contract for the purchase of rice',
when: { year: 1697, day:'none', month: 'none' }, 
who: 'unknown',
where: 'Japan',
why: 'First example of a contract for pre-established prices being applied to a future sale',
source: [ 'https://www.investopedia.com/articles/optioninvestor/10/history-options-futures.asp' ]
},
{  
entryId: 2,
title: 'First US derivative contract',
what: 'First known US futures sale of grain',
when: { month: 'March', day: 13, year: 1851 },
who: 'unknown',
where: 'Chicago',
why: 'first use of a future contract in the US',
source: [ 'http://eh.net/encyclopedia/a-history-of-futures-trading-in-the-united-states/' ]
},
{  
entryId: 3,
title: 'Chicago Board of Trade established',
what: 'Chicago Board of Trade established as a place to resolve contracts for agricultural production',
when: { year: 1848, month: 'none', day: 'none' }, 
who: 'Chicago merchants',
where: 'Chicago',
why: 'This an early example of the financial activity around the time sensitive sale of agricultural products being actively managed',
source: [ 'http://eh.net/encyclopedia/a-history-of-futures-trading-in-the-united-states/' ]
},
{  
    entryId: 4,
title: 'Panic of 1907',
what: 'Attempt by Heinze family and Knickerbocker Trust to corner the copper market led to a run on the banks due to a loss of investor confidence',
when: { year: 1907, month: 'October', day: 'none' },
who: [ 'Otto Heinze',  'Knickerbocker Trust' ],
where: 'New York',
why: 'The attempt to corner cooper market was based on leveraged purchase of short sales of copper; once Otto Heinze was unable to meet his leveraged obligations the loss of confidence in financial institutions led to a run on the banks as people tried to secure their money',
source: [ 'https://en.wikipedia.org/wiki/Panic_of_1907#cite_ref-3' ]
}, 
{
    entryId: 5,
title: 'Stock Market Crash 1929',
what: '16 million shares traded on New York Stock exchange as loss of confidence led to market collapse',
when: { month: 'October', day: 29, year: 1929 },
who: 'many',
where: 'New York',
why: 'Stock prices had become higher than the economic activity they represented due to wide spread speculation; exacerbated by unsustainable debt held by the banks; led to the Glass-Steigel act as an effort to separate speculation from customer holdings',
source: [ 'http://www.history.com/topics/1929-stock-market-crash' ]
},
{
    entryId: 6,
title: 'Glass-Steagall act passed',
what: 'National legislation passed to separate commercial and investment banking',
when: { year: 1933, day: 'none', month: 'none' },
who: [ 'Senators Carter Glass',  'Rep Henry B. Steagall' ], 
where: 'Washington, DC',
why: 'Speculation by investment banks had led to the leverage and elevated stock prices that caused the 1929 crash, this act was an effort to protect the citizens from the impacts of bank investment activity',
source: [ 'https://en.wikipedia.org/wiki/Glass%E2%80%93Steagall_legislation' ]
},
{
    entryId: 7,
title: 'Black Monday 1987',
what: 'Massive sell-off of stocks leads to a 23% fall in the US stock market',
when: { month: 'October', day: 19, year: 1987 }, 
who: 'many',
where: [ 'New York', 'London', 'Hong Kong', 'Berlin', 'Tokyo' ],
why: 'stock prices had outpaced earning potential and sales started to adjust to this reality; automated systems initiated sell orders once the inital sell off started; portfolio insurance was another new innovation that had fostered previous investor confidence',
source: [ 'https://www.investopedia.com/ask/answers/042115/what-caused-black-monday-stock-market-crash-1987.asp' ]
},
{
    entryId: 8,
title: 'Glass-Steagall repealed',
what: 'President Clinton signs the Gramm–Leach–Bliley Act (GLBA) removing barriers between commercial banking, investment banking, and insurance activity.',
when: { month: 'November',  day: 12, year: 1999 }, 
who: [ 'Sen Phil Gramm', 'Rep Jim Leach', 'Rep Thomas Bliley', 'President Bill Clinton' ],
where: 'Washington DC',
why: 'This act increased the degree that the US financial market was interconnected, contributing to greater systemic risk from contagion',
source: [ 'https://en.wikipedia.org/wiki/Gramm%E2%80%93Leach%E2%80%93Bliley_Act' ]
},
{
    entryId: 9,
title: '2007-8 Market Crash',
what: 'World-wide financial liquidity disappeared due to a loss of confidence in the value of the goods that supported financial contracts',
when: { month: 'September', day: 'none', year: 2008 },
who: 'Various institutions',
where: 'Worldwide',
why: 'Loss of confidence in the system of finance led to a withdraw of money from the system; the process became a self-fulfilling prophecy; financial markets were exposed to further risk from the adoption of little understood instruments such as CDOs, credit default swaps, and the integrity of mortgage back securities ',
source: [ 'http://www.nytimes.com/2008/09/30/business/30markets.html' ]
},
{
    entryId: 10,
title: 'Dodd-Frank Act',
what: 'Reform act designed to protect consumers from bank risk',
when: { month: 'July', day: 21, year: 2010 },
who: [ 'Rep Barney Frank', 'Sen Chris Dodd', 'President Barak Obama' ],
where: 'Washington, DC',
why: 'Greater regulation of the financial markets was seen as the best way to protect the world from little understood financial risk',
source: [ 'https://en.wikipedia.org/wiki/Dodd%E2%80%93Frank_Wall_Street_Reform_and_Consumer_Protection_Act' ]
},
{
    entryId: 11,
title: 'Derivatives move onto Blockchain',
what: 'Ledger X approved for derivatives trading with digital contracts',
who: [ 'Ledger X ( private blockchain trading company)', 'US Commodities Futures Trading Commission ( US CFTC )' ],
when: { day: 24,  month: 'July', year: 2017 },
where: [ 'Washington DC ( US Commodities Futures Trading Commission )', 'New York ( Ledger X )' ], 
why: 'This opens the way for blockchain\'s use in recording derivatives contracts',
source: [ 'https://www.reuters.com/article/us-usa-cftc-digitalcurrency/ledgerx-gets-u-s-approval-for-derivatives-on-digital-currencies-idUSKBN1A92FZ' ]
}
];

module.exports = { FinancialDateEntries }; 




