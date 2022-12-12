prifileImg: 完整存贮地址
genderImg: 男女孩照片
localImg: 本地图片



如果空白进入，则默认gender=0,genderImg为girl
如果进来，有profile，则profile; 无，则根据gender现实genderImg

选择图片，则获得localImg显示给profileImg，并立马上传，获得oss地址赋值给profileImg

宗旨，有profileImg就显示profileImg，无则显示genderImg