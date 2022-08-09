export class ResultList<T> {
  resultList: T[] = [];
  totalCount: number = 0;

  constructor(resultList: T[], totalCount: number) {
    this.resultList = resultList;
    this.totalCount = this.totalCount;
  }
}
