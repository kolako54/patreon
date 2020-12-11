module.exports = (foo) => (req, res, next) => {
    foo(req, res, next).catch(next);
};
