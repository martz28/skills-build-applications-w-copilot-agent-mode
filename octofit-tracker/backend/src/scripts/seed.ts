import mongoose from 'mongoose'
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js'

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString)
    console.log('Connected to octofit_db')
    console.log('Seed the octofit_db database with test data')

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.insertMany([
      {
        name: 'Ava Thompson',
        email: 'ava.thompson@example.com',
        fitnessGoal: 'Marathon prep',
        age: 29,
        city: 'Seattle',
      },
      {
        name: 'Miles Chen',
        email: 'miles.chen@example.com',
        fitnessGoal: 'Strength gains',
        age: 34,
        city: 'Denver',
      },
      {
        name: 'Zoe Ramirez',
        email: 'zoe.ramirez@example.com',
        fitnessGoal: 'Mobility and recovery',
        age: 27,
        city: 'Austin',
      },
    ])

    const teams = await Team.insertMany([
      {
        name: 'Trail Blazers',
        sport: 'Running',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Iron Circuit',
        sport: 'Strength',
        members: [users[1]._id, users[2]._id],
      },
    ])

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Run',
        durationMinutes: 42,
        calories: 390,
        date: new Date('2026-09-28T06:15:00.000Z'),
      },
      {
        userId: users[1]._id,
        type: 'Lift',
        durationMinutes: 50,
        calories: 420,
        date: new Date('2026-09-29T18:00:00.000Z'),
      },
      {
        userId: users[2]._id,
        type: 'Mobility',
        durationMinutes: 28,
        calories: 180,
        date: new Date('2026-09-30T07:30:00.000Z'),
      },
    ])

    await Leaderboard.insertMany([
      {
        rank: 1,
        userId: users[0]._id,
        name: 'Ava Thompson',
        points: 1420,
      },
      {
        rank: 2,
        userId: users[1]._id,
        name: 'Miles Chen',
        points: 1385,
      },
      {
        rank: 3,
        userId: users[2]._id,
        name: 'Zoe Ramirez',
        points: 1310,
      },
    ])

    await Workout.insertMany([
      {
        name: '5K Tempo',
        difficulty: 'Intermediate',
        durationMinutes: 35,
        focus: 'Cardio',
        description: 'Steady-state effort to build aerobic endurance and pacing.',
      },
      {
        name: 'Upper Body Blast',
        difficulty: 'Advanced',
        durationMinutes: 45,
        focus: 'Strength',
        description: 'Compound presses and pulls for upper-body power and stability.',
      },
      {
        name: 'Recovery Flow',
        difficulty: 'Beginner',
        durationMinutes: 20,
        focus: 'Mobility',
        description: 'Gentle mobility work to improve flexibility and recovery.',
      },
    ])

    console.log('Database seeding complete')
    console.log(`Seed created ${users.length} users, ${teams.length} teams, 3 activities, 3 leaderboard entries, and 3 workouts`)
    await mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
