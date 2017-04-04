angular.module('docApp').constant('DOCS_NAVIGATION', {
  "api": {
    "id": "api",
    "href": "api",
    "name": "API",
    "navGroups": [
      {
        "name": "compile-dynamic-html",
        "type": "groups",
        "href": "api/compile-dynamic-html",
        "navItems": [
          {
            "name": "directive",
            "type": "section",
            "href": "api/compile-dynamic-html/directive",
            "navItems": [
              {
                "name": "bdCompileDynamicHtml",
                "type": "directive",
                "href": "api/compile-dynamic-html/directive/bdCompileDynamicHtml"
              }
            ]
          }
        ]
      }
    ]
  }
});
