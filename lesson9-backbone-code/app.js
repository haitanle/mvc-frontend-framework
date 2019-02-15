//leson9 - creating your own template function

/*
Create your own `template` function:

EXAMPLE:
in the example below `*(` is my default opening delimiter and `)*` is the default closing delimiter
var string = "Hi, my name is Richard. And I *( emotion )* this *( thing )*!";
var logResult = template( string );
logResult( 'love', 'ice cream', 2 ); // logs the message "Hi, my name is Richard. And I love this ice cream!", twice


var string = "Is <<! thing !>> healthy to <<! action !>>?";
var logResult = template( string, {open: '<<!', close: '!>>'} );
logResult( 'ice cream', 'consume', 7 ); // logs the message "Is ice cream healthy to consume?", seven times


Now it's your turn!
*/


var string = "Is <<! thing !>> healthy to <<! action !>>?";
var delimiter = {open: '<<!', close: '!>>'};

function template(string, {open = "*(" , close= ")*" }  = {})
{
	return new Function("...args", 

		"let argIdex = 0; \
		let string = '"+string+"'; \
		let openD = '"+open+"'; \
		let stringArray = string.split(' '); \
		let endPunctuation = string[string.length-1]; \
		console.log(stringArray); \
		console.log(openD); \
		for (let i = 0 ; i < stringArray.length; i++){ \
			if( stringArray[i] === openD ){ \
				stringArray.splice(i,3,args[argIdex]); \
				argIdex++;\
			} \
		}; \
		let newString = stringArray.join(' ')+endPunctuation; \
		console.log(newString.repeat(args[args.length-1])); \
		return newString.repeat(args[args.length-1]); "
	);

}


var display = template(string,delimter);
//or using default delimter
var display = template(string);

display('apple','eat',2); 
