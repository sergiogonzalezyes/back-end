export interface Collection {
  id: number;
  user_id: number;
  name: string;
  description: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string | null;
  created_by: string | null;
  updated_by: string | null;
}
