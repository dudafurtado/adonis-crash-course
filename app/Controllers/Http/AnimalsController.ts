import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AnimalsController {
  async index () {
    return 'Should list all the content related to the class'
  }

  async create () {
    return 'For a tradicional web app, the server are going to return a html page, so this is the case. To create a page on a web format. apiOnly() is the solution for this dont appear at the api format'
  }

  async store ({ request }: HttpContextContract) {
    const pet = request.body()
    return {
      message: 'We gonna add the content of body on the database',
      newAnimal: pet,
    }
  }

  async show ({ params }: HttpContextContract) {
    return `Display only the animal number ${params.id}`
  }

  async edit () {
    // { params, request }: HttpContextContract
    return 'Its about a web application that has a front-end too'
  }

  async update ({ params, request, response }: HttpContextContract) {
    response.status(202)
    return {
      message: 'We going to edit the animal that already exists at database based on the id informed',
      dataToUpdated: request.body(),
      animalThatWillBeUpdated: params.id
    }
  }

  async destroy ({ params }: HttpContextContract) {
    return `The idea is to delete / destroy the number ${params.id} on the list`
  }
}
