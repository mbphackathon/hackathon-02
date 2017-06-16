function Prof() {

    this.name = '';
    this.photo='';
    this.description = '';
    this.dimensions = {};
}


Prof.prototype.loadFromJSON=function(json)
{
    this.name=json.name;
    this.description=json.description;
    this.dimensions=json.dimensions;

    return this;
};


Prof.prototype.getName=function() {
    return this.name;
}

Prof.prototype.getDescription=function() {
    return this.description;
}

Prof.prototype.getDimensions=function() {
    return this.dimensions
}