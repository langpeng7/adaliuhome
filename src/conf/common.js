let dateFormat = (data) => {
 
        var y = data.getFullYear();  
        var m = data.getMonth() + 1;  
        m = m < 10 ? '0' + m : m;  
        var d = data.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        return y + '-' + m + '-' + d;  
}

module.exports = {
    dateFormat
}