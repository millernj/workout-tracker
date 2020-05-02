const { Router } = require('express');
const db = require('../models');

const router = Router();

const workoutAggregator = [
  { "$unwind": "$exercises" },
  {
    "$group": {
      "_id": "$_id",
      "day": { "$first": "$day" },
      "exercises": { "$push": "$exercises" },
      "totalDuration": { "$sum": "$exercises.duration" }
    }
  },
  {
    "$sort": { "day": 1 }
  }
]

router.get('/workouts', async (request, response) => {
  try {
    const workouts = await db.Workout.aggregate(workoutAggregator).exec();
    response.json(workouts);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post('/workouts', async ({ body }, response) => {
  try {
    const workout = await db.Workout.create(body);
    response.json(workout);
  } catch (error) {
    console.error(error)
    response.status(500).send(error);
  }
});

router.put('/workouts/:id', async ({ body: exercise, params: { id } }, response) => {
  try {
    const workout = await db.Workout.findByIdAndUpdate(id, {$push: {exercises: exercise}});
    response.json(workout);
  } catch (error) {
    console.error(error)
    response.status(500).send(error);
  }
});

router.get('/workouts/range', (request, response) => {
  response.redirect('/api/workouts');
})

module.exports = router;