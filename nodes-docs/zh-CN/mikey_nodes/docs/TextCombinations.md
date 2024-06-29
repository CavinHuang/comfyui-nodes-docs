# Documentation
- Class name: TextCombinations2
- Category: Mikey/Text
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

TextCombinations2节点旨在生成一系列文本操作，这些操作以定义的操作方式结合两个输入文本。它通过在输入上执行指定的操作来促进输出文本的创建，提供了文本处理的灵活性。

# Input types
## Required
- text1
    - 'text1'参数是将在组合操作中使用的第一种输入文本。它在确定最终输出中起着关键作用，因为它是被操作的主要元素之一。
    - Comfy dtype: STRING
    - Python dtype: str
- text2
    - 'text2'参数是与'text1'通过定义的操作结合的第二种输入文本。它的内容对于输出生成过程至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- operation
    - 'operation'参数定义了要在输入文本上执行的特定组合操作。它至关重要，因为它决定了如何将'text1'和'text2'转换为所需的输出。
    - Comfy dtype: COMBO['text1 to output1', 'text2 to output2']
    - Python dtype: str
## Optional
- delimiter
    - 'delimiter'参数指定在操作期间连接文本组件时使用字符或字符串。它影响最终输出的格式。
    - Comfy dtype: STRING
    - Python dtype: str
- use_seed
    - 'use_seed'参数决定是否应使用种子值从预定义的操作列表中选择一个操作。它为操作选择过程增加了随机性或特定性。
    - Comfy dtype: COMBO['true', 'false']
    - Python dtype: str
- seed
    - 'seed'参数是一个整数值，当'use_seed'设置为true时，用于偏移操作的选择。它确保根据提供的整数选择特定的操作。
    - Comfy dtype: INT
    - Python dtype: int
- extra_pnginfo
    - 'extra_pnginfo'参数保存可能需要用于某些操作的额外信息。它用于根据额外的上下文数据影响节点的行为。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Union[Dict, str]
- prompt
    - 'prompt'参数为节点提供指导或额外的上下文，可能会改变其处理输入文本的方式。它对于需要交互式或条件行为的节点特别有用。
    - Comfy dtype: PROMPT
    - Python dtype: Union[Dict, str]

# Output types
- output1
    - 'output1'参数代表组合操作后的第一个结果文本。它是输入和指定操作的直接结果。
    - Comfy dtype: STRING
    - Python dtype: str
- output2
    - 'output2'参数代表组合操作后的第二个结果文本。它是从输入和执行的操作派生出的另一个输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class TextCombinations2:
    texts = ['text1', 'text2', 'text1 + text2']
    outputs = ['output1', 'output2']

    @classmethod
    def generate_combinations(cls, texts, outputs):
        operations = []
        for (output1, output2) in product(texts, repeat=len(outputs)):
            operation = f'{output1} to {outputs[0]}, {output2} to {outputs[1]}'
            operations.append(operation)
        return operations

    @classmethod
    def INPUT_TYPES(cls):
        cls.operations = cls.generate_combinations(cls.texts, cls.outputs)
        return {'required': {'text1': ('STRING', {'multiline': True, 'default': 'Text 1'}), 'text2': ('STRING', {'multiline': True, 'default': 'Text 2'}), 'operation': (cls.operations, {'default': cls.operations[0]}), 'delimiter': ('STRING', {'default': ' '}), 'use_seed': (['true', 'false'], {'default': 'false'}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}, 'hidden': {'extra_pnginfo': 'EXTRA_PNGINFO', 'prompt': 'PROMPT'}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('output1', 'output2')
    FUNCTION = 'mix'
    CATEGORY = 'Mikey/Text'

    def mix(self, text1, text2, operation, delimiter, use_seed, seed, extra_pnginfo, prompt):
        text1 = search_and_replace(text1, extra_pnginfo, prompt)
        text2 = search_and_replace(text2, extra_pnginfo, prompt)
        text_dict = {'text1': text1, 'text2': text2}
        if use_seed == 'true' and len(self.operations) > 0:
            offset = seed % len(self.operations)
            operation = self.operations[offset]
        ops = operation.split(', ')
        output_texts = [op.split(' to ')[0] for op in ops]
        outputs = []
        for output_text in output_texts:
            components = output_text.split(' + ')
            final_output = delimiter.join((eval(comp, {}, text_dict) for comp in components))
            outputs.append(final_output)
        return tuple(outputs)
```