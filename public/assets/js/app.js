
//call to scrape route to populate field 
// $(document).on("click", "#npr-scrape", () => {

// 	$.ajax({
// 		method: "GET", 
// 		url: /scrape/, 
// 	})
// 	.done((data) => {

// 	})
// })

// const saveArticle = (id) => {
// 	console.log("this worked")

// }


$(document).on("click", "#save-article", function()  {
	const articleId = $(this).attr("data-id");
	console.log(`article id: ${articleId}`); 

	$.ajax({
		method: "GET", 
		url: "/articles/" + articleId
	})
	.done((data) => {
		console.log(data); 
		console.log("save complete"); 
	});
});

//create and save note
$(document).on("click", "#save-note", function() {


	const articleId = $(this).attr("data-id");
	const noteTitle = $("#note-title").val(); 
	const noteBody = $("#note-body").val(); 
	console.log("article id: " + articleId + " note title: " + noteTitle + " Note Body: " + noteBody);

	$.ajax({
		method: "POST", 
		url: "/save-note/" + articleId,
		dataType: "json", 
		data:
			{
				title: noteTitle,
				body: noteBody
			}
	})
	.done(function(data) {
		console.log("data:", data);

	});
});