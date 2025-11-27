class OlButton {
    static indicatorActiveClass = 'bg-[#05ce00]';
    
    constructor(text) {
        this.buttonElement = document.createElement('button');
        this.buttonElement.className = 'ol-button';
        this.buttonElement.style.width = 'fit-content';
        this.buttonElement.style.padding = '0 0.5rem';
        this.buttonElement.style.height = '2rem';
        this.buttonElement.style.display = 'flex';
        this.buttonElement.classList.add('flex-row', 'items-center', 'gap-2');

        this.buttonIcon = document.createElement('span');
        this.buttonIcon.setAttribute('data-indicator', '');
        this.buttonIcon.classList.add('h-[8px]', 'w-[8px]', 'border', 'border-white', 'rounded');
        this.buttonElement.appendChild(this.buttonIcon);

        this.buttonTextElement = document.createElement('span');
        this.buttonTextElement.innerHTML = text;
        this.buttonTextElement.classList.add('text-sm');
        this.buttonElement.appendChild(this.buttonTextElement);
    }

    element(){
        return this.buttonElement;
    }

    off(){
        this.buttonIcon.classList.remove(OlButton.indicatorActiveClass);
    }
    
    on(){
        this.buttonIcon.classList.add(OlButton.indicatorActiveClass);
    }
}

class OlButtonWrapper {
    constructor() {
        this.wrapperElement = document.createElement('div');
        this.wrapperElement.classList.add('ol-unselectable', 'ol-control', 'flex', 'flex-row');
        this.wrapperElement.style.top = '0.5em';
        this.wrapperElement.style.left = '0.5em';
        this.wrapperElement.style.position = 'absolute';
    }

    element() {
        return this.wrapperElement;
    }

    addButton(button) {
        this.wrapperElement.appendChild(button);
    }
}