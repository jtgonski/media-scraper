
//call to scrape route to populate field 
// $(document).on("click", "#npr-scrape", () => {

// 	$.ajax({
// 		method: "GET", 
// 		url: /scrape/, 
// 	})
// 	.done((data) => {

// 	})
// })

$(document).on("click", ".save-article", () => {

	const articleId = $(".save-article").attr("data-id")
	console.log(articleId); 

	$.ajax({
		method: "GET", 
		url: /articles/ + articleId
	})
	.done((data) => {
		console.log(data); 
		console.log("save complete"); 
	});
})

//create and save note
$(document).on("click", "#save-note", () => {


	const articleId = $("#save-note").attr("data-id");
	const noteTitle = $("#note-title").val(); 
	const noteBody = $("#note-body").val(); 
	console.log(`Article ID: ${articleId} Title: ${noteTitle} Body: ${noteBody}`);

	$.ajax({
		method: "POST", 
		url: /save-note/ + articleId,
		data: {
			title: noteTitle, 
			body: noteBody
		}
	})
	.done((data) => {
		console.log("data:", data);

	});
});