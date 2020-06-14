# pitch

[Try it out!](https://pitch.melkat.dev)


## what

it's an app i made focusing on trans voice feminization


## you know what would be cool

if this was an apple watch app, and when your pitch dropped below a certain pitch it vibrated to let you know.


## why

this was an expirement in web audio apis. i wanted to see if i could do this in such a way that it worked on ios, safari, and everywhere else. because of these constraints i had to find libraries that work with safari's outdated audio apis.


## it functions weird

fair, that's probably intentional based on how i want to use it or because working with the library is weird.

* **chart doesn't move when i'm not talking**   
  this is so i can keep track of my last pitch without it scrolling off the screen
* **lower pitches don't register**   
  this is because it was made to help with feminizing a voice, which is why it turns red when you talk under a certain frequency.
* **pitch calculations feel off**   
  yeah, i don't like it either. it works generally well.
* **very high pitches aren't recognized**   
  i had to do something from keeping it from defaulting to 17776hz when there is no noise present.


## known issues

* **doesn't work in 3rd party ios browsers**   
  yeah, those aren't real browsers. they run a limited version of the safari app. there's not a good way for me to debug this.


## apps i recommend instead

* [Voice Analyst for iPhone, iPad, and Android](https://speechtools.co/voice-analyst)
* [Saoirse-zee's Pitch web app for Chrome](https://saoirse-zee.github.io/pitch/)
