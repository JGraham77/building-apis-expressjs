
$(document).ready(() => {

    new form()
})

class form {
    constructor() {
        this.htmlMaker();
        this.getAPI();
    }

    htmlMaker() {
        this.form = $("<form ></form>");
        this.button = $("<button class='btn btn-primary'>Get API</button>")
        $(this.form).append("<input type='text' placeholder='A Form'>");
        $('body').append(this.form);
        $('body').append(this.button)
    }

    getAPI() {
        $.get("/api/chirps", (data) => {
            let entries = Object.entries(data);
            // let mapping =
            entries.forEach((element, index) => {
                if ((index + 1) < entries.length) {

                    let card_title = JSON.stringify(element[0])
                    let card_text = JSON.stringify(element[1])

                    $('body').append(`
                        <div class="card" style="width: 25em;">
                        <div class="card-body">
                        <h5 class="card-title">
                        <span class="forTitle">${card_title}</span>
                        <button id="${index}" type="button" class="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </h5>
                        <p class="card-text">${card_text}</p>
                        </div>
                        </div>
                    `)

                    $(`#${index}`).on("click", (event) => {

                        let parent = $(event.currentTarget).parent().parent().parent()
                        $(parent).remove()
                    })

                }
            })
            // mapping.forEach((element) => {
            //     $('body').append(element)
            // })

        })

    }
}