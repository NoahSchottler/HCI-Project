export interface Word{
    name: string;
    favorable: number;
    unfavorable: number;
}
// Category defines 1 (Positive) or 0 (Negative)
export const TrainingData = [
  {category:"1", text:"good great awesome cool"},
  {category:"1", text:"sweet nice like great"},
  {category:"1", text:"fun like funny enjoy"},
  {category:"0", text:"bad dislike angry"},
  {category:"0", text:"unfunny sad pathetic"},
  {category:"0", text:"lame sad boring angry"},
];







