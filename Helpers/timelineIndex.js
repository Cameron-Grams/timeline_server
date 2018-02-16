const { FinancialDateEntries } = require( '../data/financeTimeline' ); 
const { JudoDateEntries } = require( '../data/judoTimeline' ); 
const { Timeline3 } = require( '../data/timeline3' ); 

const timelineIndex = {
    1: JudoDateEntries,
    2: FinancialDateEntries,
    3: Timeline3
}

module.exports = timelineIndex; 