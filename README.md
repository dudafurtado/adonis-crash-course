# Step by step AdonisJS crash course
## Inpired from https://www.youtube.com/watch?v=bSvw887ptKI by Marius Espejo

**1.** npm init adonis-ts-app@latest name-of-project  
(for a TypeScript language following the framework adonis)

**2.** Type of:  
- web - for a front + back-end project  
- api - to a bacj-end aplication   
- slim - the most basic one  

**3.** Enter name + eslint or/and prettier

**4.** npm run dev or cd name-of-project  
node ace serve --watch  

**5.** at this start moment you should play with routes on de file inside the start folder  
make sure to use inside the async function `({ params, request, response, query })`  
get the `request.body()`  
inform a `response.status()`  
and return 'something' so you can check everything out  


# Routes created for test

*http://localhost:3333*

## GET '/'

response:  
`{  
  "hello": "world"  
}`

## POST '/post'

response:  
`{  
  "message": "Hello I am the first route created by Duda's hands on this project"  
}`

## GET '/get/:id'

request:  
http://localhost:3333/get/*25*

response:  
`The id informated on params is 25`

## PATCH '/context'

request:  
`{  
  "name": "Duda",  
  "message": "It's a plesure to meet you"  
}`

response:  
`It's a plesure to meet you`

6. now its time to organize your controllers  
node ace make:controller Pet  
on this file you should provide some metodos so you can call on the routes file between string 'SomethingsController.index'

## GET '/pets' = index()

response:  
`list of pets`

## POST '/pets/new' = store()

request:  
`{  
  "name": "Bobby",  
  "especie": "Cat",  
  "description": "It has a cold heart but it's beautiful",  
  "family": "2 sons"  
}`

response:  
`{  
  "whatWasAdded": {  
    "name": "Bobby",  
    "especie": "Cat",  
    "description": "It has a cold heart but it's beautiful",  
    "family": "2 sons"  
  },  
  "message": "You added sucessfully a pet"  
}`

7. `node ace list:routes`   
(show you all the routes that you created until now)

8. to make crud more flexible:  
`Route.resource('/cars', 'CarsController')` + `node ace list:routes`  
you will be able to get all the possible routes on your terminal  
`apiOnly()` at the end is ideal if its just a back-end application

## GET '/animals' = index()

response:  
`Should list all the content related to the class`

## GET '/animals/create'

**just example, this is for web format**

## POST '/animals' = store()

request:  
`{  
  "name": "Lion"  
}`

response:  
`{  
  "message": "We gonna add the content of body on the database",  
  "newAnimal": {  
    "name": "Lion"  
  }  
}`

## GET '/animals/:id' = show()

response:  
`Display only the animal number 1`

## GET '/animals/:id/edit' = edit()

**just example, this is for web format**

## PUT | PATCH '/animals/:id' = update()

request:  
`{  
  "name": "tiger"  
}`

response:  
`{  
  "message": "We going to edit the animal that already exists at database based on the id informed",  
  "dataToUpdated": {  
    "name": "tiger"  
  },  
  "animalThatWillBeUpdated": "2"  
}`

## DELETE '/animals/:id' = destroy()

response:
`The idea is to delete / destroy the number 2 on the list`

  
*Now it's time to make thing feel more real*

9. Add and Config database  
`npm install @adonisjs/lucid`  
`node ace configure @adonisjs/lucid`  
select the type of system of database

10. To work with database you must create some tables based on the project
Let's create a migration
`node ace make:migration pets`
`node ace make:migration animals`
the sintax of migration is based on Knex.js
Examples:  
`{  
  table.increments('id');  
  table.string('name');  
}`
Time to run this migration:  
`node ace migration:run`

11. To manipulate the data inside migration its time for the model  
Let's create a model  
`node ace make:model Pet`    
`@column()  
public name:string`  
For each table you need to have a individual model  
**!** luxon is a library that are use inside Adonis to define a type of date  
**!** luxon = moment.js  
The model are not going to change the schema for migrations / database

12. Import the model inside the controller with the first letter upper case  
**index ()** ---> `await Pet.all()` = select * from pets  
**store ()** ---> `await Pet.create(request.body())` = insert   
**show ()** ---> `await Pet.findOrFail(params.id) `  
**update ()** ---> `const pet = await Pet.findOrFail(params.id)`  
PUT) `pet = body` PATCH) `pet.something = body.something
await pet.save()`
**destroy ()** ---> `const pet = await Pet.findOrFail(params.id)
await pet.delete()`

**!** `findOrFail()` is used to stop the application at this current line if there is anything at the specific search at database  
**!** `Pet.findOrFail(params.id)` = select * from pets where 'id'

13. Time to validate our request  
Let's create a validator  
`node ace make:validator CreateFish`  
 `public schema = schema.create({  
  name: schema.string({ trim: true }),  
  age: schema.number(),  
  description: schema.string(),  
  email: schema.string({}, [  
    rules.email(),  
  ]),  
})`  
import the validator on the controller and use  
`await request.validate(CreateFish)`  
The name of the vallidate data normally are call of 'payload'


## GET '/owner' = index()

response:  
- Array with all the owners  
`[]`  
`[
  {  
    "id": 1,  
    "name": "Duda",  
    "email": "duda@email.com",  
    "age": 19,  
    "description": 1,  
    "created_at": "2022-09-19T11:15:57.000-03:00",  
    "updated_at": "2022-09-19T11:15:57.000-03:00"  
  }  
]`

## POST '/owner' = store()

request:  
`{  
  "name": "Duda",  
  "email": "duda@email.com",  
  "age": 19,  
  "description": 1  
}`

response:  
`{  
  "message": "Owner created successfully"  
}`

this is the type of error you are going to recive if something goes wrong:
`{  
  "errors": [  
    {  
      "rule": "alpha",  
      "field": "name",  
      "message": "alpha validation failed"  
    },  
    {  
      "rule": "unique",  
      "field": "email",  
      "message": "unique validation failure"  
    }  
  ]  
}`

## GET '/owner/:id' = show()

response:  
`{  
  "id": 2,  
  "name": "Maria",  
  "email": "maria@email.com",  
  "age": 30,  
  "description": 2,  
  "created_at": "2022-09-19T11:24:37.000-03:00",  
  "updated_at": "2022-09-19T11:24:37.000-03:00"  
}`

## PUT | PATCH '/owner/:id' = update()

request:  
`{  
  "name": "Elena",  
  "email": "mariaelena@email.com",  
  "age": 26,  
  "description": 1  
}`

response:  
`{  
  "id": 2,  
  "name": "Elena",  
  "email": "maria@email.com",  
  "age": 30,  
  "description": 2,  
  "created_at": "2022-09-19T11:24:37.000-03:00",  
  "updated_at": "2022-09-19T11:27:29.390-03:00"  
}`

## DELETE '/owner/:id' = destroy()

response:  
`{  
  "message": "Owner deleted"  
}`

14. Don't forgot that we have to important commands  
`npm run build`  
to make typescript into javascript. you need to use before commit  
`npm run dev`  
to make your project run on localhost

15. test everything to make sure you understand

16. `git add . && git commit -m "Project completed"`  
`git push origin master / main`

*I hope we have learn something funny together today. Have a wonderful day!*
