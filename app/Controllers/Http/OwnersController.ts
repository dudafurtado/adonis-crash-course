import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OwnersController {
  async index () {

  }

  async store ({ request }: HttpContextContract) {
    return request
  }

  async show ({ params }: HttpContextContract) {
    return params
  }

  async update ({ params, request }: HttpContextContract) {
    return {
      one: params,
      two: request
    }  
  }

  async destroy ({ params }: HttpContextContract) {
    return params
  }
}
