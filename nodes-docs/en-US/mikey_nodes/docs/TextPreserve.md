---
tags:
- Text
---

# Text Preserve (Mikey)
## Documentation
- Class name: `TextPreserve`
- Category: `Mikey/Text`
- Output node: `True`

The TextPreserve node is designed to manipulate and transform text inputs based on specific patterns and random choices, while preserving the original text for further use. It incorporates functionalities such as search and replace, wildcard text selection, and updating workflow states with modified text values.
## Input types
### Required
- **`text`**
    - The original text input that will be preserved and potentially modified through various text manipulation processes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`result_text`**
    - A modified version of the original text after applying search and replace operations and wildcard selections.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`text`**
    - Comfy dtype: `STRING`
    - The final text output after all manipulations, including search and replace operations and wildcard text selections, have been applied.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TextPreserve:
    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True, 'default': 'Input Text Here', 'dynamicPrompts': False}),
                             'result_text': ('STRING', {'multiline': True, 'default': 'Result Text Here (will be replaced)'})},
                "hidden": {"unique_id": "UNIQUE_ID", "extra_pnginfo": "EXTRA_PNGINFO", "prompt": "PROMPT"}}

    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('text',)
    FUNCTION = 'process'
    OUTPUT_NODE = True

    CATEGORY = 'Mikey/Text'

    def process(self, text, result_text, unique_id=None, extra_pnginfo=None, prompt=None):
        # reset random seed
        random.seed()
        preserve_text = text
        # search and replace
        text = search_and_replace(text, extra_pnginfo, prompt)
        # wildcard sytax is {like|this}
        # select a random word from the | separated list
        wc_re = re.compile(r'{([^}]+)}')
        def repl(m):
            return random.choice(m.group(1).split('|'))
        for m in wc_re.finditer(text):
            text = text.replace(m.group(0), repl(m))
        prompt.get(str(unique_id))['inputs']['text'] = preserve_text
        for i, node_dict in enumerate(extra_pnginfo['workflow']['nodes']):
            if node_dict['id'] == int(unique_id):
                node_dict['widgets_values'] = [preserve_text, text]
                extra_pnginfo['workflow']['nodes'][i] = node_dict
        prompt.get(str(unique_id))['inputs']['result_text'] = text
        return (text,)

```
