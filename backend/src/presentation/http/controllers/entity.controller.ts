import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { CreateEntityUseCase } from '../../../application/use-cases/create-entity.use-case';
import { GetEntitiesByProgramUseCase } from '../../../application/use-cases/get-entities-by-program.use-case';
import { ProgramEntityType } from '../../../domain/entities/program-entity.entity';

const VALID_ENTITY_TYPES: ProgramEntityType[] = [
  'DONANTE',
  'RECEPTORA',
  'PACIENTE',
  'EMBRION',
];

const createEntitySchema = z.object({
  entityType: z.enum(
    VALID_ENTITY_TYPES as [ProgramEntityType, ...ProgramEntityType[]],
    { errorMap: () => ({ message: `Tipo inválido. Valores: ${VALID_ENTITY_TYPES.join(', ')}` }) },
  ),
  name: z.string().min(1, 'El nombre es requerido').max(200),
  externalReference: z.string().max(100).optional(),
});

export class EntityController {
  constructor(
    private readonly createEntityUseCase: CreateEntityUseCase,
    private readonly getEntitiesUseCase: GetEntitiesByProgramUseCase,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = createEntitySchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          error: {
            message: 'Datos de entrada inválidos',
            details: parsed.error.errors.map((e) => e.message),
          },
        });
        return;
      }

      const entity = await this.createEntityUseCase.execute({
        programId: req.params['programId']!,
        organizationId: req.user!.orgId,
        ...parsed.data,
      });

      res.status(201).json({ data: entity });
    } catch (err) {
      next(err);
    }
  };

  getByProgram = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const entityType = req.query['entityType'] as ProgramEntityType | undefined;

      if (entityType && !VALID_ENTITY_TYPES.includes(entityType)) {
        res.status(400).json({
          error: {
            message: `Tipo inválido. Valores: ${VALID_ENTITY_TYPES.join(', ')}`,
          },
        });
        return;
      }

      const entities = await this.getEntitiesUseCase.execute({
        programId: req.params['programId']!,
        organizationId: req.user!.orgId,
        entityType,
      });

      res.status(200).json({ data: entities });
    } catch (err) {
      next(err);
    }
  };
}
