
let countryList = new Array("(Select your country)","Spain", "England", "France", "Italy");
let userPattern = "^[a-z A-Z]{5,12}$";
let passPattern = "^[a-z A-Z]{7,12}$";
let namePattern = "^[a-z A-Z]{0,50}$";
let zipCodePattern="^[0-9]{5}$";
let emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$";
let aboutPattern="^[a-zA-Z0-9._%+-]{0, 240}$";

let user = $("#user");
let pass = $("#pass");
let name = $("#name");
let country = $("#country");
let zipCode = $("#zipCode");
let email = $("#email");
let lang = $("#language");
let about = $("#about");
let submit=$("#submitBtn");

let userValidated = false;
let passValidated = false;
let nameValidated = false;
let countryValidated = false;
let zipCodeValidated = false;
let emailValidated = false;
let langValidated = false;
let aboutValidated = true;
$(submitBtn).prop("disabled", true);
$(function() {
  inicializeList();
  inicialize();
});

function inicializeList(){
	for(let i = 0; i < countryList.length; i++){
		if(i == 0){
			opt = "<option selected value='"+countryList[i]+"'>"+countryList[i]+"</option>";
		} else {
			opt = "<option value='"+countryList[i]+"'>"+countryList[i]+"</option>";
		}	    
	    country.append(opt);
	}
}

function inicialize(){
	$(user).focusout(userValidation);
	$(pass).focusout(passValidation);
	$(name).focusout(nameValidation);
	$(country).focusout(countryValidation);
	$(zipCode).focusout(zipCodeValidation);
	$(email).focusout(emailValidation);
	$(about).keyup(aboutValidation);
	addChangeEvent($("input[name='language']"), langValidation);
}

function addChangeEvent(elements, function_name){
	$(elements).each(function(){
		$(this).change(function_name);
	})
}
function checkInput(idInput, pattern) {
	return $(idInput).val().match(pattern) ? true : false;
}
function checkLanguage() {
	if(checkRadioBox("#langSpa")||checkRadioBox("#langEng")){
		return true;
	}else{
		return false;
	}
}
function enableSubmit (submit) {
	$(submit).prop("disabled", false);
} 
function disableSubmit (submit) {
	$(submit).prop("disabled", true);
}
function checkForm () {
	console.log("lang"+langValidated);
	if (nameValidated && userValidated && emailValidated && passValidated && 
	zipCodeValidated &&	countryValidated && aboutValidated && langValidated){
		enableSubmit($(submit));
	} else {
		disableSubmit($(submit));
	}
}


function userValidation(){

	let element = event.target;
	let box = $("#user_info");
	let error_message = "";
	let valid=true;

	if($(element).hasClass("required")){
		if(!Boolean($(element).val())){
			valid = false;
			error_message = "Username can't be empty";
		}else{
			if(!checkInput($(element), userPattern)){
				valid=false;
				error_message = "Username must be between 5 and 12 characters";
			}
		}
	}

	if(!valid){
		changeToUnallowed(element, box, error_message);
	}else{
		changeToAllowed(element, box);
	}

	userValidated = valid;
	checkForm();
}


function passValidation(){

	let element = event.target;
	let box = $("#pass_info");
	let error_message = "";
	let valid=true;

	if($(element).hasClass("required")){
		if(!Boolean($(element).val())){
			valid = false;
			error_message = "Password can't be empty";
		}else{
			if(!checkInput($(element), passPattern)){
				valid=false;
				error_message = "Password must be between 7 and 12 characters";
			}
		}
	}

	if(!valid){
		changeToUnallowed(element, box, error_message);
	}else{
		changeToAllowed(element, box);
	}

	passValidated = valid;
	checkForm();
}

function nameValidation(){

	let element = event.target;
	let box = $("#name_info");
	let error_message = "";
	let valid=true;

	if($(element).hasClass("required")){
		if(!Boolean($(element).val())){
			valid = false;
			error_message = "Name can't be empty";
		}else{
			if(!checkInput($(element), namePattern)){
				valid=false;
				error_message = "Only alphabet characters allowed";
			}
		}
	}

	if(!valid){
		changeToUnallowed(element, box, error_message);
	}else{
		changeToAllowed(element, box);
	}

	nameValidated = valid;
	checkForm();
}

function countryValidation(){

	let select = event.target;
	let option_selected;
	let box = $("#country_info");
	let valid = true;
	let error_message = "";

	$("#" + select.id + " option").each(function(){
		if($(this).prop("selected")){
			option_selected = $(this);
			return false;
		}
	});
	
	if(!Boolean(option_selected) || option_selected.val() == 0){
		valid = false;
		error_message = "You must choose a country";
	}


	if(valid)
		changeToAllowed(select, box);
	else
		changeToUnallowed(select, box, error_message);

	countryValidated = valid;
	checkForm();

}

function zipCodeValidation(){

	let element = event.target;
	let box = $("#zipCode_info");
	let valid = true;
	let error_message = "";

	if(element.className.split(" ").includes("required")){
		if(!Boolean($(element).val())){
			valid = false;
			error_message = "ZIP Code can't be empty";
		}else{
			if(! checkInput($(element), zipCodePattern) && Boolean($(element).val())){
				valid = false;
				error_message = "ZIP Code must be 5 numbers";
			}
		}
	}

	if(! valid){
		changeToUnallowed(element, box, error_message);
	}else{
		changeToAllowed(element, box);
	}

	zipCodeValidated = valid;
	checkForm();

}

function emailValidation(){

	let element = event.target;
	let box = $("#email_info");
	let error_message = "";
	let valid=true;

	if($(element).hasClass("required")){
		if(!Boolean($(element).val())){
			valid = false;
			error_message = "E-mail can't be empty";
		}else{
			if(!checkInput($(element), emailPattern)){
				valid=false;
				error_message = "Must be a valid e-mail";
			}
		}
	}

	if(!valid){
		changeToUnallowed(element, box, error_message);
	}else{
		changeToAllowed(element, box);
	}

	emailValidated = valid;
	checkForm();

}

function aboutValidation(){

	let element = event.target;
	let characters = $(element).val().length;
	let characterBox = $(about);
	let error_message = "";
	let box = $("#about_info");

	if(characters>240){
		if(! characterBox.hasClass("text-danger"))
			characterBox.addClass("text-danger");
		error_message = "Can't exceed 240 characters";
		message = characters + "/240";
		changeToUnallowedAbout(element, box, message, error_message);
		aboutValidated = false;
	}else{		
		if(characterBox.hasClass("text-danger"))
			characterBox.removeClass("text-danger");
		message = characters + "/240";
		changeToAllowedAbout(element, box, message);
		aboutValidated = true;
	}
	checkForm();
}

function langValidation(){

	let elements = $("input[name='" + event.target.name + "']");
	let valid = false;
	let box = $("#language_info");
	let error_message = "";

	elements.each(function(){
		if($(this).prop("checked")){
			valid = true;
			return false;
		}
	});

	if(valid){
		changeToAllowed(elements, box);
	}else{
		error_message = "You must pick at least a language";
		changeToUnallowed(elements, box, error_message);
	}

	langValidated = valid;
	checkForm();

}


function changeToUnallowed(element, box, error_message){

	if($(element).length != undefined && $(element).prop("tagName") != "SELECT"){
		$(element).each(function(){
			if(! $(this).hasClass("is-invalid"))
				$(this).addClass("is-invalid");
		});
	}else{
			if(! $(element).hasClass("is-invalid"))
				$(element).addClass("is-invalid"); 
	}

	if(! $(box).hasClass("invalid-feedback"))
		$(box).addClass("invalid-feedback");

	$(box).text(error_message);
}


function changeToAllowed(element, box){

	if($(element).length != undefined && $(element).prop("tagName") != "SELECT"){
		$(element).each(function(){
			if($(this).hasClass("is-invalid"))
				$(this).removeClass("is-invalid");
			if(! $(this).hasClass("is-valid"))
				$(this).addClass("is-valid");
		});
	}else{
			if($(element).hasClass("is-invalid"))
				$(element).removeClass("is-invalid");
			if(! $(element).hasClass("is-valid"))
				$(element).addClass("is-valid"); 
	}
	
	box.attr("class", "");
	box.empty();
}

function changeToUnallowedAbout(element, box, message, error_message){

	if($(element).length != undefined && $(element).prop("tagName") != "SELECT"){
		$(element).each(function(){
			if(! $(this).hasClass("is-invalid"))
				$(this).addClass("is-invalid");
		});
	}else{
			if(! $(element).hasClass("is-invalid"))
				$(element).addClass("is-invalid"); 
	}

	if(! $(box).hasClass("invalid-feedback"))
		$(box).addClass("invalid-feedback");

	$(box).text(message + " " + error_message);
}

function changeToAllowedAbout(element, box, message){

	if($(element).length != undefined && $(element).prop("tagName") != "SELECT"){
		$(element).each(function(){
			if($(this).hasClass("is-invalid"))
				$(this).removeClass("is-invalid");
			if(! $(this).hasClass("is-valid"))
				$(this).addClass("is-valid");
		});
	}else{
			if($(ielement).hasClass("is-invalid"))
				$(element).removeClass("is-invalid");
			if(! $(element).hasClass("is-valid"))
				$(element).addClass("is-valid"); 
	}
	
	box.attr("class", "");
	box.empty();
	$(box).text(message);
}
