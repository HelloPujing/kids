type Kid = {
  id: string,
  fullName: string,
  nickName: string,
  gender: Gender, 
  birth: string,
  category?: number,
  parents?: string,
  remark?: string
}
 type Gender = 0 | 1; // 0 femail 1 mail
 