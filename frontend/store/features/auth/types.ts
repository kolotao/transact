  /**
   * When we do `POST /api/login`, we send { email, password }.
   */
  export interface LoginPayload {
    email: string
    password: string
  }
  
  /**
   * When we do `POST /api/register`, we might have { email, password, firstName, lastName, etc. }.
   * Adjust the fields based on your registerValidator in the backend.
   */
  export interface RegisterPayload {
    firstName: string
    lastName: string
    email: string
    password: string
  }
  