# Documentation
- Class name: TextCombinations3
- Category: Mikey/Text
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

TextCombinations3节点旨在生成一组文本操作，以各种方式组合输入文本。它提供了一种基于预定义操作和指定分隔符混合和转换文本字符串的方法。该节点的功能集中在创建文本输入的组合以产生不同的输出，这对于文本分析或数据预处理任务非常有用。

# Input types
## Required
- text1
    - 'text1'参数是一个字符串，代表第一个输入文本。它在节点的操作中起着关键作用，因为它是将被组合和操作以生成最终输出的主要文本数据来源之一。
    - Comfy dtype: STRING
    - Python dtype: str
- text2
    - 'text2'参数是另一个字符串输入，它补充了'text1'。它对于创建多样化的文本组合至关重要，并与'text1'一起使用，以实现生成混合文本输出的节点目的。
    - Comfy dtype: STRING
    - Python dtype: str
- text3
    - 'text3'参数是节点的第三个输入文本字符串。它对于扩大可能的文本组合范围和确保节点能够产生广泛的输出变化非常重要。
    - Comfy dtype: STRING
    - Python dtype: str
- operation
    - 'operation'参数定义了要执行的特定文本组合。它是节点执行的关键决定因素，因为它决定了输入文本将如何混合以创建所需的输出。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- delimiter
    - 'delimiter'参数指定用于分隔组合文本组件的字符或字符串。它对于定义最终输出的格式和确保混合文本以连贯的方式呈现非常重要。
    - Comfy dtype: STRING
    - Python dtype: str
- use_seed
    - 'use_seed'参数是一个布尔标志，指示是否应使用种子值从预定义列表中选择一个操作。它影响文本组合过程的随机性和可重复性。
    - Comfy dtype: STRING
    - Python dtype: str
- seed
    - 'seed'参数是一个整数，当'use_seed'设置为true时，用作操作选择的随机种子。它确保了生成文本组合的一致起点，这对于获得可重复的结果至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output1
    - 'output1'参数代表节点生成的第一个混合文本输出。这是节点操作的重要结果，展示了输入文本的组合和转换。
    - Comfy dtype: STRING
    - Python dtype: str
- output2
    - 'output2'参数是节点的第二个混合文本输出。它反映了输入文本的另一种变化，展示了节点产生多个不同输出的能力。
    - Comfy dtype: STRING
    - Python dtype: str
- output3
    - 'output3'参数表示第三个混合文本输出。这是节点如何操作和组合文本输入以产生多样化结果集的另一个示例。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class TextCombinations3:
    texts = ['text1', 'text2', 'text3', 'text1 + text2', 'text1 + text3', 'text2 + text3', 'text1 + text2 + text3']
    outputs = ['output1', 'output2', 'output3']

    @classmethod
    def generate_combinations(cls, texts, outputs):
        operations = []
        for (output1, output2, output3) in product(texts, repeat=len(outputs)):
            operation = f'{output1} to {outputs[0]}, {output2} to {outputs[1]}, {output3} to {outputs[2]}'
            operations.append(operation)
        return operations

    @classmethod
    def INPUT_TYPES(cls):
        cls.operations = cls.generate_combinations(cls.texts, cls.outputs)
        return {'required': {'text1': ('STRING', {'multiline': True, 'default': 'Text 1'}), 'text2': ('STRING', {'multiline': True, 'default': 'Text 2'}), 'text3': ('STRING', {'multiline': True, 'default': 'Text 3'}), 'operation': (cls.operations, {'default': cls.operations[0]}), 'delimiter': ('STRING', {'default': ' '}), 'use_seed': (['true', 'false'], {'default': 'false'}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}, 'hidden': {'extra_pnginfo': 'EXTRA_PNGINFO', 'prompt': 'PROMPT'}}
    RETURN_TYPES = ('STRING', 'STRING', 'STRING')
    RETURN_NAMES = ('output1', 'output2', 'output3')
    FUNCTION = 'mix'
    CATEGORY = 'Mikey/Text'

    def mix(self, text1, text2, text3, operation, delimiter, use_seed, seed, extra_pnginfo, prompt):
        text1 = search_and_replace(text1, extra_pnginfo, prompt)
        text2 = search_and_replace(text2, extra_pnginfo, prompt)
        text3 = search_and_replace(text3, extra_pnginfo, prompt)
        text_dict = {'text1': text1, 'text2': text2, 'text3': text3}
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