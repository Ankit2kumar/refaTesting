const searchHasResults = async (req, res, next) => {
    try {
        if(!res.body || res.body.length === 0 ){
            res.status(404).send({ msg: req.params.blogPostID ? `Request with ID ${req.params.blogPostID} not found.` :'Not found'})
        } else {
            res.send(res.body)
        }
    } catch (error) {
        next(error)
    }
}

const responseValidations = {
    searchHasResults: searchHasResults
}

export default responseValidations