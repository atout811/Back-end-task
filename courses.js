const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/task")
  .then(() => console.log("Mongo Connected"));

router.use(express.json());

const courseSchema = new mongoose.Schema({
  name: String,
  tags: [String],
  isPublished: Boolean
});

const Course = new mongoose.model("Courses", courseSchema);

router.get("/", (req, res) => {
  const pageNumber = parseInt(req.query.page);
  const PageSize = 2;

  async function getCourse() {
    console.log("getted");
    try {
      const course = await Course.find()
        .limit(2)
        .skip((pageNumber - 1) * PageSize)
        .select({ name: 1 });
      res.send(course);
      console.log(course);
    } catch (err) {
      console.log(err);
    }
  }
  getCourse();
});

router.post("/", (req, res) => {
  async function createCourse() {
    try {
      const course = new Course({
        name: req.body.name,
        tags: ["courses", "software", "learn"],
        isPublished: true
      });
      const result = await course.save();
    } catch (err) {
      console.log("ERROR!");
    }
  }

  createCourse();
});

router.put("/:id", (req, res) => {
  async function updateCourse(id) {
    const course = await Course.updateOne(
      { _id: id },
      {
        $set: {
          name: req.body.name,
          isPublished: req.body.isPublished
        }
      }
    );
  }
  updateCourse(req.params.id);
});

router.delete("/:id/", (req, res) => {
  async function deleteCourse(id) {
    await Course.deleteOne({ _id: id });
  }
  deleteCourse(req.params.id);
});

module.exports = router;
