
function SetupListPage (listSource) {
    copyElementByID('/html/header.html', '#header', '#header');
	
	copyElementByID(listSource, "#project-list", "#projects").then(() => {
        //Get all listed previews
		const previews = document.querySelectorAll("div.preview");

        const list = document.getElementById("project-list");

        //Iterate
		for (var i = 0; i < previews.length; i++) {
			var preview = previews.item(i);
			
            //Get source path from preview
			var source = preview.getAttribute('src');

            //Wrap preview in link
            var link = document.createElement("a");
            link.classList.add("clean")
            link.setAttribute("href", source);
            link.setAttribute("rel", "noopener noreferrer");

            link.appendChild(preview);
            
            //Wrap link in div
            var div = document.createElement('div');
            div.classList.add("list-entry", "project-preview");

            var wip = preview.getAttribute("wip");

            if (wip != null) {
                div.classList.add("wip");
            }

            div.appendChild(link);

            //Add div to list
            list.appendChild(div);
           
            //Populate link snippets
			copyElement(source, '#snippet', preview).then(() => {
				//console.log('Header copied successfully!');
			}).catch((error) => {
				console.error('Failed to copy header:', error);
			});
		
		}
	}).catch((error) => {
		console.error('Failed to copy projects:', error);
	});
	
	buildPaths();
}
		