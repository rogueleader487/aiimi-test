import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from '../entities/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [':host {display: contents;}']
})
export class SearchComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  users: User[] = [];
  suggestions: string[] = []

  ngOnInit() {
    this.searchForm.valueChanges.subscribe(x => {
      if ((x.name || "").length >= 2) {
        this.getSuggestions(x.name);
      } else {
        this.suggestions = [];
      }
    });
  }

  searchForm = this.formBuilder.group({
    name: ''
  });

  search(name: any): void {
    this.userService.searchUsers(name)
      .subscribe(result => {
        this.users = result;
        this.suggestions = [];
      })
  }

  getSuggestions(name: any): void {
    this.userService.suggestUsers(name)
      .subscribe(result => {
        this.suggestions = result;
      })
  }

  submit(): void {
    this.search(this.searchForm.get("name")?.value);    
  }
}
