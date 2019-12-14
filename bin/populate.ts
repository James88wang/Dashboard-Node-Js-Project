#!/usr/bin/env ts-node

import { Metric, MetricsHandler } from '../src/metrics'
import { User, UserHandler } from '../src/user'

// pre-populate the databse with two users //
const userPrePopulate = [
  new User(`james`, 'james.wang@edu.ece.fr', 'pwd'),
  new User(`henintsoa`, 'henintsoa.razafindrazaka@edu.ece.fr', 'pwd'),
]

const dbUser: UserHandler = new UserHandler('./db/users')
userPrePopulate.forEach(element => {
  dbUser.save( element, (err: Error | null) => {
    if (err) throw err
    console.log('Data populated users')
  })
})

// pre-populate the databse with users metrics //
const metricPrePopulate = [
  new Metric(`james`, `A`, `${new Date('December 17, 1998 08:18:58').toISOString()}`, 8),
  new Metric(`james`, `B`, `${new Date('September 18, 2018 08:18:58').toISOString()}`, 500),
  new Metric(`james`, `C`, `${new Date('September 19, 2019 09:19:59').toISOString()}`, 888),
  new Metric(`james`, `D`, `${new Date('January 28, 2008 12:00:00').toISOString()}`, 777),
  new Metric(`henintsoa`, `C`, `${new Date('August 05, 1998 18:22:58').toISOString()}`, 10),
  new Metric(`henintsoa`, `D`, `${new Date('December 15, 2019 19:18:08').toISOString()}`, 25),
  new Metric(`henintsoa`, `A`, `${new Date('September 20, 2020 20:20:20').toISOString()}`, 18)
]

const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')
metricPrePopulate.forEach(element => {
  dbMet.save(element, (err: Error | null) => { // il a mis 10 au lieu de '0'
    if (err) throw err
    console.log('Data populated metrics')
  })
})

