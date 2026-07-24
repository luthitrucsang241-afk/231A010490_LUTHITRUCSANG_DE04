/* =========================MOVIE DISCOVERY APPJAVASCRIPT========================= */


/* DỮ LIỆU PHIM */

const movies = [

    {
        title: "Dune",
        year: 2021,
        genre: ["Khoa học viễn tưởng", "Phiêu lưu"],
        image: "images/Dune.jpg",
        director: "Denis Villeneuve",
        actors: "Timothée Chalamet, Zendaya",
        description: "Bộ phim khoa học viễn tưởng kể về hành trình của Paul Atreides trên hành tinh sa mạc Arrakis."
    },


    {
        title: "La La Land",
        year: 2016,
        genre: ["Âm nhạc", "Tình cảm"],
        image: "images/La La Land.jpg",
        director: "Damien Chazelle",
        actors: "Ryan Gosling, Emma Stone",
        description: "Câu chuyện tình yêu giữa một nhạc sĩ jazz và một nữ diễn viên trẻ tại Los Angeles."
    },


    {
        title: "The Prestige",
        year: 2006,
        genre: ["Bí ẩn", "Kịch tính"],
        image: "images/The Prestige.jpg",
        director: "Christopher Nolan",
        actors: "Christian Bale, Hugh Jackman",
        description: "Cuộc cạnh tranh gay gắt giữa hai nhà ảo thuật tài năng."
    },


    {
        title: "Inception",
        year: 2010,
        genre: ["Khoa học viễn tưởng", "Hành động"],
        image: "images/Inception.jpg",
        director: "Christopher Nolan",
        actors: "Leonardo DiCaprio, Joseph Gordon-Levitt",
        description: "Một nhóm chuyên gia xâm nhập vào giấc mơ để thực hiện nhiệm vụ đặc biệt."
    },


    {
        title: "The Departed",
        year: 2006,
        genre: ["Hình sự", "Kịch tính"],
        image: "images/The Departed.jpg",
        director: "Martin Scorsese",
        actors: "Leonardo DiCaprio, Matt Damon",
        description: "Cuộc đối đầu giữa cảnh sát chìm và nội gián trong thế giới tội phạm."
    },


    {
        title: "The Silence of the Lambs",
        year: 1991,
        genre: ["Kinh dị", "Tâm lý"],
        image: "images/The Silence of the Lambs.jpg",
        director: "Jonathan Demme",
        actors: "Jodie Foster, Anthony Hopkins",
        description: "Một nữ đặc vụ FBI điều tra vụ án với sự giúp đỡ của tên sát nhân nguy hiểm."
    },


    {
        title: "Knives Out",
        year: 2019,
        genre: ["Bí ẩn", "Hài"],
        image: "images/Knives Out.jpg",
        director: "Rian Johnson",
        actors: "Daniel Craig, Ana de Armas",
        description: "Vụ án bí ẩn xoay quanh cái chết của một nhà văn giàu có."
    },


    {
        title: "Interstellar",
        year: 2014,
        genre: ["Khoa học viễn tưởng", "Phiêu lưu"],
        image: "images/Interstellar.jpg",
        director: "Christopher Nolan",
        actors: "Matthew McConaughey, Anne Hathaway",
        description: "Nhóm phi hành gia khám phá không gian để tìm nơi sinh sống mới cho nhân loại."
    },


    {
        title: "The Bone Collector",
        year: 1999,
        genre: ["Hình sự", "Kinh dị"],
        image: "images/The Bone Collector.jpg",
        director: "Phillip Noyce",
        actors: "Denzel Washington, Angelina Jolie",
        description: "Một thám tử và nữ cảnh sát truy tìm tên sát nhân hàng loạt."
    },


    {
        title: "Gone Girl",
        year: 2014,
        genre: ["Bí ẩn", "Tâm lý"],
        image: "images/Gone Girl.jpg",
        director: "David Fincher",
        actors: "Ben Affleck, Rosamund Pike",
        description: "Một người vợ mất tích bí ẩn khiến người chồng trở thành nghi phạm."
    }

];





/* BIẾN */

let selectedGenres = [];

let keyword = "";

let currentPage = 1;

const perPage = 10;



/* DOM */

const movieList = document.getElementById("movieList");

const genreList = document.getElementById("genreList");

const searchInput = document.getElementById("searchInput");

const modal = document.getElementById("movieModal");

const modalContent = document.getElementById("modalContent");

const closeModal = document.getElementById("closeModal");





/* =========================TẠO CHECKBOX THỂ LOẠI========================= */


function createGenres() {


    let genres = [];


    movies.forEach(movie => {

        movie.genre.forEach(g => {

            if (!genres.includes(g)) {

                genres.push(g);

            }

        });

    });



    genres.forEach(g => {


        let label = document.createElement("label");

        label.className = "genre-item";


        label.innerHTML = `
    
    <input type="checkbox" value="${g}">
    
    ${g}
    
    `;



        label.querySelector("input")
            .addEventListener("change", function () {


                if (this.checked) {

                    selectedGenres.push(this.value);

                }

                else {

                    selectedGenres =
                        selectedGenres.filter(
                            item => item !== this.value
                        );

                }


                currentPage = 1;

                renderMovies();


            });


        genreList.appendChild(label);


    });


}





/* =========================FILTER + SEARCH========================= */


function getFilteredMovies() {


    return movies.filter(movie => {


        let checkGenre = true;


        if (selectedGenres.length > 0) {


            checkGenre =
                selectedGenres.some(
                    g => movie.genre.includes(g)
                );


        }



        let checkSearch =
            movie.title
                .toLowerCase()
                .includes(
                    keyword.toLowerCase()
                );



        return checkGenre && checkSearch;



    });


}







/* =========================HIỂN THỊ PHIM========================= */


function renderMovies() {


    movieList.innerHTML = "";


    let data = getFilteredMovies();



    let start = (currentPage - 1) * perPage;


    let pageData =
        data.slice(
            start,
            start + perPage
        );



    pageData.forEach(movie => {


        let card = document.createElement("div");


        card.className = "movie-card";



        card.innerHTML = `
    
    <img src="${movie.image}">
    
    
    <div class="movie-info">
    
    <h3>${movie.title}</h3>
    
    <p>Năm: ${movie.year}</p>
    
    </div>
    
    `;



        card.onclick = function () {

            showModal(movie);

        };



        movieList.appendChild(card);


    });



    renderPagination(data.length);



}







/* =========================PHÂN TRANG========================= */


function renderPagination(total) {


    let box = document.getElementById("pagination");


    box.innerHTML = "";


    let pages = Math.ceil(total / perPage);



    for (let i = 1; i <= pages; i++) {


        let btn = document.createElement("button");


        btn.className = "page-btn";


        btn.innerText = i;



        btn.onclick = function () {


            currentPage = i;

            renderMovies();


        };



        box.appendChild(btn);


    }



}








/* =========================SEARCH DEBOUNCE========================= */


let timer;


searchInput.addEventListener(
    "input",
    function () {


        clearTimeout(timer);



        timer = setTimeout(() => {


            keyword = this.value;


            currentPage = 1;


            renderMovies();



        }, 400);



    });








/* =========================MODAL========================= */


function showModal(movie) {


    modal.style.display = "flex";


    modalContent.innerHTML = `
    
    <h2>${movie.title}</h2>
    
    
    <img src="${movie.image}">
    
    
    <p>
    <b>Năm:</b> ${movie.year}
    </p>
    
    
    <p>
    <b>Đạo diễn:</b> ${movie.director}
    </p>
    
    
    <p>
    <b>Diễn viên:</b> ${movie.actors}
    </p>
    
    
    <p>
    <b>Mô tả:</b> ${movie.description}
    </p>
    
    `;



}



closeModal.onclick = function () {

    modal.style.display = "none";

};



window.onclick = function (e) {

    if (e.target == modal) {

        modal.style.display = "none";

    }

};







/* =========================DARK MODE========================= */


const darkBtn =
    document.getElementById("darkToggle");



if (localStorage.getItem("dark") == "true") {

    document.body.classList.add("dark-mode");

}



darkBtn.onclick = function () {


    document.body.classList.toggle(
        "dark-mode"
    );



    localStorage.setItem(

        "dark",

        document.body.classList.contains(
            "dark-mode"
        )

    );



};







/* KHỞI CHẠY */


createGenres();

renderMovies();
