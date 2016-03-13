# HTML Email Workflow

HTML email pretty much sucks to create, when you're dealing with nested tables and already-inlined CSS. This is my workflow for creating HTML emails, in the least sucky way possible.

## Workflow components

First and foremost, the awesome Email-builder (via gulp-email-builder). This plugin can inline or embed CSS, send test emails via SMTP or sendmail, and trigger Litmus render tests. CSS is compiled from Sass, and the HTML template is created using Jade. Once you get used to the significant whitespace and unclosed tags, it provides opportunity for clean, expressive code that abstracts away the repetitive boilerplate of nested tables.

    +containerTable
        +row
            +column-12.header
                a(href="https://www.spacenate.com")
                    img(src="https://www.spacenate.com/img/header.jpg", alt="Logo or header")
        +row
            +column-6.text-content
                h2 Aw, yea
                p The layout included is a 12 column layout, that allows you to mix and match columns with ease. Nested tables may be a necessary evil in the current world of HTML email, but you shouldn't have to suffer for it.
            +column-6.text-content
                h2 12 Columns
                p Even in Gmail, which strips out media queries, the column design in this layout stays responsive, automatically stacking as necessary on viewport widths below 600 pixels.

Included is a 12 column responsive layout, "bulletproof" button, and example styles. The layout has been tested in Gmail (web and Android app), Apple Mail (OS X and iOS), Outlook 2013, Outlook Mac 2011, Outlook.com, AOL.com, and Yahoo.com. It has been render-tested with the Litmus service on Outlook 2007 and 2011 as well.

<img src="https://www.spacenate.com/img/ew-full.png" style="width:50%">
<img src="https://www.spacenate.com/img/ew-narrow.png" style="width:25%">

## To use

Run `gulp` to build the template, launch browser-sync, and watch for changes.

Or, run `gulp send` to build the template and send a test email or run Litmus render tests. To use this task, rename or copy `emailconfig.example.json` to `emailconfig.json`, and provide the necessary details. See the [Email-builder readme](https://github.com/Email-builder/email-builder-core#options) `options.emailTest` and/or `options.litmus` sections for more details.

The final HTML can be found in `dist/index.html`. Though there will be CSS files in `dist/css/`, they are not needed - all styles are fully inlined or embedded in the HTML.

## To modify

HTML is compiled from `jade/index.jade`, which extends `jade\layout\layout.jade`. The mixins `+row`, `+column-6` etc come from `jade\layout\layout.mixins.jade`. Not all column sizes are implemented yet, but the pattern used in the existing column sizes is easy to copy and modify (pull requests accepted, if you happen to get around to this before I do :) ).

CSS is compiled from `sass/*.{sass,scss}`, and can be accessed in the email template at the relative path `../dist/css/`. A regular css `<link>` will be inlined as completely as possible by Email-builder, or you can use the `data-embed` or `data-embed-ignore` attributes to modify this behavior.

## License

MIT
