# Features

All theme’s features are demonstrated in the [index.html](../index.html) file. Use it as a reference while building your presentation. More detailed features overview follows below.

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

Final theme package consists of the following folders and files:

1. `docs` folder with usage documentation, including this manual.
2. `fonts` folder with fonts in WOFF compressed format.
3. `images` folder with decoration images.
4. `pictures` folder with sample pictures.
5. `styles` folder with built styles in 16×10 and 4×3 ratios.
6. `index.html` file with demonstration of all features.

In addition to files above repository contains source files:

1. `source` folder with font source files in TTF and design in [Sketch](http://bohemiancoding.com/sketch/).
2. `styles` folder also contains source styles in SCSS format.

## Common

### Language

The main presentation language is set on the root element of the document, please note it and set the right one:

	<html lang="ru">
	<html lang="en">

Appropriate typography traditions are used based on this value. `lang` attribute could also be set to separate slides and even elements.

### Canvas

The root presentation element has the main `shower` class and additional mode class: `list` for the list and `full` for the full screen. `list` mode is usually set by default, but if there’s no one, it’ll be set to `list` anyway and presentation will be opened in the list mode. If `full` is set instead of `list` then presentation will be opened in the full screen mode.

List:

	<body class="shower list">
		…
	</body>

Full screen:

	<body class="shower full">
		…
	</body>

Theme’s architecture is based on agreement that all presentation elements are nested in `shower` element and mode classes are hiding or showing needed element depending on current mode.

### Title

Presentation title is marked with the `caption` element, which has following elements provided: `<h1>` for the header, `<p>` for the description and also links.

	<header class="caption">
		<h1>Presentation Title</h1>
		<p><a href="">Yours Truly</a>, Famous Inc.</p>
	</header>

### Badge

Badge with “Fork me on GitHub” link (or any other call to action) is marked with `badge` element and placed to the top right corner.

	<footer class="badge">
		<a href="…">Fork me on Github</a>
	</footer>

### Progress

Progress bar shows how many slides left until presentation end and marked with `progress` element visible only in full screen mode:

	<div class="progress"></div>

If you want to remove it from presentation just delete this element from document. It’s not possible to hide it only for the certain slides.

## Slide

Slides are marked with `slide` class. Please don’t nest slides and don’t forget closing tags, this could go wrong.

	<section class="slide">
		…
	</section>
	<section class="slide">
		…
	</section>

There are two slide ratios supported: 16×10 and 4×3. To enable needed one include appropriate style file `screen-4x3.css` or `screen-16x10.css`. Wide screen 16×10 format is included by default.

Slide width is 1024 px for the both ratios, height for 16×10 is 640 px and 768 px for 4×3. Bare in mind these sizes while preparing presentation pictures. In list mode slides are scaled down 2 or 4 times and in full screen mode they are scaled dynamically based in window size.

### Number

…

### Types

…

#### White

…

#### Black

…

#### Grid

…

### Content

…

#### Header

…

#### Paragraphs

…

#### Inline

…

#### Quotes

…

#### Lists

…

#### Columns

…

#### Tables

…

#### Code

…

### Elements

…

#### Cover

…

#### Shout

…

#### Place

…

#### Notes

…
