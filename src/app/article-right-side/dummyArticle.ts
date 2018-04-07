export const dummyArticle = {
  title : 'Coding with Clarity',
  img : {
    src : 'js.png',
    alt : ''
  },
  body : `
  Imagine you’re working on a home project and you pick up a drill to drive a screw into a wall. When you pull the drill away from the screw, you discover that this drill has an interesting feature: it squirts a quick-drying drywall compound over the driven screw to hide it. Well, that’s great if you want to paint over the screw, but that’s not always the case. You shouldn’t have to get a second drill just to drill a hole in something. The drill would be much more usable and reliable if it just did one thing, and it would also be flexible enough to use in a variety of situations.

The single responsibility principle states that a block of code should do one thing, and do it well. Like the drill above, limiting its functionality actually increases the usefulness of a block of code. Coding this way not only saves you a lot of headache, but it will save future developers on the project a lot of headache as well.

Think of functions and methods in terms of responsibilities. As you increase its responsibilities, a block of code becomes less flexible and reliable, more demanding of changes, and more susceptible to errors. For the most clarity, each function or method should have one responsibility.

If you’re describing what a function does and you have to use the word “and,” that function is probably too complex. What a function does should be simple enough to explain with only a descriptive function name and descriptive arguments.

I was tasked recently with creating an electronic version of the Myers-Briggs personality test. I’d done this before, and when I first approached the problem a few years ago, I coded one giant function called processForm—it gathered the scores, generated the charts, and took care of everything in the DOM to display things to the user.

The problem was that if anything had to change, you had to search through a mountain of code to figure out where to make the alteration. Also, if something went wrong in the middle of the function, it was a lot harder to find the error.

So when facing the problem this time, I broke everything down into single-responsibility functions wrapped up in a module object instead. The resulting function called upon form submission looked like this:
`
}