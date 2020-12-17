import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  url1="/assets/images/bejaminpic.jpg"
  url2="/assets/images/dharmawan.jpg"
  url3="/assets/images/den.jpg"
  url4="/assets/images/wilson.jpg"

  constructor() { }

  ngOnInit(): void {
  }

}