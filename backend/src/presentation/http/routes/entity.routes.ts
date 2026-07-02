import { Router } from 'express';
import { CreateEntityUseCase } from '../../../application/use-cases/create-entity.use-case';
import { GetEntitiesByProgramUseCase } from '../../../application/use-cases/get-entities-by-program.use-case';
import { ProgramEntityPrismaRepository } from '../../../infrastructure/repositories/program-entity-prisma.repository';
import { ProgramPrismaRepository } from '../../../infrastructure/repositories/program-prisma.repository';
import { requireAuth } from './auth.routes';
import { EntityController } from '../controllers/entity.controller';

const programRepository = new ProgramPrismaRepository();
const entityRepository = new ProgramEntityPrismaRepository();

const createEntityUseCase = new CreateEntityUseCase(programRepository, entityRepository);
const getEntitiesUseCase = new GetEntitiesByProgramUseCase(programRepository, entityRepository);

const controller = new EntityController(createEntityUseCase, getEntitiesUseCase);

export const entityRouter = Router();

entityRouter.use(requireAuth);

entityRouter.post('/programs/:programId/entities', controller.create);
entityRouter.get('/programs/:programId/entities', controller.getByProgram);
