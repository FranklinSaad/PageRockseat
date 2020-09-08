const cards = document.querySelectorAll('.card')
const cursos = document.querySelectorAll('.curso')

for (let card of cards) {
    card.addEventListener("click", function () {
        const videoId = card.getAttribute("id");
        window.location.href = `/video?id=${videoId}`
    })
}

for (let curso of cursos) {
    curso.addEventListener("click", function () {
        const courseId = curso.getAttribute("id");
        window.location.href = `/course?id=${courseId}`
    })
}
