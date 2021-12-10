import express from "express"
import users from './user-handlers.js'

const router = express.Router()

router
  .route("/")
  .get(users.getAll)

router
  .route("/")
  .post(users.create)

router
  .route("/:userID")
  .get(users.getSingle)
  .put(users.update)
  .delete(users.deleteSingle)

// router
//   .route("/:userID/comments")
//   .post(blogComments.create)
//   .get(blogComments.getCommentsFromBlog)
  
// router
//     .route("/:userID/comments/:commentID")
//     .get(blogComments.getSingleComment)
//     .put(blogComments.update)
//     .delete(blogComments.deleteSingle)
  
export default router
