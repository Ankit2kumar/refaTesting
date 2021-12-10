import BlogPost from "../../db/models/BlogPost.js"



const getCommentsFromBlog = async (req, res, next) => {
  try {

    const blogs = await BlogPost.findById(req.params.blogPostID)
    res.send(blogs.blogComments)

  } catch (error) {
    res.status(500)
    res.status(500)
    next(error)
  }
}
const getSingleComment = async (req, res, next) => {
  try {
    const { blogPostID, commentID } = req.params
    const comment = await BlogPost.findOne(
      { "blogComments._id": commentID },
      {
        "blogComments.$": 1,
        "_id": 0 //suppress blogID
      }
    )
    res.status(200).send(comment)
  } catch (error) {
    res.status(500)
    console.log(error)
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const addComment = await BlogPost.findByIdAndUpdate(
      req.params.blogPostID,
      { $push: { blogComments: req.body } },
      { new: true,
        runValidators: true
      }
    )

    console.log(addComment)
    res.status(200).send(addComment)
  } catch (error) {
    res.status(500)
    console.log(error)
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const { blogPostID, commentID } = req.params

    const updatedComment = await BlogPost.findOneAndUpdate(
      { "_id": blogPostID, "blogComments._id" : commentID },
      {
        $set: {
          "blogComments.$": { 
            "_id": commentID,
            ...req.body
          },
          
        },
               
      },
     
      {new: true}
      )

      console.log(updatedComment, "<<<<<<<<<<<<<<<<<<<<<<<<<<")
    res.send(updatedComment)
  } catch (error) {
    res.status(500)
    console.log(error)
    next(error)
  }
}

const deleteSingle = async (req, res, next) => {
  try {
    const { blogPostID, commentID } = req.params

    const blog = await BlogPost.findByIdAndUpdate(
      blogPostID,
      {
        $pull: {
          blogComments: { _id: commentID },
        },
      },
      {
        new: true,
      }
    )

      res.status(200).send(blog)

  } catch (error) {
    res.status(500)
    console.log(error)
    next(error)
  }
}





const blogComments = {
  create: create,
  getCommentsFromBlog: getCommentsFromBlog,
  getSingleComment: getSingleComment,
  update: update,
  deleteSingle: deleteSingle
}

export default blogComments