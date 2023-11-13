export {};

/**
 *  백엔드에서 생각하는 페이지네이션
 *  skip : 생략할 갯수
 *  take : 가져올 갯수
 * 
 *  실제 프론트엔드에서는
 *  페이지번호 // 가져올 갯수를 불러옴
 *  URL : ..../posts?page=1&limit=20
 *  req.query // { page : 1, limit : 20 } 한 페이지에 20개씩
 *  page : 페이지 번호
 *  limit : 가져올 갯수
 *  take == limit
 * 
 * 
 *  만약
 *  page : 1
 *  limit : 20
 *  -> skip : 0, take : 20
 * 
 *  page : 2
 *  limit : 20
 *  -> skip : 20, take :20
 * 
 *  skip = (page -1 ) * limit;
 */