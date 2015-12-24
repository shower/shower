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

### Холст

- Режимы

	<body class="shower list">
		…
	</body>

	<body class="shower full">
		…
	</body>

- Локализация

	<html lang="ru">
	<html lang="en">

### Заглавие

	<header class="caption">
		<h1>Presentation Title</h1>
		<p><a href="">Yours Truly</a>, Famous Inc.</p>
	</header>

### Слайд

	<section class="slide">
		…
	</section>

### Бейдж

	<footer class="badge">
		<a href="…">Fork me on Github</a>
	</footer>

### Прогресс

	<div class="progress"></div>

## Слайд

### Типы

- Белый

	<section class="slide white">
		…
	</section>

- Чёрный

	<section class="slide black">
		…
	</section>

- Сетка

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

- Нумерованные

	<ol>
		<li>Literally viral vegan</li>
		<li>Wes Anderson chillwave Marfa</li>
		<li>Ethnic polaroid lo-fi</li>
	</ol>

- Ненумерованные

	<ul>
		<li>Retro meh brunch aesthetic</li>
		<li>Messenger bag retro cred</li>
		<li>Leggings skateboard literally</li>
	</ul>

- Локализация

	<ul lang="en">
		…
	</ul>

### Цитаты

- Простая

	<blockquote>
		<p>Flannel bicycle rights locavore selfies.</p>
	</blockquote>

- Подпись

	<figure>
		<blockquote>
			<p>Post-ironic fashion axe flexitarian</p>
		</blockquote>
		<figcaption>Yours Truly</figcaption>
	</figure>

### Таблицы

- Простые

	<table>
	<tr>
		<th scope="col">Gentrify</th>
		<th>Twee</th>
		<th>Artisan</th>
		<th>Banksy</th>
	</tr>
	<tr>
		<th scope="row">Messenger</th>
		<td>Mixtape</td>
		<td>Small batch</td>
		<td>Bicycle rights</td>
	</tr>
	</table>

- Полосатые

	<table class="striped">

### Код

- Простой

	<pre><code>function action() {
		return true;
	}</code></pre>

- Нумерованный

	<pre>
		<code>function action() {</code>
		<code>	return true;</code>
		<code>}<code>
	</pre>

- Выделение

### Обложка

- Простая
- Горизонтальная
- Вертикальная
- Подпись

### Шаут

- Простой
- Увеличивающийся
- Уменьшающийся

### Плейс

- Центр
- Стороны
- Комбинации

### Заметки
