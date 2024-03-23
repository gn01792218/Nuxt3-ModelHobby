export declare interface ModelFinishInfo {
  id: number;
  title: string;
  finished_date: Date;
  description: string;
  process_imgs: string[];
  gallery: string[];
}
export declare interface CreateFinishInfoRequest {
  title: string;
  finished_date: Date | null;
  description: string;
  process_imgs: string[];
  gallery: string[];
}
export declare interface UpdateFinishInfoRequest {
  id:number
  title: string;
  finished_date: Date;
  description: string;
  process_imgs: string[];
  gallery: string[];
}
