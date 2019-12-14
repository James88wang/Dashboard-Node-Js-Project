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
  new Metric(`james`, `A`, `${new Date('2018-08-08 8:00 UTC').getTime()}`, 8),
  new Metric(`james`, `B`, `${new Date('2018-08-08 8:08 UTC').getTime()}`, 88),
  new Metric(`henintsoa`, `C`, `${new Date('2019-08-08 14:30 UTC').getTime()}`, 1),
  new Metric(`henintsoa`, `D`, `${new Date('2019-08-09 14:38 UTC').getTime()}`, 2)

]

const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')
metricPrePopulate.forEach(element => {
  dbMet.save(element, (err: Error | null) => { // il a mis 10 au lieu de '0'
    if (err) throw err
    console.log('Data populated metrics')
  })
})

