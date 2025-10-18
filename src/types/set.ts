export interface Set {
  id: number;
  category_id: number | null;
  tcgplayer_group_id: number | null;
  name: string;
  abbreviation: string | null;
  release_date: string | null;  // date
  modified_on: string | null;
  image_url: string | null;
  is_supplemental: boolean | null;
  published_on: string | null;
  created_at: string;
  updated_at: string | null;
  created_by: string | null;
  updated_by: string | null;
}
