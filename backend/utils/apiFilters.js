class APIFilters{
constructor(query,queryStr)
{
    this.query=query;
    this.queryStr=queryStr;
}
search(){
const keyword=this.queryStr.keyword
?{
    name:{
        $regex:this.queryStr.keyword,
        $options:"i",

    },
}
:{};
this.query= this.query.find({ ...keyword });
return this;
}
filters()
{
    const queryCopy={...this.queryStr};
//Feilds to remove
const fieldsToRemove=["keyword","page"];
fieldsToRemove.forEach((el)=>delete queryCopy[el]);


//Advance filters for prioce ratings etc..

let queryStr=JSON.stringify(queryCopy);
queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
// console.log("=================")
// console.log(queryStr);
// console.log("=================")

this.query=this.query.find(JSON.parse(queryStr));
return this;

}
pagination(resPerPage)
{
    const currentPage=Number(this.queryStr.page) || 1;
    const skip=resPerPage*(currentPage-1);
    this.query=this.query.limit(resPerPage).skip(skip);
    return this;
}
}
export default APIFilters;