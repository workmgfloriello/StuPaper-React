import Blockquote from '@tiptap/extension-blockquote'

const CustomBlockquote = Blockquote.extend({
    addAttributes() {
        return{
            type:{
                default: 'default',

                parseHTML: element => {
                    return element.getAttribute('data-type') || 'default'
                },
                renderHTML: attributes => {
                    return {
                        'data-type': attributes.type,
                    }
                }
            }
        }
    }
})

export default CustomBlockquote