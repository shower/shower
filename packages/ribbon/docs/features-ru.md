# Возможности

Все возможности темы продемонстрированы в файле [index.html](../index.html), используйте его как руководство во время создания презентации. Ниже представлено более подробное описание.

## Анатомия

Готовый пакет темы состоит из следующих папок и файлов:

1. Папка `docs` с документацией по использованию, включая это руководство.
2. Папка `fonts` со шрифтами темы, в сжатом формате WOFF.
3. Папка `images` с картинками для оформления темы.
4. Папка `pictures` с примерами картинок для демонстрации темы.
5. Папка `styles` с собранными стилями темы в размерах 16×10 и 4×3.
6. Файл `index.html` с демонстрацией всех возможностей темы на слайдах.

Дополнительно к этим файлам в репозитории содержатся исходные файлы:

1. Папка `source` с исходными шрифтами в TTF и макетом темы для [Sketch](http://bohemiancoding.com/sketch/).
2. Папка `styles` дополнительно содержит исходные стили в формате SCSS.

## Элементы

### Язык

Основной язык презентации указан в корневом элементе документа, обратите на него внимание и выставите верный:

	<html lang="ru">
	<html lang="en">

На основе этого тема использует подходящие типографские традиции. Атрибут `lang` можно также задавать отдельным слайдам или даже элементам, обозначая используемый язык.

### Холст

Корневой элемент презентации имеет основной класс `shower` и дополнительный класс режима: `list` для списка и `full` для показа слайдов. Режим `list` указан по умолчанию, но если не указано ничего, то он всё равно примет значение `list` и презентация откроется в режиме списка. Если вместо `list` задать `full`, то презентация откроется в режиме показа.

Список

	<body class="shower list">
		…
	</body>

Показ

	<body class="shower full">
		…
	</body>

Архитектура темы опирается на то, что все элементы презентации вложены в корневой элемент `shower`, а его дополнительные классы скрывают или показывают нужные вложенные элементы, в зависимости от режима.

### Заглавие

Заглавие всей презентации содержится в элементе с классом `caption`: в `<h1>` заголовок, в `<p>` описание. Основной текст тёмно-серый, ссылки подсвечиваются синим.

	<header class="caption">
		<h1>Presentation Title</h1>
		<p><a href="">Yours Truly</a>, Famous Inc.</p>
	</header>

### Слайд

Слайды обозначаются классом `slide`. Не вкладывайте слайды друг в друга и не теряйте закрывающие теги, это может плохо закончиться.

	<section class="slide">
		…
	</section>
	<section class="slide">
		…
	</section>

### Бейдж

Бейдж со ссылкой «Форкни меня на Гитхабе» (или любым другим призывом) лежит в элементе с классом `badge` и висит в правом верхнем углу:

	<footer class="badge">
		<a href="…">Fork me on Github</a>
	</footer>

### Прогресс

	<div class="progress"></div>

## Слайд

### Типы

Белый

	<section class="slide white">
		…
	</section>

Чёрный

	<section class="slide black">
		…
	</section>

Сетка

	<section class="slide grid">
		…
	</section>

### Заголовок

	<section class="slide">
		<h2>Slide Header</h2>
	</section>

### Параграфы

	<section class="slide">
		<p></p>
		<p class="note"></p>
	</section>

### Строчные

- `<a>`
- `<strong>`, `<b>`
- `<em>`, `<i>`
- `<code>`, `<samp>`, `<kbd>`
- `<sup>`, `<sub>`
- `<mark>`

### Списки

Нумерованные

	<ol>
		<li>Literally viral vegan</li>
		<li>Wes Anderson chillwave Marfa</li>
	</ol>

Ненумерованные

	<ul>
		<li>Retro meh brunch aesthetic</li>
		<li>Messenger bag retro cred</li>
	</ul>

Локализация

	<ul lang="en">
		…
	</ul>

### Цитаты

Простая

	<blockquote>
		<p>Flannel bicycle rights locavore selfies.</p>
	</blockquote>

Подпись

	<figure>
		<blockquote>
			<p>Post-ironic fashion axe flexitarian</p>
		</blockquote>
		<figcaption>Yours Truly</figcaption>
	</figure>

### Таблицы

Простые

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

Полосатые

	<table class="striped">

### Код

Простой

	<pre><code>function action() {
		// TODO
		return true;
	}</code></pre>

Нумерованный

	<pre>
		<code>function action() {</code>
		<code>	// TODO</code>
		<code>	return true;</code>
		<code>}<code>
	</pre>

Выделение

	<pre><code>function <mark>action()</mark> {
		<mark class="comment">// TODO<mark>
		return <mark class="important">true</mark>;
	}</code></pre>

### Обложка

Простая

	<section class="slide">
		<img class="cover" src="picture.png">
	</section>

Горизонтальная

	<img class="cover width" src="picture.png">

Вертикальная

	<img class="cover height" src="picture.png">

Подпись

	<figure>
		<img class="cover" src="picture.png">
		<figcaption class="white">
			© Yours Truly
		</figcaption>
	</figure>

### Шаут

Простой

	<section class="slide">
		<h2 class="shout">Shout</h2>
	</section>

Увеличивающийся

	<section class="slide">
		<h2 class="shout grow">Growing Shout</h2>
	</section>

Уменьшающийся

	<section class="slide">
		<h2 class="shout shrink">Shrinking Shout</h2>
	</section>

### Плейс

Центр

	<section class="slide">
		<img class="place" src="picture.png">
	</section>

Стороны

	<img class="place top" src="picture.png">
	<img class="place right" src="picture.png">
	<img class="place bottom" src="picture.png">
	<img class="place left" src="picture.png">

Комбинации

	<img class="place top left" src="picture.png">
	<img class="place top right" src="picture.png">
	<img class="place bottom left" src="picture.png">
	<img class="place bottom right" src="picture.png">

### Заметки

	<section class="slide">
		<p>Retro meh brunch aesthetic.</p>
		<footer class="footer">
			<p>Cosby sweater Shoreditch.</p>
		</footer>
	</section>
