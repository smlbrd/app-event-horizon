export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  start_time: string;
  end_time: string;
  image_url?: string;
  image_alt_text?: string;
  created_by?: string;
}
