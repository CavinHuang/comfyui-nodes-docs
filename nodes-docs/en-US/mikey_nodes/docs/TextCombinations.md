---
tags:
- Text
---

# Text Combinations 2 (Mikey)
## Documentation
- Class name: `TextCombinations`
- Category: `Mikey/Text`
- Output node: `False`

The TextCombinations node is designed to generate a variety of text combinations based on predefined text inputs and operations. It allows for the dynamic mixing and matching of text elements to create new, composite strings according to specified operations, making it a versatile tool for text manipulation and generation.
## Input types
### Required
- **`text1`**
    - The first text input that can be dynamically combined with other text inputs according to the specified operation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text2`**
    - The second text input that can be combined with the first text input and potentially others, depending on the operation defined.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`operation`**
    - Defines the specific combination operation to be applied to the text inputs, determining how they are mixed and matched to generate the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`delimiter`**
    - A string used to separate text elements in the output, allowing for customization of the output format.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`use_seed`**
    - A boolean flag indicating whether a seed should be used to generate deterministic combinations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`seed`**
    - An integer seed value used to ensure deterministic output when combining text inputs, if 'use_seed' is true.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`output1`**
    - Comfy dtype: `STRING`
    - The first resulting string after applying the specified combination operation to the input texts.
    - Python dtype: `str`
- **`output2`**
    - Comfy dtype: `STRING`
    - The second resulting string after applying the specified combination operation to the input texts.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TextCombinations2:
    texts = ['text1', 'text2', 'text1 + text2']
    outputs = ['output1','output2']

    @classmethod
    def generate_combinations(cls, texts, outputs):
        operations = []
        for output1, output2 in product(texts, repeat=len(outputs)):
            operation = f"{output1} to {outputs[0]}, {output2} to {outputs[1]}"
            operations.append(operation)
        return operations

    @classmethod
    def INPUT_TYPES(cls):
        cls.operations = cls.generate_combinations(cls.texts, cls.outputs)
        return {'required': {'text1': ('STRING', {'multiline': True, 'default': 'Text 1'}),
                             'text2': ('STRING', {'multiline': True, 'default': 'Text 2'}),
                             'operation': (cls.operations, {'default':cls.operations[0]}),
                             'delimiter': ('STRING', {'default': ' '}),
                             'use_seed': (['true','false'], {'default': 'false'}),
                             'seed': ('INT', {'default': 0, 'min': 0, 'max': 0xffffffffffffffff})},
                "hidden": {"extra_pnginfo": "EXTRA_PNGINFO", "prompt": "PROMPT"}}

    RETURN_TYPES = ('STRING','STRING')
    RETURN_NAMES = ('output1','output2')
    FUNCTION = 'mix'
    CATEGORY = 'Mikey/Text'

    def mix(self, text1, text2, operation, delimiter, use_seed, seed, extra_pnginfo, prompt):
        # search and replace
        text1 = search_and_replace(text1, extra_pnginfo, prompt)
        text2 = search_and_replace(text2, extra_pnginfo, prompt)

        text_dict = {'text1': text1, 'text2': text2}
        if use_seed == 'true' and len(self.operations) > 0:
            offset = seed % len(self.operations)
            operation = self.operations[offset]

        # Parsing the operation string
        ops = operation.split(", ")
        output_texts = [op.split(" to ")[0] for op in ops]

        # Generate the outputs
        outputs = []

        for output_text in output_texts:
            # Split the string by '+' to identify individual text components
            components = output_text.split(" + ")

            # Generate the final string for each output
            final_output = delimiter.join(eval(comp, {}, text_dict) for comp in components)

            outputs.append(final_output)

        return tuple(outputs)

```
