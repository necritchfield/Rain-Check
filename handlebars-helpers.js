module.exports = {
    ifeq: function(a, b, options){
      if (a === b) {
        return options.fn(this);
        }
      return options.inverse(this);
    },
    bar: function(){
      return "BAR!";
    },
    eq: function () {
        const args = Array.prototype.slice.call(arguments, 0, -1);
        return args.every(function (expression) {
            return args[0] === expression;
        });
    }
  }