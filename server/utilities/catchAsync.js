const { ApolloError } = require('apollo-server-express');

/* eslint-disable */
module.exports = (foo) => (...args) => foo(...args).catch((err) => {    
        let code = (err.extensions) ? err.extensions.code : '';     
        throw new ApolloError(err.message, code);        
    });
