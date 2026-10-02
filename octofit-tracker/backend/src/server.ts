import express from 'express'
import database from './config/database.js'
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    apiUrl: baseUrl,
    database: database.readyState === 1 ? 'connected' : 'connecting',
  })
})

app.get(['/api/users', '/api/users/'], async (_request, response) => {
  const users = await User.find().lean()
  response.json({ count: users.length, data: users, apiUrl: `${baseUrl}/api/users` })
})

app.get(['/api/teams', '/api/teams/'], async (_request, response) => {
  const teams = await Team.find().lean()
  response.json({ count: teams.length, data: teams, apiUrl: `${baseUrl}/api/teams` })
})

app.get(['/api/activities', '/api/activities/'], async (_request, response) => {
  const activities = await Activity.find().lean()
  response.json({ count: activities.length, data: activities, apiUrl: `${baseUrl}/api/activities` })
})

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_request, response) => {
  const leaderboard = await Leaderboard.find().sort({ rank: 1 }).lean()
  response.json({ count: leaderboard.length, data: leaderboard, apiUrl: `${baseUrl}/api/leaderboard` })
})

app.get(['/api/workouts', '/api/workouts/'], async (_request, response) => {
  const workouts = await Workout.find().lean()
  response.json({ count: workouts.length, data: workouts, apiUrl: `${baseUrl}/api/workouts` })
})

app.get('/api/users/:id', async (request, response) => {
  const user = await User.findById(request.params.id)

  if (!user) {
    response.status(404).json({ message: 'User not found' })
    return
  }

  response.json({ data: user })
})

app.get('/api/teams/:id', async (request, response) => {
  const team = await Team.findById(request.params.id)

  if (!team) {
    response.status(404).json({ message: 'Team not found' })
    return
  }

  response.json({ data: team })
})

app.get('/api/activities/:id', async (request, response) => {
  const activity = await Activity.findById(request.params.id)

  if (!activity) {
    response.status(404).json({ message: 'Activity not found' })
    return
  }

  response.json({ data: activity })
})

app.get('/api/workouts/:id', async (request, response) => {
  const workout = await Workout.findById(request.params.id)

  if (!workout) {
    response.status(404).json({ message: 'Workout not found' })
    return
  }

  response.json({ data: workout })
})

app.post(['/api/users', '/api/users/'], async (request, response) => {
  const user = await User.create(request.body)
  response.status(201).json({ data: user })
})

app.post(['/api/teams', '/api/teams/'], async (request, response) => {
  const team = await Team.create(request.body)
  response.status(201).json({ data: team })
})

app.post(['/api/activities', '/api/activities/'], async (request, response) => {
  const activity = await Activity.create(request.body)
  response.status(201).json({ data: activity })
})

app.post(['/api/workouts', '/api/workouts/'], async (request, response) => {
  const workout = await Workout.create(request.body)
  response.status(201).json({ data: workout })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`)
})