import { Router } from 'express';
import { CreateProgramUseCase } from '../../../application/use-cases/create-program.use-case';
import { GetProgramsUseCase } from '../../../application/use-cases/get-programs.use-case';
import { UpdateProgramStatusUseCase } from '../../../application/use-cases/update-program-status.use-case';
import { ProgramPrismaRepository } from '../../../infrastructure/repositories/program-prisma.repository';
import { requireAuth } from './auth.routes';
import { ProgramController } from '../controllers/program.controller';

const programRepository = new ProgramPrismaRepository();

const createProgramUseCase = new CreateProgramUseCase(programRepository);
const getProgramsUseCase = new GetProgramsUseCase(programRepository);
const updateProgramStatusUseCase = new UpdateProgramStatusUseCase(programRepository);

const controller = new ProgramController(
  createProgramUseCase,
  getProgramsUseCase,
  updateProgramStatusUseCase,
);

export const programRouter = Router();

// Todas las rutas de programas requieren autenticación
programRouter.use(requireAuth);

programRouter.post('/programs', controller.create);
programRouter.get('/programs', controller.getAll);
programRouter.patch('/programs/:id/status', controller.updateStatus);
