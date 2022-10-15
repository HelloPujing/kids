const TAGS = require("../../data/tags")

export const calcAge = (date: Date) => {
  const year = date.getFullYear();
  const curYear = (new Date()).getFullYear();

  return curYear - year;
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