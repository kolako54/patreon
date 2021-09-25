// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    // req.header('Access-Control-Allow-Origin', "*");
    // req.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // req.header('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).json({name: 'John Doe'})
}
