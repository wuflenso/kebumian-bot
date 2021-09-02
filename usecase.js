// Input processing and validations belong here

const COMMAND_WITH_KEYWORD = ['play','p','search','s'];

function mapRequest(input){
    let deserialized = input.split(' ');

    let command = deserialized[0].substring(1);
    deserialized.shift();
    let keyword = deserialized;

    if(COMMAND_WITH_KEYWORD.includes(command) == true && keyword == null){
        return `You don't specify the keyword, dumbass`;
    }

    switch(command){
        case 'p':
        case 'play':
            return `you are going to play ${buildText(keyword)}`;
        case 's':
        case 'search':
            return `you are searching ${buildText(keyword)}`;
        case 'stop':
            return `please stop the music!`;
        default:
            return `your command is not registered`;
    }
}

// This function is for testing purpose only
function buildText(input){
    let text = '';
    for(i=0;i<input.length;i++){
        text += input[i];
        if(i!=input.length-1){
            text+=' ';
        }
    }
    return text;
}

module.exports = { mapRequest };