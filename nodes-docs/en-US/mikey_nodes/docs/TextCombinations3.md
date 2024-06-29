---
tags:
- Text
---

# Text Combinations 3 (Mikey)
## Documentation
- Class name: `TextCombinations3`
- Category: `Mikey/Text`
- Output node: `False`

This node is designed to generate a variety of text combinations based on predefined text inputs and operations. It allows for the dynamic creation of text outputs by applying specified operations to the input texts, potentially incorporating randomness through a seed value.
## Input types
### Required
- **`text1`**
    - The first text input for combination. It serves as a foundational element for generating text outputs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text2`**
    - The second text input for combination. It complements text1 in generating diverse text outputs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text3`**
    - The third text input for combination. It adds an additional layer of complexity and variation to the text outputs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`operation`**
    - Specifies the operation to be applied to the input texts, determining how they are combined into the final output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`delimiter`**
    - The delimiter used to separate text components in the final output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`use_seed`**
    - Determines whether a seed value is used to introduce randomness into the operation selection process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`seed`**
    - The seed value used for randomizing the operation selection, if enabled.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`output1`**
    - Comfy dtype: `STRING`
    - The first generated text output based on the specified operation and inputs.
    - Python dtype: `str`
- **`output2`**
    - Comfy dtype: `STRING`
    - The second generated text output, providing an additional variant based on the operation and inputs.
    - Python dtype: `str`
- **`output3`**
    - Comfy dtype: `STRING`
    - The third generated text output, further expanding the range of possible combinations.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TextCombinations3:
    texts = ['text1', 'text2', 'text3', 'text1 + text2', 'text1 + text3', 'text2 + text3', 'text1 + text2 + text3']
    outputs = ['output1','output2','output3']

    @classmethod
    def generate_combinations(cls, texts, outputs):
        operations = []
        for output1, output2, output3 in product(texts, repeat=len(outputs)):
            operation = f"{output1} to {outputs[0]}, {output2} to {outputs[1]}, {output3} to {outputs[2]}"
            operations.append(operation)
        return operations

    @classmethod
    def INPUT_TYPES(cls):
        cls.operations = cls.generate_combinations(cls.texts, cls.outputs)
        return {'required': {'text1': ('STRING', {'multiline': True, 'default': 'Text 1'}),
                             'text2': ('STRING', {'multiline': True, 'default': 'Text 2'}),
                             'text3': ('STRING', {'multiline': True, 'default': 'Text 3'}),
                             'operation': (cls.operations, {'default':cls.operations[0]}),
                             'delimiter': ('STRING', {'default': ' '}),
                             'use_seed': (['true','false'], {'default': 'false'}),
                             'seed': ('INT', {'default': 0, 'min': 0, 'max': 0xffffffffffffffff})},
                "hidden": {"extra_pnginfo": "EXTRA_PNGINFO", "prompt": "PROMPT"}}

    RETURN_TYPES = ('STRING','STRING','STRING')
    RETURN_NAMES = ('output1','output2','output3')
    FUNCTION = 'mix'
    CATEGORY = 'Mikey/Text'

    def mix(self, text1, text2, text3, operation, delimiter, use_seed, seed, extra_pnginfo, prompt):
        # search and replace
        text1 = search_and_replace(text1, extra_pnginfo, prompt)
        text2 = search_and_replace(text2, extra_pnginfo, prompt)
        text3 = search_and_replace(text3, extra_pnginfo, prompt)

        text_dict = {'text1': text1, 'text2': text2, 'text3': text3}
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
