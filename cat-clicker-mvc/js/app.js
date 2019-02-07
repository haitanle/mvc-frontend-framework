
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

		this.setCurrentCat(model.catList[0]);
		catView.render();
		adminView.init();
	},

	incrementCounter: function(){
		model.currentCat.counter++;
		catView.render();
		adminView.render();
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
	}, 

	updateCurrenCat: function(updatedCat){

	for(let i = 0; i < model.catList.length; i++){
		if (model.catList[i] === model.currentCat){
			model.catList.splice(i,1,updatedCat);
			break;
		}
	}
	model.currentCat = updatedCat;
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

		catListElm.innerHTML = '';

		catList = controller.getCatList();

		catList.forEach(function(cat){

			let button = document.createElement('button');
			button.textContent = cat.name;

			button.addEventListener('click', 
				(function(cat){

					return function(){
						controller.setCurrentCat(cat);

						catView.render();
						adminView.render();
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

		adminButton.addEventListener('click',function(){

			let isAdminShowing = controller.getAdminStatus();
			if (!isAdminShowing){
				adminForm.style.visibility = 'visible';
				controller.setAdminVisible(true);
			}else{
				adminForm.style.visibility = 'hidden';
				controller.setAdminVisible(false);
			}

		});
		this.render();
	},

	render: function(){
		
		let currentCat = controller.getCurrentCat();

		let nameField = document.getElementById('form_catName');
		let imageSrcField = document.getElementById('form_imageSrc');
		let counterField = document.getElementById('form_clickCounter');
		let submitButton = document.getElementById('submitButton');
		let cancelButton = document.getElementById('cancelButton');


		nameField.value = currentCat.name;
		imageSrcField.value = currentCat.src;
		counterField.value = currentCat.counter;

		submitButton.addEventListener('click', (function(){
			
			return function(){

				let updatedCat = {
					name: nameField.value,
					src: imageSrcField.value,
					counter: counterField.value
				};

				controller.updateCurrenCat(updatedCat)

				catView.render();
				listView.init();
				}
		})());

		cancelButton.addEventListener('click',function(){
			controller.setAdminVisible(false);
			let adminForm = document.getElementById('adminForm');
			adminForm.style.visibility = 'hidden';
			adminView.render();
		});


	}
};

controller.init();