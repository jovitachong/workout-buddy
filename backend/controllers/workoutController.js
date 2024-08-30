const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// GET all workouts
const getWorkouts = async (req, res) => {

  // -1: descending order (newest on top)
  const workouts = await Workout.find({}).sort({createdAt: -1})

  res.status(200).json(workouts)
}

// GET a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params // destructuring

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Not a valid ObjectId :)'})
  }

  // check if the id exists in the database
  const workout = await Workout.findById(id)
  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }
  res.status(200).json(workout)
}

// POST a new workout
const createWorkout = async (req, res) => {
  const {title, load, reps} = req.body

  // find empty field
  let emptyFields = []
  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add doc to db
  try {
    const workout = await Workout.create({title, load, reps})
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params
  // 1. make sure id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout :)'})
  }
  // 2. delete workout and make sure id exists in database
  //    by using MongoDB’s indexing system
  //    to efficiently locate the document by _id
  const workout = await Workout.findOneAndDelete({_id: id})
  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }
  res.status(200).json(workout)
}

// UPDATE a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params
  // 1. check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout :)'})
  }
  // 2. find workout in db > update workout
  // const workout = await Workout.findOneAndUpdate(
  //   { _id: id }, // 1. Filter: Find the document with this _id
  //   { ...req.body }, // 2. Update: Update the document
  //   { new: true } // 3. Options: Return the updated document, not the original
  // );
  const workout = await Workout.findOneAndUpdate(
    { _id: id }, { ...req.body }
  )

  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }
  res.status(200).json(workout)
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}