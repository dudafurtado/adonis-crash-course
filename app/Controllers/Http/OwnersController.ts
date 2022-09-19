import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Owner from 'App/Models/Owner'
import CreateOwnerValidator from 'App/Validators/CreateOwnerValidator'
import UpdateOwnerValidator from 'App/Validators/UpdateOwnerValidator'

interface IOwner {
  name: string;
  email: string;
  age: number;
  description: number;
}

export default class OwnersController {
  async index () {
    return await Owner.all()
  }

  async store ({ request, response }: HttpContextContract) {
    const payload: IOwner = await request.validate(CreateOwnerValidator)

    await Owner.create(payload)

    return response.status(201).json({
      message: 'Owner created successfully'
    })
  }

  async show ({ params }: HttpContextContract) {
    return await Owner.findOrFail(params.id)
  }

  async update ({ params, request }: HttpContextContract) {
    const payload: IOwner = await request.validate(UpdateOwnerValidator)

    let owner = await Owner.findOrFail(params.id)

    owner.name = payload.name

    await owner.save()
    return owner
  }

  async destroy ({ params, response }: HttpContextContract) {
    const owner = await Owner.findOrFail(params.id)

    owner.delete()

    return response.status(200).json({
      message: 'Owner deleted'
    })
  }
}
