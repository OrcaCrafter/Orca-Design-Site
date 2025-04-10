
/**
 * 
 */

async function copyElementByID (filePath, elementSelector, targetSelector) {
	const targetElement = document.querySelector(targetSelector);
	if (!targetElement) {
		throw new Error(`Target element with selector "${targetSelector}" not found in current document.`);
	}
	
	await copyElement(filePath, elementSelector, targetElement);
}


async function copyElement (filePath, elementSelector, targetElement) {
	
	try {
		const response = await fetch(filePath);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const html = await response.text();
		
		const tempElement = document.createElement('div');
		tempElement.innerHTML = html;
	
		const elementToCopy = tempElement.querySelector(elementSelector);
		if (!elementToCopy) {
			throw new Error(`Element with selector "${elementSelector}" not found in file.`);
		}
		const clonedElement = elementToCopy.cloneNode(true);

		targetElement.appendChild(clonedElement);
	
	} catch (error) {
		console.error("Error copying element:", error);
	}
}