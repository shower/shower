# Export to PDF

Though publishing your HTML slides as they are is always a better idea, you can export your presentation to PDF to upload it to a service like [SlideShare](https://www.slideshare.net/) or [Notist](https://noti.st/).

There are two ways of doing this: via browser print dialog or via console. Exporting via browser seems like the most convenient option, but in some cases it might take too much time or even freeze your browser if your slides are too heavy or there are too many of them.

## Browser

To export your slides to PDF using a browser, you’ll need a browser that’s capable of reading page size from `@page` CSS rule. Chromium-based browsers such as Chrome, Opera, Yandex work the best.

Open you presentation in a browser and send it to print:

1. Press <kbd>Cmd P</kbd> or <kbd>Ctrl P</kbd>.
2. Select PDF as a target instead of printer.
3. Save resulted file.

![Printing dialog](images/ribbon-printing.png)

## Console

To export your slides to PDF via console, you’ll need [Node.js](https://nodejs.org/) with npm installed. Once you have it, you can install Shower CLI package that’ll take care of export:

```sh
npm install -g @shower/cli
```

Once it’s installed, it becomes globally available as `shower` command. Run it in your presentation’s folder like this to get your PDF:

```sh
shower pdf
```

Run `shower --help` for more options. But if it’s a one-time thing and you don’t want to install it globally, you can use built-in command coming with Shower main repository:

```sh
npm install
npm run pdf
```

You’ll find `index.pdf` next to your slides.
