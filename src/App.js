import Editor from "./Editor";
import Previewer from "./Previewer";
import $ from 'jquery';
import {useState, useEffect} from 'react';
import marked from 'marked';


/*-----------------REACT PART-----------------*/

const Container = () => {
  const [inputText, setInputText] = useState(`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvSISSdB8NZ3alq2LA_OUmnCwOYBeKmyr5QmpHoIabPE0GyJuGAcXc2DqHiLECGWCpBdTuZHsgdqYHw0UUgQ-Y8-tHZxhNkTf6XVBpJNA&usqp=CAU&ec=45714081)
`);

  useEffect(() => {
      $(document).ready(function(){
        $(document).on("click",".fa-arrows-alt", function(){
          let prevSibling = $(this).prev().text();
          let fsElement = $(this).parent().parent();
          if(prevSibling === "Previewer"){
            $(".ep-containers:first-child").before($(".ep-containers:nth-child(2)"));
          }
          fsElement.addClass("up-container");
          $(this).removeClass("fa-arrows-alt").addClass("fa-compress");
        });

        $(document).on("click",".fa-compress", function(){
          let prevSibling = $(this).prev().text();
          let fsElement = $(this).parent().parent();
          if(prevSibling === "Previewer"){
            $(".ep-containers:first-child").before($(".ep-containers:nth-child(2)"));
          }
          
          fsElement.removeClass("up-container");
          $(this).removeClass("fa-compress").addClass("fa-arrows-alt");
        });

        $(window).on("resize", () => {
          if($(window).width() <= 1000){
            if($("i").hasClass("fa-compress") || $("i").hasClass("fa-arrows-alt")){ // To avoid repeting the operation each time the window is resized
            let upperContainerValue = $(".ep-containers:first-child>div:first-child>h2").text();
            if(upperContainerValue === "Previewer"){
              $(".ep-containers:first-child").before($(".ep-containers:nth-child(2)"));
            }
            $("i").removeClass("fa-arrows-alt").removeClass("fa-compress");
            $(".ep-containers").removeClass("up-container");
            }
          }
          if($(window).width() > 1000 && !$("i").hasClass("fa-arrows-alt") && !$("i").hasClass("fa-compress")) // If both "i" elements have no class, add default one, aka when window size passes over 1000px. If uncheck, "i" can change class when resized, which is problematical if the editor or previewer container is fullscreen
            $("i").addClass("fa-arrows-alt");
        });
    });
  });

   return(
     <div className="base-container">
      <Editor content={inputText} setInputText={setInputText} />
      <Previewer content={inputText} />
     </div>
   );
}

export default Container;

