import { Component, OnInit } from '@angular/core';
import { LoadImagesService } from '../load-images.service';

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
  index = 0;

  constructor(private loadImageService: LoadImagesService) {
    this.fetchImage();
  }

  ngOnInit(): void {
    // localStorage.setItem('apiHits', JSON.stringify(0));
    // localStorage.setItem('totalLikes', JSON.stringify(0));

  }

myFunction(x, id) {
  // console.log("hye");
  const menu = document.querySelector('.fa');
  menu.classList.toggle('fa-thumbs-down');
  // console.log(menu);
  console.log(x);
  console.log(id);
  if (x.index === 0) {
    this.totalLikes++;
    localStorage.setItem('totalLikes', JSON.stringify(this.totalLikes));
    x.index = 1;
    for (const img of this.images) {
      if (img.id === id) {
        img.likes ++;
      }
    }
  } else {
    this.totalLikes--;
    localStorage.setItem('totalLikes', JSON.stringify(this.totalLikes));
    x.index = 0;
    for (const img of this.images) {
      if (img.id === id) {
        img.likes --;
      }
    }
  // console.log(flag);
  }
}


  displayImages(response) {
    // console.log('Here->', response);
    this.images = response;
    console.log(this.images);
    console.log(this.apiHits);
    this.images.forEach(image => {
      this.totalLikes += image.likes;
    });
    console.log(this.totalLikes);
    localStorage.setItem('totalLikes', JSON.stringify(this.totalLikes));
  }
  // async callforApi() {
  //     // this.loadImageService.fetchImages().subscribe(
  //     // resultArray => this.res = resultArray,
  //     // error => console.log('Error :: ' + error));
  //     const datam = await this.loadImageService.fetchImages();
  //     console.log(datam[0]);
  //     const res=datam[0];
  //     return (res);
  //   }
    async fetchImage() {
    const response = await this.loadImageService.fetchImages();
    const value = response[0];
    // console.log(response[0]);
    this.res = ( value as any).data;
    // console.log('value', this.res);
    if (this.res) {
      this.displayImages(this.res);
    }
    this.apiHits = JSON.parse(localStorage.getItem('apiHits'));
    this.apiHits++;
    localStorage.setItem('apiHits', JSON.stringify(this.apiHits));
 }
 filterByName() {
console.log('search by name', this.searchQuery);

 }
 onSelect(e) {
   console.log('event', e.target.value);
   this.feature = e.target.value.toLowerCase();
   console.log(this.feature);
}

}

