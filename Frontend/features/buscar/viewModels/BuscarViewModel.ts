export class BuscarViewModel {
  private _searchQuery: string = '';

  get searchQuery(): string {
    return this._searchQuery;
  }

  setSearchQuery(query: string): void {
    this._searchQuery = query ?? '';
  }

  hasQuery(): boolean {
    return this._searchQuery.trim().length > 0;
  }
}


