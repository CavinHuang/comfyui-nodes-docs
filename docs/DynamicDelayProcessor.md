# Documentation
- Class name: DynamicDelayProcessor
- Category: ♾️Mixlab/Utils
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

DynamicDelayProcessor是一个旨在流程中引入可控延迟的节点。它允许根据输入参数调整执行时间，为处理时间敏感操作提供灵活性。该节点特别适用于需要将输出生成的时间与外部事件同步或控制以匹配特定速度的场景。

# Input types
## Required
- delay_seconds
    - delay_seconds参数决定了节点在处理输入之前将引入的基本延迟持续时间。它是节点操作的一个基本方面，因为它直接影响节点执行的时机和输出生成的时刻。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- delay_by_text
    - delay_by_text参数允许根据提供的文本长度调整延迟。这是一个可选功能，为节点的延迟功能增加了一层定制化，使其能够适应各种基于文本的输入及其相关的延迟。
    - Comfy dtype: STRING
    - Python dtype: str
- words_per_seconds
    - words_per_seconds参数与delay_by_text一起使用，根据文本的长度计算额外的延迟。它在微调节点的延迟行为以适应不同的文本长度和节奏要求方面发挥着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- replace_output
    - replace_output参数决定了延迟后节点的输出是否应替换为指定的值。这个功能提供了对输出的额外控制水平，允许节点要么传递原始输入，要么用预定义的值替换它。
    - Comfy dtype: COMBO
    - Python dtype: Union[str, None]
- replace_value
    - replace_value参数指定了如果replace_output参数设置为'enable'时要使用的值。它对于实现替换功能至关重要，确保输出根据用户的规格准确修改。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output
    - output参数代表节点操作的结果。根据配置，它可以是原始输入的传递，或者是replace_output和replace_value参数指定的替换值。它封装了节点延迟处理的最终结果。
    - Comfy dtype: ANY
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class DynamicDelayProcessor:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'delay_seconds': ('INT', {'default': 1, 'min': 0, 'max': 1000000})}, 'optional': {'any_input': (any_type,), 'delay_by_text': ('STRING', {'multiline': True, 'dynamicPrompts': False}), 'words_per_seconds': ('FLOAT', {'default': 1.5, 'min': 0.0, 'max': 1000.0, 'display': 'Chars per second?'}), 'replace_output': (['disable', 'enable'],), 'replace_value': ('INT', {'default': -1, 'min': 0, 'max': 1000000, 'display': 'Replacement value'})}}

    @classmethod
    def calculate_words_length(cls, text):
        chinese_char_pattern = re.compile('[\\u4e00-\\u9fff]')
        english_word_pattern = re.compile('\\b[a-zA-Z]+\\b')
        number_pattern = re.compile('\\b[0-9]+\\b')
        words_length = 0
        for segment in text.split():
            if chinese_char_pattern.search(segment):
                words_length += len(segment)
            elif number_pattern.match(segment):
                words_length += len(segment)
            elif english_word_pattern.match(segment):
                words_length += 1
        return words_length
    FUNCTION = 'run'
    RETURN_TYPES = (any_type,)
    RETURN_NAMES = ('output',)
    CATEGORY = '♾️Mixlab/Utils'

    def run(self, any_input, delay_seconds, delay_by_text, words_per_seconds, replace_output, replace_value):
        start_time = time.time()
        delay_time = delay_seconds
        if delay_by_text and isinstance(delay_by_text, str) and (words_per_seconds > 0):
            words_length = self.calculate_words_length(delay_by_text)
            print(f'Delay text: {delay_by_text}, Length: {words_length}')
            delay_time += words_length / words_per_seconds
        print(f'延迟执行: {delay_time}')
        time.sleep(delay_time)
        end_time = time.time()
        elapsed_time = end_time - start_time
        print(f'实际延迟时间: {elapsed_time} 秒')
        return (max(0, replace_value),) if replace_output == 'enable' else (any_input,)
```