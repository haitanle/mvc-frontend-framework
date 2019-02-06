
var model = {
	isAdminShowing: false,
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
		adminView.init();

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
	}, 

	getAdminStatus: function(){
		return model.isAdminShowing;
	},

	setAdminVisible: function(visibility){
		model.isAdminShowing = visibility;
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


var adminView = {
	init: function(){
		let adminButton = document.getElementById('adminButton');
		let adminForm = document.getElementById('adminForm');

		this.render();
		this.update();

	},

	render: function(){
		adminButton.addEventListener('click',(function(){

			//get current model display/and toggle
			return function(){
				let isAdminShowing = controller.getAdminStatus();

				console.log('click');

				if (!isAdminShowing){
					adminForm.style.visibility = 'visible';
					controller.setAdminVisible(true);
				}else{
					adminForm.style.visibility = 'hidden';
					controller.setAdminVisible(false);
				}


				let currentCat = controller.getCurrentCat();

				document.getElementById('form_catName').value = currentCat.name;
				document.getElementById('form_imageSrc').value = currentCat.src;
				document.getElementById('form_clickCounter').value = currentCat.counter;


			};

		})());
	},

	update: function(){
		let submitButton = document.getElementById('submitButton');

		submitButton.addEventListener('click', function(){
			console.log('submit button clicked');
		});
	}
};

controller.init();