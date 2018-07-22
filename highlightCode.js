const highlight = require('highlight.js');
const cheerio = require('cherio');
const Transform = require('stream').Transform;
const Vinyl = require('vinyl');

const AVAILABLE_LANGUAGES = highlight.listLanguages();

let $ = null;

function getCompiledLine(codeNode, highlightFunction) {
    const nodeContents = $(codeNode).contents();

    const lineParts = Array.from(nodeContents).map(subNode => {
        if (subNode.type === 'text') {
            const code = $(subNode).text();

            if (!(code || '').trim()) {
                return code;
            }

            return highlightFunction(code);
        }

        if (subNode.type === 'tag') {
            return $.html(subNode);
        }

        return '';
    });

    return lineParts.join('');
}

function getCompiledCodeLines(language, preNode) {
    const codeNodes = preNode.find('code');
    const compiledLines = [];
    let lastStack = null;

    codeNodes.each((i, codeNode) => {
		const className = $(codeNode).attr('class');
        const code = getCompiledLine(codeNode, (code) => {
            const {value, top} = highlight.highlight(language, code, false, lastStack);
            lastStack = top;

            return value;
        });

        compiledLines.push({code, className});
    });

    return compiledLines;
}

function getCompiledHtml() {
    const preNodes = $('.slide pre[class]:has(code)');

    preNodes.each((i, preNode) => {
        const $node = $(preNode);
        const langClass = ($node.attr('class') || '').trim().toLowerCase();

        if (!AVAILABLE_LANGUAGES.includes(langClass)) {
            return;
        }

		$node.removeAttr('class');

        const compiledLines = getCompiledCodeLines(langClass, $node);

        $node.html(compiledLines.map(({code, className}) => {
			return `<code ${className ? 'class="' + className + '"' : ''}>${code}</code>`;
		}).join(''));
    });

    return $.html();
}

module.exports = function() {
	const transformStream = new Transform({objectMode: true});

	transformStream._transform = (file, encoding, callback) => {
		let error = null;

		if (file.isBuffer() && file.path.endsWith('.html')) {
			const content = String(file.contents);

			$ = cheerio.load(content);

			const compiledFile = new Vinyl({
				path: file.path,
				contents: Buffer.from(getCompiledHtml())
			});

			return callback(error, compiledFile);
		}

		return callback(null, file);
	};

	return transformStream;
};
