module.exports = ( ...fields ) => ( req, res, next ) => {

    for (let i = 0; i < fields.length; i += 1) {
        const field = fields[i];

        if ( !( field in req.body ) || ( req.body[ field ] === '' ) ) {
            const message = `There is missing ${ field } in your request body`;
            return res.status( 400 ).json( {
                generalMessage: 'Validation Error',
                messages: [ message ],
            });
        }
    }
    return next();
};


