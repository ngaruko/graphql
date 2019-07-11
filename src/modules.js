const message = () => {
	console.log('Some messages from module js');
}; 
const text = 'some text';

//export { message };

module.exports = {
	message,
	text
};