console.log('js');
let pastImageData=null;
var img=null;
var canvas=document.getElementById('canvas');
var ctx =canvas.getContext('2d');
document.getElementsByTagName('body')[0].addEventListener('keypress',(e)=>{
	if(e.code=='KeyZ'){
		ctx.clearRect(0, 0, canvas.width, canvas.height); //лучше почисти холс перед вставкой
		ctx.putImageData(pastImageData, coordinatesX, coordinatesY);
		alert(pastImageData==dataImage);
	}
})
//save image
function getImage(canvas){
	var imageData = canvas.toDataURL();
	var image = new Image();
	image.src = imageData;
	return image;
}

function saveImage(image) {
	var link = document.createElement("a");

	link.setAttribute("href", image.src);
	link.setAttribute("download", "canvasImage");
	link.click();
}


function saveCanvasAsImageFile(){
	var image = getImage(document.getElementById("canvas"));
	saveImage(image);
}


//zoom image

let imageCanvas;
let coordinatesX=null;
let coordinatesY=null;
let widthImage=null;
let heightImage=null;
var dataImage=null;

function downloadImage(input) {
	var file;
	var canvas = document.getElementById('canvas');/*Получаем элемент блок контейнера*/

	var  len = input.files.length;/*Считаем количество загружаемых файлов за раз*/
	for(var x = 0; x < len; x++) { /*Перебираем файлы с помощью цикла*/
		file =input.files[0];/*Получаем содержимое файла*/
		var reader = new FileReader(); /*Создаем объект reader класса FileReader*/
		reader.onload = function(e) { /*Создаем  обработчик загрузки файла */
			img = new Image(); /*Создаем изображение*/
			img.crossOrigin;
			img.src = e.target.result;  /*В качестве пути указываем содержимое файла*/

			//img.src='/image/myNew.jpg';

			file.lastModified;
			file.name;
			file.size;
			img.width;
			img.height;
			let infAboutFile=document.getElementById('infAboutFile');
			let name=document.createElement('span');
			let size=document.createElement('span');
			let widthFile=document.createElement('span');
			let heightFile=document.createElement('span');
			let forInfOfProcessing=document.createElement('span');
			forInfOfProcessing.classList.add('forInfOfProcessing');
			forInfOfProcessing.id='forInfOfProcessing';
			name.innerHTML="имя файла:  "+file.name;
			size.innerHTML="размер файла:  "+file.size+"byte";
			widthFile.innerHTML="ширина изображения:  "+img.width;
			heightFile.innerHTML="высота файла:  "+img.height;
			infAboutFile.appendChild(name);
			infAboutFile.appendChild(size);
			infAboutFile.appendChild(widthFile);
			infAboutFile.appendChild(heightFile);
			infAboutFile.appendChild(forInfOfProcessing);


			//let ctx=canvas.getContext('2d');/*Помещаем изображение в контейнер*/

			img.onload=function(){
				let width=100;
				let height=100;
				let x=0;
				let y=0;
				if(img.width/img.height>1){
					if(img.width<canvas.width){
						width=img.width;
						x=(canvas.width-width)/2;
						height=img.height;
						y=(canvas.height-height)/2;
					}else{
						width=canvas.width;
						height=(img.height/img.width)*canvas.height;
						y=(canvas.height-height)/2;
						x=0;
					}
				}else{
					if(img.height<canvas.height){
						width=img.width;
						height=img.height;
						y=(canvas.height-height)/2;
						x=(canvas.width-width)/2;
					}else {
						width=(img.width/img.height)*canvas.height;
						height=canvas.height;
						y=0;
						x=(canvas.width-width)/2;
					}
				}
				dataImage=ctx.getImageData(x,y,width,height);
				coordinatesX=x;
				coordinatesY=y;
				widthImage=width;
				heightImage=height;
				ctx.clearRect(0,0,canvas.width,canvas.height);
				ctx.drawImage(img,x,y,width,height);
				// canvas.addEventListener('mouseover',()=>{
				//     ctx.transform(2,0,0,2,0,0);
				//
				//     ctx.drawImage(img,x,y,width,height);
				// });




				//zoom



				//end zoom

				let divForImageOriginal=document.getElementById('imageOriginal');
				let divImage=document.createElement('div');
				divImage.appendChild(img);
				divForImageOriginal.appendChild(divImage);}

		};
		reader.readAsDataURL(file);/*Преобразовываем содержимое файла в кодировку base64*/

	}

}

let iconImage=document.getElementById('iconImage');
iconImage.addEventListener('click',()=>{
	let parent=document.createElement("div");
	parent.innerHTML='<label for="file-upload" class="custom-file-upload">'+
		'<i class="fa fa-cloud-upload"></i> Custom Upload'+
		'</label> <input id="file-upload" type="file" accept=".png,.jpg,.tif" onchange="downloadImage(this)"/>'+
		'<button onclick="saveCanvasAsImageFile()">save image</button>';
	parent.classList.add('menuForIconImage');
	let chooseTools=document.getElementById('chooseTools');
	if(chooseTools.firstChild){
		chooseTools.firstChild.remove();
	}
	chooseTools.appendChild(parent);
});

function toNegative(){
	dataImage=ctx.getImageData(coordinatesX, coordinatesY, widthImage, heightImage);
	//pastImageData=Object.assign([],dataImage);
	pastImageData=ctx.getImageData(coordinatesX, coordinatesY, widthImage, heightImage);
	for (let j=0;j<dataImage.data.length;j+=4){

		dataImage.data[j] = 255 - dataImage.data[j];
		dataImage.data[j+1] = 255 - dataImage.data[j + 1];
		dataImage.data[j+2] = 255 - dataImage.data[j + 2];
		//dataImage.data[j+3] = 255 - dataImage.data[j + 3];
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height); //лучше почисти холс перед вставкой
	ctx.putImageData(dataImage,coordinatesX, coordinatesY);
}

function toGray(){
	dataImage=ctx.getImageData(coordinatesX, coordinatesY, widthImage, heightImage);
	pastImageData=ctx.getImageData(coordinatesX, coordinatesY, widthImage, heightImage);
	let coefR=0.3;
	let coefG=0.6;
	let coefB=0.11;
	for (let j=0;j<dataImage.data.length;j+=4){
		dataImage.data[j+3] = dataImage.data[j]*coefR + dataImage.data[j + 1]*coefG + dataImage.data[j + 2]*coefB;
		dataImage.data[j] = dataImage.data[j+3];
		dataImage.data[j+1] = dataImage.data[j+3];
		dataImage.data[j+2] = dataImage.data[j+3];
		if(j%100==0) {
			document.getElementById('forInfOfProcessing').innerHTML = "processing: " + j/ dataImage.data.length + "%";
		}
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height); //лучше почисти холс перед вставкой
	ctx.putImageData(dataImage, coordinatesX, coordinatesY);
}
function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

function binary(){
	pastImageData=ctx.getImageData(coordinatesX, coordinatesY, widthImage, heightImage);
	let firstColor=document.getElementById('firstColor').value;
	let secondColor=document.getElementById('secondColor').value;
	dataImage=ctx.getImageData(coordinatesX, coordinatesY, widthImage, heightImage);
	let coefR=0.3;
	let coefG=0.6;
	let coefB=0.11;
	document.getElementById('range').addEventListener('change',binary);

	let border=document.getElementById('range').value;


	for (let j=0;j<dataImage.data.length;j+=4){
		if(border>dataImage.data[j]*coefR+dataImage.data[j + 1]*coefG+dataImage.data[j + 2]*coefB){
		dataImage.data[j+3] =hexToRgb(firstColor).r*coefR+hexToRgb(firstColor).g*coefG+hexToRgb(firstColor).b*coefB;
		dataImage.data[j] =hexToRgb(firstColor).r;
		dataImage.data[j+1] =hexToRgb(firstColor).g;
		dataImage.data[j+2] =hexToRgb(firstColor).b;
		}else{
			dataImage.data[j] =hexToRgb(secondColor).r;
			dataImage.data[j+1] = hexToRgb(secondColor).g;
			dataImage.data[j+2] =hexToRgb(secondColor).b;
			dataImage.data[j+3] =hexToRgb(secondColor).r*coefR+hexToRgb(secondColor).g*coefG+hexToRgb(secondColor).b*coefB;
		}
		if(j%100==0) {
			document.getElementById('forInfOfProcessing').innerHTML = "processing: " + 100*j/ dataImage.data.length + "%";
		}
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height); //лучше почисти холс перед вставкой
	ctx.putImageData(dataImage, coordinatesX, coordinatesY);
}


let filters=document.getElementById('filters');
filters.addEventListener('click',()=>{
	let parent=document.createElement("div");
	parent.innerHTML='<h4>редактирование фото</h4><button onclick="toNegative()">преобразование в негатив </button>'+
	'<h4>выберите цвета для бинаризации</h4><div class="divForInput"><input type="color" id="firstColor"><input type="color" id="secondColor"></div><input type="range" id="range" min="20" max="240" value="230"><button onclick="binary()">бинаризация</button><button onclick="toGray()"> в чернобелые цвета</button>';
	parent.classList.add('menuForIconImage');
	let chooseTools=document.getElementById('chooseTools');
	if(chooseTools.firstChild){
		chooseTools.firstChild.remove();
	}
	chooseTools.appendChild(parent);

});