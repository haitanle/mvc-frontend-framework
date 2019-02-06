
var model = {
	currentCat: null,
	catList : [
		{name: 'Teddy', src: 'img/teddy.jpg', counter: 0},
		{name: 'Sugar', src: 'img/cat.jpeg', counter: 0},
		{name: 'Danger', src:'img/danger.jpeg', counter: 0},
		{name: 'Jumpy', src:'img/jumpy.jpg', counter: 0},
		{name: 'Smoothness', src:'img/smoothness.jpg', counter: 0}
	]
};


var controller = {
	init: function(){
		listView.init();
		catView.init();

		this.setCurrentCat(model.catList[0]);
		catView.render();
	},

	incrementCounter: function(){
		model.currentCat.counter++;
		catView.render();
	},

	getCurrentCat: function(){
		return model.currentCat;
	}, 

	getCatList: function(){
		return model.catList;
	},

	setCurrentCat: function(cat){
		model.currentCat = cat;
	}
};




var catView = {
	init: function(){
		let catName = document.getElementById('catName');
		let catImage = document.getElementById('catImage');
		let clickCounter = document.getElementById('clickCounter');

		catImage.addEventListener('click', function(){
			controller.incrementCounter();
		});
	},

	render: function(){
		//update DOM element with values from the current cat
		let currentCat = controller.getCurrentCat();

		catName.innerText = currentCat.name;
		catImage.src = currentCat.src;
		clickCounter.innerText = currentCat.counter;
	}
};



var listView = {
	init: function(){
		//display catList when initialize
		catListElm = document.getElementById('catList');

		catList = controller.getCatList();

		catList.forEach(function(cat){

			//append to document
			let button = document.createElement('button');
			button.textContent = cat.name;

			button.addEventListener('click', 
				(function(cat){
					//set to currentElement
					//debugger;
					return function(){
						controller.setCurrentCat(cat);

						//display currentElement
						catView.render();
					};
				}
			)(cat));

			catListElm.appendChild(button);

		});
	}

};

controller.init();