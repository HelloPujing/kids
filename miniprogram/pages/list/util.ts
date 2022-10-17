const TAGS = require("../../data/tags")

/*
* @param date
* @return age
* @example
* 2017-04-08 -> 5
* 2022-01-01 -> 
*/
export const calcAge = (date: Date) => {
  const today = new Date();

  // invalid birth
  const diff = today.getTime() - date.getTime();
  if(diff <= 0) return '-';

  // valid birth
  const year = date.getFullYear();
  const curYear = today.getFullYear();
  const age_y = curYear - year;

  const month = date.getMonth() + 1;
  const curMonth = today.getMonth() + 1;
  const age_m = curMonth - month;

  if(age_y >= 1) return `${age_y} years old`;
  return `${age_m} months old`;
}

export const fmtKidList = (list: KidView[]) => {
  list.forEach(kid => {
    // fmt age
    kid._age = calcAge(new Date(kid.birth));

    // fmt color
    const index = (TAGS || []).findIndex(tag => tag.id === kid.tagId);
    kid._color = index > 0 ? TAGS[index].color : TAGS[0].color;
  });
  console.log(list);
  return list;
}