import { Component, OnInit } from '@angular/core';
import { SearchResults } from 'src/app/dtos/search-results';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imgPath: string;
  searchResults: SearchResults;
  searchInput: string;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.GetParams();
  }

  private GetParams() {
    this.route.paramMap.subscribe((params) => {
      if (params.has('searchInput'))
        this.searchInput = params.get('searchInput');

      if (this.searchInput)
        this.search(this.searchInput);
      else {
        this.clearResults();
        this.getNewImage();
      }
    });
  }


  getFrontImage() {
    var imgPaths = ['0zaUmzm.png', '850EmPD.png', 'MKQdHib.png', 'Zqax5lk.jpg', 'gcJp6ss.png', 'p6Kv7yF.png',
      '2FKLtcW.jpg', '8Bh85g5.png', 'MZdUQ8e.jpg', 'edYJFs3.png', 'hLWxGq9.jpg', 's0fEjh6.png',
      '4ewdgS0.jpg', 'Ak4G4D6.png', 'VQ3ik6u.jpg', 'ivctYgq.png', 'v3UFYpg.png',
      '7MZpARS.jpg', 'BdrGls9.jpg', 'Z0ZFNHB.jpg', 'g94Y8aK.png']
    var index = Math.floor(Math.random() * imgPaths.length)

    // TODO: Point to imgur
    return "https://i.imgur.com/" + imgPaths[index];
  }

  getNewImage() {
    this.imgPath = this.getFrontImage();
  }

  clearResults() {
    this.searchResults = null;
    this.searchInput = "";
  }

  search(searchInput: string) {
    if (searchInput.length > 2) {
      this.apiService.getSearchResults(searchInput).subscribe((results) => {
        this.searchResults = results;
      });
    }
  }

  goToSearch() {
    this.router.navigate(['/search', this.searchInput]);
  }

}
