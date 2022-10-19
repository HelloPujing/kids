const TAGS = require("../../data/tags");
const SCHOOL_AGE = require("../../data/schoolAge");

/*
* @param list from api
* @return list for view
* add _age
* add _color
*/
export const fmtKidList = (list: KidView[]) => {
  list.forEach(kid => {
    // fmt age
    kid._age = calcAge(new Date(kid.birth));

    // fmt color
    const index = (TAGS || []).findIndex(tag => tag.id === kid.tagId);
    kid._color = index > 0 ? TAGS[index].color : TAGS[0].color;

    // fmt grade
    kid._grade = calGrade(new Date(kid.birth));
  });
  console.log(list);
  return list;
}

/*
* @param birth
* @return age string
* @example
* 2017-04-08 -> 5 years old
* 2022-01-01 -> 9 months old
*/
export const calcAge = (birth: Date) => {
  const today = new Date();

  // invalid birth
  const diff = today.getTime() - birth.getTime();
  if(diff <= 0) return '-'; 

  // valid birth
  const diff_d = diff / (1000 * 60 * 60 * 24);
  const diff_y = diff_d / 365;
  const age_y = Math.floor(diff_y);
  const age_m = Math.floor((diff_d - age_y * 365) / 30);

  if(age_y >= 1) return `${age_y} years old`;
  return `${age_m} months old`;
}

/*
* @param birth
* @return grade
* @example
* 2017-04-08 -> Kindergarten 3
*/
export const calGrade = (birth: Date) => {
  const today = new Date();
  const cur_y = today.getFullYear();
  const cur_m = today.getMonth() + 1;
  const birth_y = birth.getFullYear();
  const birth_m = birth.getMonth() + 1;
  
  let schoolAge = cur_y - birth_y;
  if(birth_m >= 9) schoolAge--;
  if(cur_m < 9) schoolAge--;
  
  if(schoolAge < 0) schoolAge = 0;
  if(schoolAge > 22) schoolAge = 22;

  const [, grade_cn] = SCHOOL_AGE.get(schoolAge);
    
  return grade_cn;
}