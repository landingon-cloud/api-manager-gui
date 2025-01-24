const getBreadCrumbTo = (path, PUBLIC_URL='/') => {
    const Capital = lower=>lower.replace(/^\w/, c => c.toUpperCase());
    path = path.replace(PUBLIC_URL, '').replace(/^\/+/,'');
    let pieces = path.split('/').filter((x,ord)=>(ord%2));
    pieces.unshift('/');
    //console.log(pieces)
    return pieces.map((x,i)=>{
        switch(i) {
            case 0:
                return {name:'Home', path: PUBLIC_URL};
            case 1:
                return {name:Capital(x), path: `${PUBLIC_URL}editapi/${x}`}
            case 2:
                return {name:Capital(x), path: `${PUBLIC_URL}editapi/${x}`}
        }
        return {name: ''}
    }).slice(0,2)
}

module.exports = {
    getBreadCrumbTo
}
