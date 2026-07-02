import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Organización de prueba
  const org = await prisma.organization.upsert({
    where: { id: 'org-seed-001' },
    update: {},
    create: {
      id: 'org-seed-001',
      name: 'Finca Demo',
      organizationType: 'FINCA',
      status: 'ACTIVA',
    },
  });

  // Usuario veterinario de prueba
  const passwordHash = await bcrypt.hash('Admin1234!', 10);

  const user = await prisma.user.upsert({
    where: { email: 'admin@embryoapp.com' },
    update: {},
    create: {
      organizationId: org.id,
      fullName: 'Administrador Demo',
      email: 'admin@embryoapp.com',
      passwordHash,
      role: 'ADMINISTRADOR',
      status: 'ACTIVO',
    },
  });

  console.log('✅ Seed completado');
  console.log(`   Organización: ${org.name}`);
  console.log(`   Usuario: ${user.email}`);
  console.log(`   Contraseña: Admin1234!`);
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
