# Features

All theme’s features are demonstrated in the [index.html](../index.html) file. Use it as a reference while building your presentation. More detailed features overview follows below.

## Anatomy

Final theme package contains following folders and files:

1. `docs` folder with usage documentation, including this manual.
2. `fonts` folder with theme fonts in compressed WOFF format.
3. `images` folder with images used for theme decoration.
4. `pictures` folder with sample picture used in theme demonstration.
5. `styles` folder with built theme styles in 16×10 and 4×3 ratios.
6. `index.html` file with all theme features demonstrated on slides.

In addition to files above repository contains source files:

1. `source` folder with source fonts in TTF and theme design in [Sketch](http://bohemiancoding.com/sketch/) format.
2. `styles` folder additionally contains source styles in SCSS format.

## Elements

### Canvas

List

	<body class="shower list">
		…
	</body>

Full

	<body class="shower full">
		…
	</body>

Localization

	<html lang="en">
	<html lang="ru">

### Title

	<header class="caption">
		<h1>Presentation Title</h1>
		<p><a href="">Yours Truly</a>, Famous Inc.</p>
	</header>

### Slide

	<section class="slide">
		…
	</section>

### Badge

	<footer class="badge">
		<a href="…">Fork me on Github</a>
	</footer>

### Progress

	<div class="progress"></div>

## Slide

### Types

White

	<section class="slide white">
		…
	</section>

Black

	<section class="slide black">
		…
	</section>

Grid

	<section class="slide grid">
		…
	</section>

### Header

	<section class="slide">
		<h2>Slide Header</h2>
	</section>

### Paragraphs

	<section class="slide">
		<p></p>
		<p class="note"></p>
	</section>

### Inline

- `<a>`
- `<strong>`, `<b>`
- `<em>`, `<i>`
- `<code>`, `<samp>`, `<kbd>`
- `<sup>`, `<sub>`
- `<mark>`

### Lists

Unordered

	<ol>
		<li>Literally viral vegan</li>
		<li>Wes Anderson chillwave Marfa</li>
	</ol>

Ordered

	<ul>
		<li>Retro meh brunch aesthetic</li>
		<li>Messenger bag retro cred</li>
	</ul>

Localization

	<ul lang="ru">
		…
	</ul>

### Quotes

Simple

	<blockquote>
		<p>Flannel bicycle rights locavore selfies.</p>
	</blockquote>

Author

	<figure>
		<blockquote>
			<p>Post-ironic fashion axe flexitarian</p>
		</blockquote>
		<figcaption>Yours Truly</figcaption>
	</figure>

### Tables

Simple

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

Striped

	<table class="striped">

### Code

Simple

	<pre><code>function action() {
		// TODO
		return true;
	}</code></pre>

Numbered

	<pre>
		<code>function action() {</code>
		<code>	// TODO</code>
		<code>	return true;</code>
		<code>}<code>
	</pre>

Highlight

	<pre><code>function <mark>action()</mark> {
		<mark class="comment">// TODO<mark>
		return <mark class="important">true</mark>;
	}</code></pre>

### Cover

Simple

	<section class="slide">
		<img class="cover" src="picture.png">
	</section>

Horizontal

	<img class="cover width" src="picture.png">

Vertical

	<img class="cover height" src="picture.png">

Caption

	<figure>
		<img class="cover" src="picture.png">
		<figcaption class="white">
			© Yours Truly
		</figcaption>
	</figure>

### Shout

Simple

	<section class="slide">
		<h2 class="shout">Shout</h2>
	</section>

Growing

	<section class="slide">
		<h2 class="shout grow">Growing Shout</h2>
	</section>

Shrinking

	<section class="slide">
		<h2 class="shout shrink">Shrinking Shout</h2>
	</section>

### Place

Center

	<section class="slide">
		<img class="place" src="picture.png">
	</section>

Sides

	<img class="place top" src="picture.png">
	<img class="place right" src="picture.png">
	<img class="place bottom" src="picture.png">
	<img class="place left" src="picture.png">

Combinations

	<img class="place top left" src="picture.png">
	<img class="place top right" src="picture.png">
	<img class="place bottom left" src="picture.png">
	<img class="place bottom right" src="picture.png">

### Notes

	<section class="slide">
		<p>Retro meh brunch aesthetic.</p>
		<footer class="footer">
			<p>Cosby sweater Shoreditch.</p>
		</footer>
	</section>
