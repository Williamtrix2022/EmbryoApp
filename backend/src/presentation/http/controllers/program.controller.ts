import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { CreateProgramUseCase } from '../../../application/use-cases/create-program.use-case';
import { GetProgramsUseCase } from '../../../application/use-cases/get-programs.use-case';
import { UpdateProgramStatusUseCase } from '../../../application/use-cases/update-program-status.use-case';
import { ProgramStatus } from '../../../domain/entities/program.entity';

const VALID_STATUSES: ProgramStatus[] = [
  'PLANIFICADO',
  'EN_CURSO',
  'PAUSADO',
  'COMPLETADO',
  'CANCELADO',
];

const createProgramSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(200),
  code: z.string().min(1, 'El código es requerido').max(50),
  startDate: z.string().min(1, 'La fecha de inicio es requerida'),
  estimatedEndDate: z.string().optional(),
  notes: z.string().max(1000).optional(),
});

const updateStatusSchema = z.object({
  status: z.enum(
    VALID_STATUSES as [ProgramStatus, ...ProgramStatus[]],
    { errorMap: () => ({ message: `Estado inválido. Valores permitidos: ${VALID_STATUSES.join(', ')}` }) },
  ),
});

export class ProgramController {
  constructor(
    private readonly createProgram: CreateProgramUseCase,
    private readonly getPrograms: GetProgramsUseCase,
    private readonly updateProgramStatus: UpdateProgramStatusUseCase,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = createProgramSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          error: {
            message: 'Datos de entrada inválidos',
            details: parsed.error.errors.map((e) => e.message),
          },
        });
        return;
      }

      const program = await this.createProgram.execute({
        ...parsed.data,
        organizationId: req.user!.orgId,
      });

      res.status(201).json({ data: program });
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const status = req.query['status'] as ProgramStatus | undefined;

      if (status && !VALID_STATUSES.includes(status)) {
        res.status(400).json({
          error: { message: `Estado inválido. Valores permitidos: ${VALID_STATUSES.join(', ')}` },
        });
        return;
      }

      const programs = await this.getPrograms.execute({
        organizationId: req.user!.orgId,
        status,
      });

      res.status(200).json({ data: programs });
    } catch (err) {
      next(err);
    }
  };

  updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = updateStatusSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          error: {
            message: 'Estado inválido',
            details: parsed.error.errors.map((e) => e.message),
          },
        });
        return;
      }

      const program = await this.updateProgramStatus.execute({
        programId: req.params['id']!,
        organizationId: req.user!.orgId,
        newStatus: parsed.data.status,
      });

      res.status(200).json({ data: program });
    } catch (err) {
      next(err);
    }
  };
}
