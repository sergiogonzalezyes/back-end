export interface Card {
  id: number;
  product_id: number | null;
  set_id: number | null;
  name: string;
  clean_name: string | null;
  url: string | null;
  image_url: string | null;
  rarity: string | null;
  card_type: string | null;
  stage: string | null;
  hp: string | null;
  card_text: string | null;
  attack_1: string | null;
  attack_2: string | null;
  weakness: string | null;
  resistance: string | null;
  retreat_cost: string | null;
  image_count: number | null;
  ext_number: string | null;
  created_at: string;
  updated_at: string | null;
  created_by: string | null;
  updated_by: string | null;
}
