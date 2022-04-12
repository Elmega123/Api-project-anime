// Example fetch using pokemonapi.co
document.getElementById("button1").addEventListener("click", getAnime)

  function getAnime(){
  let anime = document.querySelector("input").value
  let anime2 = anime.replace(/ /g, "_");
  console.log(anime2)
    document.getElementById("button2").style.display="block";
   







fetch(`https://anime-facts-rest-api.herokuapp.com/api/v1/${anime2}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      console.log(data.total_facts)
      document.querySelector("img").src = data.img
      let factnum = data.total_facts
  console.log(factnum)
  console.log(Math.floor(Math.random() * factnum))

 document.getElementById("button2").addEventListener("click", fact)
 function fact(){

  document.querySelector("h4").innerText = data.data[Math.floor(Math.random() * factnum)].fact // this is how I make randon the facts
 }

    })
    .catch(err => {
        console.log(`error ${err}`)
    });
  

  }









  here
  // document.getElementById("button2").addEventListener("click", fact)

  // function fact(){

  // fetch(`https://anime-facts-rest-api.herokuapp.com/api/v1/${anime2}`)
  //   .then(res => res.json()) // parse response as JSON
  //   .then(data => {
  //     console.log(data)
  //     document.querySelector("img").src = data.img

  //   })
  //   .catch(err => {
  //       console.log(`error ${err}`)
  //   });



  // }






  // document.getElementById("button1").addEventListener("click" , bAppear)
  // function bAppear(){
    
  //   document.getElementById("button2").style.display="block";


  // }

//     : 'bleach', anime_img: 'https://m.media-amazon.com/images/M/MV5BZjE0YjVjOD…kEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg'}
// 1: {anime_id: 2, anime_name: 'black_clover', anime_img: 'https://m.media-amazon.com/images/M/MV5BNTAzYTlkMW…kEyXkFqcGdeQXVyMzgxODM4NjM@._V1_FMjpg_UX1000_.jpg'}
// 2: {anime_id: 3, anime_name: 'dragon_ball', anime_img: 'https://m.media-amazon.com/images/M/MV5BMGMyOThiMG…kEyXkFqcGdeQXVyMjc2Nzg5OTQ@._V1_FMjpg_UX1000_.jpg'}
// 3: {anime_id: 4, anime_name: 'jujutsu_kaisen', anime_img: 'https://m.media-amazon.com/images/M/MV5BNzQyYzU3Y2…ZTJiMmEzMjYxXkEyXkFqcGdeQXVyMTI2NTY3NDg5._V1_.jpg'}
// 4: {anime_id: 5, anime_name: 'fma_brotherhood', anime_img: 'https://m.media-amazon.com/images/M/MV5BZmEzN2YzOT…ZThhNGQwYTEzXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'}
// 5: {anime_id: 6, anime_name: 'naruto', anime_img: 'https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNW…Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg'}
// 6: {anime_id: 7, anime_name: 'gintama', anime_img: 'https://m.media-amazon.com/images/M/MV5BMDkxZTJjZT…kEyXkFqcGdeQXVyNDQxNjcxNQ@@._V1_FMjpg_UX1000_.jpg'}
// 7: {anime_id: 8, anime_name: 'itachi_uchiha', anime_img: 'https://comicvine.gamespot.com/a/uploads/scale_small/0/378/859934-god2vj0xj3.jpg'}
// 8: {anime_id: 9, anime_name: 'one_piece', anime_img: 'https://m.media-amazon.com/images/M/MV5BODcwNWE3OT…NjgxODMxY2UyXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg'}
// 9: {anime_id: 10, anime_name: 'demon_slayer', anime_img: 'https://m.media-amazon.com/images/M/MV5BZjZjNzI5MD…OTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg'}
// 10: {anime_id: 11, anime_name: 'attack_on_titan', anime_img: 'https://flxt.tmsimg.com/assets/p10701949_b_v8_ah.jpg'}
// 11: {anime_id: 12, anime_name: 'hunter_x_hunter


// let text = "Mr Blue has a blue house and a blue car";
// let result = text.replace(/blue/g, "red");




// let anim = "black_clover"
// let resul2 = anim.replace(/_/, " ");
// console.log(resul2)

