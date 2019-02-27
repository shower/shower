# Features

All theme’s features are demonstrated in the [index.html](index.html) file. Use it as a reference while building your presentation. More detailed features overview follows below.

- [Anatomy](#anatomy)
- [Common](#common)
    - [Language](#language)
    - [Canvas](#canvas)
    - [Title](#title)
    - [Badge](#badge)
    - [Progress](#progress)
- [Slide](#slide)
    - [Number](#number)
    - [Types](#types)
        - [White](#white)
        - [Black](#black)
        - [Grid](#grid)
    - [Content](#content)
        - [Header](#header)
        - [Paragraphs](#paragraphs)
        - [Inline](#inline)
        - [Quotes](#quotes)
        - [Lists](#lists)
        - [Columns](#columns)
        - [Tables](#tables)
        - [Code](#code)
    - [Elements](#elements)
        - [Cover](#cover)
        - [Shout](#shout)
        - [Place](#place)
        - [Notes](#notes)

## Anatomy

Theme package consists of the following folders and files:

2. `fonts` folder with fonts in WOFF format.
3. `images` folder with decoration images.
4. `pictures` folder with sample pictures.
5. `styles` folder with built styles in 16×10 and 4×3 ratios.
6. `index.html` file with demonstration of all features.

In addition to files theme’s repository contains source files:

1. `source` folder with font source files in TTF and design in [Sketch](http://bohemiancoding.com/sketch/).
2. `styles` folder also contains source styles in SCSS format.

## Common

### Language

The main presentation language is set on the root element of the document, please note it and set the right one:

    <html lang="en">
    <html lang="ru">

Appropriate typography traditions are used based on this value. `lang` attribute could also be set on separate slides or elements.

### Canvas

The root presentation element has the main `shower` class and additional mode class: `list` for the list and `full` for the full screen. `list` mode is usually set by default, but if there’s no one, it’ll be set to `list` anyway and slides will be opened in the list mode. If `full` is set instead of `list` then slides will be opened in the full screen mode.

List:

    <body class="shower list">

Full:

    <body class="shower full">

Theme’s architecture is based on agreement that all presentation elements are nested in `shower` element and mode classes are hiding or showing needed elements depending on current mode.

### Caption

Presentation title is marked with the `caption` element, which has following elements provided: `<h1>` for the header, `<p>` for the description and also links.

    <header class="caption">
        <h1>Presentation Title</h1>
        <p><a href="">Yours Truly</a>, Famous Inc.</p>
    </header>

Caption is visible only in the list mode. Don’t forget to also specify presentation title in document’s `<title>` element.

### Badge

Badge with “Fork me on GitHub” link (or any other call to action) is marked with `badge` element.

    <footer class="badge">
        <a href="…">Fork me on Github</a>
    </footer>

Badge is visible only in the list mode.

### Progress

Progress bar shows how much is left until presentation end and marked with `progress` element visible only in full screen mode:

    <div class="progress"></div>

To remove it from presentation just remove this element from document. There’s no way to hide it for specific slides.

## Slide

Slides are marked with `slide` class. Please don’t nest slides and don’t forget closing tags, things could go wrong.

    <section class="slide">
        …
    </section>
    <section class="slide">
        …
    </section>

There are two slide ratios supported: 16×10 and 4×3. To enable needed one include appropriate file `screen-4x3.css` or `screen-16x10.css`. Wide screen 16×10 format is included by default.

Slide width is 1024 px for the both ratios, for 16×10 height is 640 px, for 4×3 it’s 768. Bare in mind these sizes while preparing presentation pictures. In list mode slides are scaled down 2 or 4 times and in full screen mode they are scaled dynamically based on window size.

### Number

Slide numbers help audience to remember slides for questions and open needed slide by changing number in address field. Numbers are generated automatically using CSS counters and could be turned off for specific slides.

You can hide number manually:

    <section class="slide" id="off">
        <style>
            #off::after {
                visibility: hidden;
            }
        </style>
    </section>

Slide type `clear` could also hide slide number.

### Types

Types are changing slide’s look. You can set type by adding class to the main `slide`. There are few built-in types available in the theme, you could also describe custom types for each presention or add it to your theme.

#### White

White type sets white background.

    <section class="slide white">

#### Black

Black type sets black background.

    <section class="slide black">

Please note that black slide type doesn’t change text color.

#### Clear

Clear type turns off slide number. Use it when you need a pure slide. May be mixed with `white` or `black` type.

    <section class="slide clear">

#### Grid

Grid set a background with two guide types: main magenta guides and additional cyan guides, setting margins, rows and columns.

    <section class="slide grid">
        …
    </section>

All theme elements are aligned by this grid and it’s recommended to follow it while changing or extending a theme.

### Content

Simple content: headers, paragraphs, lists.

#### Header

Slide header is marked with `<h2>` element:

    <section class="slide">
        <h2>Slide Header</h2>
    </section>

We haven’t introduced next heading levels to not provoke slides complexity.

#### Paragraphs

Paragraphs are marked with `<p>` element. You could also make a note, less important part of a slide, by adding a `note` class to a paragraph:

    <section class="slide">
        <p>Text</p>
        <p class="note">Note</p>
    </section>

#### Inline

There are following inline elements styled in the theme:

- `<a>` is underlined;
- `<strong>` and `<b>` are bold;
- `<em>` and `<i>` are italic;
- `<code>`, `<samp>`, and `<kbd>` are monospaced;
- `<sup>` and `<sub>` make superscript and subscript indexes;
- `<mark>` highlights text with background color.

#### Quotes

Quotes are marked with `<blockquote>` element which contains one or more paragraphs:

    <blockquote>
        <p>Flannel bicycle rights locavore selfies.</p>
    </blockquote>

To add quote’s author wrap a quote to a `<figure>` element and put a caption in the `<figcaption>` right after:

    <figure>
        <blockquote>
            <p>Post-ironic fashion axe flexitarian</p>
        </blockquote>
        <figcaption>Yours Truly</figcaption>
    </figure>

#### Lists

For creating list you must use `ul` (`ol` for numerical list).

    <ol>
        <li>Literally viral vegan</li>
        <li>Wes Anderson chillwave Marfa
            <ul>
                <li>Retro meh brunch aesthetic</li>
                <li>Messenger bag retro cred</li>
            </ul>
        </li>
    </ol>

You can also create list with inner navigation by adding `next` class to each elements following after element from each you want start navigation:

    <h2>Inner navigation</h2>
    <ol>
        <li>I'll be seen right away.</li>
        <li>Just navigate to next slide and you'll see others.</li>
        <li class="next">Hey! It's all okay ?</li>
        <li class="next"> ... </li>
    </ol>

And even so:

    <h2>Benefits</h2>
    <ol>
        <li class="next">The most important advantage</li>
        <li class="next">Less important advantage</li>
    </ol>
    <h2 class="next">Disadvantages</h2>
    <ol class="next">
        <li class="next">There's nothing here</li>
        <li class="next"> ... </li>
    </ol>

#### Columns

If you want to form text in two or three columns use `double` or `triple` class

    <p class="double">
        Echo Park 8-bit sustainable umami deep v Kickstarter.
    </p>

Also work with lists:

    <ul class="triple">
        <li>Occupy locavore blog</li>
        <li>Mustache you haven’t heard of</li>
        <li>Something else</li>
    </ul>

#### Tables

Create table by using usual `table`, `tr`, `th`

    <table>
        <tr>
            <th scope="col">Gentrify</th>
            <th>Twee</th>
        </tr>
        <tr>
            <th scope="row">Messenger</th>
            <td>Mixtape</td>
        </tr>
    </table>

Class `striped` stylizes your table: even rows will turn gray background

    <table class="striped">

#### Code

`Code` tag define your program code

    <pre><code>function action() {
        // TODO
        return true;
    }</code></pre>

If you want to add lines numbers use next construction:

    <pre>
        <code>function action() {</code>
        <code>    // TODO</code>
        <code>    return true;</code>
        <code>}<code>
    </pre>

When neccessary emphasize that code is commented, you need to use span element with `comment` class;
If you want to color part of code, wrap this part with `mark` to add yellow background and `mark` with `important` class to add red background;

    <pre><code>function <mark>action()</mark> {
        <span class="comment">// TODO<span>
        return <mark class="important">true</mark>;
    }</code></pre>

### Elements

…

#### Cover

`Cover` class on img attribute indicates that picture will be background for slide

    <section class="slide">
        <img class="cover" src="picture.png">
    </section>

To stretch the picture in width or height, you need to set a `width` or `height` class respectively;

Use both classes `width height`, if you want to stretch the picture in width and height

    <img class="cover width" src="picture.png">
    <img class="cover height" src="picture.png">
    <img class="cover width height" src="picture.png">

Shortcut for `width`, `height`:

    <img class="cover w" src="picture.png">
    <img class="cover h" src="picture.png">

To insert an image description, links to the author's site or other information use `figure` tag with `figcaption`

    <figure>
        <img class="cover" src="picture.png">
        <figcaption class="white">
            © Yours Truly
        </figcaption>
    </figure>

#### Shout

There are slides, which need to be described in only a few words. Usually they display a call for action, define common themes, link to project or something else. To stylize this text, use the `shout` class.

    <section class="slide">
        <h2 class="shout">Shout</h2>
    </section>

Add `grow` class to animate text from small to big size

    <section class="slide">
        <h2 class="shout grow">Growing Shout</h2>
    </section>

Or, on the contrary, for animate text size from big to small add `shrink` class.

    <section class="slide">
        <h2 class="shout shrink">Shrinking Shout</h2>
    </section>

#### Place

Use `place` class on img attribute give same effect as `cover` class - set background image

    <section class="slide">
        <img class="place" src="picture.png">
    </section>

If you want collocate picture at a certain side, you need to use `top` / `right` / `bottom` / `left` class as shown below

    <img class="place top" src="picture.png">
    <img class="place right" src="picture.png">
    <img class="place bottom" src="picture.png">
    <img class="place left" src="picture.png">

You can also combine classes for location in corners:

    <img class="place top left" src="picture.png">
    <img class="place top right" src="picture.png">
    <img class="place bottom left" src="picture.png">
    <img class="place bottom right" src="picture.png">

#### Notes

When neccessary to add some notes for slide, you may use `footer` class, that hide your notes at all time and show them when you hover to slide:

    <section class="slide">
        <p>Retro meh brunch aesthetic.</p>
        <footer class="footer">
            <p>Cosby sweater Shoreditch.</p>
        </footer>
    </section>
