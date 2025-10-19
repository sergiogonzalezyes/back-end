export interface CollectionCard {
  id: number;
  collection_id: number;
  card_id: number;
  quantity: number | null;
  condition: string | null;
  is_foil: boolean | null;
  notes: string | null;
  created_at: string;
  updated_at: string | null;
  created_by: string | null;
  updated_by: string | null;
}
