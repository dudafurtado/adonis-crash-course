// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PetsController {
  public async index () {
    return 'list of pets'
  }

  public async store ({ request }) {
    const pet = request.body()
    return {
      whatWasAdded: pet,
      message: 'You added sucessfully a pet'
    }
  }
}
