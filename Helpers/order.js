const orderAllEntries = ( array ) => {
    const result = array.sort( ( a, b ) => {
        return a.dateObject - b.dateObject; 
    })
    return result; 
}

const orderTimelines = ( TimelineObj ) => {
    const timelineEntries = TimelineObj.entries;
    const orderedEntries = orderAllEntries( timelineEntries );

    return {
        ...TimelineObj,
        entries: orderedEntries
    };
}

const orderEntryInput = ( TimelineObj, NewEntry ) => {
    const timelineEntries = TimelineObj.entries;
   
    const newDateString = NewEntry.date;
    const dateArray = newDateString.split( '/' );

    const newDateObject = new Date( dateArray[ 2 ], dateArray[ 0 ] - 1, dateArray[ 1 ] );

    NewEntry.dateObject = newDateObject; 
    timelineEntries.push( NewEntry );
    const orderedEntries = orderAllEntries( timelineEntries );

    return {
        ...TimelineObj,
        entries: orderedEntries
    };
}

const order = { orderEntryInput, orderTimelines }; 
module.exports = { order };

