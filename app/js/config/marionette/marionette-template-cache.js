define(['marionette'], function(Marionette) {
  // Overwrite default Marionette's "loadTemplate" method
  // to allow using text! templates with RequireJS
  Marionette.TemplateCache.prototype.loadTemplate = function(templateId) {
    var template = templateId;

    if (!template || template.length === 0) {
      var err = new Error("Template not found: '" + templateId + "'");
      err.name = "NoTemplateError";
      throw err;
    }

    return template;
  };
});