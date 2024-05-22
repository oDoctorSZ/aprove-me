import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { z } from "zod";
import { GetAssignorUseCase } from "src/domain/operations/application/use-cases/assignors/use-cases/get-assignor";

const getAssignorBodySchema = z.string().uuid()

type GetAssignorBodySchema = z.infer<typeof getAssignorBodySchema>

@Controller('/integrations/assignor')
export class GetAssignorController {
  constructor(
    private getReceivable: GetAssignorUseCase
  ) {}

  @Get('/:id')
  @HttpCode(200)
  async handle(@Param('id') id: GetAssignorBodySchema) {
    const { value: receivable, isLeft } = await this.getReceivable.execute({
      assignorId: id
    })
    
    if (isLeft()) {
      return {
        message: 'Resource not found'
      }
    }

    return receivable
  }
}