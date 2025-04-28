
async function SetupListPage (listSource, ...steps) {

    const copyHeaderPromise = CopyElementByID('/html/header.html', '#header', '#header').then(() => {
        BuildPaths(steps);
    });
	
	const copyListPromise = CopyElementByID(listSource, "#project-list", "#projects").then(() => {
        //Get all listed previews
        const list = document.getElementById("project-list");

        const previews = list.querySelectorAll("div.preview");

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

            link.appendChild(preview.cloneNode(true));
            
            //Wrap link in div
            var div = document.createElement('div');
            div.classList.add("list-entry", "project-preview");

            var wip = preview.getAttribute("wip");

            if (wip != null) {
                div.classList.add("wip");
            }

            div.appendChild(link);

            //Swap preview with properly formatted div
            preview.replaceWith(div);
           
            //Populate link snippets
			CopyElement(source, '#snippet', link).then(() => {
				//console.log('Header copied successfully!');
			}).catch((error) => {
				console.error('Failed to copy preview:', error);
			});
		
		}
	}).catch((error) => {
		console.error('Failed to copy projects:', error);
	});

    try {	
        await Promise.all([copyHeaderPromise, copyListPromise]);
        return new Promise((resolve, reject) => {resolve()});
    } catch (error) {
        throw error;
    }
}


function SetupGamePage (listSource, ...steps) {

    CopyElementByID('/html/header.html', '#header', '#header').then(() => {
        BuildPaths(steps);
    });
	
	CopyElementByID(listSource, "#game-list", "#games").then(() => {
        //Get all listed previews
		const previews = document.querySelectorAll("div.game");
        
        const list = document.getElementById("game-list");

        //Iterate
		for (var i = 0; i < previews.length; i++) {
			const preview = previews.item(i);
			
            //Get source path from preview
			const source = preview.getAttribute('src');

            fetch(source)
                .then(response => response.json())
                .then(data => {
                    SetupGamePreview(list, preview, data);
                })
                .catch(error => {
                    console.error('Error loading JSON:', error);
                });
		}
	}).catch((error) => {
		console.error('Failed to copy projects:', error);
	});
	
}

function SetupGamePreview (list, preview, info) {
    //Wrap button in div
    var div = document.createElement('div');
    div.classList.add("list-entry", "game-preview");

    div.addEventListener('click', function() {
        SetupUnityGame(info);
    });

    var wip = preview.getAttribute("wip");

    if (wip != null) {
        div.classList.add("wip");
    }

    div.appendChild(preview);

    //Add div to list
    list.appendChild(div);

    //Populate link snippets
    CopyElement(info.snippet, '#snippet', preview).then(() => {
        //console.log('Header copied successfully!');
    }).catch((error) => {
        console.error('Failed to copy header:', error);
    });
}