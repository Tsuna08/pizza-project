export interface UserResponse {
  access_token: string;
}

export interface UserProfile {
  id: number;
  email: string;
  address: string;
  name: string;
  phone: string;
}
