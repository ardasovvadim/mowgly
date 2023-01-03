// @ts-nocheck
import * as Quill from 'quill';

let Inline = Quill.import('blots/inline');
let Block = Quill.import('blots/block');
let BlockEmbed = Quill.import('blots/block/embed');

class BoldBlot extends Inline { }
BoldBlot.blotName = 'bold';
BoldBlot.tagName = 'strong';

class ItalicBlot extends Inline { }
ItalicBlot.blotName = 'italic';
ItalicBlot.tagName = 'em';

class UnderlineBlot extends Inline { }
ItalicBlot.blotName = 'underline';
ItalicBlot.tagName = 'u';

Quill.register(BoldBlot);
Quill.register(ItalicBlot);
Quill.register(UnderlineBlot);

class LinkBlot extends Inline {
    static create(value) {
        let node = super.create();
        // Sanitize url value if desired
        node.setAttribute('href', value);
        // Okay to set other non-format related attributes
        // These are invisible to Parchment so must be static
        node.setAttribute('target', '_blank');
        return node;
    }

    static formats(node) {
        // We will only be called with a node already
        // determined to be a Link blot, so we do
        // not need to check ourselves
        return node.getAttribute('href');
    }
}
LinkBlot.blotName = 'link';
LinkBlot.tagName = 'a';

Quill.register(LinkBlot);

class BlockquoteBlot extends Block { }
BlockquoteBlot.blotName = 'blockquote';
BlockquoteBlot.tagName = 'blockquote';

Quill.register(BlockquoteBlot);

class HeaderBlot extends Block { }
HeaderBlot.blotName = 'header';
HeaderBlot.tagName = ['h1', 'h2', 'h3', 'p'];

Quill.register(HeaderBlot);

export class DividerBlot extends BlockEmbed { }
DividerBlot.blotName = 'divider';
DividerBlot.tagName = 'hr';

Quill.register(DividerBlot);
