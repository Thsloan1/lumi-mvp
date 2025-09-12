import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create organization
  const organization = await prisma.organization.create({
    data: {
      name: 'Sunny Days Learning Center',
      description: 'A nurturing environment for early childhood development',
    },
  })

  console.log('Created organization:', organization.name)

  // Create classroom
  const classroom = await prisma.classroom.create({
    data: {
      name: 'Rainbow Room',
      description: 'Ages 3-5 classroom with focus on creative learning',
      organizationId: organization.id,
    },
  })

  console.log('Created classroom:', classroom.name)

  // Create child
  const child = await prisma.child.create({
    data: {
      firstName: 'Emma',
      lastName: 'Johnson',
      dateOfBirth: new Date('2020-03-15'),
      classroomId: classroom.id,
    },
  })

  console.log('Created child:', `${child.firstName} ${child.lastName}`)
  console.log('Seed completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })