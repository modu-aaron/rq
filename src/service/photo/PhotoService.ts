import { Photo } from "@/types/photo";
import Service from "@/service/Service";

class PhotoService extends Service {
  getPhotos() {
    return this.http.get<Photo[]>("/photos");
  }

  getPhoto({ photoId }: { photoId: number }) {
    return this.http.get<Photo>(`/photos/${photoId}`);
  }

  getComments({ photoId }: { photoId: number }) {
    return this.http.get<Comment[]>(`/photos/${photoId}/comments`);
  }

  getComment({ photoId, commentId }: { photoId: number; commentId: number }) {
    return this.http.get<Comment[]>(`/photos/${photoId}/comments/${commentId}`);
  }
}

export default new PhotoService();
