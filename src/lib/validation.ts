export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  /**
   * Validates institutional email (must end with @sebsa.com.br)
   * 
   * @param email - Email to validate
   * @returns True if valid institutional email
   * 
   */
  export function isInstitutionalEmail(email: string): boolean {
    return email.toLowerCase().endsWith('@sebsa.com.br')
  }
  
  /**
   * Validates phone number (Brazilian format)
   * 
   * @param phone - Phone number to validate
   * @returns True if valid format
   * 
   */
  export function isValidPhone(phone: string): boolean {
    // Remove formatting
    const cleaned = phone.replace(/\D/g, '')
    // Should have 10 or 11 digits (with area code)
    return cleaned.length === 10 || cleaned.length === 11
  }
  
  /**
   * Formats phone number to Brazilian standard
   * 
   * @param phone - Raw phone number
   * @returns Formatted phone number
   * 
   */
  export function formatPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '')
  
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
    }
  
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`
    }
  
    return phone
  }
  
  /**
   * Validates age (must be between min and max)
   * 
   * @param age - Age to validate
   * @param min - Minimum age (default: 5)
   * @param max - Maximum age (default: 18)
   * @returns True if valid age
   * 
   */
  export function isValidAge(
    age: number,
    min: number = 5,
    max: number = 18,
  ): boolean {
    return age >= min && age <= max
  }
  
  /**
   * Validates weight (must be positive and reasonable)
   * 
   * @param weight - Weight in kg
   * @returns True if valid weight
   * 
   */
  export function isValidWeight(weight: number): boolean {
    return weight > 0 && weight < 200
  }
  
  /**
   * Validates height (must be positive and reasonable)
   * 
   * @param height - Height in meters
   * @returns True if valid height
   * 
   */
  export function isValidHeight(height: number): boolean {
    return height > 0 && height < 3
  }
  
  /**
   * Sanitizes string input
   * 
   * @param input - String to sanitize
   * @returns Sanitized string
   * 
   */
  export function sanitizeInput(input: string): string {
    return input.trim().replace(/\s+/g, ' ')
  }