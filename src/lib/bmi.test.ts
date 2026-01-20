import {
  calculateBMI,
  addBMIToStudent,
  calculateSubCategoryAverage,
  calculateSportStats,
  classifyBMI,
} from './bmi'
import { StudentWithBMI } from '@/types'

describe('calculateBMI', () => {
  it('returns correct BMI value for given weight and height', () => {
    // BMI = weight / (height * height)
    expect(calculateBMI(70, 1.75)).toBe(22.86) // 70 / (1.75 * 1.75) = 22.857...
    expect(calculateBMI(80, 1.80)).toBe(24.69) // 80 / (1.80 * 1.80) = 24.691...
    expect(calculateBMI(60, 1.65)).toBe(22.04) // 60 / (1.65 * 1.65) = 22.038...
  })

  it('returns 0 when height is 0 to avoid division by zero', () => {
    expect(calculateBMI(70, 0)).toBe(0)
  })

  it('rounds to 2 decimal places', () => {
    expect(calculateBMI(70.5, 1.756)).toBe(22.86)
  })
})

describe('addBMIToStudent', () => {
  it('adds BMI property to student object', () => {
    const student = {
      alunoID: BigInt(1),
      nome: 'João Silva',
      matricula: '12345',
      numero_cel: '11999999999',
      idade: 12,
      peso: 45,
      altura: 1.5,
      esporte: 'Futebol',
      esporte_alterName: 'futebol',
      sub: 'Sub-12',
      turno: 'Manhã',
    }

    const result = addBMIToStudent(student)

    expect(result).toHaveProperty('imc')
    expect(result.imc).toBe(20) // 45 / (1.5 * 1.5) = 20
    expect(result.nome).toBe('João Silva')
    expect(result.peso).toBe(45)
    expect(result.altura).toBe(1.5)
  })

  it('preserves all original student properties', () => {
    const student = {
      alunoID: BigInt(2),
      nome: 'Maria Santos',
      matricula: '54321',
      numero_cel: null,
      idade: 14,
      peso: 50,
      altura: 1.6,
      esporte: 'Voleibol',
      esporte_alterName: 'voleibol',
      sub: 'Sub-14',
      turno: 'Tarde',
    }

    const result = addBMIToStudent(student)

    expect(result.alunoID).toBe(BigInt(2))
    expect(result.matricula).toBe('54321')
    expect(result.numero_cel).toBe(null)
    expect(result.turno).toBe('Tarde')
  })
})

describe('calculateSubCategoryAverage', () => {
  const mockStudents: StudentWithBMI[] = [
    {
      alunoID: BigInt(1),
      nome: 'Student 1',
      matricula: '001',
      numero_cel: null,
      idade: 10,
      peso: 35,
      altura: 1.4,
      esporte: 'Futebol',
      esporte_alterName: 'futebol',
      sub: 'Sub-10',
      turno: 'Manhã',
      imc: 17.86,
    },
    {
      alunoID: BigInt(2),
      nome: 'Student 2',
      matricula: '002',
      numero_cel: null,
      idade: 10,
      peso: 40,
      altura: 1.5,
      esporte: 'Futebol',
      esporte_alterName: 'futebol',
      sub: 'Sub-10',
      turno: 'Manhã',
      imc: 17.78,
    },
    {
      alunoID: BigInt(3),
      nome: 'Student 3',
      matricula: '003',
      numero_cel: null,
      idade: 12,
      peso: 45,
      altura: 1.55,
      esporte: 'Futebol',
      esporte_alterName: 'futebol',
      sub: 'Sub-12',
      turno: 'Tarde',
      imc: 18.73,
    },
  ]

  it('returns correct average BMI and count for given subcategory', () => {
    const result = calculateSubCategoryAverage(mockStudents, 'Sub-10')

    expect(result.count).toBe(2)
    // Average of 17.86 and 17.78 = 17.82
    expect(result.media).toBe(17.82)
  })

  it('returns correct stats for subcategory with single student', () => {
    const result = calculateSubCategoryAverage(mockStudents, 'Sub-12')

    expect(result.count).toBe(1)
    expect(result.media).toBe(18.73)
  })

  it('returns zero values when no students match subcategory', () => {
    const result = calculateSubCategoryAverage(mockStudents, 'Sub-14')

    expect(result.count).toBe(0)
    expect(result.media).toBe(0)
  })

  it('returns zero values for empty student array', () => {
    const result = calculateSubCategoryAverage([], 'Sub-10')

    expect(result.count).toBe(0)
    expect(result.media).toBe(0)
  })
})

describe('calculateSportStats', () => {
  const mockStudents: StudentWithBMI[] = [
    {
      alunoID: BigInt(1),
      nome: 'Student 1',
      matricula: '001',
      numero_cel: null,
      idade: 6,
      peso: 22,
      altura: 1.2,
      esporte: 'Futebol',
      esporte_alterName: 'futebol',
      sub: 'Sub-6',
      turno: 'Manhã',
      imc: 15.28, // Close to ideal 14.68
    },
    {
      alunoID: BigInt(2),
      nome: 'Student 2',
      matricula: '002',
      numero_cel: null,
      idade: 8,
      peso: 28,
      altura: 1.3,
      esporte: 'Futebol',
      esporte_alterName: 'futebol',
      sub: 'Sub-8',
      turno: 'Manhã',
      imc: 16.57, // Very close to ideal 16.18
    },
    {
      alunoID: BigInt(3),
      nome: 'Student 3',
      matricula: '003',
      numero_cel: null,
      idade: 10,
      peso: 40,
      altura: 1.5,
      esporte: 'Futebol',
      esporte_alterName: 'futebol',
      sub: 'Sub-10',
      turno: 'Tarde',
      imc: 17.78, // Exactly ideal 17.78
    },
    {
      alunoID: BigInt(4),
      nome: 'Student 4',
      matricula: '004',
      numero_cel: null,
      idade: 14,
      peso: 55,
      altura: 1.65,
      esporte: 'Basquete',
      esporte_alterName: 'basquete',
      sub: 'Sub-14',
      turno: 'Manhã',
      imc: 20.20,
    },
  ]

  it('calculates overall average BMI, counts and highlights subcategory closest to ideal BMI', () => {
    const result = calculateSportStats(mockStudents, 'Futebol')

    expect(result.count).toBe(3)
    // Average: (15.28 + 16.57 + 17.78) / 3 = 16.54333... = 16.54
    expect(result.media).toBe(16.54)
    // Sub-10 has BMI 17.78, which exactly matches ideal 17.78 (difference = 0)
    expect(result.subDestaque).toBe('Sub-10')
  })

  it('correctly filters by sport name', () => {
    const result = calculateSportStats(mockStudents, 'Basquete')

    expect(result.count).toBe(1)
    expect(result.media).toBe(20.20)
    expect(result.subDestaque).toBe('Sub-14')
  })

  it('returns zero values when no students match sport', () => {
    const result = calculateSportStats(mockStudents, 'Natação')

    expect(result.count).toBe(0)
    expect(result.media).toBe(0)
    expect(result.subDestaque).toBe('')
  })

  it('returns zero values for empty student array', () => {
    const result = calculateSportStats([], 'Futebol')

    expect(result.count).toBe(0)
    expect(result.media).toBe(0)
    expect(result.subDestaque).toBe('')
  })

  it('highlights subcategory with smallest difference from ideal BMI', () => {
    const studentsWithVariation: StudentWithBMI[] = [
      {
        alunoID: BigInt(1),
        nome: 'Student 1',
        matricula: '001',
        numero_cel: null,
        idade: 6,
        peso: 22,
        altura: 1.2,
        esporte: 'Futebol',
        esporte_alterName: 'futebol',
        sub: 'Sub-6',
        turno: 'Manhã',
        imc: 20.0, // Far from ideal 14.68 (difference = 5.32)
      },
      {
        alunoID: BigInt(2),
        nome: 'Student 2',
        matricula: '002',
        numero_cel: null,
        idade: 12,
        peso: 45,
        altura: 1.55,
        esporte: 'Futebol',
        esporte_alterName: 'futebol',
        sub: 'Sub-12',
        turno: 'Tarde',
        imc: 19.16, // Exactly matches ideal 19.16 (difference = 0)
      },
    ]

    const result = calculateSportStats(studentsWithVariation, 'Futebol')
    expect(result.subDestaque).toBe('Sub-12')
  })
})

describe('classifyBMI', () => {
  describe('for children and adolescents (age < 18)', () => {
    it('classifies BMI correctly according to age group thresholds', () => {
      expect(classifyBMI(13.5, 10)).toBe('Abaixo do peso')
      expect(classifyBMI(14, 10)).toBe('Normal')
      expect(classifyBMI(18, 12)).toBe('Normal')
      expect(classifyBMI(22.9, 14)).toBe('Normal')
      expect(classifyBMI(23, 10)).toBe('Sobrepeso')
      expect(classifyBMI(26.5, 12)).toBe('Sobrepeso')
      expect(classifyBMI(27, 14)).toBe('Obesidade')
      expect(classifyBMI(30, 16)).toBe('Obesidade')
    })

    it('correctly handles boundary values for children', () => {
      expect(classifyBMI(13.99, 10)).toBe('Abaixo do peso')
      expect(classifyBMI(14.0, 10)).toBe('Normal')
      expect(classifyBMI(22.99, 10)).toBe('Normal')
      expect(classifyBMI(23.0, 10)).toBe('Sobrepeso')
      expect(classifyBMI(26.99, 10)).toBe('Sobrepeso')
      expect(classifyBMI(27.0, 10)).toBe('Obesidade')
    })
  })

  describe('for adults (age >= 18)', () => {
    it('classifies BMI correctly according to adult thresholds', () => {
      expect(classifyBMI(17.5, 18)).toBe('Abaixo do peso')
      expect(classifyBMI(18.5, 25)).toBe('Normal')
      expect(classifyBMI(20, 30)).toBe('Normal')
      expect(classifyBMI(24.9, 20)).toBe('Normal')
      expect(classifyBMI(25, 22)).toBe('Sobrepeso')
      expect(classifyBMI(27, 35)).toBe('Sobrepeso')
      expect(classifyBMI(29.9, 40)).toBe('Sobrepeso')
      expect(classifyBMI(30, 25)).toBe('Obesidade')
      expect(classifyBMI(35, 50)).toBe('Obesidade')
    })

    it('correctly handles boundary values for adults', () => {
      expect(classifyBMI(18.49, 18)).toBe('Abaixo do peso')
      expect(classifyBMI(18.5, 18)).toBe('Normal')
      expect(classifyBMI(24.99, 18)).toBe('Normal')
      expect(classifyBMI(25.0, 18)).toBe('Sobrepeso')
      expect(classifyBMI(29.99, 18)).toBe('Sobrepeso')
      expect(classifyBMI(30.0, 18)).toBe('Obesidade')
    })
  })

  it('uses correct thresholds at age transition (17 vs 18)', () => {
    // Age 17 uses child thresholds
    expect(classifyBMI(17.5, 17)).toBe('Normal')
    expect(classifyBMI(23, 17)).toBe('Sobrepeso')

    // Age 18 uses adult thresholds
    expect(classifyBMI(17.5, 18)).toBe('Abaixo do peso')
    expect(classifyBMI(23, 18)).toBe('Normal')
  })
})
