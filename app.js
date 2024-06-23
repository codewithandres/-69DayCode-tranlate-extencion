import { languages } from './lang.js';

document.addEventListener('DOMContentLoaded', () => {
	const langSelect = document.getElementById('language');
	languages.map((lang) => {
		const option = document.createElement('option');

		option.value = lang.code;
		option.textContent = lang.name;

		langSelect.appendChild(option);
	});

	document.getElementById('translate').addEventListener('click', () => {
		const lenguage = langSelect.value;

		chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
			chrome.scripting.executeScript(
				{
					target: { tabId: tabs[0].id },
					files: ['translate.js'],
				},
				() => {
					chrome.tabs.sendMessage(tabs[0].id, { lenguage });
				},
			);
		});
	});
});
