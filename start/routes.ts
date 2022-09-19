/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/post', async () => {
  return {
    message: "Hello I am the first route created by Duda's hands on this project"
  }
})

Route.get('/get/:id', async ({ params }) => {
  return 'The id informated on params is ' + params.id
})

Route.patch('/context', async ({ request, response }) => {
  response.status(404)
  const yourData = request.body()
  return yourData.message;
})

Route.get('/pets', 'PetsController.index')
Route.post('/pets/new', 'PetsController.store')

Route.resource('/animals', 'AnimalsController')

Route.resource('animals.pets', 'AnimalsController')
// NESTED RESOURCE / ROUTES
// routes that will create a relationship of animals, animal_id and pets + (id)

Route.resource('/owner', 'OwnersController').apiOnly()