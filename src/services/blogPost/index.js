import express from "express"
import blogPost from "./blogPost-handlers.js"
import blogComments from "./comments-handlers.js"
import responseValidations from "../../lib/response-validations.js"




const router = express.Router()

router
  .route("/")
  .get(blogPost.getAll, responseValidations.searchHasResults)

router
  .route("/")
  .post(blogPost.create)

router
  .route("/:blogPostID")
  .get(blogPost.getSingle)
  .put(blogPost.update)
  .delete(blogPost.deleteSingle)

router
  .route("/:blogPostID/comments")
  .post(blogComments.create)
  .get(blogComments.getCommentsFromBlog)
  
router
    .route("/:blogPostID/comments/:commentID")
    .get(blogComments.getSingleComment)
    .put(blogComments.update)
    .delete(blogComments.deleteSingle)
    
    router
        .route("/:blogPostID/like/:userID")
        .get(blogPost.likes)
  
export default router
