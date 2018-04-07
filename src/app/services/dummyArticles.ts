export const dummyArticles = [
  {
    id : 'aswe13213fsdsd',
    title: 'Coding with Clarity',
    body: `

    ![asdfds](/assets/images/js2.svg)

Working code isn’t necessarily good code. 
Your code also needs to be easy to read, understand, and modify. It needs clarity, and to achieve that, it has to be organized well, with careful planning and proper separation of ideas taking place before you even open your code editor. Coding for clarity is something that separates the great developers from the merely good, and there are a few basic principles that can set you on that path.

<br>

## The single responsibility principle
<br>
  Imagine you’re working on a home project and you pick up a drill to drive a screw into a wall. When you pull the drill away from the screw, you discover that this drill has an interesting feature: it squirts a quick-drying drywall compound over the driven screw to hide it. Well, that’s great if you want to paint over the screw, but that’s not always the case. You shouldn’t have to get a second drill just to drill a hole in something. The drill would be much more usable and reliable if it just did one thing, and it would also be flexible enough to use in a variety of situations.

The single responsibility principle states that a block of code should do one thing, and do it well. Like the drill above, limiting its functionality actually increases the usefulness of a block of code. Coding this way not only saves you a lot of headache, but it will save future developers on the project a lot of headache as well.

Think of functions and methods in terms of responsibilities. 
\`\`\`javascript
function getFirstName() {
  var firstName = document.querySelector("#firstName").value;
  firstName = firstName.toLowerCase();
  setCookie("firstName", firstName);
  if (firstName === null) {
      return "";
  }
  return firstName;
}

var activeFirstName = getFirstName();
\`\`\`
As you increase its responsibilities, a block of code becomes less flexible and reliable, more demanding of changes, and more susceptible to errors. For the most clarity, each function or method should have one responsibility.
  
If you’re describing what a function does and you have to use the word “and,” that function is probably too complex. What a function does should be simple enough to explain with only a descriptive function name and descriptive arguments.
  
I was tasked recently with creating an electronic version of the Myers-Briggs personality test. I’d done this before, and when I first approached the problem a few years ago, I coded one giant function called processForm—it gathered the scores, generated the charts, and took care of everything in the DOM to display things to the user.
  
The problem was that if anything had to change, you had to search through a mountain of code to figure out where to make the alteration. Also, if something went wrong in the middle of the function, it was a lot harder to find the error.
  
So when facing the problem this time, I broke everything down into single-responsibility functions wrapped up in a module object instead. The resulting function called upon form submission looked like this:
\`\`\`javascript
    return {
        processForm: function() {
            getScores();
            calculatePercentages();
            createCharts();
            showResults();
        }
    };    
\`\`\`
Remember, code \`should be flexible\` enough to cover a wide variety of use cases. If you find yourself copying and pasting code and making minor changes, or rewriting code because code changed somewhere else, this is tight coupling in action. (For example, to make the getFirstName function from earlier reusable, you could replace the hard-coded firstName with a generic ID passed to the function.) Other signs of this include hard-coded IDs in functions, too many function parameters, multiple similar functions, and large functions that violate the single responsibility principle.
\`\`\`javascript
var CollegeCourse = (function() {
  function createStudent_WRONG(firstName, lastName, studentID) {
    //adfdasf  
    /* dfsf*/
  }

  function createStudent_RIGHT(optionsObject) {
  }
}());
\`\`\`
You shouldn’t have to modify a class because another class changes. This is a classic case of tight coupling. Constructor parameters can be passed as an object with the receiving object having fallback default values, which loosens coupling and means code won’t break when you add new parameters.
`,
    img: { src: 'js.png', alt: '' },
    tags: []
  },
  {
    id : 'asd23e2ad21e',
    title: 'JavaScript for Web Designers: DOM Scripting',
    body: `
    Everything we do with JavaScript falls within the scope of a single object: window. The window object represents, predictably enough, the entire browser window. It contains the entire DOM, as well as—and this is the tricky part—the whole of JavaScript.

When we first talked about variable scope, we touched on the concept of there being “global” and “local” scopes, meaning that a variable could be made available either to every part of our scripts or to their enclosing function alone.

The window object is that global scope. All of the functions and methods built into JavaScript are built off of the window object. We don’t have to reference window constantly, of course, or you would’ve seen a lot of it before now—since window is the global scope, JavaScript checks window for any variables we haven’t defined ourselves. In fact, the console object that you’ve hopefully come to know and love is a method of the window object:

Before we get started, let’s abandon our developer console for a bit. Ages ago now, we walked through setting up a bare-bones HTML template that pulls in a remote script, and we’re going to revisit that setup now. Between the knowledge you’ve gained about JavaScript so far and an introduction to the DOM, we’re done with just telling our console to parrot things back to us—it’s time to build something.

We’re going to add a “cut” to an index page full of text—a teaser paragraph followed by a link to reveal the full text. We’re not going to make the user navigate to another page, though. Instead, we’ll use JavaScript to show the full text on the same page.

Let’s start by setting up an HTML document that links out to an external stylesheet and external script file—nothing fancy. Both our stylesheet and script files are empty with .css and .js extensions, for now—I like to keep my CSS in a /css subdirectory and my JavaScript in a /js subdirectory, but do whatever makes you most comfortable.
    `,
    img: { src: 'js2.svg', alt: '' },
    tags: []
  },
  {
    id : '21asd234ff4gfh5',
    title: 'Interaction Is an Enhancement',
    body: `
    In architecting its new platform, Gawker Media had embraced JavaScript as the delivery mechanism for its content. It would send a hollow HTML shell to the browser and then load the actual page content via JavaScript. The common wisdom was that this approach would make these sites appear more “app like” and “modern.” But on launch day, a single error in the JavaScript code running the platform brought the system to its knees. That one solitary error caused a lengthy “site outage”—I use that term liberally because the servers were actually still working—for every Gawker property and lost the company countless page views and ad impressions.

It’s worth noting that, in the intervening years, Gawker Media has updated its sites to deliver content in the absence of JavaScript.



Late one night in January 2014 the “parental filter” used by Sky Broadband—one of the UK’s largest ISPs (Internet service providers)— began classifying code.jquery.com as a “malware and phishing” website.2 The jQuery CDN (content delivery network) is at that URL. No big deal—jQuery is only the JavaScript library that nearly three-quarters of the world’s top 10,000 websites rely on to make their web pages work.

With the domain so mischaracterized, Sky’s firewall leapt into action and began “protecting” the vast majority of their customers from this “malicious” code. All of a sudden, huge swaths of the Web abruptly stopped working for every Sky Broadband customer who had not specifically opted out of this protection. Any site that relied on CDN’s copy of jQuery to load content, display advertising, or enable interactions was dead in the water—through no fault of their own.



In September 2014, Ars Technica revealed that Comcast was injecting self-promotional advertising into websites served via its Wi-Fi hotspots.3 Such injections are effectively a man-in-the middle attack,4 creating a situation that had the potential to break a website. As security expert Dan Kaminsky put it this way:

[Y]ou no longer know, as a website developer, precisely what code is running in browsers out there. You didn’t send it, but your customers received it.
Comcast isn’t the only organization that does this. Hotels, airports, and other “free” Wi-Fi providers routinely inject advertising and other code into websites that pass through their networks.



Many web designers and developers mistakenly believe that JavaScript support is a given or that issues with JavaScript drifted off with the decline of IE 8, but these three stories are all recent, and none of them concerned a browser support issue. If these stories tell you anything, it’s that you need to develop the 1964 Chrysler Imperial5 of websites—sites that soldier on even when they are getting pummeled from all sides. After all, devices, browsers, plugins, servers, networks, and even the routers that ultimately deliver your sites all have a say in how (and what) content actually gets to your users.
    `,
    img: { src: 'js3.jpg', alt: '' },
    tags: []
  }
];