export interface User {
  id: number;
  username: string;
  email: string | null;
  password_hash: string;
  display_name: string | null;
  created_at: string;
  updated_at: string | null;
  created_by: string | null;
  updated_by: string | null;
}
