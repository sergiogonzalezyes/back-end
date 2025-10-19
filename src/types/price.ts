export interface Price {
  id: number;
  card_id: number;
  subtype: string | null;
  low_price: number | null;
  mid_price: number | null;
  high_price: number | null;
  market_price: number | null;
  direct_low_price: number | null;
  recorded_on: string;  // timestamp
  created_at: string;
  updated_at: string | null;
  created_by: string | null;
  updated_by: string | null;
}
