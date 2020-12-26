function cs142MakeMultiFilter(array) {
    var originalArray = array;
    var currentArray = array;
    function arrayFilterer(filterC, callback) {
        if (!filterC) {
            return currentArray;
        }
        currentArray = currentArray.filter(filterC);
        if (callback) {
            callback.call(originalArray, currentArray);

        }
        return arrayFilterer;

    }
    return arrayFilterer;
}