


// const onlyTranslate=()=>{
//   const getTitles=document.getElementsByClassName("");
//   const getTitle=$(".movie-title").val();
//   const getSentence=document.getElementsByClassName(".movie-sentence");
//   if (this.getTitle==getTitle){
//     this.addClass(notranslate);
//   }
  

// }
const reloads=()=>{
  if (window.name!=="one"){
    location.reload();
    window.name="one";
  }else{
    window.name="";
  }

}

window.addEventListener("load",function(){
  reloads();
});

let url=window.location.hash.replace("#","");
  let hash=url;
// let hash=document.getElementById;
  const movieRef=firebase.database().ref(`movies/`+hash);
  console.log(movieRef);
  
// // if (typeof hash === 'string') {
//   console.log("yabai");// HANDLE IT HERE (throw an error, return false/null, whatever you need
// }
const deleteMovie=(movieId)=>{
  movieRef
  .child(movieId)
  .remove()
  .then(()=>{
    console.log("削除しました");
  })
  .catch((error)=>{
console.error("削除できません");
  })
};

const formatDate = (date) => {
  const m = moment(date);
  return `${m.format('YYYY/MM/DD')}`;
};

const createMovieDiv=(movieId,movieData)=>{
  const $divTag=$(".row>.one-movie").clone();

  
  $divTag.find(".movie-title").text(movieData.movieTitle);

  $divTag.find(".movie-sentence").text(movieData.movieSentence);

$divTag.find(".post-time").html(formatDate(new Date(movieData.createdAt)));

const $deleteButton=$divTag.find("#delete");
$deleteButton.on("click",()=>{
deleteMovie(movieId);
});
  $divTag.attr("id",`movie-id-${movieId}`);
  return $divTag;
};

// const resetMovieshelfView=()=>{
//   $("#list-exciting").empty();
// }
const addMovie=(movieId,movieData)=>{
const $divTag=createMovieDiv(movieId,movieData);
// let href=window.location.href.split('/').pop();
if (url==="love"){
  $divTag.appendTo(".list-love");
}else if (url==="exciting"){
  $divTag.appendTo(".list-exciting");
}else if (url==="insightful"){
  $divTag.appendTo(".list-insightful");
}else if(url==="laugh"){
  $divTag.appendTo(".list-laugh");
}else if(url==="mystical"){
  $divTag.appendTo(".list-mystical");
}else{
  $divTag.appendTo(".list-warm");
}

};
// resetMovieshelfView();

movieRef
.orderByChild("createdAt")
movieRef.off("child_removed");
movieRef.off("child_added");

movieRef.on("child_added",(movieSnapshot)=>{
  const movieId =movieSnapshot.key;
  const movieData =movieSnapshot.val();
addMovie(movieId,movieData);
console.log(movieData);

movieRef.on("child_removed",(movieSnapshot)=>{
  const movieId=movieSnapshot.key;
  const $movie=$(`#movie-id-${movieId}`);
$movie.remove();
})

});

const resetAddMovieModal=()=>{
  $("#movie-form")[0].reset();
  $("#submit_add_movie")
  .prop("disabled",false)
  .text("done");
};
$("#movie-form").on("submit",(e)=>{
  e.preventDefault();
  $("#submit_add_movie")
  .prop("desabled",true)
  .text("loading");

  const movieTitle=$("#add-movie-title").val();
 const movieSentence=$("#add-movie-sentence").val();
console.log(movieTitle);
console.log(movieSentence);
const movieData={
  movieTitle,
  movieSentence,
  createdAt:firebase.database.ServerValue.TIMESTAMP,
};
  return movieRef
  .push(movieData)
  .then(()=>{
      $("#add-movie-modal").modal("hide");
      resetAddMovieModal();
      })
    .catch((error)=>{
      console.error("エラー",error);
      resetAddBookModal();
      $("#add-book__help")
        .text("保存できませんでした")
        .fadeIn();
    })

  
});


const dateFunction=()=>{
  const now=new Date();
  $(".post-time").textContent=now; 

}
// $(document).ready(function(){
// $('.american-flag').click(function() {
//   google.language.translate($('.one-movie').html(), 'ja', 'en',  function(result)         
//   {
//      $('.one-nmovie').html(result.translation);
//   });
//  });
// });