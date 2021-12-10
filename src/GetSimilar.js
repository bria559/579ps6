function GetSimilar(ml, callback) {
    fetch(`https://api.datamuse.com/words?${(new URLSearchParams({ml})).toString()}`)
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        }, (err) => {
            console.error(err);
        });
};

export default GetSimilar;