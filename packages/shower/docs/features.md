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

Some slide types could also hide slide number: `white` or `black`.

### Types

Types are changing slide’s look. You can set type by adding class to the main `slide`. There are few built-in types available in the theme, you could also describe custom types for each presention or add it to your theme.

#### White

White type set white background and turns off slide number. Use it when you need just a pure white slide.

	<section class="slide white">

#### Black

Black type set black background and turns off slide number. Use it when you need just a pure black slide.

	<section class="slide black">

Please note that black slide type doesn’t change text color.

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

…

	<ol>
		<li>Literally viral vegan</li>
		<li>Wes Anderson chillwave Marfa
			<ul>
				<li>Retro meh brunch aesthetic</li>
				<li>Messenger bag retro cred</li>
			</ul>
		</li>
	</ol>

…

#### Columns

…

	<p class="double">
		Echo Park 8-bit sustainable umami deep v Kickstarter.
	</p>

…

	<ul class="double">
		<li>Occupy locavore blog</li>
		<li>Mustache you haven’t heard of</li>
	</ul>

#### Tables

…

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

…

	<table class="striped">

#### Code

…

	<pre><code>function action() {
		// TODO
		return true;
	}</code></pre>

…

	<pre>
		<code>function action() {</code>
		<code>	// TODO</code>
		<code>	return true;</code>
		<code>}<code>
	</pre>

…

	<pre><code>function <mark>action()</mark> {
		<span class="comment">// TODO<span>
		return <mark class="important">true</mark>;
	}</code></pre>

…

### Elements

…

#### Cover

…

	<section class="slide">
		<img class="cover" src="picture.png">
	</section>

…

…

…

	<img class="cover width" src="picture.png">
	<img class="cover height" src="picture.png">

…

	<img class="cover w" src="picture.png">
	<img class="cover h" src="picture.png">

…

	<figure>
		<img class="cover" src="picture.png">
		<figcaption class="white">
			© Yours Truly
		</figcaption>
	</figure>

#### Shout

…

	<section class="slide">
		<h2 class="shout">Shout</h2>
	</section>

…

	<section class="slide">
		<h2 class="shout grow">Growing Shout</h2>
	</section>

…

	<section class="slide">
		<h2 class="shout shrink">Shrinking Shout</h2>
	</section>

#### Place

…

	<section class="slide">
		<img class="place" src="picture.png">
	</section>

…

	<img class="place top" src="picture.png">
	<img class="place right" src="picture.png">
	<img class="place bottom" src="picture.png">
	<img class="place left" src="picture.png">

…

	<img class="place top left" src="picture.png">
	<img class="place top right" src="picture.png">
	<img class="place bottom left" src="picture.png">
	<img class="place bottom right" src="picture.png">

#### Notes

…

	<section class="slide">
		<p>Retro meh brunch aesthetic.</p>
		<footer class="footer">
			<p>Cosby sweater Shoreditch.</p>
		</footer>
	</section>

…
