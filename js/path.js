
/**
 * 
 */

function BuildPaths (steps) {
	const paths = document.querySelectorAll("div#path");

	for (var i = 0; i < paths.length; i++) {
		PopulatePathElement(paths[i], steps);
	}

}

function PopulatePathElement (pathDiv, steps) {

	for (var i = 0; i < steps.length; i++) {

		pathDiv.innerHTML += (i == 0 ? "" : " / ");

		var step = steps[i];

		var link = document.createElement("a");
		link.href = step.file;
		link.innerHTML = step.name;

		pathDiv.appendChild(link);
	}

	/*
	Adds back arrow
	pathDiv.innerHTML += "  |  "

	var backArrow = document.createElement("a");
	backArrow.href = currentPath + steps[steps.length - 1].file;
	backArrow.innerHTML = "&#8592;";

	pathDiv.appendChild(backArrow);
	*/
}