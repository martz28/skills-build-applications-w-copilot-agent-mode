import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessGoal: { type: String, default: 'General fitness' },
    age: { type: Number, min: 12 },
    city: { type: String, default: 'Unknown' },
  },
  { timestamps: true },
)

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    sport: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
)

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

const leaderboardSchema = new Schema(
  {
    rank: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true },
  },
  { timestamps: true },
)

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focus: { type: String, required: true },
    description: { type: String, default: '' },
  },
  { timestamps: true },
)

export const User = model('User', userSchema)
export const Team = model('Team', teamSchema)
export const Activity = model('Activity', activitySchema)
export const Leaderboard = model('Leaderboard', leaderboardSchema)
export const Workout = model('Workout', workoutSchema)
