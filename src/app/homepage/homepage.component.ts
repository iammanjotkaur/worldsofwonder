import { Component, OnInit } from '@angular/core';
import { LoadImagesService } from '../load-images.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {Monument} from '../monument';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {

  // response: any[];
  res: any[];
  searchQuery: string;
  apiHits = 0;
  totalLikes = 0;
  images: any[];
  names = ['Select', 'Ratings', 'Likes'];
  feature: string;
  likes: any[];
  ratings: any[];
  public likeState  = [];
  details = [];
  j: number;
  constructor(private loadImageService: LoadImagesService) {
    this.fetchImage();
  }

  ngOnInit(): void {
    // localStorage.setItem('apiHits', JSON.stringify(0));
  }
  displayImages(response) {
    // console.log('Here->', response);
    this.images = response;
    // console.log(this.images);
    let i = 6;
    for (const img of this.images) {
      if (!img.description) {
        img.description = img.place + ' is on of the most beautifull. We are working on this.Stay tuned. We will upadate soon';
      }
      this.details[i] = new Monument(img.id, img.place, img.description, img.imageURL, img.ratings, img.likes, false);
      i--;
    }
    console.log('details', this.details);
    for (const img of this.details) {
      const data =  JSON.parse(localStorage.getItem(img.id));
      img.likes = data[0];
      img.isLiked = data[1];
    }
    this.totalLikes =  JSON.parse(localStorage.getItem('totalLikes'));
    // console.log(this.details);
  }
    async fetchImage() {
    const response = await this.loadImageService.fetchImages();
    const value = response[0];
    // console.log(response[0]);
    //  fetchImage(){
    // this.res = this.loadImageService.fetchImages().subscribe(data => console.log(data), (err) => {console.log(err, 'err')}) ;
    this.res = ( value as any).data;
    // console.log('value', this.res);
    this.apiHits = JSON.parse(localStorage.getItem('apiHits'));
    console.log("api hits",this.apiHits);
    if (!this.apiHits) {
      // this.totalLikes = 0;
      this.res.forEach(image => {
      this.totalLikes += image.likes;
      this.likeState = [ image.likes, false ];
      localStorage.setItem(image.id, JSON.stringify(this.likeState));
      });
      // console.log(this.totalLikes);
      localStorage.setItem('totalLikes', JSON.stringify(this.totalLikes));
    }
    this.apiHits++;
    localStorage.setItem('apiHits', JSON.stringify(this.apiHits));
    this.apiHits = JSON.parse(localStorage.getItem('apiHits'));
    if (this.res) {
      this.displayImages(this.res);
    }
}
 filterByName() {
console.log('search by name', this.searchQuery);

 }
 onSelect(e) {
   console.log('event', e.target.value);
   this.feature = e.target.value.toLowerCase();
   console.log(this.feature);
}
toggleLikeState(x, id) {
    const data = JSON.parse(localStorage.getItem(id));
    if (data[1] === false) {
      data[0] ++;
      data[1] = true;
      this.totalLikes++;

    } else {
      data[0]--;
      data[1] = false ;
      this.totalLikes--;
    }
    localStorage.setItem(id, JSON.stringify(data));
    localStorage.setItem('totalLikes', JSON.stringify(this.totalLikes));
    for (const img of this.details) {
      if(img.id === id){

        img.likes = data[0];
        img.isLiked = data[1];
      }
    }
    // console.log(data);
 }

}



