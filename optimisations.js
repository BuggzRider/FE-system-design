/*
  =======Tree shaking=======
  -) Tree shaking is elemination of dead code. It is used by webpack to remove all the codes which are not being used (imported)
     in any other file or is used by any function.
  -) Tree shaking is possible by ES6 modules Import/export (static structure)
  -) Static structure: it is a term in the context of JavaScript, particularly with modules, refers to the ability to analyze
     the code's structure at build time rather than runtime or the relationships between modules (imports and exports) can be
     determined without executing the code.
     -) Static structure in js is possible by ES6 modules Import/export.
     -) As we know the es6 imports can only be done on the top of the file, not inside any condition or function which helps 
        make the code structure static.
     -) Static structures enable various optimizations in bundling, minification, and code splitting, dead code elimination
        leading to improved performance for web applications.
  -) Dynamic structures: Prior to ES6 modules all codes were imported using "require()", which had the capability to import modules
     inside a condition or function and this makes it difficult to perform static analysis. 
  -) Side effects: This helps Webpack understand whether modules have side effects (e.g., modifying globals or other modules).
     If modules do not have side effects, you can set "sideEffects": false, allowing for more aggressive tree shaking.
     -) To flag a statement as side effect free( making easy for webpack to remove dead-code), we use /*#__PURE__
  -) Once this all is done we all the dead codes are cued up and ready to be dropped, in this case we need to mark webpack
     mode to start in production env

*/


/*
  =======Webpack=======
  -) Loaders
    -) These describe to webpack how to process non-native modules and include these dependencies into your bundles.
    -) Loaders allow you to preprocess files as they are imported. We can transform files, such as converting TypeScript 
       to JavaScript or compiling Sass to CSS, enabling support for a wide variety of file types.
  -) Plugins
    -) extend Webpack's functionality. They can perform a range of tasks, like optimizing the output, managing environment variables,
       or handling code splitting. Notable plugins include HtmlWebpackPlugin and MiniCssExtractPlugin.
  -) Code Splitting
    -) This helps in writing code is small chunks which can be loaded on demand. This improves load times by only sending
       the necessary code to the browser.
  -) Development server
    -) Webpack provides a dev feature called Hot module replacement (HMR), which helps developers to make and reflect changes without 
       braowser refresh.
*/

/*
  =======Caching in webpack=======
  -) Output files
    -) Client request for the files from server and caches them to prevent network hog. Due to this, it is important to create the main
       file name in such a way that it gets a new distinct name on next builds.
    -) To do this webpack provides and output object in which we can provide a file name like this. 
                            filename: '[name].[contenthash].js',
    -) This helps in getting a new file name on every build and this gets newly cashed by clients.
  -) Extracting Boilerplate
    -) to create a seperate chunk manually, add the file as entry point.
    -) We can remove vendor modules in our build (boilerplate code) by cachegroup field in splitChunk options. We can add
       a regex to remove specific modules as well
                                optimization: {
                                    splitChunks: {
                                    cacheGroups: {
                                        commons: {
                                        test: /[\\/]node_modules[\\/]/,
                                        name: 'vendors',
                                        chunks: 'all',
                                        },
                                    },
                                    },
                                },
   -) Module Identifiers
    -) In Webpack, the moduleIds: 'deterministic' option is part of the configuration that affects how Webpack
       generates unique identifiers for modules in bundle. 
    -) When set moduleIds: 'deterministic', Webpack generates module IDs based on the relative path of the
       module. This means that the module ID will be consistent across builds, provided that the module's path and
       contents have not changed.
    -) Benefits:
       -) Consistent Caching: This approach enhances browser caching. If the module hasn’t changed, its ID remains the
                              same, allowing browsers to cache the module effectively. This can lead to faster load times
                              for subsequent visits.
       -) Improved Debugging: Consistent IDs make it easier to debug issues because the identifiers remain stable across builds.
                              You can reliably refer to the same module ID in your source maps and debugging tools.
       -) Better Chunking: It can help with optimizing code splitting, as the IDs of modules in different chunks will remain consistent,
                          making it easier to track dependencies.
  
*/

/*
  ======= HtmlWebpackPlugin =======
  -) The HtmlWebpackPlugin is a widely used plugin in Webpack that simplifies the creation of HTML files to serve your
     Webpack bundles. It helps manage the generation of HTML files dynamically based on the assets produced by your build
     process. Here’s a detailed explanation of its features, benefits, and usage:
` -) Key Features
    -) Automatic Injection: It automatically injects script and link tags for your Webpack bundles into the generated HTML file.
       This means you don't have to manually add <script> tags for each JS bundle or <link> tags for CSS files.
    -) Template Support: You can use your own HTML template files. The plugin can take a template file (like Pug, EJS,
       or a simple HTML file) and use it to generate the final HTML output.
    -) Multiple Pages: You can easily create multiple HTML files for different entry points in your application. 
       This is useful for multi-page applications.
    -) Minification: The generated HTML can be minified for production, improving load times and reducing the size of your assets.
    -) Meta Tags and More: You can easily add meta tags, links to favicon, and other HTML attributes through options in the plugin.
*/