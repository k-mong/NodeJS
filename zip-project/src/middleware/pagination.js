export const pagination = (req, res, next) => {
    const page = req.query.page ?? "1";   // req.query는 기본적으로 String 없으면 undfind
    const limit = req.query.limit ?? "20";
    const take = Number(limit) || 20;
    const skip = (Number(page) -1) * take;
    
    req.take = take;
    req.skip = skip;

    next()
};