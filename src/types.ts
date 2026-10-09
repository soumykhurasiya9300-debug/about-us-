export type Language = 'en' | 'hi';

export interface LookbookItem {
  id: string;
  titleEn: string;
  titleHi: string;
  categoryEn: string;
  categoryHi: string;
  tagEn: string;
  tagHi: string;
  descriptionEn: string;
  descriptionHi: string;
  imageUrl: string;
  filter: 'all' | 'ethnic' | 'kids' | 'casual' | 'wedding';
  fabric?: string;
  fit?: string;
}

export interface CategoryItem {
  number: string;
  nameEn: string;
  nameHi: string;
  subEn: string;
  subHi: string;
  filterTag: 'all' | 'ethnic' | 'kids' | 'casual' | 'wedding';
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  captionEn: string;
  captionHi: string;
  likes: string;
  profileHandle: string;
  link: string;
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  occasion: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}
