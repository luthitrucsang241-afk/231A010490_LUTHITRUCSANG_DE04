// ===============================
// MOVIE DATA
// ===============================

const movies = [

    {
        title: "Dune",
        year: 2021,
        genre: ["Khoa học viễn tưởng", "Phiêu lưu"],
        image: "images/Dune.jpg",
        director: "Denis Villeneuve",
        actor: "Timothée Chalamet, Zendaya",
        description: "Hành trình trên hành tinh sa mạc Arrakis."
    },

    {
        title: "La La Land",
        year: 2016,
        genre: ["Tình cảm", "Âm nhạc"],
        image: "images/La La Land.jpg",
        director: "Damien Chazelle",
        actor: "Ryan Gosling, Emma Stone",
        description: "Câu chuyện tình yêu và ước mơ."
    },

    {
        title: "The Prestige",
        year: 2006,
        genre: ["Bí ẩn", "Tâm lý"],
        image: "images/The Prestige.jpg",
        director: "Christopher Nolan",
        actor: "Christian Bale",
        description: "Cuộc cạnh tranh của hai nhà ảo thuật."
    },

    {
        title: "Inception",
        year: 2010,
        genre: ["Hành động", "Khoa học viễn tưởng"],
        image: "images/Inception.jpg",
        director: "Christopher Nolan",
        actor: "Leonardo DiCaprio",
        description: "Thế giới giấc mơ và trí nhớ."
    },

    {
        title: "The Departed",
        year: 2006,
        genre: ["Hành động", "Tội phạm"],
        image: "images/The Departed.jpg",
        director: "Martin Scorsese",
        actor: "Leonardo DiCaprio",
        description: "Cuộc chiến giữa cảnh sát và tội phạm."
    },

    {
        title: "The Silence of the Lambs",
        year: 1991,
        genre: ["Kinh dị", "Tâm lý"],
        image: "images/The Silence of the Lambs.jpg",
        director: "Jonathan Demme",
        actor: "Jodie Foster",
        description: "Một vụ án hình sự nguy hiểm."
    },

    {
        title: "Knives Out",
        year: 2019,
        genre: ["Bí ẩn", "Hài hước"],
        image: "images/Knives Out.jpg",
        director: "Rian Johnson",
        actor: "Daniel Craig",
        description: "Vụ án mạng trong gia đình giàu có."
    },

    {
        title: "Interstellar",
        year: 2014,
        genre: ["Khoa học viễn tưởng", "Phiêu lưu"],
        image: "images/Interstellar.jpg",
        director: "Christopher Nolan",
        actor: "Matthew McConaughey",
        description: "Hành trình tìm kiếm hành tinh mới."
    },

    {
        title: "The Bone Collector",
        year: 1999,
        genre: ["Tội phạm", "Bí ẩn"],
        image: "images/The Bone Collector.jpg",
        director: "Phillip Noyce",
        actor: "Denzel Washington",
        description: "Điều tra vụ án giết người hàng loạt."
    },

    {
        title: "Gone Girl",
        year: 2014,
        genre: ["Bí ẩn", "Tâm lý"],
        image: "images/Gone Girl.jpg",
        director: "David Fincher",
        actor: "Ben Affleck",
        description: "Một vụ mất tích bí ẩn."
    }

];




// ===============================
// VARIABLES
// ===============================


let keyword = "";

let selectedGenres = [];

let currentPage = 1;

const moviePerPage = 5;






// ===============================
// SHOW MOVIES
// ===============================


function displayMovies() {


    let filteredMovies = movies.filter(movie => {


        let nameMatch =
            movie.title
                .toLowerCase()
                .includes(keyword.toLowerCase());



        let genreMatch =
            selectedGenres.length === 0 ||
            selectedGenres.some(
                g => movie.genre.includes(g)
            );



        return nameMatch && genreMatch;


    });




    let start = (currentPage - 1) * moviePerPage;


    let moviesShow =
        filteredMovies.slice(
            start,
            start + moviePerPage
        );



    const list = document.getElementById("movieList");


    list.innerHTML = "";



    moviesShow.forEach(movie => {


        let card = document.createElement("div");


        card.className = "movie-card";



        card.innerHTML = `
    
    <img src="${movie.image}">
    
    
    <div class="movie-info">
    
    <h3>${movie.title}</h3>
    
    <p>Năm: ${movie.year}</p>
    
    <p>${movie.genre.join(", ")}</p>
    
    </div>
    
    `;



        card.onclick = function () {

            openModal(movie);

        };



        list.appendChild(card);



    });



    createPagination(filteredMovies.length);



}








// ===============================
// PAGINATION
// ===============================


function createPagination(total) {


    let totalPage =
        Math.ceil(total / moviePerPage);



    const box =
        document.getElementById("pagination");



    box.innerHTML = "";



    for (let i = 1; i <= totalPage; i++) {


        let btn = document.createElement("button");


        btn.innerHTML = i;



        if (i === currentPage)

            btn.classList.add("active");



        btn.onclick = function () {

            currentPage = i;

            displayMovies();

        };



        box.appendChild(btn);


    }


}








// ===============================
// CREATE GENRE CHECKBOX
// ===============================


function createGenre() {


    let allGenres = [];


    movies.forEach(movie => {


        movie.genre.forEach(g => {


            if (!allGenres.includes(g))

                allGenres.push(g);


        });


    });



    let box = document.getElementById("genreList");


    box.innerHTML = "";



    allGenres.forEach(g => {


        let label = document.createElement("label");


        label.innerHTML = `
    
    <input type="checkbox" value="${g}">
    
    <span>${g}</span>
    
    `;



        let checkbox =
            label.querySelector("input");



        checkbox.onchange = function () {


            if (this.checked) {

                selectedGenres.push(g);

            }

            else {


                selectedGenres =
                    selectedGenres.filter(
                        item => item !== g
                    );


            }



            currentPage = 1;

            displayMovies();


        };



        box.appendChild(label);


    });


}








// ===============================
// DEBOUNCE SEARCH
// ===============================


function debounce(func, time) {


    let timer;


    return function () {


        clearTimeout(timer);


        timer = setTimeout(
            func,
            time
        );


    };


}



const search =
    document.getElementById("searchInput");



search.addEventListener(
    "input",

    debounce(() => {


        keyword =
            search.value.trim();



        currentPage = 1;


        displayMovies();


    }, 400)

);










// ===============================
// MODAL
// ===============================


function openModal(movie) {


    document.getElementById("movieModal")
        .style.display = "flex";



    document.getElementById("modalContent")
        .innerHTML = `
    
    <img src="${movie.image}" width="200">
    
    
    <h2>${movie.title}</h2>
    
    
    <p>Năm: ${movie.year}</p>
    
    
    <p>Đạo diễn: ${movie.director}</p>
    
    
    <p>Diễn viên: ${movie.actor}</p>
    
    
    <p>${movie.description}</p>
    
    `;



}



document
    .getElementById("closeModal")
    .onclick = function () {


        document.getElementById("movieModal")
            .style.display = "none";


    };








// ===============================
// DARK MODE
// ===============================


const darkBtn =
    document.getElementById("darkToggle");



if (localStorage.getItem("dark") === "true") {

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








// ===============================
// START APP
// ===============================


createGenre();

displayMovies();
