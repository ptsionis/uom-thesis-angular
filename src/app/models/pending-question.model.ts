export class PendingQuestion {
  constructor(
    public id: string | null,
    public question: string,
    public category: string,
    public level: number,
    public answer1: string,
    public answer2: string,
    public answer3: string,
    public answer4: string,
    public correctId: number,
    public source: string | null,
    public userId: string | null
  ) {}
}
