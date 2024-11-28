import { filterOptions } from '../data/filterOptions.js';

console.log(filterOptions);

function createFilterButton(item, type) {
    const button = document.createElement('div');
    button.className = 'col-md-3 mb-4';
    button.innerHTML = `
        <button class="btn btn-custom w-100" data-filter-type="${type}" data-filter-value="${item.id}">
            ${item.label}
        </button>
    `;
    return button;
}

export function createFilterButtons(container, type) {
    if (!container) return;

    const options = filterOptions[type];
    if (!options) {
        console.warn(`No hay opciones para ${type}.`);
        return;
    }

    container.innerHTML = '';
    options.forEach(item => {
        container.appendChild(createFilterButton(item, type));
    });
}
