// ============================================
// STUDENT TYPES
// ============================================

/**
 * Base Student (Aluno) interface
 */
export interface Student {
    alunoID: bigint
    nome: string
    matricula: string
    numero_cel: string | null
    idade: number
    peso: number
    altura: number
    esporte: string
    esporte_alterName: string
    sub: string
    turno: string
  }
  
  /**
   * Student with calculated BMI
   */
  export interface StudentWithBMI extends Student {
    imc: number
  }
  
  /**
   * Student form data (for create/update operations)
   */
  export interface StudentFormData {
    name: string
    matricula: string
    telefone: string
    idade: string
    esporte: string
    turma: string
    turno: string
    peso: number
    altura: number
    esporte_alterName: string
  }
  
  // ============================================
  // TEACHER TYPES
  // ============================================
  
  /**
   * Teacher (Professor) interface
   */
  export interface Teacher {
    professorID: bigint
    professor_nome: string
    professor_email: string
    turno: string
    esporteID: number
    sub: string
    matricula: string
  }
  
  /**
   * Teacher with Sport information
   */
  export interface TeacherWithSport extends Teacher {
    tb_esportes: Sport
  }
  
  /**
   * Teacher form data
   */
  export interface TeacherFormData {
    name: string
    email: string
    matricula: string
    esporte: string
    esporteID: number
    turma: string
    turno: string
  }
  
  // ============================================
  // SPORT TYPES
  // ============================================
  
  /**
   * Sport (Esporte) interface
   */
  export interface Sport {
    esporteID: number
    esporte_name: string
    img: string
    alter_name: string
    route: string
  }
  
  // ============================================
  // BMI TYPES
  // ============================================
  
  /**
   * BMI statistics for a sub-category
   */
  export interface BMIStats {
    media: number
    count: number
  }
  
  /**
   * BMI statistics for a sport
   */
  export interface SportBMIStats {
    sub6?: BMIStats
    sub8: BMIStats
    sub10: BMIStats
    sub12: BMIStats
    sub14: BMIStats
    sub17: BMIStats
    media: BMIStats & {
      subDestaque: string
    }
  }
  
  /**
   * Chart data point for BMI visualization
   */
  export interface ChartDataPoint {
    name: string
    Ideal: number | string | undefined
    Atual: number | string
    amt?: number
  }
  
  // ============================================
  // FORM TYPES
  // ============================================
  
  /**
   * Generic form state
   */
  export interface FormState {
    isSubmitting: boolean
    error: string | null
  }
  
  /**
   * Select option for dropdowns
   */
  export interface SelectOption {
    value: string
    label: string
  }
  
  // ============================================
  // API RESPONSE TYPES
  // ============================================
  
  /**
   * Generic API response
   */
  export interface ApiResponse<T = unknown> {
    success: boolean
    data?: T
    error?: string
    message?: string
  }
  
  /**
   * Paginated response
   */
  export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
  
  // ============================================
  // UTILITY TYPES
  // ============================================
  
  /**
   * Make all properties optional recursively
   */
  export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
  }
  
  /**
   * Extract keys of type from object
   */
  export type KeysOfType<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never
  }[keyof T]