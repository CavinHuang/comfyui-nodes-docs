---
tags:
- Prompt
- Text
- Wildcard
---

# Wildcard OobaPrompt (Mikey)
## Documentation
- Class name: `WildcardOobaPrompt`
- Category: `Mikey/AI`
- Output node: `True`

The WildcardOobaPrompt node is designed to process input prompts by interpreting and replacing wildcard syntax and handling specific syntax for interacting with large language models (LLMs) through the OobaPrompt class. It aims to enhance the flexibility and expressiveness of prompts by allowing dynamic content insertion and custom processing for LLM requests.
## Input types
### Required
- **`input_prompt`**
    - The 'input_prompt' parameter is the initial input text that may contain wildcard syntax for dynamic content insertion and specific markers for LLM syntax processing. It plays a crucial role in determining the final output by guiding the node on how to transform the input prompt.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`seed`**
    - The 'seed' parameter is used to initialize the random number generator, ensuring reproducibility in selections made during the wildcard and random word selection processes. It affects the node's execution by influencing the randomness of content insertion.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`text`**
    - Comfy dtype: `STRING`
    - The output is a transformed version of the input prompt, with wildcard syntax and LLM markers processed and replaced according to the provided rules and parameters.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WildcardOobaPrompt:
    # processes wildcard syntax
    # and also processes a llm sytax using the oobaprompt class
    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'input_prompt': ('STRING', {'multiline': True, 'default': 'Prompt Text Here', 'dynamicPrompts': False}),
                             #'mode': (['prompt', 'style', 'descriptor', 'custom'], {'default': 'prompt'}),
                             #'custom_history': ('STRING', {'multiline': False, 'default': 'path to history.json', 'dynamicPrompts': True}),
                             'seed': ('INT', {'default': 0, 'min': 0, 'max': 0xffffffffffffffff})},
                "hidden": {"unique_id": "UNIQUE_ID", "extra_pnginfo": "EXTRA_PNGINFO", "prompt": "PROMPT"}}

    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('text',)
    FUNCTION = 'process'
    OUTPUT_NODE = True
    CATEGORY = 'Mikey/AI'

    def process(self, input_prompt, seed, prompt=None, unique_id=None, extra_pnginfo=None):
        # search and replace
        input_prompt = search_and_replace(input_prompt, extra_pnginfo, prompt)
        # wildcard sytax is {like|this}
        # select a random word from the | separated list
        wc_re = re.compile(r'{([^}]+)}')
        def repl(m):
            return random.choice(m.group(1).split('|'))
        for m in wc_re.finditer(input_prompt):
            input_prompt = input_prompt.replace(m.group(0), repl(m))
        # process wildcards
        input_prompt = find_and_replace_wildcards(input_prompt, seed, debug=True)
        # check if llm syntax is in the prompt
        # examples <llm:prompt:prompt text here>, <llm:style:prompt text here>, <llm:descriptor:prompt text here>
        # example for custom history file <llm:path/to/history.json:prompt text here>
        llm_re = re.compile(r'<llm:(.*?):(.*?)>')
        for m in llm_re.finditer(input_prompt):
            mode = m.group(1)
            if '.json' in mode:
                custom_history = mode
                mode = 'custom'
            else:
                custom_history = None
            prompt_text = m.group(2)
            ooba = OobaPrompt()
            result = ooba.api_request(prompt_text, seed, mode, custom_history)
            input_prompt = input_prompt.replace(m.group(0), result)
        prompt.get(str(unique_id))['inputs']['output_text'] = input_prompt
        return (input_prompt,)

```
