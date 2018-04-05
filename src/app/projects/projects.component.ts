import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  dummy = [1,2,3,4,2,3,4];
  constructor() { }

  ngOnInit() {
  }

}
