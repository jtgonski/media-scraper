



// $(document).on("click", "#view-note", () => {
// 	const thisId = $(this).attr("data-id");

// 	$.ajax({
// 		method: "GET", 
// 		url: /articles/ + thisId, 

// 	})
// 	.done((data) => {
// 		console.log(data); 

// 		$("#notes-div").append(`<h5>${data.title}</h5>`);
// 	})
// })


$(document).on("click", "#save-note", () => {

	const thisId = $(this).attr("data-id");

	$.ajax({
		method: "POST", 
		url: /articles/ + thisId,
		data: {
			title: $("#note-title").val().trim(), 
			body: $("#note-body").val().trim()

		}
	})
	.done((data) => {
		console.log(data);


	});
});